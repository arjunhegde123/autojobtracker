/**
 * Mock data service for web mode
 */

// Mock job applications
export const mockApplications = [
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

// Mock stats
export const mockStats = {
  total: 5,
  statuses: {
    Applied: 2,
    Interview: 2,
    Rejected: 1
  }
};

// Mock lead generation data
export const mockLeads = [
  {
    id: 'lead_1',
    company: 'Netflix',
    position: 'Software Engineer',
    url: 'https://netflix.com/careers',
    dateAdded: '2023-02-18T00:00:00.000Z',
    status: 'New'
  },
  {
    id: 'lead_2',
    company: 'Airbnb',
    position: 'Product Designer',
    url: 'https://airbnb.com/careers',
    dateAdded: '2023-02-17T00:00:00.000Z',
    status: 'New'
  },
  {
    id: 'lead_3',
    company: 'Uber',
    position: 'Data Scientist',
    url: 'https://uber.com/careers',
    dateAdded: '2023-02-16T00:00:00.000Z',
    status: 'Applied'
  }
]; 