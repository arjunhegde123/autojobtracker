import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  CircularProgress,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Divider,
  alpha,
  useTheme,
  Menu,
  MenuItem,
  TextField,
  InputAdornment
} from '@mui/material';
import RefreshOutlinedIcon from '@mui/icons-material/RefreshOutlined';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import MoreVertOutlinedIcon from '@mui/icons-material/MoreVertOutlined';
import FilterListOutlinedIcon from '@mui/icons-material/FilterListOutlined';
import WorkOutlineOutlinedIcon from '@mui/icons-material/WorkOutlineOutlined';
import TrendingUpOutlinedIcon from '@mui/icons-material/TrendingUpOutlined';
import CheckCircleOutlineOutlinedIcon from '@mui/icons-material/CheckCircleOutlineOutlined';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import ScheduleOutlinedIcon from '@mui/icons-material/ScheduleOutlined';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';

// Mock data - in a real implementation, this would come from the applicationStore service
const mockApplications = [
  {
    id: 'app_1',
    company: 'Google',
    position: 'Software Engineer',
    status: 'Applied',
    applicationDate: '2023-02-10T00:00:00.000Z'
  },
  {
    id: 'app_2',
    company: 'Microsoft',
    position: 'Product Manager',
    status: 'Interview',
    applicationDate: '2023-02-05T00:00:00.000Z'
  },
  {
    id: 'app_3',
    company: 'Apple',
    position: 'UX Designer',
    status: 'Rejected',
    applicationDate: '2023-01-20T00:00:00.000Z'
  },
  {
    id: 'app_4',
    company: 'Amazon',
    position: 'Data Scientist',
    status: 'Applied',
    applicationDate: '2023-02-12T00:00:00.000Z'
  },
  {
    id: 'app_5',
    company: 'Facebook',
    position: 'Frontend Developer',
    status: 'Interview',
    applicationDate: '2023-02-15T00:00:00.000Z'
  }
];

// Mock stats - in a real implementation, this would come from the applicationStore service
const mockStats = {
  total: 5,
  statuses: {
    Applied: 2,
    Interview: 2,
    Rejected: 1
  }
};

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [anchorEl, setAnchorEl] = useState(null);
  const theme = useTheme();

  useEffect(() => {
    // In a real implementation, this would fetch from the applicationStore service
    setTimeout(() => {
      setApplications(mockApplications);
      setStats(mockStats);
      setLoading(false);
    }, 800);
  }, []);

  const handleSync = () => {
    setLoading(true);
    // In a real implementation, this would trigger the email sync process
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const handleOptionsClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleOptionsClose = () => {
    setAnchorEl(null);
  };

  // Filter applications based on search term
  const filteredApplications = applications.filter(app => 
    app.company.toLowerCase().includes(searchTerm.toLowerCase()) || 
    app.position.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Helper function to get chip color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return {
          bg: alpha(theme.palette.info.main, 0.15),
          color: theme.palette.info.main,
          icon: <ScheduleOutlinedIcon fontSize="small" />
        };
      case 'Interview':
        return {
          bg: alpha(theme.palette.success.main, 0.15),
          color: theme.palette.success.main,
          icon: <CheckCircleOutlineOutlinedIcon fontSize="small" />
        };
      case 'Rejected':
        return {
          bg: alpha(theme.palette.error.main, 0.15),
          color: theme.palette.error.main,
          icon: <CancelOutlinedIcon fontSize="small" />
        };
      default:
        return {
          bg: alpha(theme.palette.info.main, 0.15),
          color: theme.palette.info.main,
          icon: <ScheduleOutlinedIcon fontSize="small" />
        };
    }
  };

  // Format date
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric'
    });
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress size={40} />
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, mb: 3, gap: 2 }}>
        <Box>
          <Typography variant="h4" component="h1" fontWeight={600} gutterBottom>
            Job Applications
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Track and manage your job application progress
          </Typography>
        </Box>
        
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Tooltip title="Refresh data">
            <Button
              variant="outlined"
              color="inherit"
              startIcon={<RefreshOutlinedIcon />}
              onClick={handleSync}
              sx={{ borderRadius: 2 }}
            >
              Sync
            </Button>
          </Tooltip>
          
          <Tooltip title="New application">
            <Button
              variant="contained"
              startIcon={<AddCircleOutlineOutlinedIcon />}
              sx={{ borderRadius: 2 }}
            >
              Add New
            </Button>
          </Tooltip>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: 3,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
            }
          }}>
            <CardContent sx={{ flex: 1, p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }} color="text.secondary">
                  Total Applications
                </Typography>
                <Box sx={{ 
                  bgcolor: alpha(theme.palette.primary.main, 0.15), 
                  borderRadius: '50%', 
                  width: 40, 
                  height: 40, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <WorkOutlineOutlinedIcon sx={{ color: theme.palette.primary.main }} />
                </Box>
              </Box>
              <Typography variant="h3" component="div" fontWeight={700}>
                {stats.total || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1, display: 'flex', alignItems: 'center' }}>
                <TrendingUpOutlinedIcon sx={{ fontSize: 16, mr: 0.5, color: theme.palette.success.main }} />
                5 applications this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: 3,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
            }
          }}>
            <CardContent sx={{ flex: 1, p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }} color="text.secondary">
                  Applied
                </Typography>
                <Box sx={{ 
                  bgcolor: alpha(theme.palette.info.main, 0.15), 
                  borderRadius: '50%', 
                  width: 40, 
                  height: 40, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <ScheduleOutlinedIcon sx={{ color: theme.palette.info.main }} />
                </Box>
              </Box>
              <Typography variant="h3" component="div" fontWeight={700} color="info.main">
                {stats.statuses?.Applied || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round((stats.statuses?.Applied || 0) / stats.total * 100)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: 3,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
            }
          }}>
            <CardContent sx={{ flex: 1, p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }} color="text.secondary">
                  Interviews
                </Typography>
                <Box sx={{ 
                  bgcolor: alpha(theme.palette.success.main, 0.15), 
                  borderRadius: '50%', 
                  width: 40, 
                  height: 40, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <CheckCircleOutlineOutlinedIcon sx={{ color: theme.palette.success.main }} />
                </Box>
              </Box>
              <Typography variant="h3" component="div" fontWeight={700} color="success.main">
                {stats.statuses?.Interview || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round((stats.statuses?.Interview || 0) / stats.total * 100)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} sm={6} lg={3}>
          <Card sx={{ 
            height: '100%', 
            display: 'flex', 
            flexDirection: 'column', 
            borderRadius: 3,
            transition: 'transform 0.2s, box-shadow 0.2s',
            '&:hover': {
              transform: 'translateY(-4px)',
              boxShadow: '0px 8px 16px rgba(0, 0, 0, 0.1)',
            }
          }}>
            <CardContent sx={{ flex: 1, p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontSize: '0.875rem', fontWeight: 500 }} color="text.secondary">
                  Rejected
                </Typography>
                <Box sx={{ 
                  bgcolor: alpha(theme.palette.error.main, 0.15), 
                  borderRadius: '50%', 
                  width: 40, 
                  height: 40, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center' 
                }}>
                  <CancelOutlinedIcon sx={{ color: theme.palette.error.main }} />
                </Box>
              </Box>
              <Typography variant="h3" component="div" fontWeight={700} color="error.main">
                {stats.statuses?.Rejected || 0}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                {Math.round((stats.statuses?.Rejected || 0) / stats.total * 100)}% of total
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Applications Table */}
      <Paper sx={{ borderRadius: 3, overflow: 'hidden', mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2, borderBottom: `1px solid ${alpha(theme.palette.divider, 0.7)}` }}>
          <Typography variant="h6" fontWeight={600}>Recent Applications</Typography>
          
          <Box sx={{ display: 'flex', gap: 1 }}>
            <TextField
              placeholder="Search applications..."
              size="small"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              sx={{ 
                '& .MuiOutlinedInput-root': {
                  borderRadius: 2,
                  '& fieldset': {
                    borderColor: alpha(theme.palette.divider, 0.7),
                  },
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchOutlinedIcon fontSize="small" color="action" />
                  </InputAdornment>
                ),
              }}
            />
            
            <Tooltip title="Filter">
              <IconButton>
                <FilterListOutlinedIcon />
              </IconButton>
            </Tooltip>
            
            <Tooltip title="More options">
              <IconButton 
                aria-label="more options"
                aria-controls="application-options-menu"
                aria-haspopup="true"
                onClick={handleOptionsClick}
              >
                <MoreVertOutlinedIcon />
              </IconButton>
            </Tooltip>
            <Menu
              id="application-options-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleOptionsClose}
            >
              <MenuItem onClick={handleOptionsClose}>Export as CSV</MenuItem>
              <MenuItem onClick={handleOptionsClose}>Create Report</MenuItem>
              <MenuItem onClick={handleOptionsClose}>Archive</MenuItem>
            </Menu>
          </Box>
        </Box>
        
        <TableContainer sx={{ maxHeight: 500 }}>
          <Table stickyHeader aria-label="applications table">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date Applied</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredApplications.length > 0 ? (
                filteredApplications.map((app) => (
                  <TableRow 
                    key={app.id}
                    hover
                    sx={{ 
                      '&:last-child td, &:last-child th': { border: 0 },
                      cursor: 'pointer',
                      transition: 'background-color 0.2s',
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.light, 0.1),
                      }
                    }}
                  >
                    <TableCell>
                      <Typography fontWeight={500}>{app.company}</Typography>
                    </TableCell>
                    <TableCell>{app.position}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Chip
                          icon={getStatusColor(app.status).icon}
                          label={app.status}
                          sx={{ 
                            backgroundColor: getStatusColor(app.status).bg,
                            color: getStatusColor(app.status).color,
                            fontWeight: 500,
                            '.MuiChip-icon': {
                              color: getStatusColor(app.status).color,
                            }
                          }}
                          size="small"
                        />
                      </Box>
                    </TableCell>
                    <TableCell>{formatDate(app.applicationDate)}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="More options">
                        <IconButton size="small">
                          <MoreVertOutlinedIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center" sx={{ py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      {searchTerm ? 'No applications match your search' : 'No applications found'}
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Dashboard; 