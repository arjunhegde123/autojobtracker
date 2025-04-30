import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Divider,
  Paper,
  Button,
  IconButton,
  Chip
} from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import BusinessIcon from '@mui/icons-material/Business';

// Mock notification data - would come from a notifications service in real implementation
const mockNotifications = [
  {
    id: 'notif_1',
    type: 'follow-up',
    title: 'Follow up on Google application',
    message: 'It has been 7 days since you applied for Software Engineer at Google. Consider sending a follow-up email.',
    date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    applicationId: 'app_1',
    company: 'Google',
    position: 'Software Engineer',
    read: false,
    urgent: true
  },
  {
    id: 'notif_2',
    type: 'status-update',
    title: 'Application status updated',
    message: 'Your application for Product Manager at Microsoft has been updated to "Interview".',
    date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
    applicationId: 'app_2',
    company: 'Microsoft',
    position: 'Product Manager',
    read: true,
    urgent: false
  },
  {
    id: 'notif_3',
    type: 'follow-up',
    title: 'Follow up on Amazon application',
    message: 'It has been 14 days since you applied for Data Scientist at Amazon. Consider sending a follow-up email.',
    date: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
    applicationId: 'app_4',
    company: 'Amazon',
    position: 'Data Scientist',
    read: false,
    urgent: true
  }
];

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate loading data from service
    setTimeout(() => {
      setNotifications(mockNotifications);
      setLoading(false);
    }, 800);
  }, []);

  const handleMarkAsRead = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.map(notification =>
        notification.id === id ? { ...notification, read: true } : notification
      )
    );
  };

  const handleDismiss = (id) => {
    setNotifications(prevNotifications =>
      prevNotifications.filter(notification => notification.id !== id)
    );
  };

  const handleAction = (id, type) => {
    console.log(`Action ${type} for notification ${id}`);
    // Would open email compose window or perform other actions
    
    // Mark as read after action
    handleMarkAsRead(id);
  };

  // Format relative time
  const formatRelativeTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHour = Math.floor(diffMin / 60);
    const diffDay = Math.floor(diffHour / 24);

    if (diffDay > 0) {
      return `${diffDay} day${diffDay > 1 ? 's' : ''} ago`;
    } else if (diffHour > 0) {
      return `${diffHour} hour${diffHour > 1 ? 's' : ''} ago`;
    } else if (diffMin > 0) {
      return `${diffMin} minute${diffMin > 1 ? 's' : ''} ago`;
    } else {
      return 'Just now';
    }
  };

  // Select appropriate avatar based on notification type
  const getNotificationAvatar = (notification) => {
    switch (notification.type) {
      case 'follow-up':
        return (
          <Avatar sx={{ bgcolor: notification.urgent ? 'error.main' : 'primary.main' }}>
            {notification.urgent ? <NotificationsActiveIcon /> : <NotificationsIcon />}
          </Avatar>
        );
      case 'status-update':
        return (
          <Avatar sx={{ bgcolor: 'success.main' }}>
            <CheckCircleIcon />
          </Avatar>
        );
      default:
        return (
          <Avatar>
            <BusinessIcon />
          </Avatar>
        );
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
        <Typography>Loading notifications...</Typography>
      </Box>
    );
  }

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 3 }}>
        Notifications & Reminders
      </Typography>

      <Paper elevation={2}>
        {notifications.length > 0 ? (
          <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {notifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  secondaryAction={
                    <Box>
                      {notification.type === 'follow-up' && (
                        <IconButton 
                          edge="end" 
                          aria-label="send email"
                          onClick={() => handleAction(notification.id, 'send-email')}
                          sx={{ mr: 1 }}
                        >
                          <SendIcon />
                        </IconButton>
                      )}
                      <IconButton 
                        edge="end" 
                        aria-label="dismiss"
                        onClick={() => handleDismiss(notification.id)}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Box>
                  }
                  sx={{
                    backgroundColor: notification.read ? 'inherit' : 'action.hover'
                  }}
                >
                  <ListItemAvatar>
                    {getNotificationAvatar(notification)}
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography
                          sx={{ fontWeight: notification.read ? 'normal' : 'bold' }}
                        >
                          {notification.title}
                        </Typography>
                        {notification.urgent && (
                          <Chip 
                            label="Urgent" 
                            color="error" 
                            size="small" 
                            sx={{ ml: 1 }}
                          />
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          sx={{ display: 'block' }}
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {notification.company} - {notification.position}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          sx={{ display: 'block', mt: 1 }}
                        >
                          {formatRelativeTime(notification.date)}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
                {index < notifications.length - 1 && (
                  <Divider variant="inset" component="li" />
                )}
              </React.Fragment>
            ))}
          </List>
        ) : (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <NotificationsIcon sx={{ fontSize: 60, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              No notifications
            </Typography>
            <Typography variant="body2" color="text.secondary">
              You're all caught up! Check back later for follow-up reminders and updates.
            </Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
};

export default Notifications; 