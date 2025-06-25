import React, { useState } from 'react';
import Header from './components/layout/Header';
import Sidebar from './components/layout/Sidebar';
import Dashboard from './pages/Dashboard';
import ComplaintList from './components/complaint/ComplaintList';
import ComplaintForm from './components/forms/ComplaintForm';
import ComplaintDetails from './components/complaint/ComplaintDetails';
import LoginForm from './components/forms/LoginForm';
import Modal from './components/ui/Modal';
import { User, Complaint } from './types';
import { mockComplaints, mockDashboardStats } from './data/mockData';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedComplaint, setSelectedComplaint] = useState<Complaint | null>(null);
  const [complaints, setComplaints] = useState<Complaint[]>(mockComplaints);
  const [showComplaintDetails, setShowComplaintDetails] = useState(false);

  const handleLogin = (loggedInUser: User) => {
    setUser(loggedInUser);
  };

  const handleLogout = () => {
    setUser(null);
    setActiveTab('dashboard');
    setSelectedComplaint(null);
    setShowComplaintDetails(false);
  };

  const handleComplaintSubmit = (newComplaint: Omit<Complaint, 'id' | 'userId' | 'createdAt' | 'updatedAt'>) => {
    const complaint: Complaint = {
      ...newComplaint,
      id: Date.now().toString(),
      userId: user?.id || '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };
    
    setComplaints(prev => [complaint, ...prev]);
    setActiveTab('complaints');
  };

  const handleComplaintClick = (complaint: Complaint) => {
    setSelectedComplaint(complaint);
    setShowComplaintDetails(true);
  };

  const handleStatusUpdate = (complaintId: string, status: string, adminNotes: string) => {
    setComplaints(prev => prev.map(complaint => 
      complaint.id === complaintId 
        ? { 
            ...complaint, 
            status: status as Complaint['status'], 
            adminNotes, 
            updatedAt: new Date().toISOString() 
          }
        : complaint
    ));
  };

  const closeComplaintDetails = () => {
    setShowComplaintDetails(false);
    setSelectedComplaint(null);
  };

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">ComplaintHub</h1>
            <p className="text-gray-600">Streamlined complaint management system</p>
          </div>
          <LoginForm onLogin={handleLogin} />
        </div>
      </div>
    );
  }

  const userComplaints = complaints.filter(c => c.userId === user.id);
  const allComplaints = complaints;

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <Dashboard
            user={user}
            complaints={user.role === 'admin' ? allComplaints : userComplaints}
            stats={mockDashboardStats}
            onComplaintClick={handleComplaintClick}
          />
        );
      
      case 'complaints':
        return (
          <ComplaintList
            complaints={userComplaints}
            onComplaintClick={handleComplaintClick}
            title="My Complaints"
          />
        );
      
      case 'all-complaints':
        return (
          <ComplaintList
            complaints={allComplaints}
            onComplaintClick={handleComplaintClick}
            showUserInfo={true}
            title="All Complaints"
          />
        );
      
      case 'submit':
        return <ComplaintForm onSubmit={handleComplaintSubmit} />;
      
      case 'users':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">User Management</h2>
            <p className="text-gray-600">User management features coming soon...</p>
          </div>
        );
      
      case 'analytics':
        return (
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Analytics</h2>
            <p className="text-gray-600">Analytics dashboard coming soon...</p>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header user={user} onLogout={handleLogout} />
      
      <div className="flex">
        <Sidebar user={user} activeTab={activeTab} onTabChange={setActiveTab} />
        
        <main className="flex-1 p-8">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>

      <Modal
        isOpen={showComplaintDetails}
        onClose={closeComplaintDetails}
        size="lg"
        title="Complaint Details"
      >
        {selectedComplaint && (
          <ComplaintDetails
            complaint={selectedComplaint}
            user={user}
            onStatusUpdate={user.role === 'admin' ? handleStatusUpdate : undefined}
            onClose={closeComplaintDetails}
          />
        )}
      </Modal>
    </div>
  );
}

export default App;