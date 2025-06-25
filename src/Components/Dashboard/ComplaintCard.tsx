import React from 'react';
import { Calendar, User, AlertCircle } from 'lucide-react';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { Complaint } from '../../types';
import { STATUS_TYPES, PRIORITY_LEVELS } from '../../utils/constants';

interface ComplaintCardProps {
  complaint: Complaint;
  onClick?: () => void;
  showUserInfo?: boolean;
}

const ComplaintCard: React.FC<ComplaintCardProps> = ({
  complaint,
  onClick,
  showUserInfo = false
}) => {
  const statusConfig = STATUS_TYPES.find(s => s.value === complaint.status);
  const priorityConfig = PRIORITY_LEVELS.find(p => p.value === complaint.priority);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <Card 
      className={`cursor-pointer hover:shadow-md transition-shadow duration-200 ${onClick ? 'hover:bg-gray-50' : ''}`}
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900 line-clamp-1">
          {complaint.title}
        </h3>
        <div className="flex space-x-2">
          {priorityConfig && (
            <Badge variant="warning" size="sm">
              {priorityConfig.label}
            </Badge>
          )}
          {statusConfig && (
            <Badge
              variant={
                complaint.status === 'resolved' ? 'success' :
                complaint.status === 'in-progress' ? 'primary' :
                complaint.status === 'pending' ? 'warning' : 'default'
              }
              size="sm"
            >
              {statusConfig.label}
            </Badge>
          )}
        </div>
      </div>

      <p className="text-gray-600 text-sm mb-4 line-clamp-2">
        {complaint.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500">
        <div className="flex items-center space-x-4">
          {showUserInfo && (
            <div className="flex items-center">
              <User size={16} className="mr-1" />
              <span>{complaint.userName}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar size={16} className="mr-1" />
            <span>{formatDate(complaint.createdAt)}</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <AlertCircle size={16} className="mr-1" />
          <span className="capitalize">{complaint.category}</span>
        </div>
      </div>
    </Card>
  );
};

export default ComplaintCard;