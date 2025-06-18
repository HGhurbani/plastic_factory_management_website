import React, { useState } from 'react';
import { User, Save, Camera, Mail, Phone, MapPin, Building } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const ProfileSettings = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const [formData, setFormData] = useState({
    name: user?.name || '',
    nameEn: user?.nameEn || '',
    email: user?.email || '',
    phone: '+966 50 123 4567',
    address: isRTL ? 'الرياض، المملكة العربية السعودية' : 'Riyadh, Saudi Arabia',
    company: isRTL ? 'مصنع البلاستيك المتطور' : 'Advanced Plastic Factory',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveProfile = () => {
    toast({
      title: t('success'),
      description: isRTL ? 'تم حفظ الملف الشخصي بنجاح' : 'Profile saved successfully'
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
          <User className="w-5 h-5" />
          <span>{isRTL ? 'الملف الشخصي' : 'Profile Settings'}</span>
        </CardTitle>
        <CardDescription>
          {isRTL ? 'إدارة معلوماتك الشخصية' : 'Manage your personal information'}
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <div className="relative">
            <img
              src={user?.avatar}
              alt="Profile"
              className="w-20 h-20 rounded-full object-cover"
            />
            <Button
              variant="outline"
              size="icon"
              className="absolute -bottom-2 -right-2 h-8 w-8 rounded-full"
              onClick={() => toast({ title: t('featureNotImplemented') })}
            >
              <Camera className="w-4 h-4" />
            </Button>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">
              {isRTL ? 'صورة الملف الشخصي' : 'Profile Picture'}
            </h3>
            <p className="text-sm text-gray-500">
              {isRTL ? 'انقر لتغيير الصورة' : 'Click to change picture'}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="name">
              {isRTL ? 'الاسم (عربي)' : 'Name (Arabic)'}
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="nameEn">
              {isRTL ? 'الاسم (إنجليزي)' : 'Name (English)'}
            </Label>
            <Input
              id="nameEn"
              name="nameEn"
              value={formData.nameEn}
              onChange={handleInputChange}
              className="input-field"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">
              {t('email')}
            </Label>
            <div className="relative">
              <Mail className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`${isRTL ? 'pr-10' : 'pl-10'} input-field`}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">
              {isRTL ? 'رقم الهاتف' : 'Phone Number'}
            </Label>
            <div className="relative">
              <Phone className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
              <Input
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={`${isRTL ? 'pr-10' : 'pl-10'} input-field`}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">
              {isRTL ? 'العنوان' : 'Address'}
            </Label>
            <div className="relative">
              <MapPin className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
              <Input
                id="address"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                className={`${isRTL ? 'pr-10' : 'pl-10'} input-field`}
              />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="company">
              {isRTL ? 'الشركة' : 'Company'}
            </Label>
            <div className="relative">
              <Building className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
              <Input
                id="company"
                name="company"
                value={formData.company}
                onChange={handleInputChange}
                className={`${isRTL ? 'pr-10' : 'pl-10'} input-field`}
              />
            </div>
          </div>
        </div>

        <Button onClick={handleSaveProfile} className="btn-primary">
          <Save className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
          {t('save')}
        </Button>
      </CardContent>
    </Card>
  );
};

export default ProfileSettings;