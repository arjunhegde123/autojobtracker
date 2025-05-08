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
  useTheme,
  alpha,
  LinearProgress,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import WorkIcon from '@mui/icons-material/Work';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EmailIcon from '@mui/icons-material/Email';
import BusinessIcon from '@mui/icons-material/Business';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';
import CancelIcon from '@mui/icons-material/Cancel';
import EditIcon from '@mui/icons-material/Edit';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';

// Mock data - in a real implementation, this would come from the applicationStore service
const mockApplications = [
  {
    id: 'app_1',
    company: 'Google',
    position: 'Software Engineer',
    status: 'Applied',
    applicationDate: '2023-02-10T00:00:00.000Z',
    logo: '🌐'
  },
  {
    id: 'app_2',
    company: 'Microsoft',
    position: 'Product Manager',
    status: 'Interview',
    applicationDate: '2023-02-05T00:00:00.000Z',
    logo: '🪟'
  },
  {
    id: 'app_3',
    company: 'Apple',
    position: 'UX Designer',
    status: 'Rejected',
    applicationDate: '2023-01-20T00:00:00.000Z',
    logo: '🍎'
  },
  {
    id: 'app_4',
    company: 'Amazon',
    position: 'Data Scientist',
    status: 'Applied',
    applicationDate: '2023-02-12T00:00:00.000Z',
    logo: '📦'
  }
];

// Mock stats - in a real implementation, this would come from the applicationStore service
const mockStats = {
  total: 4,
  statuses: {
    Applied: 2,
    Interview: 1,
    Rejected: 1
  }
};

const statusOptions = [
  { value: 'Applied', label: 'Applied' },
  { value: 'Interview', label: 'Interview' },
  { value: 'Rejected', label: 'Rejected' },
];

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [form, setForm] = useState({
    company: '',
    position: '',
    status: 'Applied',
    applicationDate: '',
    logo: ''
  });
  const theme = useTheme();

  useEffect(() => {
    // In a real implementation, this would fetch from the applicationStore service
    setTimeout(() => {
      setApplications(mockApplications);
      setStats(mockStats);
      setLoading(false);
    }, 1000);
  }, []);

  const handleSync = () => {
    setLoading(true);
    // In a real implementation, this would trigger the email sync process
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  const handleDialogOpen = (index = null) => {
    setEditIndex(index);
    if (index !== null) {
      setForm({ ...applications[index] });
    } else {
      setForm({ company: '', position: '', status: 'Applied', applicationDate: '', logo: '' });
    }
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setEditIndex(null);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFormSave = () => {
    if (!form.company || !form.position || !form.applicationDate) return;
    if (editIndex !== null) {
      const updated = [...applications];
      updated[editIndex] = { ...form };
      setApplications(updated);
    } else {
      setApplications((prev) => [
        ...prev,
        { ...form, id: `app_${Date.now()}` }
      ]);
    }
    setDialogOpen(false);
    setEditIndex(null);
  };

  const handleDelete = (index) => {
    setApplications((prev) => prev.filter((_, i) => i !== index));
  };

  // Helper function to get chip color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return {
          color: 'primary',
          icon: <HourglassEmptyIcon fontSize="small" />
        };
      case 'Interview':
        return {
          color: 'success',
          icon: <CheckCircleOutlineIcon fontSize="small" />
        };
      case 'Rejected':
        return {
          color: 'error',
          icon: <CancelIcon fontSize="small" />
        };
      default:
        return {
          color: 'default',
          icon: null
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

  // Calculate days since application
  const getDaysSince = (dateString) => {
    const date = new Date(dateString);
    const today = new Date();
    const diffTime = Math.abs(today - date);
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress size={60} thickness={4} />
        <Typography variant="h6" sx={{ mt: 2, fontWeight: 500 }}>
          Loading your dashboard...
        </Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        mb: 4 
      }}>
        <Box>
          <Typography 
            variant="h4" 
            component="h1" 
            sx={{ 
              fontWeight: 700,
              background: `linear-gradient(90deg, ${theme.palette.primary.main} 0%, ${theme.palette.secondary.main} 100%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block'
            }}
          >
            Job Applications Dashboard
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mt: 0.5 }}>
            Track and manage your job applications in one place
          </Typography>
        </Box>
        <Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            sx={{ mr: 2 }}
            onClick={() => handleDialogOpen()}
          >
            Add Application
          </Button>
          <Button
            variant="contained"
            startIcon={<RefreshIcon />}
            onClick={handleSync}
            sx={{ px: 3, py: 1, borderRadius: 2, boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.1), 0 2px 4px -2px rgba(37, 99, 235, 0.1)' }}
          >
            Sync Emails
          </Button>
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 3,
              p: 1,
              height: '100%',
              border: '1px solid',
              borderColor: theme.palette.divider,
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }} color="text.secondary" gutterBottom>
                    Total Applications
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 700 }}>
                    {stats.total || 0}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                  <WorkIcon />
                </Avatar>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
                <TrendingUpIcon fontSize="small" color="success" sx={{ mr: 0.5 }} />
                <Typography variant="caption" color="success.main">
                  +2 this week
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 3,
              p: 1,
              height: '100%',
              border: '1px solid',
              borderColor: theme.palette.divider,
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }} color="text.secondary" gutterBottom>
                    Applied
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: theme.palette.primary.main }}>
                    {stats.statuses?.Applied || 0}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: alpha(theme.palette.primary.main, 0.1), color: theme.palette.primary.main }}>
                  <EmailIcon />
                </Avatar>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                  {Math.round((stats.statuses?.Applied || 0) / stats.total * 100)}% of total
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(stats.statuses?.Applied || 0) / stats.total * 100} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.primary.main, 0.1)
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 3,
              p: 1,
              height: '100%',
              border: '1px solid',
              borderColor: theme.palette.divider,
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }} color="text.secondary" gutterBottom>
                    Interviews
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: theme.palette.success.main }}>
                    {stats.statuses?.Interview || 0}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: alpha(theme.palette.success.main, 0.1), color: theme.palette.success.main }}>
                  <CheckCircleOutlineIcon />
                </Avatar>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                  {Math.round((stats.statuses?.Interview || 0) / stats.total * 100)}% of total
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(stats.statuses?.Interview || 0) / stats.total * 100} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.success.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: theme.palette.success.main
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card 
            elevation={0}
            sx={{ 
              borderRadius: 3,
              p: 1,
              height: '100%',
              border: '1px solid',
              borderColor: theme.palette.divider,
              transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
              '&:hover': {
                transform: 'translateY(-4px)',
                boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)'
              }
            }}
          >
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 500 }} color="text.secondary" gutterBottom>
                    Rejected
                  </Typography>
                  <Typography variant="h3" component="div" sx={{ fontWeight: 700, color: theme.palette.error.main }}>
                    {stats.statuses?.Rejected || 0}
                  </Typography>
                </Box>
                <Avatar sx={{ bgcolor: alpha(theme.palette.error.main, 0.1), color: theme.palette.error.main }}>
                  <CancelIcon />
                </Avatar>
              </Box>
              <Box sx={{ mt: 2 }}>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 0.5, display: 'block' }}>
                  {Math.round((stats.statuses?.Rejected || 0) / stats.total * 100)}% of total
                </Typography>
                <LinearProgress 
                  variant="determinate" 
                  value={(stats.statuses?.Rejected || 0) / stats.total * 100} 
                  sx={{ 
                    height: 6, 
                    borderRadius: 3,
                    bgcolor: alpha(theme.palette.error.main, 0.1),
                    '& .MuiLinearProgress-bar': {
                      bgcolor: theme.palette.error.main
                    }
                  }} 
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Applications Table */}
      <Box sx={{ mb: 2 }}>
        <Typography variant="h5" sx={{ fontWeight: 600, mb: 2 }}>
          Recent Applications
        </Typography>
      </Box>
      <Paper 
        elevation={0}
        sx={{ 
          width: '100%', 
          overflow: 'hidden',
          borderRadius: 3,
          border: '1px solid',
          borderColor: theme.palette.divider
        }}
      >
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="applications table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 600 }}>Company</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Position</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Date Applied</TableCell>
                <TableCell sx={{ fontWeight: 600 }}>Days</TableCell>
                <TableCell align="right" sx={{ fontWeight: 600 }}>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.length > 0 ? (
                applications.map((app, idx) => {
                  const { color, icon } = getStatusColor(app.status);
                  const daysSince = getDaysSince(app.applicationDate);
                  
                  return (
                    <TableRow 
                      hover 
                      key={app.id}
                      sx={{ 
                        '&:hover': { 
                          bgcolor: alpha(theme.palette.primary.main, 0.04)
                        }
                      }}
                    >
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Avatar 
                            sx={{ 
                              width: 32, 
                              height: 32, 
                              mr: 1.5, 
                              fontSize: '1rem',
                              bgcolor: alpha(theme.palette.primary.main, 0.1),
                              color: theme.palette.primary.main
                            }}
                          >
                            {app.logo}
                          </Avatar>
                          <Typography variant="body2" sx={{ fontWeight: 500 }}>
                            {app.company}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {app.position}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip 
                          label={app.status} 
                          color={color}
                          size="small"
                          icon={icon}
                          sx={{ 
                            fontWeight: 500,
                            '& .MuiChip-icon': {
                              ml: '4px'
                            }
                          }} 
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {formatDate(app.applicationDate)}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Typography 
                          variant="body2" 
                          sx={{ 
                            fontWeight: 500,
                            color: daysSince > 14 ? 'error.main' : 'text.primary'
                          }}
                        >
                          {daysSince} {daysSince === 1 ? 'day' : 'days'}
                        </Typography>
                      </TableCell>
                      <TableCell align="right">
                        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                          <Tooltip title="Edit">
                            <IconButton size="small" sx={{ mr: 1 }} onClick={() => handleDialogOpen(idx)}>
                              <EditIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="Delete">
                            <IconButton size="small" color="error" onClick={() => handleDelete(idx)}>
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                          <Tooltip title="View details">
                            <IconButton size="small" sx={{ ml: 1 }}>
                              <VisibilityIcon fontSize="small" />
                            </IconButton>
                          </Tooltip>
                        </Box>
                      </TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={6} align="center">
                    <Box sx={{ py: 5, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          width: 60, 
                          height: 60, 
                          mb: 2,
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main
                        }}
                      >
                        <WorkIcon sx={{ fontSize: 30 }} />
                      </Avatar>
                      <Typography variant="h6" color="text.primary" sx={{ fontWeight: 500 }}>
                        No applications found
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 2, maxWidth: 300, textAlign: 'center' }}>
                        Connect your email to automatically track job applications
                      </Typography>
                      <Button 
                        variant="contained" 
                        startIcon={<EmailIcon />}
                        onClick={handleSync}
                        sx={{ px: 3 }}
                      >
                        Sync with email
                      </Button>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Add/Edit Dialog */}
      <Dialog open={dialogOpen} onClose={handleDialogClose} maxWidth="xs" fullWidth>
        <DialogTitle>{editIndex !== null ? 'Edit Application' : 'Add Application'}</DialogTitle>
        <DialogContent>
          <TextField
            margin="dense"
            label="Company"
            name="company"
            value={form.company}
            onChange={handleFormChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Position"
            name="position"
            value={form.position}
            onChange={handleFormChange}
            fullWidth
            required
          />
          <TextField
            margin="dense"
            label="Status"
            name="status"
            value={form.status}
            onChange={handleFormChange}
            select
            fullWidth
          >
            {statusOptions.map((option) => (
              <MenuItem key={option.value} value={option.value}>{option.label}</MenuItem>
            ))}
          </TextField>
          <TextField
            margin="dense"
            label="Date Applied"
            name="applicationDate"
            type="date"
            value={form.applicationDate}
            onChange={handleFormChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            margin="dense"
            label="Logo (emoji or letter)"
            name="logo"
            value={form.logo}
            onChange={handleFormChange}
            fullWidth
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose}>Cancel</Button>
          <Button onClick={handleFormSave} variant="contained">Save</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Dashboard; 