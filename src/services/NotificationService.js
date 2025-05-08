import { ipcRenderer } from 'electron';

class NotificationService {
    constructor() {
        this.checkInterval = 1000 * 60 * 60; // Check every hour
        this.lastCheck = null;
    }

    async startNotificationService() {
        // Initial check
        await this.checkForUpdates();
        
        // Set up periodic checks
        setInterval(async () => {
            await this.checkForUpdates();
        }, this.checkInterval);
    }

    async checkForUpdates() {
        try {
            const response = await fetch('/api/applications');
            const applications = await response.json();
            
            // Filter applications that need attention
            const needsAttention = applications.filter(app => {
                const lastUpdated = new Date(app.last_updated);
                const now = new Date();
                const daysSinceUpdate = (now - lastUpdated) / (1000 * 60 * 60 * 24);
                
                // Notify if:
                // 1. Status is "Interview" and it's been more than 3 days
                // 2. Status is "Offer" and it's been more than 2 days
                // 3. Status is "Applied" and it's been more than 7 days
                if (app.status === 'Interview' && daysSinceUpdate > 3) {
                    return true;
                }
                if (app.status === 'Offer' && daysSinceUpdate > 2) {
                    return true;
                }
                if (app.status === 'Applied' && daysSinceUpdate > 7) {
                    return true;
                }
                return false;
            });

            // Send notifications for applications that need attention
            needsAttention.forEach(app => {
                this.sendNotification(app);
            });

            this.lastCheck = new Date();
        } catch (error) {
            console.error('Error checking for updates:', error);
        }
    }

    sendNotification(application) {
        let message = '';
        switch (application.status) {
            case 'Interview':
                message = `Follow up needed for interview at ${application.company}`;
                break;
            case 'Offer':
                message = `Don't forget to respond to the offer from ${application.company}`;
                break;
            case 'Applied':
                message = `Consider following up on your application at ${application.company}`;
                break;
            default:
                return;
        }

        // Send notification through Electron
        ipcRenderer.send('show-notification', {
            title: 'Application Update Needed',
            body: message
        });
    }
}

export default new NotificationService(); 