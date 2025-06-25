import React from 'react';
import { User, LogOut, Settings } from 'lucide-react';
import { User as UserType } from '../../types';

interface HeaderProps {
  user: UserType | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ user, onLogout }) => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-semibold text-gray-900">
              ComplaintHub
            </h1>
          </div>
          
          {user && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User size={20} className="text-gray-400" />
                <span className="text-sm font-medium text-gray-700">
                  {user.name}
                </span>
                {user.role === 'admin' && (
                  <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                    Admin
                  </span>
                )}
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 text-gray-400 hover:text-gray-500 transition-colors">
                  <Settings size={18} />
                </button>
                <button
                  onClick={onLogout}
                  className="p-2 text-gray-400 hover:text-gray-500 transition-colors"
                >
                  <LogOut size={18} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;