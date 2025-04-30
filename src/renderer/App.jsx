import React, { useState } from 'react';
import { 
  Box, 
  Container,
  Typography,
  Button,
  Paper,
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Grid
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';

// Import components
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import LeadGeneration from './components/LeadGeneration';
import Settings from './components/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const drawerWidth = 240;

  const handleGmailAuth = async () => {
    // TODO: Implement Gmail authentication
    console.log('Gmail auth clicked');
    // For development purposes, simulate successful authentication
    setIsAuthenticated(true);
  };

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard />;
      case 'notifications':
        return <Notifications />;
      case 'leads':
        return <LeadGeneration />;
      case 'settings':
        return <Settings />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <WorkIcon sx={{ mr: 2 }} />
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Auto Job Tracker
          </Typography>
        </Toolbar>
      </AppBar>

      {!isAuthenticated ? (
        <Container component="main" sx={{ mt: 10, mb: 4, flex: 1 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 4, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center' 
            }}
          >
            <EmailIcon sx={{ fontSize: 60, mb: 2, color: 'primary.main' }} />
            <Typography variant="h5" gutterBottom>
              Welcome to Auto Job Tracker
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, textAlign: 'center' }}>
              Connect your email account to start tracking your job applications automatically
            </Typography>
            <Grid container spacing={2} justifyContent="center">
              <Grid item>
                <Button
                  variant="contained"
                  startIcon={<EmailIcon />}
                  onClick={handleGmailAuth}
                  size="large"
                >
                  Connect Gmail
                </Button>
              </Grid>
              <Grid item>
                <Button
                  variant="outlined"
                  startIcon={<EmailIcon />}
                  onClick={() => console.log('Outlook auth clicked')}
                  size="large"
                >
                  Connect Outlook
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      ) : (
        <Box sx={{ display: 'flex', flex: 1 }}>
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box', mt: 8 },
            }}
          >
            <Box sx={{ overflow: 'auto' }}>
              <List>
                <ListItem button selected={activePage === 'dashboard'} onClick={() => setActivePage('dashboard')}>
                  <ListItemIcon>
                    <DashboardIcon />
                  </ListItemIcon>
                  <ListItemText primary="Dashboard" />
                </ListItem>
                <ListItem button selected={activePage === 'notifications'} onClick={() => setActivePage('notifications')}>
                  <ListItemIcon>
                    <NotificationsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Notifications" />
                </ListItem>
                <ListItem button selected={activePage === 'leads'} onClick={() => setActivePage('leads')}>
                  <ListItemIcon>
                    <PeopleIcon />
                  </ListItemIcon>
                  <ListItemText primary="Lead Generation" />
                </ListItem>
              </List>
              <Divider />
              <List>
                <ListItem button selected={activePage === 'settings'} onClick={() => setActivePage('settings')}>
                  <ListItemIcon>
                    <SettingsIcon />
                  </ListItemIcon>
                  <ListItemText primary="Settings" />
                </ListItem>
              </List>
            </Box>
          </Drawer>
          <Box component="main" sx={{ flexGrow: 1, p: 3, mt: 8 }}>
            {renderPage()}
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App; 