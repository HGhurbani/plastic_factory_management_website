import React, { useState } from 'react';
import { Shield, Eye, EyeOff } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

const SecuritySettings = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const [showPassword, setShowPassword] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleChangePassword = () => {
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: t('error'),
        description: isRTL ? 'كلمات المرور غير متطابقة' : 'Passwords do not match',
        variant: 'destructive'
      });
      return;
    }
    
    toast({
      title: t('success'),
      description: isRTL ? 'تم تغيير كلمة المرور بنجاح' : 'Password changed successfully'
    });
    
    setPasswordData({
      currentPassword: '',
      newPassword: '',
      confirmPassword: ''
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <Shield className="w-5 h-5" />
          <span>{isRTL ? 'إعدادات الأمان' : 'Security Settings'}</span>
        </CardTitle>
        <CardDescription>
          {isRTL ? 'إدارة كلمة المرور وإعدادات الأمان' : 'Manage password and security settings'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">
              {isRTL ? 'كلمة المرور الحالية' : 'Current Password'}
            </Label>
            <div className="relative">
              <Input
                id="currentPassword"
                name="currentPassword"
                type={showPassword ? 'text' : 'password'}
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className={`${isRTL ? 'pl-10' : 'pr-10'} input-field`}
              />
              <Button
                type="button"
                variant="ghost"
                size="icon"
                className={`absolute top-1 ${isRTL ? 'left-1' : 'right-1'}`}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">
              {isRTL ? 'كلمة المرور الجديدة' : 'New Password'}
            </Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              value={passwordData.newPassword}
              onChange={handlePasswordChange}
              className="input-field"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">
              {isRTL ? 'تأكيد كلمة المرور' : 'Confirm Password'}
            </Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              value={passwordData.confirmPassword}
              onChange={handlePasswordChange}
              className="input-field"
            />
          </div>
        </div>

        <Button onClick={handleChangePassword} className="btn-primary">
          <Shield className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {isRTL ? 'تغيير كلمة المرور' : 'Change Password'}
        </Button>
      </CardContent>
    </Card>
  );
};

export default SecuritySettings;