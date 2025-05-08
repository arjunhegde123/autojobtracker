/**
 * Google Sheets Service
 * Handles integration with Google Sheets API to fetch and process data
 */

import { gapi } from 'gapi-script';
import Papa from 'papaparse';
import apiConfigService from './apiConfigService';

// Configuration
const DISCOVERY_DOCS = ['https://sheets.googleapis.com/$discovery/rest?version=v4'];
const SCOPES = 'https://www.googleapis.com/auth/spreadsheets.readonly';

// === To set up Google Sheets API access ===
// 1. Go to https://console.cloud.google.com
// 2. Create a new project
// 3. Enable the Google Sheets API
// 4. Create credentials (API key and OAuth 2.0 Client ID)
// 5. Add the credentials in the Settings page
// === End setup instructions ===

class GoogleSheetsService {
  constructor() {
    this.initialized = false;
    this.isSignedIn = false;
    this.sheetsData = null;
    this.cachedData = null;
    this.cachedQueries = new Map();
  }

  /**
   * Check if API configuration is available
   * @returns {boolean} - Whether API keys are configured
   */
  checkApiConfig() {
    const { apiKey, clientId } = apiConfigService.getGoogleApiCredentials();
    const isConfigured = apiKey && clientId;
    if (!isConfigured) {
      console.warn('Google Sheets API is not configured. Please add your API_KEY and CLIENT_ID in the Settings page.');
    }
    return isConfigured;
  }

  /**
   * Initialize the Google API client
   */
  async initialize() {
    if (this.initialized) {
      return true;
    }

    if (!this.checkApiConfig()) {
      throw new Error('Google Sheets API is not configured. Please add your API_KEY and CLIENT_ID in the Settings page.');
    }

    const { apiKey, clientId } = apiConfigService.getGoogleApiCredentials();

    try {
      await new Promise((resolve, reject) => {
        gapi.load('client:auth2', {
          callback: resolve,
          onerror: reject,
        });
      });

      await gapi.client.init({
        apiKey,
        clientId,
        discoveryDocs: DISCOVERY_DOCS,
        scope: SCOPES
      });

      // Listen for sign-in state changes
      gapi.auth2.getAuthInstance().isSignedIn.listen(this.updateSigninStatus.bind(this));

      // Handle the initial sign-in state
      this.updateSigninStatus(gapi.auth2.getAuthInstance().isSignedIn.get());

      this.initialized = true;
      return true;
    } catch (error) {
      console.error('Error initializing Google Sheets API', error);
      return false;
    }
  }

  /**
   * Update the sign-in status
   * @param {boolean} isSignedIn 
   */
  updateSigninStatus(isSignedIn) {
    this.isSignedIn = isSignedIn;
  }

  /**
   * Sign in the user to Google
   */
  async signIn() {
    if (!this.initialized) {
      await this.initialize();
    }
    
    try {
      if (!this.isSignedIn) {
        await gapi.auth2.getAuthInstance().signIn();
      }
      return true;
    } catch (error) {
      console.error('Error signing in to Google', error);
      return false;
    }
  }

  /**
   * Sign out the user from Google
   */
  async signOut() {
    if (!this.initialized) {
      return false;
    }

    try {
      await gapi.auth2.getAuthInstance().signOut();
      return true;
    } catch (error) {
      console.error('Error signing out from Google', error);
      return false;
    }
  }

  /**
   * Fetch spreadsheet data
   * @param {string} spreadsheetId - The ID of the spreadsheet
   * @param {string} range - The range of cells to fetch (e.g., 'Sheet1!A1:Z1000')
   */
  async fetchSpreadsheetData(spreadsheetId, range) {
    if (!this.initialized) {
      await this.initialize();
    }

    if (!this.isSignedIn) {
      await this.signIn();
    }

    try {
      const response = await gapi.client.sheets.spreadsheets.values.get({
        spreadsheetId,
        range,
      });

      const data = response.result.values;
      if (!data || data.length === 0) {
        throw new Error('No data found in the spreadsheet');
      }

      // Convert data to JSON with headers
      const headers = data[0];
      const rows = data.slice(1);
      
      // Convert to array of objects
      this.sheetsData = rows.map(row => {
        const obj = {};
        headers.forEach((header, index) => {
          obj[header.toLowerCase().replace(/\s+/g, '_')] = row[index] || '';
        });
        return obj;
      });

      this.cachedData = [...this.sheetsData];
      
      return this.sheetsData;
    } catch (error) {
      console.error('Error fetching spreadsheet data', error);
      throw error;
    }
  }

  /**
   * Import data from a CSV file
   * @param {File} file - The CSV file to import
   * @returns {Promise<Array>} - The imported data as an array of objects
   */
  async importFromCSV(file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
          if (results.errors.length) {
            reject(results.errors);
            return;
          }
          
          // Clean up keys (lowercase and replace spaces with underscores)
          const cleanedData = results.data.map(row => {
            const cleanedRow = {};
            Object.keys(row).forEach(key => {
              const cleanKey = key.toLowerCase().replace(/\s+/g, '_');
              cleanedRow[cleanKey] = row[key];
            });
            return cleanedRow;
          });
          
          this.sheetsData = cleanedData;
          this.cachedData = [...cleanedData];
          resolve(cleanedData);
        },
        error: (error) => {
          reject(error);
        }
      });
    });
  }

  /**
   * Filter data based on criteria
   * @param {Object} criteria - Key-value pairs for filtering
   * @returns {Array} - Filtered data
   */
  filterData(criteria) {
    if (!this.sheetsData) {
      return [];
    }

    // Create a unique key for this query for caching
    const queryKey = JSON.stringify(criteria);
    
    // Return cached result if available
    if (this.cachedQueries.has(queryKey)) {
      return this.cachedQueries.get(queryKey);
    }

    // If no criteria provided, return all data
    if (!criteria || Object.keys(criteria).length === 0) {
      return this.sheetsData;
    }

    // Filter the data based on criteria
    const filteredData = this.sheetsData.filter(item => {
      return Object.entries(criteria).every(([key, value]) => {
        // Skip empty values in criteria
        if (value === '' || value === undefined || value === null) {
          return true;
        }
        
        // Convert both to lowercase for case-insensitive comparison
        const itemValue = String(item[key] || '').toLowerCase();
        const criteriaValue = String(value).toLowerCase();
        
        // Check if the item's value includes the criteria value
        return itemValue.includes(criteriaValue);
      });
    });

    // Cache the result
    this.cachedQueries.set(queryKey, filteredData);
    
    return filteredData;
  }

  /**
   * Search for leads based on job type
   * @param {string} jobType - The job type to search for
   * @returns {Array} - Matching leads
   */
  findLeadsByJobType(jobType) {
    if (!this.sheetsData) {
      return [];
    }

    // Look for relevant columns that might contain job type information
    const jobTypeColumns = ['job_type', 'position', 'role', 'title'];
    
    // Filter data to find matches
    return this.sheetsData.filter(item => {
      return jobTypeColumns.some(column => {
        if (!item[column]) return false;
        return item[column].toLowerCase().includes(jobType.toLowerCase());
      });
    });
  }

  /**
   * Search for contacts with specific skills or experience
   * @param {Array} skills - List of skills to search for
   * @returns {Array} - Matching contacts
   */
  findContactsBySkills(skills) {
    if (!this.sheetsData || !skills || skills.length === 0) {
      return [];
    }

    // Look for relevant columns that might contain skill information
    const skillColumns = ['skills', 'expertise', 'background', 'experience'];
    
    // Filter data to find matches
    return this.sheetsData.filter(item => {
      return skillColumns.some(column => {
        if (!item[column]) return false;
        
        return skills.some(skill => 
          item[column].toLowerCase().includes(skill.toLowerCase())
        );
      });
    });
  }

  /**
   * Get all available contacts with email information
   * @returns {Array} - Contacts with emails
   */
  getContactsWithEmails() {
    if (!this.sheetsData) {
      return [];
    }

    // Filter to only include entries with email addresses
    return this.sheetsData.filter(item => {
      return item.email && item.email.includes('@');
    });
  }

  /**
   * Reset cached data
   */
  resetCache() {
    this.cachedQueries.clear();
    if (this.cachedData) {
      this.sheetsData = [...this.cachedData];
    }
  }
}

// Export as a singleton
export default new GoogleSheetsService(); 