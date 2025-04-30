const { BrowserWindow } = require('electron');
const { google } = require('googleapis');
const Store = require('electron-store');

const store = new Store();

// Google OAuth2 configuration
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID || 'YOUR_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET || 'YOUR_CLIENT_SECRET';
const REDIRECT_URI = 'urn:ietf:wg:oauth:2.0:oob';

// Scopes required for reading emails
const SCOPES = [
  'https://www.googleapis.com/auth/gmail.readonly',
  'https://www.googleapis.com/auth/gmail.metadata'
];

class GmailService {
  constructor() {
    this.auth = new google.auth.OAuth2(
      GOOGLE_CLIENT_ID,
      GOOGLE_CLIENT_SECRET,
      REDIRECT_URI
    );

    // Load previously stored credentials
    const tokens = store.get('gmail_tokens');
    if (tokens) {
      this.auth.setCredentials(tokens);
    }
  }

  /**
   * Authenticate with Google using OAuth2
   * @returns {Promise<Object>} The OAuth tokens
   */
  authenticate() {
    return new Promise((resolve, reject) => {
      // Generate the authentication URL
      const authUrl = this.auth.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES,
        prompt: 'consent'
      });

      // Create a browser window for authentication
      const authWindow = new BrowserWindow({
        width: 800,
        height: 600,
        show: true,
        webPreferences: {
          nodeIntegration: false
        }
      });

      authWindow.loadURL(authUrl);
      authWindow.show();

      // Handle window close
      authWindow.on('closed', () => {
        reject(new Error('Authentication cancelled'));
      });

      // Listen for the OAuth callback
      authWindow.webContents.on('will-navigate', async (event, url) => {
        const code = this.extractCodeFromUrl(url);
        if (code) {
          authWindow.destroy();
          try {
            const { tokens } = await this.auth.getToken(code);
            this.auth.setCredentials(tokens);
            
            // Store the tokens for future use
            store.set('gmail_tokens', tokens);
            
            resolve(tokens);
          } catch (err) {
            reject(err);
          }
        }
      });

      // Also listen for redirects
      authWindow.webContents.on('will-redirect', async (event, url) => {
        const code = this.extractCodeFromUrl(url);
        if (code) {
          authWindow.destroy();
          try {
            const { tokens } = await this.auth.getToken(code);
            this.auth.setCredentials(tokens);
            
            // Store the tokens for future use
            store.set('gmail_tokens', tokens);
            
            resolve(tokens);
          } catch (err) {
            reject(err);
          }
        }
      });
    });
  }

  /**
   * Extract the authorization code from the redirect URL
   * @param {string} url - The redirect URL
   * @returns {string|null} The authorization code or null
   */
  extractCodeFromUrl(url) {
    const codeMatch = url.match(/[?&]code=([^&]+)/);
    return codeMatch ? codeMatch[1] : null;
  }

  /**
   * Check if the user is authenticated
   * @returns {boolean} True if authenticated, false otherwise
   */
  isAuthenticated() {
    const tokens = store.get('gmail_tokens');
    return !!tokens;
  }

  /**
   * Revoke authentication and clear stored tokens
   * @returns {Promise<void>}
   */
  async logout() {
    const tokens = store.get('gmail_tokens');
    if (tokens) {
      try {
        await this.auth.revokeToken(tokens.access_token);
      } catch (err) {
        console.error('Error revoking token:', err);
      }
    }
    store.delete('gmail_tokens');
  }

  /**
   * Search for job application emails
   * @returns {Promise<Array>} Array of email messages
   */
  async findJobApplicationEmails() {
    if (!this.isAuthenticated()) {
      throw new Error('Not authenticated');
    }

    const gmail = google.gmail({ version: 'v1', auth: this.auth });
    
    // Search for emails with subject containing "application" or "thank you for applying"
    const query = 'subject:(application OR "thank you" OR "applying" OR "application received" OR "your application")';
    
    try {
      const response = await gmail.users.messages.list({
        userId: 'me',
        q: query,
        maxResults: 100
      });

      const messages = response.data.messages || [];
      
      // If no messages found, return empty array
      if (messages.length === 0) {
        return [];
      }
      
      // Get details for each message
      const emailDetails = await Promise.all(
        messages.map(async (message) => {
          const details = await gmail.users.messages.get({
            userId: 'me',
            id: message.id,
            format: 'metadata',
            metadataHeaders: ['Subject', 'From', 'Date']
          });
          
          // Extract headers
          const headers = details.data.payload.headers;
          const subject = headers.find(h => h.name === 'Subject')?.value || '';
          const from = headers.find(h => h.name === 'From')?.value || '';
          const date = headers.find(h => h.name === 'Date')?.value || '';
          
          return {
            id: message.id,
            threadId: message.threadId,
            subject,
            from,
            date: new Date(date),
            snippet: details.data.snippet
          };
        })
      );
      
      return emailDetails;
    } catch (error) {
      console.error('Error fetching emails:', error);
      throw error;
    }
  }
}

// Export a singleton instance
const gmailService = new GmailService();
module.exports = gmailService; 