/**
 * API Configuration Service
 * Handles storage and retrieval of API credentials
 */

// Would use Electron's Store in a real app
const storage = window.localStorage;
const STORAGE_KEY = 'autojobtracker_api_config';

class ApiConfigService {
  constructor() {
    this.config = {
      googleApi: {
        apiKey: '',
        clientId: ''
      }
    };
    this.loadConfig();
  }

  /**
   * Load configuration from storage
   */
  loadConfig() {
    try {
      const storedConfig = storage.getItem(STORAGE_KEY);
      if (storedConfig) {
        this.config = JSON.parse(storedConfig);
      }
    } catch (error) {
      console.error('Error loading API configuration', error);
    }
    return this.config;
  }

  /**
   * Save configuration to storage
   * @param {Object} config - The configuration to save
   */
  saveConfig(config) {
    try {
      this.config = config;
      storage.setItem(STORAGE_KEY, JSON.stringify(config));
      return true;
    } catch (error) {
      console.error('Error saving API configuration', error);
      return false;
    }
  }

  /**
   * Get Google API credentials
   * @returns {Object} - Google API credentials
   */
  getGoogleApiCredentials() {
    return this.config.googleApi || { apiKey: '', clientId: '' };
  }

  /**
   * Save Google API credentials
   * @param {string} apiKey - The Google API key
   * @param {string} clientId - The Google Client ID
   * @returns {boolean} - Whether the save was successful
   */
  saveGoogleApiCredentials(apiKey, clientId) {
    this.config.googleApi = { apiKey, clientId };
    return this.saveConfig(this.config);
  }
}

// Export as a singleton
export default new ApiConfigService(); 