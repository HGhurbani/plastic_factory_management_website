import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Settings, User, Bell, Shield } from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';
import ProfileSettings from '@/components/settings/ProfileSettings';
import NotificationSettings from '@/components/settings/NotificationSettings';
import SecuritySettings from '@/components/settings/SecuritySettings';
import SystemSettings from '@/components/settings/SystemSettings';

const SettingsPage = () => {
  const { t, isRTL } = useLanguage();

  const settingsSections = [
    {
      id: 'profile',
      title: isRTL ? 'الملف الشخصي' : 'Profile Settings',
      icon: User,
      component: <ProfileSettings />
    },
    {
      id: 'notifications',
      title: isRTL ? 'الإشعارات' : 'Notifications',
      icon: Bell,
      component: <NotificationSettings />
    },
    {
      id: 'security',
      title: isRTL ? 'الأمان' : 'Security',
      icon: Shield,
      component: <SecuritySettings />
    },
    {
      id: 'system',
      title: isRTL ? 'النظام' : 'System',
      icon: Settings,
      component: <SystemSettings />
    }
  ];

  const [activeSection, setActiveSection] = useState('profile');

  const ActiveComponent = settingsSections.find(s => s.id === activeSection)?.component;

  return (
    <Layout>
      <div className="space-y-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
        >
          <div>
            <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3 rtl:space-x-reverse">
              <Settings className="w-8 h-8 text-blue-600" />
              <span>{t('settings')}</span>
            </h1>
            <p className="text-gray-600 mt-1">
              {isRTL ? 'إدارة إعدادات النظام والملف الشخصي' : 'Manage system settings and profile'}
            </p>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1"
          >
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">
                  {isRTL ? 'أقسام الإعدادات' : 'Settings Sections'}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {settingsSections.map((section) => {
                    const Icon = section.icon;
                    return (
                      <button
                        key={section.id}
                        onClick={() => setActiveSection(section.id)}
                        className={`w-full flex items-center space-x-3 rtl:space-x-reverse px-4 py-3 text-left rtl:text-right transition-colors ${
                          activeSection === section.id
                            ? 'bg-blue-50 text-blue-700 border-r-2 rtl:border-r-0 rtl:border-l-2 border-blue-700'
                            : 'text-gray-600 hover:bg-gray-50'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{section.title}</span>
                      </button>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3"
          >
            {ActiveComponent}
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default SettingsPage;