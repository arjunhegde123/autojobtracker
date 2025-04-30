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
  CardContent
} from '@mui/material';
import RefreshIcon from '@mui/icons-material/Refresh';
import WorkIcon from '@mui/icons-material/Work';

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

const Dashboard = () => {
  const [applications, setApplications] = useState([]);
  const [stats, setStats] = useState({});
  const [loading, setLoading] = useState(true);

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

  // Helper function to get chip color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Applied':
        return 'primary';
      case 'Interview':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
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
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Job Applications Dashboard
        </Typography>
        <Button
          variant="contained"
          startIcon={<RefreshIcon />}
          onClick={handleSync}
        >
          Sync Emails
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Total Applications
              </Typography>
              <Typography variant="h3" component="div">
                {stats.total || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Applied
              </Typography>
              <Typography variant="h3" component="div" color="primary">
                {stats.statuses?.Applied || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Interviews
              </Typography>
              <Typography variant="h3" component="div" color="success.main">
                {stats.statuses?.Interview || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Rejected
              </Typography>
              <Typography variant="h3" component="div" color="error.main">
                {stats.statuses?.Rejected || 0}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Applications Table */}
      <Paper sx={{ width: '100%', overflow: 'hidden' }}>
        <TableContainer sx={{ maxHeight: 440 }}>
          <Table stickyHeader aria-label="applications table">
            <TableHead>
              <TableRow>
                <TableCell>Company</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Date Applied</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {applications.length > 0 ? (
                applications.map((app) => (
                  <TableRow hover key={app.id}>
                    <TableCell>{app.company}</TableCell>
                    <TableCell>{app.position}</TableCell>
                    <TableCell>
                      <Chip 
                        label={app.status} 
                        color={getStatusColor(app.status)} 
                        size="small" 
                      />
                    </TableCell>
                    <TableCell>{formatDate(app.applicationDate)}</TableCell>
                    <TableCell>
                      <Button size="small" variant="outlined">View</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={5} align="center">
                    <Box sx={{ py: 3, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                      <WorkIcon sx={{ fontSize: 40, color: 'text.secondary', mb: 1 }} />
                      <Typography variant="body1" color="text.secondary">
                        No applications found
                      </Typography>
                      <Button 
                        variant="outlined" 
                        sx={{ mt: 2 }}
                        onClick={handleSync}
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
    </Box>
  );
};

export default Dashboard; 