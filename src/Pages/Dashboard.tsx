import React from 'react';
import { FileText, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import StatsCard from '../components/dashboard/StatsCard';
import ComplaintCard from '../components/dashboard/ComplaintCard';
import { User, Complaint, DashboardStats } from '../types';

interface DashboardProps {
  user: User;
  complaints: Complaint[];
  stats: DashboardStats;
  onComplaintClick: (complaint: Complaint) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  user,
  complaints,
  stats,
  onComplaintClick
}) => {
  const userComplaints = user.role === 'admin' 
    ? complaints.slice(0, 5) 
    : complaints.filter(c => c.userId === user.id).slice(0, 5);

  const recentComplaints = complaints
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 3);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}
        </h1>
        <p className="text-gray-600">
          {user.role === 'admin' 
            ? "Here's an overview of the complaint management system"
            : "Track your complaints and submit new ones"
          }
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Total Complaints"
          value={stats.totalComplaints}
          icon={FileText}
          color="bg-blue-600"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Pending"
          value={stats.pendingComplaints}
          icon={Clock}
          color="bg-amber-600"
          trend={{ value: 8, isPositive: false }}
        />
        <StatsCard
          title="In Progress"
          value={stats.inProgressComplaints}
          icon={AlertCircle}
          color="bg-indigo-600"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Resolved"
          value={stats.resolvedComplaints}
          icon={CheckCircle}
          color="bg-green-600"
          trend={{ value: 23, isPositive: true }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">
            {user.role === 'admin' ? 'Recent Complaints' : 'Your Recent Complaints'}
          </h2>
          <div className="space-y-4">
            {userComplaints.length > 0 ? (
              userComplaints.map(complaint => (
                <ComplaintCard
                  key={complaint.id}
                  complaint={complaint}
                  onClick={() => onComplaintClick(complaint)}
                  showUserInfo={user.role === 'admin'}
                />
              ))
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-lg">
                <FileText size={48} className="mx-auto text-gray-400 mb-4" />
                <p className="text-gray-500">
                  {user.role === 'admin' 
                    ? 'No complaints found'
                    : 'You haven\'t submitted any complaints yet'
                  }
                </p>
              </div>
            )}
          </div>
        </div>

        {user.role === 'admin' && (
          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Latest Activity
            </h2>
            <div className="space-y-4">
              {recentComplaints.map(complaint => (
                <div key={complaint.id} className="flex items-center p-4 bg-white border border-gray-200 rounded-lg">
                  <div className="flex-shrink-0 mr-4">
                    <div className={`p-2 rounded-full ${
                      complaint.status === 'pending' ? 'bg-yellow-100' :
                      complaint.status === 'in-progress' ? 'bg-blue-100' :
                      complaint.status === 'resolved' ? 'bg-green-100' :
                      'bg-gray-100'
                    }`}>
                      <FileText size={16} className={
                        complaint.status === 'pending' ? 'text-yellow-600' :
                        complaint.status === 'in-progress' ? 'text-blue-600' :
                        complaint.status === 'resolved' ? 'text-green-600' :
                        'text-gray-600'
                      } />
                    </div>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {complaint.title}
                    </p>
                    <p className="text-sm text-gray-500">
                      by {complaint.userName} • {new Date(complaint.createdAt).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;