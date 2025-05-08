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
  CircularProgress,
  Alert,
  Snackbar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  InputAdornment,
  alpha,
  useTheme,
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
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import FilterListIcon from '@mui/icons-material/FilterList';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import DeleteIcon from '@mui/icons-material/Delete';
import GoogleIcon from '@mui/icons-material/Google';

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

// Import our sheets service
import sheetsService from '../../services/sheetsService';

// Mock leads data for initial testing
const mockLeads = [
  {
    id: 'lead_1',
    name: 'John Smith',
    company: 'Google',
    position: 'Technical Recruiter',
    email: 'john.smith@example.com',
    phone: '(555) 123-4567',
    specialty: 'Software Engineering',
    notes: 'Met at career fair, open to discussing opportunities'
  },
  {
    id: 'lead_2',
    name: 'Sara Johnson',
    company: 'Microsoft',
    position: 'HR Manager',
    email: 'sara.j@example.com',
    phone: '(555) 987-6543',
    specialty: 'Product Management',
    notes: 'Connection through LinkedIn, interested in expanding PM team'
  },
  {
    id: 'lead_3',
    name: 'Michael Brown',
    company: 'Amazon',
    position: 'Talent Acquisition',
    email: 'mbrown@example.com',
    phone: '(555) 456-7890',
    specialty: 'Data Science',
    notes: 'Active recruiter for technical roles'
  }
];

const LeadGeneration = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [contacts, setContacts] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const [filteredContacts, setFilteredContacts] = useState([]);
  const [leads, setLeads] = useState([]);
  const [showImportDialog, setShowImportDialog] = useState(false);
  const [importMethod, setImportMethod] = useState('sheets');
  const [spreadsheetId, setSpreadsheetId] = useState('');
  const [spreadsheetRange, setSpreadsheetRange] = useState('Sheet1!A1:Z1000');
  const [alert, setAlert] = useState({ open: false, message: '', severity: 'info' });
  const [selectedFile, setSelectedFile] = useState(null);

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

  // Load initial data
  useEffect(() => {
    setLeads(mockLeads);
  }, []);
  
  // Filter leads based on search term and job type
  const filteredLeads = leads.filter(lead => {
    const matchesSearch = searchQuery === '' || 
      Object.values(lead).some(value => 
        typeof value === 'string' && value.toLowerCase().includes(searchQuery.toLowerCase())
      );
    
    const matchesJobType = filterJobType === '' || 
      (lead.specialty && lead.specialty.toLowerCase().includes(filterJobType.toLowerCase()));
    
    return matchesSearch && matchesJobType;
  });

  // Handle Google Sheets import
  const handleImportFromSheets = async () => {
    if (!spreadsheetId) {
      setAlert({
        open: true,
        message: 'Please enter a spreadsheet ID',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      // First check if API is configured
      if (!sheetsService.checkApiConfig()) {
        setAlert({
          open: true,
          message: 'Google Sheets API is not configured. Please add your API Key and Client ID in the Settings page.',
          severity: 'error'
        });
        setLoading(false);
        return;
      }
      
      await sheetsService.initialize();
      const data = await sheetsService.fetchSpreadsheetData(spreadsheetId, spreadsheetRange);
      
      setLeads(data);
      setShowImportDialog(false);
      setAlert({
        open: true,
        message: `Successfully imported ${data.length} leads`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error importing from Google Sheets:', error);
      setAlert({
        open: true,
        message: `Error importing: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle CSV file import
  const handleImportFromCSV = async () => {
    if (!selectedFile) {
      setAlert({
        open: true,
        message: 'Please select a CSV file',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const data = await sheetsService.importFromCSV(selectedFile);
      
      setLeads(data);
      setShowImportDialog(false);
      setAlert({
        open: true,
        message: `Successfully imported ${data.length} leads`,
        severity: 'success'
      });
    } catch (error) {
      console.error('Error importing from CSV:', error);
      setAlert({
        open: true,
        message: `Error importing: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Handle file selection for CSV import
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  // Copy email to clipboard
  const handleCopyEmail = (email) => {
    navigator.clipboard.writeText(email);
    setAlert({
      open: true,
      message: 'Email copied to clipboard',
      severity: 'success'
    });
  };

  // Find leads by job type
  const handleFindLeadsByJobType = () => {
    if (!filterJobType) {
      setAlert({
        open: true,
        message: 'Please enter a job type to search for',
        severity: 'error'
      });
      return;
    }
    
    setLoading(true);
    
    try {
      const results = sheetsService.findLeadsByJobType(filterJobType);
      
      if (results.length === 0) {
        setAlert({
          open: true,
          message: `No leads found for "${filterJobType}"`,
          severity: 'info'
        });
      } else {
        setLeads(results);
        setAlert({
          open: true,
          message: `Found ${results.length} leads for "${filterJobType}"`,
          severity: 'success'
        });
      }
    } catch (error) {
      console.error('Error finding leads by job type:', error);
      setAlert({
        open: true,
        message: `Error searching: ${error.message}`,
        severity: 'error'
      });
    } finally {
      setLoading(false);
    }
  };

  // Close alert
  const handleCloseAlert = () => {
    setAlert({ ...alert, open: false });
  };

  // Import dialog content
  const renderImportDialog = () => {
    return (
      <Dialog open={showImportDialog} onClose={() => setShowImportDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Import Leads</DialogTitle>
        <DialogContent>
          <Box sx={{ mb: 2 }}>
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel id="import-method-label">Import Method</InputLabel>
              <Select
                labelId="import-method-label"
                value={importMethod}
                label="Import Method"
                onChange={(e) => setImportMethod(e.target.value)}
              >
                <MenuItem value="sheets">Google Sheets</MenuItem>
                <MenuItem value="csv">CSV File</MenuItem>
              </Select>
            </FormControl>
            
            {importMethod === 'sheets' ? (
              <Box>
                <TextField
                  fullWidth
                  margin="dense"
                  label="Spreadsheet ID"
                  variant="outlined"
                  value={spreadsheetId}
                  onChange={(e) => setSpreadsheetId(e.target.value)}
                  placeholder="Enter the Google Sheets ID from the URL"
                  helperText="Example: 1BxiMVs0XRA5nFMdKvBdBZjgmUUqptlbs74OgvE2upms"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  margin="dense"
                  label="Range"
                  variant="outlined"
                  value={spreadsheetRange}
                  onChange={(e) => setSpreadsheetRange(e.target.value)}
                  placeholder="Sheet name and range, e.g. Sheet1!A1:Z1000"
                />
              </Box>
            ) : (
              <Box sx={{ 
                border: '1px dashed',
                borderColor: 'divider',
                borderRadius: 1,
                p: 3,
                textAlign: 'center'
              }}>
                <input
                  accept=".csv"
                  id="csv-upload"
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }}
                />
                <label htmlFor="csv-upload">
                  <Button
                    component="span"
                    variant="outlined"
                    startIcon={<CloudUploadIcon />}
                  >
                    Select CSV File
                  </Button>
                </label>
                {selectedFile && (
                  <Typography variant="body2" sx={{ mt: 2 }}>
                    Selected: {selectedFile.name}
                  </Typography>
                )}
              </Box>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowImportDialog(false)}>Cancel</Button>
          <Button 
            onClick={importMethod === 'sheets' ? handleImportFromSheets : handleImportFromCSV}
            variant="contained"
            disabled={loading}
          >
            {loading ? <CircularProgress size={24} /> : 'Import'}
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  if (loading && leads.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
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

      {/* Import Dialog */}
      {renderImportDialog()}
      
      {/* Alerts */}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleCloseAlert} severity={alert.severity} sx={{ width: '100%' }}>
          {alert.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default LeadGeneration; 