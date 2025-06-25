import { User, Complaint, DashboardStats } from '../types';

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    role: 'user',
    createdAt: '2024-01-15T10:00:00Z'
  },
  {
    id: '2',
    name: 'Admin User',
    email: 'admin@example.com',
    role: 'admin',
    createdAt: '2024-01-01T10:00:00Z'
  }
];

export const mockComplaints: Complaint[] = [
  {
    id: '1',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    title: 'Defective Product Received',
    description: 'I received a damaged laptop with a cracked screen. The packaging was also torn, suggesting poor handling during shipping.',
    category: 'Product Quality',
    priority: 'high',
    status: 'in-progress',
    createdAt: '2024-01-20T14:30:00Z',
    updatedAt: '2024-01-22T09:15:00Z',
    adminNotes: 'Investigating with shipping partner. Replacement being processed.'
  },
  {
    id: '2',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    title: 'Poor Customer Service Experience',
    description: 'The customer service representative was unhelpful and rude during my call about billing issues.',
    category: 'Customer Service',
    priority: 'medium',
    status: 'resolved',
    createdAt: '2024-01-18T11:20:00Z',
    updatedAt: '2024-01-19T16:45:00Z',
    adminNotes: 'Spoke with customer service manager. Staff member has been coached.'
  },
  {
    id: '3',
    userId: '1',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    title: 'Website Login Issues',
    description: 'Unable to log into my account. Password reset functionality is not working properly.',
    category: 'Technical Support',
    priority: 'urgent',
    status: 'pending',
    createdAt: '2024-01-25T16:10:00Z',
    updatedAt: '2024-01-25T16:10:00Z'
  }
];

export const mockDashboardStats: DashboardStats = {
  totalComplaints: 156,
  pendingComplaints: 23,
  resolvedComplaints: 98,
  inProgressComplaints: 35
};

// Mock authentication functions
export const authenticateUser = (email: string, password: string): User | null => {
  const user = mockUsers.find(u => u.email === email);
  if (user && password === 'password') {
    return user;
  }
  return null;
};

export const registerUser = (name: string, email: string, password: string): User => {
  const newUser: User = {
    id: Date.now().toString(),
    name,
    email,
    role: 'user',
    createdAt: new Date().toISOString()
  };
  mockUsers.push(newUser);
  return newUser;
};