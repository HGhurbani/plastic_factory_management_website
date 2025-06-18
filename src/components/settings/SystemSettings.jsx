import React, { useState } from 'react';
import { Settings, Save } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

const SystemSettings = () => {
  const { t, language, changeLanguage, isRTL } = useLanguage();
  const { toast } = useToast();

  const [systemSettings, setSystemSettings] = useState({
    language: language,
    theme: 'light',
    timezone: 'Asia/Riyadh',
    dateFormat: 'DD/MM/YYYY',
    currency: 'SAR',
    autoBackup: true,
    backupFrequency: 'daily'
  });

  const handleSystemSettingChange = (key, value) => {
    setSystemSettings(prev => ({
      ...prev,
      [key]: value
    }));
    
    if (key === 'language') {
      changeLanguage(value);
    }
  };

  const handleSaveSystem = () => {
    toast({
      title: t('success'),
      description: isRTL ? 'تم حفظ إعدادات النظام بنجاح' : 'System settings saved successfully'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Settings className="w-5 h-5" />
          <span>{isRTL ? 'إعدادات النظام' : 'System Settings'}</span>
        </CardTitle>
        <CardDescription>
          {isRTL ? 'إدارة إعدادات النظام العامة' : 'Manage general system settings'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>{isRTL ? 'اللغة' : 'Language'}</Label>
            <div className="flex gap-2">
              <Button
                variant={systemSettings.language === 'ar' ? 'default' : 'outline'}
                onClick={() => handleSystemSettingChange('language', 'ar')}
                className="flex-1"
              >
                العربية
              </Button>
              <Button
                variant={systemSettings.language === 'en' ? 'default' : 'outline'}
                onClick={() => handleSystemSettingChange('language', 'en')}
                className="flex-1"
              >
                English
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>{isRTL ? 'المنطقة الزمنية' : 'Timezone'}</Label>
            <select
              value={systemSettings.timezone}
              onChange={(e) => handleSystemSettingChange('timezone', e.target.value)}
              className="input-field w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="Asia/Riyadh">{isRTL ? 'الرياض' : 'Riyadh'}</option>
              <option value="Asia/Dubai">{isRTL ? 'دبي' : 'Dubai'}</option>
              <option value="UTC">UTC</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>{isRTL ? 'تنسيق التاريخ' : 'Date Format'}</Label>
            <select
              value={systemSettings.dateFormat}
              onChange={(e) => handleSystemSettingChange('dateFormat', e.target.value)}
              className="input-field w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="DD/MM/YYYY">DD/MM/YYYY</option>
              <option value="MM/DD/YYYY">MM/DD/YYYY</option>
              <option value="YYYY-MM-DD">YYYY-MM-DD</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label>{isRTL ? 'العملة' : 'Currency'}</Label>
            <select
              value={systemSettings.currency}
              onChange={(e) => handleSystemSettingChange('currency', e.target.value)}
              className="input-field w-full h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              <option value="SAR">{isRTL ? 'ريال سعودي' : 'Saudi Riyal'}</option>
              <option value="USD">{isRTL ? 'دولار أمريكي' : 'US Dollar'}</option>
              <option value="EUR">{isRTL ? 'يورو' : 'Euro'}</option>
            </select>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div>
              <span className="font-medium text-gray-900">
                {isRTL ? 'النسخ الاحتياطي التلقائي' : 'Auto Backup'}
              </span>
              <p className="text-sm text-gray-500">
                {isRTL ? 'إنشاء نسخ احتياطية تلقائية للبيانات' : 'Automatically create data backups'}
              </p>
            </div>
            <button
              onClick={() => handleSystemSettingChange('autoBackup', !systemSettings.autoBackup)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                systemSettings.autoBackup ? 'bg-blue-600' : 'bg-gray-300'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  systemSettings.autoBackup ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                }`}
              />
            </button>
          </div>
        </div>

        <Button onClick={handleSaveSystem} className="btn-primary">
          <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('save')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SystemSettings;