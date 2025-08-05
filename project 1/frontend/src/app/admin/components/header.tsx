'use client';
import { useState } from 'react';
import { 
  FiHome, 
  FiUsers, 
  FiShoppingBag, 
  FiSettings, 
  FiLogOut,
  FiMenu,
  FiX,
  FiPackage,
  FiTrendingUp
} from 'react-icons/fi';

const menuItems = [
  { icon: FiHome, label: 'Dashboard', href: '/admin' },
  { icon: FiUsers, label: 'Users', href: '/admin/users' },
  { icon: FiShoppingBag, label: 'Products', href: '/admin/products' },
  { icon: FiPackage, label: 'Orders', href: '/admin/orders' },
  { icon: FiTrendingUp, label: 'Analytics', href: '/admin/analytics' },
  { icon: FiSettings, label: 'Settings', href: '/admin/settings' },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('user');
    window.location.href = '/Login';
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between h-16 px-6 border-b border-gray-200">
            <h1 className="text-xl font-bold text-gray-800">Admin Panel</h1>
            <button 
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100"
            >
              <FiX className="w-5 h-5 text-gray-600" />
            </button>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 py-6 space-y-2">
            {menuItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="flex items-center px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 hover:text-gray-900 transition-colors duration-200 group"
              >
                <item.icon className="w-5 h-5 mr-3 text-gray-500 group-hover:text-gray-700" />
                <span className="font-medium">{item.label}</span>
              </a>
            ))}
          </nav>

          {/* User section */}
          <div className="border-t border-gray-200 p-4">
            <div className="flex items-center mb-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <FiUsers className="w-5 h-5 text-gray-600" />
              </div>
              <div className="ml-3">
                <p className="text-sm font-medium text-gray-900">Admin User</p>
                <p className="text-xs text-gray-500">admin@site.com</p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-red-600 rounded-lg hover:bg-red-50 transition-colors duration-200"
            >
              <FiLogOut className="w-4 h-4 mr-3" />
              Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col lg:ml-0">
        {/* Top bar */}
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

        {/* Page content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}