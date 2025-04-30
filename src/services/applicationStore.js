const Store = require('electron-store');

class ApplicationStore {
  constructor() {
    this.store = new Store({
      name: 'applications',
      defaults: {
        applications: [],
        lastSyncDate: null
      }
    });
  }

  /**
   * Get all applications
   * @returns {Array} Array of applications
   */
  getAllApplications() {
    return this.store.get('applications');
  }

  /**
   * Get application by ID
   * @param {string} id - Application ID
   * @returns {Object|null} Application object or null if not found
   */
  getApplicationById(id) {
    const applications = this.store.get('applications');
    return applications.find(app => app.id === id) || null;
  }

  /**
   * Add a new application
   * @param {Object} application - Application data object
   * @returns {Object} Added application with generated ID
   */
  addApplication(application) {
    const applications = this.store.get('applications');
    
    // Generate a unique ID if not provided
    const newApplication = {
      ...application,
      id: application.id || `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: application.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    applications.push(newApplication);
    this.store.set('applications', applications);
    
    return newApplication;
  }

  /**
   * Update an existing application
   * @param {string} id - Application ID
   * @param {Object} updates - Fields to update
   * @returns {Object|null} Updated application or null if not found
   */
  updateApplication(id, updates) {
    const applications = this.store.get('applications');
    const index = applications.findIndex(app => app.id === id);
    
    if (index === -1) {
      return null;
    }
    
    // Create updated application object
    const updatedApplication = {
      ...applications[index],
      ...updates,
      updatedAt: new Date().toISOString()
    };
    
    applications[index] = updatedApplication;
    this.store.set('applications', applications);
    
    return updatedApplication;
  }

  /**
   * Delete an application
   * @param {string} id - Application ID
   * @returns {boolean} True if deleted, false if not found
   */
  deleteApplication(id) {
    const applications = this.store.get('applications');
    const initialLength = applications.length;
    
    const filteredApplications = applications.filter(app => app.id !== id);
    
    if (filteredApplications.length === initialLength) {
      return false;
    }
    
    this.store.set('applications', filteredApplications);
    return true;
  }

  /**
   * Search applications by various criteria
   * @param {Object} criteria - Search criteria object
   * @returns {Array} Filtered applications
   */
  searchApplications(criteria = {}) {
    const applications = this.store.get('applications');
    
    return applications.filter(app => {
      // Check each criteria
      for (const [key, value] of Object.entries(criteria)) {
        if (typeof value === 'string') {
          // String search (case insensitive)
          if (!app[key] || !app[key].toLowerCase().includes(value.toLowerCase())) {
            return false;
          }
        } else if (value instanceof Date) {
          // Date search
          const appDate = new Date(app[key]);
          if (!appDate || appDate.getTime() !== value.getTime()) {
            return false;
          }
        } else {
          // Exact match
          if (app[key] !== value) {
            return false;
          }
        }
      }
      return true;
    });
  }

  /**
   * Process email data into application entries
   * @param {Array} emails - Email data from Gmail service
   * @returns {Object} Summary of added and updated applications
   */
  processEmailsIntoApplications(emails) {
    const applications = this.store.get('applications');
    const result = {
      added: 0,
      updated: 0,
      ignored: 0
    };

    for (const email of emails) {
      // Extract company name and position from email
      const { company, position } = this.extractJobInfoFromEmail(email);
      
      // Look for existing application from the same company
      const existingIndex = applications.findIndex(app => 
        app.company === company && 
        (app.position === position || !position) &&
        app.emailIds && 
        !app.emailIds.includes(email.id)
      );
      
      if (existingIndex >= 0) {
        // Update existing application with new email data
        applications[existingIndex].emailIds = 
          applications[existingIndex].emailIds || [];
        applications[existingIndex].emailIds.push(email.id);
        applications[existingIndex].updatedAt = new Date().toISOString();
        applications[existingIndex].status = this.determineStatus(email, applications[existingIndex]);
        result.updated++;
      } else if (company) {
        // Add new application
        applications.push({
          id: `app_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          company,
          position: position || 'Unknown Position',
          status: 'Applied',
          emailIds: [email.id],
          applicationDate: email.date.toISOString(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          source: 'email'
        });
        result.added++;
      } else {
        result.ignored++;
      }
    }
    
    this.store.set('applications', applications);
    this.store.set('lastSyncDate', new Date().toISOString());
    
    return result;
  }

  /**
   * Extract company name and position from email data
   * @param {Object} email - Email data
   * @returns {Object} Extracted company name and position
   */
  extractJobInfoFromEmail(email) {
    // This is a simple implementation that could be improved with NLP
    const subject = email.subject || '';
    const from = email.from || '';
    const snippet = email.snippet || '';
    
    // Try to extract company name from the sender email
    let company = null;
    const fromMatch = from.match(/@([\w.-]+)/);
    if (fromMatch && fromMatch[1]) {
      // Extract domain and remove .com, .org, etc.
      company = fromMatch[1].replace(/\.(com|org|net|io|edu|gov|co)$/, '')
        .split('.')
        .pop()
        .replace(/^careers-?|^jobs-?|^talent-?|^hr-?|^recruiting-?/i, '')
        .replace(/-/g, ' ')
        .trim();
        
      // Capitalize first letter of each word
      company = company.split(' ')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
    
    // Try to extract position from the subject line
    let position = null;
    
    // Common patterns in job application emails
    const positionPatterns = [
      /application (?:for|to) [""']?(.*?)[""']?$/i,
      /application [""']?(.*?)[""']? received/i,
      /your application for [""']?(.*?)[""']?/i,
      /your [""']?(.*?)[""']? application/i,
      /thank you for applying (?:for|to)(?: the)? [""']?(.*?)[""']?/i
    ];
    
    for (const pattern of positionPatterns) {
      const match = subject.match(pattern);
      if (match && match[1]) {
        position = match[1].trim();
        break;
      }
    }
    
    return { company, position };
  }

  /**
   * Determine the status of an application based on email content
   * @param {Object} email - Email data
   * @param {Object} application - Existing application data
   * @returns {string} Status
   */
  determineStatus(email, application) {
    const subject = email.subject.toLowerCase();
    const snippet = email.snippet.toLowerCase();
    
    // Look for rejection indicators
    if (
      subject.includes('not moving forward') || 
      subject.includes('unfortunately') ||
      subject.includes('not selected') ||
      subject.includes('regret to inform') ||
      snippet.includes('not moving forward') || 
      snippet.includes('unfortunately') ||
      snippet.includes('not selected') ||
      snippet.includes('regret to inform')
    ) {
      return 'Rejected';
    }
    
    // Look for interview indicators
    if (
      subject.includes('interview') ||
      subject.includes('next steps') ||
      snippet.includes('interview') ||
      snippet.includes('next steps')
    ) {
      return 'Interview';
    }
    
    // Default to current status or 'Applied'
    return application?.status || 'Applied';
  }

  /**
   * Get application statistics
   * @returns {Object} Stats about applications
   */
  getStats() {
    const applications = this.store.get('applications');
    
    // Count applications by status
    const statuses = applications.reduce((acc, app) => {
      acc[app.status] = (acc[app.status] || 0) + 1;
      return acc;
    }, {});
    
    // Get application date range
    const dates = applications
      .map(app => new Date(app.applicationDate))
      .filter(date => !isNaN(date.getTime()));
    
    const oldestDate = dates.length ? new Date(Math.min(...dates.map(d => d.getTime()))) : null;
    const newestDate = dates.length ? new Date(Math.max(...dates.map(d => d.getTime()))) : null;
    
    return {
      total: applications.length,
      statuses,
      oldestDate,
      newestDate,
      lastSyncDate: new Date(this.store.get('lastSyncDate'))
    };
  }
}

// Export a singleton instance
const applicationStore = new ApplicationStore();
module.exports = applicationStore; 