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
  Grid,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme,
  Fade,
  Tooltip,
  Badge,
  alpha
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import WorkIcon from '@mui/icons-material/Work';
import DashboardIcon from '@mui/icons-material/Dashboard';
import NotificationsIcon from '@mui/icons-material/Notifications';
import PeopleIcon from '@mui/icons-material/People';
import SettingsIcon from '@mui/icons-material/Settings';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

// Import components
import Dashboard from './components/Dashboard';
import Notifications from './components/Notifications';
import LeadGeneration from './components/LeadGeneration';
import Settings from './components/Settings';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [activePage, setActivePage] = useState('dashboard');
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const drawerWidth = 240;

  const handleGmailAuth = async () => {
    // TODO: Implement Gmail authentication
    console.log('Gmail auth clicked');
    // For development purposes, simulate successful authentication
    setIsAuthenticated(true);
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
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

  const menuItems = [
    { icon: <DashboardIcon />, text: 'Dashboard', id: 'dashboard' },
    { icon: <NotificationsIcon />, text: 'Notifications', id: 'notifications', badge: 3 },
    { icon: <PeopleIcon />, text: 'Lead Generation', id: 'leads' },
  ];

  const bottomMenuItems = [
    { icon: <SettingsIcon />, text: 'Settings', id: 'settings' },
    { icon: <HelpOutlineIcon />, text: 'Help & Support', id: 'help' },
  ];

  const drawer = (
    <>
      <Box sx={{ 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center',
        py: 2,
        borderBottom: '1px solid',
        borderColor: 'divider'
      }}>
        {/* Avatar removed as per user request */}
      </Box>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'space-between',
        height: 'calc(100% - 65px)'
      }}>
        <List sx={{ px: 2 }}>
          {menuItems.map((item) => (
            <ListItem 
              button 
              key={item.id}
              selected={activePage === item.id}
              onClick={() => {
                setActivePage(item.id);
                if (isMobile) setMobileDrawerOpen(false);
              }}
              sx={{
                borderRadius: 2,
                mb: 1,
                '&.Mui-selected': {
                  bgcolor: alpha(theme.palette.primary.main, 0.1),
                  color: 'primary.main',
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.15),
                  },
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  }
                },
                '&:hover': {
                  bgcolor: alpha(theme.palette.primary.main, 0.05),
                }
              }}
            >
              <ListItemIcon sx={{ minWidth: 40 }}>
                {item.badge ? (
                  <Badge badgeContent={item.badge} color="error">
                    {item.icon}
                  </Badge>
                ) : item.icon}
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ 
                  fontWeight: activePage === item.id ? 600 : 400,
                  fontSize: '0.95rem'
                }} 
              />
            </ListItem>
          ))}
        </List>
        
        <Box>
          <Divider />
          <List sx={{ px: 2 }}>
            {bottomMenuItems.map((item) => (
              <ListItem 
                button 
                key={item.id}
                selected={activePage === item.id}
                onClick={() => {
                  setActivePage(item.id);
                  if (isMobile) setMobileDrawerOpen(false);
                }}
                sx={{
                  borderRadius: 2,
                  mb: 1,
                  '&.Mui-selected': {
                    bgcolor: alpha(theme.palette.primary.main, 0.1),
                    color: 'primary.main',
                    '&:hover': {
                      bgcolor: alpha(theme.palette.primary.main, 0.15),
                    },
                    '& .MuiListItemIcon-root': {
                      color: 'primary.main',
                    }
                  },
                  '&:hover': {
                    bgcolor: alpha(theme.palette.primary.main, 0.05),
                  }
                }}
              >
                <ListItemIcon sx={{ minWidth: 40 }}>
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    fontWeight: activePage === item.id ? 600 : 400,
                    fontSize: '0.95rem'
                  }} 
                />
              </ListItem>
            ))}
          </List>
          
          <Box sx={{ p: 2 }}>
            <Paper
              elevation={0}
              sx={{
                p: 2,
                bgcolor: alpha(theme.palette.primary.main, 0.05),
                borderRadius: 3,
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <Avatar sx={{ bgcolor: 'primary.main', width: 36, height: 36 }}>
                <AccountCircleIcon />
              </Avatar>
              <Box sx={{ ml: 1.5 }}>
                <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
                  User Account
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  user@example.com
                </Typography>
              </Box>
            </Paper>
          </Box>
        </Box>
      </Box>
    </>
  );

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar 
        position="fixed" 
        elevation={0}
        color="inherit"
        sx={{ 
          zIndex: (theme) => theme.zIndex.drawer + 1,
          bgcolor: 'background.paper',
          borderBottom: '1px solid',
          borderColor: 'divider'
        }}
      >
        <Toolbar>
          {isAuthenticated && isMobile && (
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2 }}
            >
              {mobileDrawerOpen ? <CloseIcon /> : <MenuIcon />}
            </IconButton>
          )}
          
          <Avatar 
            sx={{ 
              bgcolor: 'primary.main',
              width: 32,
              height: 32,
              mr: 1.5
            }}
          >
            <WorkIcon fontSize="small" />
          </Avatar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 700 }}>
            Auto Job Tracker
          </Typography>
          
          {isAuthenticated && (
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <Tooltip title="Notifications">
                <IconButton color="inherit" size="large">
                  <Badge badgeContent={3} color="error">
                    <NotificationsIcon />
                  </Badge>
                </IconButton>
              </Tooltip>
              <Tooltip title="Help">
                <IconButton color="inherit" size="large">
                  <HelpOutlineIcon />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Toolbar>
      </AppBar>

      {!isAuthenticated ? (
        <Fade in={!isAuthenticated}>
          <Container component="main" sx={{ mt: 12, mb: 4, flex: 1 }}>
            <Paper 
              elevation={3} 
              sx={{ 
                p: { xs: 3, md: 5 }, 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center',
                borderRadius: 3,
                background: `linear-gradient(145deg, ${theme.palette.background.paper} 0%, ${alpha(theme.palette.primary.light, 0.1)} 100%)`,
                boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)'
              }}
            >
              <Box 
                sx={{ 
                  p: 2, 
                  bgcolor: 'primary.main', 
                  borderRadius: '50%',
                  mb: 3,
                  boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -4px rgba(37, 99, 235, 0.2)'
                }}
              >
                <EmailIcon sx={{ fontSize: 40, color: 'white' }} />
              </Box>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Welcome to Auto Job Tracker
              </Typography>
              <Typography variant="body1" sx={{ mb: 4, textAlign: 'center', maxWidth: 500, color: 'text.secondary' }}>
                Connect your email account to start tracking your job applications automatically and generate leads from your inbox.
              </Typography>
              <Grid container spacing={2} justifyContent="center">
                <Grid item>
                  <Button
                    variant="contained"
                    startIcon={<EmailIcon />}
                    onClick={handleGmailAuth}
                    size="large"
                    sx={{ 
                      px: 4, 
                      py: 1.5,
                      boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.3), 0 2px 4px -2px rgba(37, 99, 235, 0.2)',
                      '&:hover': {
                        boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3), 0 4px 6px -4px rgba(37, 99, 235, 0.2)',
                      }
                    }}
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
                    sx={{ px: 4, py: 1.5 }}
                  >
                    Connect Outlook
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </Fade>
      ) : (
        <Box sx={{ display: 'flex', flex: 1 }}>
          {/* Permanent drawer for desktop */}
          {!isMobile && (
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: { 
                  width: drawerWidth, 
                  boxSizing: 'border-box', 
                  mt: '64px',
                  height: 'calc(100% - 64px)',
                  border: 'none'
                },
              }}
            >
              {drawer}
            </Drawer>
          )}
          
          {/* Temporary drawer for mobile */}
          {isMobile && (
            <Drawer
              variant="temporary"
              open={mobileDrawerOpen}
              onClose={handleDrawerToggle}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile
              }}
              sx={{
                '& .MuiDrawer-paper': { 
                  width: drawerWidth,
                  mt: '64px',
                  height: 'calc(100% - 64px)',
                },
              }}
            >
              {drawer}
            </Drawer>
          )}
          
          <Box 
            component="main" 
            sx={{ 
              flexGrow: 1, 
              p: { xs: 2, sm: 3 }, 
              mt: '64px',
              bgcolor: 'background.default'
            }}
          >
            <Fade in={true} timeout={500}>
              <Box>
                {renderPage()}
              </Box>
            </Fade>
          </Box>
        </Box>
      )}
    </Box>
  );
}

export default App; 