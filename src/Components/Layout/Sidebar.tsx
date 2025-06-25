import React from 'react';
import { Home, FileText, Plus, Users, BarChart3 } from 'lucide-react';
import { User } from '../../types';

interface SidebarProps {
  user: User | null;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ user, activeTab, onTabChange }) => {
  const userNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'complaints', label: 'My Complaints', icon: FileText },
    { id: 'submit', label: 'Submit Complaint', icon: Plus }
  ];

  const adminNavItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Home },
    { id: 'all-complaints', label: 'All Complaints', icon: FileText },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 }
  ];

  const navItems = user?.role === 'admin' ? adminNavItems : userNavItems;

  return (
    <div className="w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen">
      <nav className="mt-8 px-4">
        <ul className="space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onTabChange(item.id)}
                  className={`
                    w-full flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors
                    ${isActive
                      ? 'bg-blue-50 text-blue-700 border-blue-200'
                      : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                    }
                  `}
                >
                  <Icon size={20} className="mr-3" />
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default Sidebar;