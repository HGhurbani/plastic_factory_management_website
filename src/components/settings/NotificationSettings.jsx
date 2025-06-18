import React, { useState } from 'react';
import { Bell, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

const NotificationSettings = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [notifications, setNotifications] = useState({
    emailNotifications: true,
    smsNotifications: false,
    pushNotifications: true,
    productionAlerts: true,
    qualityAlerts: true,
    maintenanceAlerts: true,
    salesAlerts: false
  });

  const handleNotificationChange = (key) => {
    setNotifications(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleSaveNotifications = () => {
    toast({
      title: t('success'),
      description: isRTL ? 'تم حفظ إعدادات الإشعارات بنجاح' : 'Notification settings saved successfully'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Bell className="w-5 h-5" />
          <span>{isRTL ? 'إعدادات الإشعارات' : 'Notification Settings'}</span>
        </CardTitle>
        <CardDescription>
          {isRTL ? 'إدارة تفضيلات الإشعارات' : 'Manage your notification preferences'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          {[
            { key: 'emailNotifications', label: isRTL ? 'إشعارات البريد الإلكتروني' : 'Email Notifications' },
            { key: 'smsNotifications', label: isRTL ? 'إشعارات الرسائل النصية' : 'SMS Notifications' },
            { key: 'pushNotifications', label: isRTL ? 'الإشعارات المنبثقة' : 'Push Notifications' },
            { key: 'productionAlerts', label: isRTL ? 'تنبيهات الإنتاج' : 'Production Alerts' },
            { key: 'qualityAlerts', label: isRTL ? 'تنبيهات الجودة' : 'Quality Alerts' },
            { key: 'maintenanceAlerts', label: isRTL ? 'تنبيهات الصيانة' : 'Maintenance Alerts' },
            { key: 'salesAlerts', label: isRTL ? 'تنبيهات المبيعات' : 'Sales Alerts' }
          ].map((notification) => (
            <div key={notification.key} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <span className="font-medium text-gray-900">{notification.label}</span>
              <button
                onClick={() => handleNotificationChange(notification.key)}
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  notifications[notification.key] ? 'bg-blue-600' : 'bg-gray-300'
                }`}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    notifications[notification.key] ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                  }`}
                />
              </button>
            </div>
          ))}
        </div>

        <Button onClick={handleSaveNotifications} className="btn-primary">
          <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('save')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default NotificationSettings;