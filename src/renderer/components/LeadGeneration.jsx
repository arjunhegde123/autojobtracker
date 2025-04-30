import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Button,
  TextField,
  Grid,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Tabs,
  Tab,
  IconButton,
  Chip,
  CircularProgress
} from '@mui/material';
import PersonIcon from '@mui/icons-material/Person';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import SchoolIcon from '@mui/icons-material/School';
import BusinessIcon from '@mui/icons-material/Business';
import SearchIcon from '@mui/icons-material/Search';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import LaunchIcon from '@mui/icons-material/Launch';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import AddIcon from '@mui/icons-material/Add';

// Mock data for contacts
const mockContacts = [
  {
    id: 'contact_1',
    name: 'John Smith',
    email: 'john.smith@google.com',
    company: 'Google',
    role: 'Software Engineer',
    notes: 'Met at a conference last year',
    source: 'manual',
    createdAt: '2023-01-15T10:30:00.000Z',
    updatedAt: '2023-01-15T10:30:00.000Z'
  },
  {
    id: 'contact_2',
    name: 'Jane Doe',
    email: 'jane.doe@apple.com',
    company: 'Apple',
    role: 'Product Manager',
    notes: 'University alumni',
    source: 'linkedin',
    createdAt: '2023-02-10T14:45:00.000Z',
    updatedAt: '2023-02-10T14:45:00.000Z'
  },
  {
    id: 'contact_3',
    name: 'Mike Johnson',
    email: 'mike.johnson@amazon.com',
    company: 'Amazon',
    role: 'Senior Developer',
    notes: 'Former colleague',
    source: 'manual',
    createdAt: '2023-03-05T09:15:00.000Z',
    updatedAt: '2023-03-05T09:15:00.000Z'
  }
];

// Mock suggestions for lead generation
const mockSuggestions = [
  {
    id: 'suggestion_1',
    type: 'linkedin_search',
    description: 'Search for connections at Google on LinkedIn',
    action: 'search',
    query: 'Google employees'
  },
  {
    id: 'suggestion_2',
    type: 'alumni_search',
    description: 'Look for alumni working at Amazon',
    action: 'search',
    query: 'university alumni Amazon'
  },
  {
    id: 'suggestion_3',
    type: 'follow_up',
    description: 'Send a follow-up email regarding your Software Engineer application',
    action: 'compose',
    template: 'follow_up_template',
    company: 'Google',
    position: 'Software Engineer'
  }
];

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`lead-tabpanel-${index}`}
      aria-labelledby={`lead-tab-${index}`}
      {...other}
      style={{ paddingTop: 16 }}
    >
      {value === index && (
        <Box>
          {children}
        </Box>
      )}
    </div>
  );
}

const LeadGeneration = () => {
  const [tabValue, setTabValue] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredContacts, setFilteredContacts] = useState([]);

  useEffect(() => {
    // Simulate loading data from service
    setTimeout(() => {
      setContacts(mockContacts);
      setSuggestions(mockSuggestions);
      setFilteredContacts(mockContacts);
      setLoading(false);
    }, 800);
  }, []);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredContacts(contacts);
    } else {
      const query = searchQuery.toLowerCase();
      setFilteredContacts(
        contacts.filter(
          contact =>
            contact.name.toLowerCase().includes(query) ||
            contact.email.toLowerCase().includes(query) ||
            contact.company.toLowerCase().includes(query) ||
            contact.role.toLowerCase().includes(query) ||
            (contact.notes && contact.notes.toLowerCase().includes(query))
        )
      );
    }
  }, [searchQuery, contacts]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleImportContacts = () => {
    // Would trigger the contact import functionality
    console.log('Import contacts');
  };

  const handleSuggestionAction = (suggestion) => {
    console.log('Suggestion action:', suggestion);
    // Would perform the appropriate action based on suggestion type
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Lead Generation
      </Typography>

      <Tabs value={tabValue} onChange={handleTabChange} aria-label="lead generation tabs" sx={{ mb: 2 }}>
        <Tab label="Suggestions" />
        <Tab label="Contacts" />
        <Tab label="Import" />
      </Tabs>

      <TabPanel value={tabValue} index={0}>
        <Typography variant="h6" gutterBottom>
          Recommended Actions
        </Typography>
        <Grid container spacing={3}>
          {suggestions.map((suggestion) => (
            <Grid item xs={12} md={6} key={suggestion.id}>
              <Card>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ mr: 2, bgcolor: 
                      suggestion.type === 'linkedin_search' ? 'primary.main' : 
                      suggestion.type === 'alumni_search' ? 'success.main' : 'warning.main' 
                    }}>
                      {suggestion.type === 'linkedin_search' ? <LinkedInIcon /> : 
                       suggestion.type === 'alumni_search' ? <SchoolIcon /> : <MailOutlineIcon />}
                    </Avatar>
                    <Typography variant="h6" component="div">
                      {suggestion.type === 'linkedin_search' ? 'LinkedIn Search' : 
                       suggestion.type === 'alumni_search' ? 'Alumni Network' : 'Follow-Up Reminder'}
                    </Typography>
                  </Box>
                  <Typography variant="body1" sx={{ mb: 2 }}>
                    {suggestion.description}
                  </Typography>
                  {suggestion.company && (
                    <Chip 
                      icon={<BusinessIcon />} 
                      label={suggestion.company} 
                      size="small" 
                      sx={{ mr: 1, mb: 1 }} 
                    />
                  )}
                </CardContent>
                <CardActions>
                  <Button 
                    size="small" 
                    variant="contained"
                    startIcon={suggestion.action === 'search' ? <SearchIcon /> : <MailOutlineIcon />}
                    onClick={() => handleSuggestionAction(suggestion)}
                  >
                    {suggestion.action === 'search' ? 'Search Now' : 'Compose Email'}
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>
      </TabPanel>

      <TabPanel value={tabValue} index={1}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
          <TextField
            label="Search Contacts"
            variant="outlined"
            size="small"
            value={searchQuery}
            onChange={handleSearchChange}
            sx={{ width: 300 }}
          />
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => console.log('Add contact')}
          >
            Add Contact
          </Button>
        </Box>

        <Paper elevation={2}>
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {filteredContacts.length > 0 ? (
              filteredContacts.map((contact, index) => (
                <React.Fragment key={contact.id}>
                  <ListItem
                    alignItems="flex-start"
                    secondaryAction={
                      <Box>
                        <IconButton 
                          aria-label="send email" 
                          sx={{ mr: 1 }}
                          onClick={() => console.log('Send email to', contact.email)}
                        >
                          <MailOutlineIcon />
                        </IconButton>
                        <IconButton 
                          aria-label="view profile"
                          onClick={() => console.log('View profile for', contact.id)}
                        >
                          <LaunchIcon />
                        </IconButton>
                      </Box>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar>
                        <PersonIcon />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={contact.name}
                      secondary={
                        <>
                          <Typography
                            sx={{ display: 'block' }}
                            component="span"
                            variant="body2"
                            color="text.primary"
                          >
                            {contact.email}
                          </Typography>
                          <Typography
                            sx={{ display: 'block' }}
                            component="span"
                            variant="body2"
                            color="text.secondary"
                          >
                            {contact.company} - {contact.role}
                          </Typography>
                          {contact.notes && (
                            <Typography
                              component="span"
                              variant="body2"
                              color="text.secondary"
                            >
                              {contact.notes}
                            </Typography>
                          )}
                        </>
                      }
                    />
                  </ListItem>
                  {index < filteredContacts.length - 1 && (
                    <Divider variant="inset" component="li" />
                  )}
                </React.Fragment>
              ))
            ) : (
              <ListItem>
                <ListItemText
                  primary="No contacts found"
                  secondary="Try a different search term or add new contacts"
                />
              </ListItem>
            )}
          </List>
        </Paper>
      </TabPanel>

      <TabPanel value={tabValue} index={2}>
        <Typography variant="h6" gutterBottom>
          Import Contacts
        </Typography>
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              CSV Import
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Import contacts from a CSV file. The file should have columns for name, email, company, role, and notes.
            </Typography>
            <Button
              variant="contained"
              component="label"
              startIcon={<UploadFileIcon />}
            >
              Upload CSV File
              <input
                type="file"
                accept=".csv"
                hidden
                onChange={handleImportContacts}
              />
            </Button>
          </CardContent>
        </Card>
        
        <Card sx={{ mb: 3 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              LinkedIn Integration
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Connect your LinkedIn account to import contacts and get better networking suggestions.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<LinkedInIcon />}
              onClick={() => console.log('Connect LinkedIn')}
            >
              Connect LinkedIn
            </Button>
          </CardContent>
        </Card>
        
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Google Sheet Import
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Import contacts from a Google Sheet. The sheet should have columns for name, email, company, role, and notes.
            </Typography>
            <Button
              variant="outlined"
              startIcon={<UploadFileIcon />}
              onClick={() => console.log('Connect Google Sheet')}
            >
              Connect Google Sheet
            </Button>
          </CardContent>
        </Card>
      </TabPanel>
    </Box>
  );
};

export default LeadGeneration; 