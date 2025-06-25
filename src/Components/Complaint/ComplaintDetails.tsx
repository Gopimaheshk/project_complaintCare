import React, { useState } from 'react';
import { Calendar, User, Tag, AlertCircle, Clock, MessageSquare } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import Button from '../ui/Button';
import { Complaint, User as UserType } from '../../types';
import { STATUS_TYPES, PRIORITY_LEVELS } from '../../utils/constants';

interface ComplaintDetailsProps {
  complaint: Complaint;
  user: UserType;
  onStatusUpdate?: (complaintId: string, status: string, adminNotes: string) => void;
  onClose: () => void;
}

const ComplaintDetails: React.FC<ComplaintDetailsProps> = ({
  complaint,
  user,
  onStatusUpdate,
  onClose
}) => {
  const [newStatus, setNewStatus] = useState(complaint.status);
  const [adminNotes, setAdminNotes] = useState(complaint.adminNotes || '');
  const [isUpdating, setIsUpdating] = useState(false);

  const statusConfig = STATUS_TYPES.find(s => s.value === complaint.status);
  const priorityConfig = PRIORITY_LEVELS.find(p => p.value === complaint.priority);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const handleStatusUpdate = async () => {
    if (!onStatusUpdate) return;
    
    setIsUpdating(true);
    try {
      await onStatusUpdate(complaint.id, newStatus, adminNotes);
      onClose();
    } catch (error) {
      console.error('Error updating status:', error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">
            {complaint.title}
          </h1>
          <div className="flex space-x-2">
            {priorityConfig && (
              <Badge variant="warning" size="md">
                {priorityConfig.label} Priority
              </Badge>
            )}
            {statusConfig && (
              <Badge
                variant={
                  complaint.status === 'resolved' ? 'success' :
                  complaint.status === 'in-progress' ? 'primary' :
                  complaint.status === 'pending' ? 'warning' : 'default'
                }
                size="md"
              >
                {statusConfig.label}
              </Badge>
            )}
          </div>
        </div>
      </div>

      <Card>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Complaint Details</h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center text-sm text-gray-600">
              <User size={16} className="mr-2" />
              <span className="font-medium">Submitted by:</span>
              <span className="ml-1">{complaint.userName}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Calendar size={16} className="mr-2" />
              <span className="font-medium">Created:</span>
              <span className="ml-1">{formatDate(complaint.createdAt)}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Tag size={16} className="mr-2" />
              <span className="font-medium">Category:</span>
              <span className="ml-1">{complaint.category}</span>
            </div>
            
            <div className="flex items-center text-sm text-gray-600">
              <Clock size={16} className="mr-2" />
              <span className="font-medium">Last Updated:</span>
              <span className="ml-1">{formatDate(complaint.updatedAt)}</span>
            </div>
          </div>

          <div>
            <h4 className="font-medium text-gray-900 mb-2">Description</h4>
            <p className="text-gray-700 leading-relaxed">{complaint.description}</p>
          </div>

          {complaint.adminNotes && (
            <div>
              <h4 className="font-medium text-gray-900 mb-2 flex items-center">
                <MessageSquare size={16} className="mr-2" />
                Admin Notes
              </h4>
              <div className="bg-blue-50 p-3 rounded-lg">
                <p className="text-blue-900">{complaint.adminNotes}</p>
              </div>
            </div>
          )}
        </div>
      </Card>

      {user.role === 'admin' && onStatusUpdate && (
        <Card>
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Admin Actions</h3>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Update Status
              </label>
              <select
                value={newStatus}
                onChange={(e) => setNewStatus(e.target.value)}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                {STATUS_TYPES.map(status => (
                  <option key={status.value} value={status.value}>
                    {status.label}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Admin Notes
              </label>
              <textarea
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={4}
                className="block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
                placeholder="Add notes about the complaint resolution..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={handleStatusUpdate}
                isLoading={isUpdating}
                disabled={isUpdating}
              >
                Update Complaint
              </Button>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};

export default ComplaintDetails;