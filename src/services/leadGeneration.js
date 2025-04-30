const Store = require('electron-store');

class LeadGenerationService {
  constructor() {
    this.store = new Store({
      name: 'contacts',
      defaults: {
        contacts: [],
        leadRules: [
          {
            id: 'rule_1',
            type: 'follow_up',
            days: 7,
            enabled: true,
            message: 'It has been {{days}} days since you applied for {{position}} at {{company}}. Consider sending a follow-up email.'
          },
          {
            id: 'rule_2',
            type: 'follow_up',
            days: 14,
            enabled: true,
            message: 'It has been {{days}} days since you applied for {{position}} at {{company}}. Consider reaching out to connections at the company.'
          }
        ]
      }
    });
  }

  /**
   * Add a new contact
   * @param {Object} contact - Contact data
   * @returns {Object} Added contact with generated ID
   */
  addContact(contact) {
    const contacts = this.store.get('contacts');
    
    // Generate a unique ID if not provided
    const newContact = {
      ...contact,
      id: contact.id || `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      createdAt: contact.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    contacts.push(newContact);
    this.store.set('contacts', contacts);
    
    return newContact;
  }

  /**
   * Get all contacts
   * @returns {Array} Array of contacts
   */
  getAllContacts() {
    return this.store.get('contacts');
  }

  /**
   * Search contacts
   * @param {string} query - Search query
   * @returns {Array} Filtered contacts
   */
  searchContacts(query) {
    if (!query) return this.getAllContacts();
    
    const contacts = this.store.get('contacts');
    const lowerQuery = query.toLowerCase();
    
    return contacts.filter(contact => {
      return (
        (contact.name && contact.name.toLowerCase().includes(lowerQuery)) ||
        (contact.email && contact.email.toLowerCase().includes(lowerQuery)) ||
        (contact.company && contact.company.toLowerCase().includes(lowerQuery)) ||
        (contact.role && contact.role.toLowerCase().includes(lowerQuery)) ||
        (contact.notes && contact.notes.toLowerCase().includes(lowerQuery))
      );
    });
  }

  /**
   * Get contacts by company
   * @param {string} company - Company name
   * @returns {Array} Filtered contacts
   */
  getContactsByCompany(company) {
    if (!company) return [];
    
    const contacts = this.store.get('contacts');
    const lowerCompany = company.toLowerCase();
    
    return contacts.filter(contact => {
      return contact.company && contact.company.toLowerCase().includes(lowerCompany);
    });
  }

  /**
   * Generate leads for an application
   * @param {Object} application - Application data
   * @returns {Object} Generated leads
   */
  generateLeadsForApplication(application) {
    if (!application || !application.company) {
      return { contacts: [], suggestions: [] };
    }
    
    // Find contacts at the same company
    const companyContacts = this.getContactsByCompany(application.company);
    
    // Generate lead suggestions
    // This could be expanded with more complex logic in the future
    const suggestions = [
      {
        id: `suggestion_${Date.now()}_1`,
        type: 'linkedin_search',
        description: `Search for connections at ${application.company} on LinkedIn`,
        action: 'search',
        query: `${application.company} employees`
      },
      {
        id: `suggestion_${Date.now()}_2`,
        type: 'alumni_search',
        description: `Look for alumni working at ${application.company}`,
        action: 'search',
        query: `university alumni ${application.company}`
      },
      {
        id: `suggestion_${Date.now()}_3`,
        type: 'follow_up',
        description: `Send a follow-up email regarding your ${application.position} application`,
        action: 'compose',
        template: `follow_up_template`,
        daysWait: 7
      }
    ];
    
    return {
      contacts: companyContacts,
      suggestions
    };
  }

  /**
   * Generate follow-up notifications based on application timeline
   * @param {Array} applications - List of applications
   * @returns {Array} Notifications to be sent
   */
  generateFollowUpNotifications(applications) {
    if (!applications || !applications.length) {
      return [];
    }
    
    const now = new Date();
    const leadRules = this.store.get('leadRules');
    const notifications = [];
    
    applications.forEach(app => {
      if (!app.applicationDate) return;
      
      const appDate = new Date(app.applicationDate);
      const daysSinceApplication = Math.floor((now - appDate) / (1000 * 60 * 60 * 24));
      
      leadRules.forEach(rule => {
        if (!rule.enabled) return;
        
        if (rule.type === 'follow_up' && daysSinceApplication >= rule.days) {
          // Check if we've already sent this notification
          // In a real app, we would track sent notifications
          const alreadySent = false;
          
          if (!alreadySent) {
            // Replace template variables
            const message = rule.message
              .replace('{{days}}', daysSinceApplication.toString())
              .replace('{{position}}', app.position || 'the position')
              .replace('{{company}}', app.company || 'the company');
            
            notifications.push({
              id: `notif_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
              type: 'follow-up',
              title: `Follow up on ${app.company} application`,
              message,
              date: new Date().toISOString(),
              applicationId: app.id,
              company: app.company,
              position: app.position,
              read: false,
              urgent: daysSinceApplication >= 14 // Mark as urgent if it's been 14+ days
            });
          }
        }
      });
    });
    
    return notifications;
  }

  /**
   * Import contacts from CSV data
   * @param {string} csvData - CSV data as string
   * @returns {Object} Import results
   */
  importContactsFromCSV(csvData) {
    if (!csvData) {
      return { success: false, message: 'No data provided', imported: 0 };
    }
    
    try {
      // Simple CSV parsing - in a real app, use a proper CSV library
      const lines = csvData.split('\n');
      const headers = lines[0].split(',').map(h => h.trim().toLowerCase());
      
      const nameIndex = headers.indexOf('name');
      const emailIndex = headers.indexOf('email');
      const companyIndex = headers.indexOf('company');
      const roleIndex = headers.indexOf('role');
      const notesIndex = headers.indexOf('notes');
      
      if (nameIndex === -1 || emailIndex === -1) {
        return { success: false, message: 'CSV must include name and email columns', imported: 0 };
      }
      
      const contacts = this.store.get('contacts');
      let imported = 0;
      
      for (let i = 1; i < lines.length; i++) {
        const line = lines[i].trim();
        if (!line) continue;
        
        const values = line.split(',').map(v => v.trim());
        
        const contact = {
          id: `contact_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
          name: nameIndex >= 0 ? values[nameIndex] : '',
          email: emailIndex >= 0 ? values[emailIndex] : '',
          company: companyIndex >= 0 ? values[companyIndex] : '',
          role: roleIndex >= 0 ? values[roleIndex] : '',
          notes: notesIndex >= 0 ? values[notesIndex] : '',
          source: 'csv_import',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        
        // Skip if email already exists
        if (contacts.some(c => c.email === contact.email)) {
          continue;
        }
        
        contacts.push(contact);
        imported++;
      }
      
      if (imported > 0) {
        this.store.set('contacts', contacts);
      }
      
      return { 
        success: true, 
        message: `Successfully imported ${imported} contacts`, 
        imported 
      };
    } catch (error) {
      return { 
        success: false, 
        message: `Error importing contacts: ${error.message}`, 
        imported: 0 
      };
    }
  }

  /**
   * Connect with LinkedIn API (mock implementation)
   * @returns {boolean} Success status
   */
  connectLinkedIn(credentials) {
    // Mock implementation - in a real app, this would connect to LinkedIn API
    console.log('Connecting to LinkedIn with credentials:', credentials);
    return true;
  }

  /**
   * Get all lead rules
   * @returns {Array} Lead generation rules
   */
  getLeadRules() {
    return this.store.get('leadRules');
  }

  /**
   * Update a lead rule
   * @param {string} id - Rule ID
   * @param {Object} updates - Rule updates
   * @returns {Object|null} Updated rule or null if not found
   */
  updateLeadRule(id, updates) {
    const rules = this.store.get('leadRules');
    const index = rules.findIndex(rule => rule.id === id);
    
    if (index === -1) {
      return null;
    }
    
    rules[index] = {
      ...rules[index],
      ...updates
    };
    
    this.store.set('leadRules', rules);
    return rules[index];
  }
}

// Export a singleton instance
const leadGenerationService = new LeadGenerationService();
module.exports = leadGenerationService; 