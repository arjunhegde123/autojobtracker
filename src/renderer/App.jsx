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
  alpha,
  Avatar,
  IconButton,
  useTheme,
  Tooltip
} from '@mui/material';
import WorkOutlineIcon from '@mui/icons-material/WorkOutline';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import MenuIcon from '@mui/icons-material/Menu';

// Import theme context
import { useThemeMode } from './ThemeContext';

// Import components
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import LeadGeneration from './components/LeadGeneration';
import Settings from './components/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileDrawerOpen, setIsMobileDrawerOpen] = useState(false);
  const theme = useTheme();
  const { mode } = useThemeMode();
  const isDarkMode = mode === 'dark';
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

  const toggleMobileDrawer = () => {
    setIsMobileDrawerOpen(!isMobileDrawerOpen);
  };

  const DrawerContent = () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      <Box sx={{ px: 2, py: 2, display: 'flex', alignItems: 'center' }}>
        <WorkOutlineIcon sx={{ color: 'primary.main', fontSize: 28, mr: 1.5 }} />
        <Typography variant="h6" color="text.primary" sx={{ fontWeight: 600 }}>
          Auto Job Tracker
        </Typography>
      </Box>
      <Divider />
      <List sx={{ py: 2, px: 1, flex: 1 }}>
        <ListItem 
          button 
          selected={activePage === 'dashboard'} 
          onClick={() => setActivePage('dashboard')}
          sx={{ 
            borderRadius: 2, 
            mb: 1,
            '&.Mui-selected': {
              backgroundColor: 'primary.light',
              color: 'primary.main',
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.light, 0.7),
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <DashboardOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Dashboard" primaryTypographyProps={{ fontSize: '0.9rem' }} />
        </ListItem>
        
        <ListItem 
          button 
          selected={activePage === 'notifications'} 
          onClick={() => setActivePage('notifications')}
          sx={{ 
            borderRadius: 2, 
            mb: 1,
            '&.Mui-selected': {
              backgroundColor: 'primary.light',
              color: 'primary.main',
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.light, 0.7),
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <NotificationsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Notifications" primaryTypographyProps={{ fontSize: '0.9rem' }} />
        </ListItem>
        
        <ListItem 
          button 
          selected={activePage === 'leads'} 
          onClick={() => setActivePage('leads')}
          sx={{ 
            borderRadius: 2, 
            mb: 1,
            '&.Mui-selected': {
              backgroundColor: 'primary.light',
              color: 'primary.main',
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.light, 0.7),
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <PeopleOutlineIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Lead Generation" primaryTypographyProps={{ fontSize: '0.9rem' }} />
        </ListItem>
      </List>
      
      <Divider />
      
      <List sx={{ py: 2, px: 1 }}>
        <ListItem 
          button 
          selected={activePage === 'settings'} 
          onClick={() => setActivePage('settings')}
          sx={{ 
            borderRadius: 2,
            '&.Mui-selected': {
              backgroundColor: 'primary.light',
              color: 'primary.main',
              '& .MuiListItemIcon-root': {
                color: 'primary.main',
              },
            },
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.light, 0.7),
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 40 }}>
            <SettingsOutlinedIcon fontSize="small" />
          </ListItemIcon>
          <ListItemText primary="Settings" primaryTypographyProps={{ fontSize: '0.9rem' }} />
        </ListItem>
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      {!isAuthenticated ? (
        <Container component="main" maxWidth="sm" sx={{ mt: 10, mb: 4, flex: 1 }}>
          <Paper 
            elevation={3} 
            sx={{ 
              p: 5, 
              display: 'flex', 
              flexDirection: 'column', 
              alignItems: 'center',
              borderRadius: 3,
              background: isDarkMode 
                ? 'linear-gradient(145deg, #1E293B, #182334)'
                : 'linear-gradient(145deg, #ffffff, #f9fafb)',
            }}
          >
            <Box 
              sx={{ 
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'primary.light',
                mb: 3
              }}
            >
              <WorkOutlineIcon sx={{ fontSize: 40, color: 'primary.main' }} />
            </Box>
            <Typography variant="h4" gutterBottom fontWeight={700} align="center">
              Auto Job Tracker
            </Typography>
            <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', color: 'text.secondary' }}>
              Connect your email account to track job applications automatically
            </Typography>
            <Box sx={{ width: '100%', display: 'flex', flexDirection: 'column', gap: 2 }}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                startIcon={<img src="https://img.icons8.com/color/48/000000/google-logo.png" width="20" height="20" />}
                onClick={handleGmailAuth}
                sx={{ 
                  py: 1.5,
                  fontWeight: 600,
                  boxShadow: '0px 4px 8px rgba(45, 129, 255, 0.15)',
                  '&:hover': {
                    boxShadow: '0px 8px 16px rgba(45, 129, 255, 0.2)',
                  }
                }}
              >
                Connect with Gmail
              </Button>
              <Button
                variant="outlined"
                size="large"
                fullWidth
                startIcon={<img src="https://img.icons8.com/color/48/000000/microsoft-outlook-2019--v2.png" width="20" height="20" />}
                onClick={() => console.log('Outlook auth clicked')}
                sx={{ py: 1.5, fontWeight: 600 }}
              >
                Connect with Outlook
              </Button>
            </Box>
          </Paper>
        </Container>
      ) : (
        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Desktop Drawer */}
          <Drawer
            variant="permanent"
            sx={{
              width: drawerWidth,
              flexShrink: 0,
              display: { xs: 'none', md: 'block' },
              '& .MuiDrawer-paper': { 
                width: drawerWidth, 
                boxSizing: 'border-box',
                boxShadow: 'none',
                borderRight: '1px solid rgba(0, 0, 0, 0.06)',
              },
            }}
          >
            <DrawerContent />
          </Drawer>

          {/* Mobile Drawer */}
          <Drawer
            variant="temporary"
            open={isMobileDrawerOpen}
            onClose={toggleMobileDrawer}
            sx={{
              display: { xs: 'block', md: 'none' },
              '& .MuiDrawer-paper': { 
                width: drawerWidth, 
                boxSizing: 'border-box',
              },
            }}
          >
            <DrawerContent />
          </Drawer>

          {/* Main content */}
          <Box component="main" sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
            <AppBar 
              position="sticky" 
              color="inherit" 
              elevation={0}
              sx={{ 
                bgcolor: 'background.default',
                borderBottom: '1px solid rgba(0, 0, 0, 0.06)',
                zIndex: (theme) => theme.zIndex.drawer - 1
              }}
            >
              <Toolbar>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="start"
                  onClick={toggleMobileDrawer}
                  sx={{ mr: 2, display: { md: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
                
                <Box sx={{ display: 'flex', alignItems: 'center', flexGrow: 1 }}>
                  <Typography variant="h6" component="h1" sx={{ fontWeight: 600, display: { xs: 'none', sm: 'block' } }}>
                    {activePage === 'dashboard' && 'Dashboard'}
                    {activePage === 'notifications' && 'Notifications'}
                    {activePage === 'leads' && 'Lead Generation'}
                    {activePage === 'settings' && 'Settings'}
                  </Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Tooltip title="Search">
                    <IconButton color="inherit">
                      <SearchIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="New Application">
                    <IconButton color="primary">
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </Tooltip>
                  
                  <Tooltip title="Account">
                    <IconButton>
                      <Avatar sx={{ width: 32, height: 32, bgcolor: 'primary.main' }}>
                        <AccountCircleOutlinedIcon fontSize="small" />
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                </Box>
              </Toolbar>
            </AppBar>
            
            <Box sx={{ p: { xs: 2, sm: 3 }, flexGrow: 1, bgcolor: 'background.default' }}>
              {renderPage()}
            </Box>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App; 