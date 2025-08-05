'use client';
import { FiMenu } from 'react-icons/fi';

interface AdminHeaderProps {
  setSidebarOpen: (open: boolean) => void;
}

export default function AdminHeader({ setSidebarOpen }: AdminHeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200 h-16 flex items-center justify-between px-6">
      <button
        onClick={() => setSidebarOpen(true)}
        className="lg:hidden p-2 rounded-md hover:bg-gray-100"
      >
        <FiMenu className="w-5 h-5 text-gray-600" />
      </button>
      
      <div className="flex items-center space-x-4">
        <div className="text-sm text-gray-600">
          Welcome back, Admin!
        </div>
      </div>
    </header>
  );
}