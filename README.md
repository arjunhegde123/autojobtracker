# Auto Job Tracker

An application for tracking job applications, generating leads, and managing your job search process effectively. This project was created as part of an independent study project to explore tools for improving career management.

## Features

- **Email Integration**: Automatically parse job applications from Gmail
- **Application Tracking**: Keep track of your job applications, statuses, and timelines
- **Notifications**: Get reminders for follow-ups and application updates
- **Lead Generation**: Find alumni and other connections at companies you've applied to
- **Contact Management**: Build a network of professional contacts

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm (v7 or higher)

### Installation

1. Clone the repository:
```bash
git clone https://github.com/arjunhegde123/autojobtracker.git
cd autojobtracker
```

2. Install dependencies:
```bash
npm install
```

3. Create a Google Cloud Project for Gmail API access:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project
   - Enable the Gmail API
   - Create OAuth 2.0 credentials (Desktop app)
   - Download the credentials as `client_secrets.json`

4. Update your Gmail credentials in `src/services/gmail.js`:
```javascript
// Update these values with your actual credentials
const GOOGLE_CLIENT_ID = 'YOUR_CLIENT_ID';
const GOOGLE_CLIENT_SECRET = 'YOUR_CLIENT_SECRET';
```

### Running the Application

1. Start the webpack development server:
```bash
npm run watch
```

2. In a separate terminal, start the Electron app:
```bash
npm run dev
```

### Building for Production

To build the application for production use:

```bash
npm run build
```

This will create executables for your platform in the `dist` directory.

## Project Structure

```
autojobtracker/
├── src/                  # Source files
│   ├── main.js           # Electron main process
│   ├── index.html        # HTML entry point
│   ├── renderer/         # React frontend code
│   │   ├── components/   # React components
│   │   ├── App.jsx       # Main React component
│   │   └── index.js      # React entry point
│   └── services/         # Backend services
│       ├── gmail.js      # Gmail integration
│       ├── applicationStore.js # Application storage
│       └── leadGeneration.js # Lead generation service
├── build/                # Compiled files
├── dist/                 # Distributable files
├── package.json          # Dependencies and scripts
└── webpack.config.js     # Webpack configuration
```

## Development Roadmap

- [x] Basic application framework
- [x] UI components
- [ ] Gmail API integration
- [ ] Email parsing for job applications
- [ ] Application data storage
- [ ] Lead generation from contacts
- [ ] Notifications system
- [ ] Settings management
- [ ] Data import/export

## Contributing

Contributions are welcome! This is an ongoing project, and we appreciate any feedback or improvements.

## License

This project is the property of Arjun Hegde.

# autojobtracker
Software That Scrapes Your Emails to Track Your Job Applications

# license
Creative Commons Attribution-NonCommercial-NoDerivatives 4.0 International Public License

You are free to:
- View and download the code.

Under the following terms:
- Attribution: You must give appropriate credit.
- NonCommercial: You may not use the code for commercial purposes.
- NoDerivatives: You may not distribute modified versions of the code.

Full terms of this license can be found at:
https://creativecommons.org/licenses/by-nc-nd/4.0/legalcode


