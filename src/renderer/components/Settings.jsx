import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  Divider,
  Switch,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  TextField,
  Button,
  Card,
  CardContent,
  CardActions,
  Grid,
  Alert,
  Snackbar
} from '@mui/material';
import SaveIcon from '@mui/icons-material/Save';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock settings
const mockSettings = {
  notifications: {
    enabled: true,
    emailNotifications: false,
    followUpReminders: true,
    reminderDays: [7, 14, 30]
  },
  emailSync: {
    syncFrequency: 'daily',
    syncOnStartup: true,
    gmailFilter: 'subject:(application OR "thank you" OR "applying" OR "application received")'
  },
  appearance: {
    theme: 'light',
    dashboardLayout: 'default'
  },
  dataManagement: {
    autoBackup: false,
    backupFrequency: 'weekly'
  }
};

const Settings = () => {
  const [settings, setSettings] = useState(mockSettings);
  const [savedAlert, setSavedAlert] = useState(false);
  
  const handleSwitchChange = (section, key) => (event) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: event.target.checked
      }
    });
  };
  
  const handleSelectChange = (section, key) => (event) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: event.target.value
      }
    });
  };
  
  const handleTextChange = (section, key) => (event) => {
    setSettings({
      ...settings,
      [section]: {
        ...settings[section],
        [key]: event.target.value
      }
    });
  };
  
  const handleSaveSettings = () => {
    // In a real app, this would save to the electron-store
    console.log('Saving settings:', settings);
    setSavedAlert(true);
  };
  
  const handleClearData = () => {
    if (window.confirm('Are you sure you want to reset all application data? This cannot be undone.')) {
      console.log('Clearing all application data');
      // Would clear all application data in real app
    }
  };
  
  const handleAlertClose = () => {
    setSavedAlert(false);
  };
  
  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Settings
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ mb: 3 }}>
            <List>
              <ListItem>
                <Typography variant="h6">Notifications</Typography>
              </ListItem>
              <Divider />
              
              <ListItem>
                <ListItemText 
                  primary="Enable Notifications" 
                  secondary="Show notifications for application updates and reminders"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.notifications.enabled}
                    onChange={handleSwitchChange('notifications', 'enabled')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Email Notifications" 
                  secondary="Receive notifications via email"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.notifications.emailNotifications}
                    onChange={handleSwitchChange('notifications', 'emailNotifications')}
                    disabled={!settings.notifications.enabled}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Follow-up Reminders" 
                  secondary="Receive reminders to follow up on applications"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.notifications.followUpReminders}
                    onChange={handleSwitchChange('notifications', 'followUpReminders')}
                    disabled={!settings.notifications.enabled}
                  />
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
          
          <Paper>
            <List>
              <ListItem>
                <Typography variant="h6">Email Integration</Typography>
              </ListItem>
              <Divider />
              
              <ListItem>
                <ListItemText primary="Sync Frequency" />
                <ListItemSecondaryAction>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Select
                      value={settings.emailSync.syncFrequency}
                      onChange={handleSelectChange('emailSync', 'syncFrequency')}
                    >
                      <MenuItem value="hourly">Hourly</MenuItem>
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="manual">Manual</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText 
                  primary="Sync on Startup" 
                  secondary="Automatically sync when app launches"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.emailSync.syncOnStartup}
                    onChange={handleSwitchChange('emailSync', 'syncOnStartup')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <Box sx={{ width: '100%' }}>
                  <ListItemText 
                    primary="Gmail Filter" 
                    secondary="Custom search query for finding job applications"
                  />
                  <TextField
                    fullWidth
                    variant="outlined"
                    size="small"
                    margin="dense"
                    value={settings.emailSync.gmailFilter}
                    onChange={handleTextChange('emailSync', 'gmailFilter')}
                  />
                </Box>
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ mb: 3 }}>
            <List>
              <ListItem>
                <Typography variant="h6">Appearance</Typography>
              </ListItem>
              <Divider />
              
              <ListItem>
                <ListItemText primary="Theme" />
                <ListItemSecondaryAction>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Select
                      value={settings.appearance.theme}
                      onChange={handleSelectChange('appearance', 'theme')}
                    >
                      <MenuItem value="light">Light</MenuItem>
                      <MenuItem value="dark">Dark</MenuItem>
                      <MenuItem value="system">System Default</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText primary="Dashboard Layout" />
                <ListItemSecondaryAction>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Select
                      value={settings.appearance.dashboardLayout}
                      onChange={handleSelectChange('appearance', 'dashboardLayout')}
                    >
                      <MenuItem value="default">Default</MenuItem>
                      <MenuItem value="compact">Compact</MenuItem>
                      <MenuItem value="expanded">Expanded</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
          
          <Paper sx={{ mb: 3 }}>
            <List>
              <ListItem>
                <Typography variant="h6">Data Management</Typography>
              </ListItem>
              <Divider />
              
              <ListItem>
                <ListItemText 
                  primary="Automatic Backup" 
                  secondary="Periodically backup your data"
                />
                <ListItemSecondaryAction>
                  <Switch
                    edge="end"
                    checked={settings.dataManagement.autoBackup}
                    onChange={handleSwitchChange('dataManagement', 'autoBackup')}
                  />
                </ListItemSecondaryAction>
              </ListItem>
              
              <ListItem>
                <ListItemText primary="Backup Frequency" />
                <ListItemSecondaryAction>
                  <FormControl variant="standard" sx={{ minWidth: 120 }}>
                    <Select
                      value={settings.dataManagement.backupFrequency}
                      onChange={handleSelectChange('dataManagement', 'backupFrequency')}
                      disabled={!settings.dataManagement.autoBackup}
                    >
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  </FormControl>
                </ListItemSecondaryAction>
              </ListItem>
            </List>
          </Paper>
          
          <Card sx={{ bgcolor: 'background.default' }}>
            <CardContent>
              <Typography variant="h6" color="error" gutterBottom>
                Danger Zone
              </Typography>
              <Typography variant="body2" sx={{ mb: 2 }}>
                These actions cannot be undone. Please be certain before proceeding.
              </Typography>
              <Button 
                variant="outlined" 
                color="error"
                startIcon={<DeleteIcon />}
                onClick={handleClearData}
              >
                Reset Application Data
              </Button>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          startIcon={<SaveIcon />}
          onClick={handleSaveSettings}
          size="large"
        >
          Save Settings
        </Button>
      </Box>
      
      <Snackbar
        open={savedAlert}
        autoHideDuration={4000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
          Settings saved successfully
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings; 