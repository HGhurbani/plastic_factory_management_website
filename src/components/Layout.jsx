
import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  LayoutDashboard, 
  Factory, 
  ShoppingCart, 
  Package, 
  Shield, 
  Wrench, 
  FileText, 
  Settings, 
  LogOut, 
  Menu, 
  X,
  Bell,
  User,
  Globe,
  ChevronDown
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';

const Layout = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { t, language, changeLanguage, isRTL } = useLanguage();
  const { user, logout, hasPermission } = useAuth();
  const { toast } = useToast();

  const menuItems = [
    { 
      path: '/', 
      icon: LayoutDashboard, 
      label: t('dashboard'), 
      permission: 'all' 
    },
    { 
      path: '/production', 
      icon: Factory, 
      label: t('production'), 
      permission: 'production' 
    },
    { 
      path: '/sales', 
      icon: ShoppingCart, 
      label: t('sales'), 
      permission: 'sales' 
    },
    { 
      path: '/inventory', 
      icon: Package, 
      label: t('inventory'), 
      permission: 'inventory' 
    },
    { 
      path: '/quality', 
      icon: Shield, 
      label: t('quality'), 
      permission: 'quality' 
    },
    { 
      path: '/maintenance', 
      icon: Wrench, 
      label: t('maintenance'), 
      permission: 'maintenance' 
    },
    { 
      path: '/reports', 
      icon: FileText, 
      label: t('reports'), 
      permission: 'reports' 
    },
    { 
      path: '/settings', 
      icon: Settings, 
      label: t('settings'), 
      permission: 'settings' 
    }
  ];

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast({
      title: t('success'),
      description: 'تم تسجيل الخروج بنجاح',
    });
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    changeLanguage(newLanguage);
    toast({
      title: t('success'),
      description: language === 'ar' ? 'Language changed to English' : 'تم تغيير اللغة إلى العربية',
    });
  };

  const filteredMenuItems = menuItems.filter(item => 
    item.permission === 'all' || hasPermission(item.permission)
  );

  return (
    <div className={`min-h-screen bg-gray-50 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      {/* Sidebar */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          >
            <div className="absolute inset-0 bg-black opacity-50"></div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div
        initial={false}
        animate={{
          x: sidebarOpen ? 0 : isRTL ? 280 : -280,
        }}
        className={`fixed top-0 ${isRTL ? 'right-0' : 'left-0'} z-50 h-full w-70 sidebar-gradient shadow-xl lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between p-6 border-b border-white/20">
          <div className="flex items-center space-x-3 rtl:space-x-reverse">
            <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
              <Factory className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg">
                {isRTL ? 'نظام إدارة المصنع' : 'Factory Management'}
              </h1>
              <p className="text-white/70 text-sm">
                {isRTL ? 'نظام متكامل' : 'Integrated System'}
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-white hover:bg-white/20"
            onClick={() => setSidebarOpen(false)}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>

        <nav className="p-4 space-y-2">
          {filteredMenuItems.map((item) => {
            const Icon = item.icon;
            const isActive = location.pathname === item.path;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-white/20 text-white shadow-lg'
                    : 'text-white/80 hover:bg-white/10 hover:text-white'
                }`}
                onClick={() => setSidebarOpen(false)}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-4 left-4 right-4">
          <Button
            variant="ghost"
            className="w-full text-white/80 hover:bg-white/10 hover:text-white justify-start"
            onClick={handleLogout}
          >
            <LogOut className={`w-5 h-5 ${isRTL ? 'ml-3' : 'mr-3'}`} />
            {t('logout')}
          </Button>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className={`lg:${isRTL ? 'mr-70' : 'ml-70'} min-h-screen`}>
        {/* Header */}
        <header className="bg-white shadow-sm border-b border-gray-200">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="w-5 h-5" />
              </Button>
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {t('welcomeBack')}, {isRTL ? user?.name : user?.nameEn}
                </h2>
                <p className="text-sm text-gray-500">
                  {isRTL ? user?.roleInfo?.nameAr : user?.roleInfo?.name}
                </p>
              </div>
            </div>

            <div className="flex items-center space-x-4 rtl:space-x-reverse">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleLanguage}
                className="relative"
              >
                <Globe className="w-5 h-5" />
                <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {language.toUpperCase()}
                </span>
              </Button>

              {/* Notifications */}
              <Button
                variant="ghost"
                size="icon"
                className="relative"
                onClick={() => toast({ title: t('featureNotImplemented') })}
              >
                <Bell className="w-5 h-5" />
                <div className="notification-dot"></div>
              </Button>

              {/* Profile Dropdown */}
              <div className="relative">
                <Button
                  variant="ghost"
                  className="flex items-center space-x-2 rtl:space-x-reverse"
                  onClick={() => setProfileOpen(!profileOpen)}
                >
                  <img
                    src={user?.avatar}
                    alt="Profile"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                  <ChevronDown className="w-4 h-4" />
                </Button>

                <AnimatePresence>
                  {profileOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`absolute top-full ${isRTL ? 'left-0' : 'right-0'} mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50`}
                    >
                      <div className="px-4 py-2 border-b border-gray-100">
                        <p className="font-medium text-gray-900">
                          {isRTL ? user?.name : user?.nameEn}
                        </p>
                        <p className="text-sm text-gray-500">{user?.email}</p>
                      </div>
                      <Button
                        variant="ghost"
                        className="w-full justify-start px-4 py-2 text-red-600 hover:bg-red-50"
                        onClick={handleLogout}
                      >
                        <LogOut className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                        {t('logout')}
                      </Button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main className="p-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            {children}
          </motion.div>
        </main>
      </div>
    </div>
  );
};

export default Layout;
