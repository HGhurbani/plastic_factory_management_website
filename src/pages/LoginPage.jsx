import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Factory, Mail, Lock, Eye, EyeOff, Globe } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { user, login } = useAuth();
  const { t, language, changeLanguage, isRTL } = useLanguage();
  const { toast } = useToast();

  if (user) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const result = await login(email, password);
    
    if (result.success) {
      toast({
        title: t('success'),
        description: isRTL ? 'تم تسجيل الدخول بنجاح' : 'Login successful',
      });
    } else {
      toast({
        title: t('error'),
        description: isRTL ? `فشل تسجيل الدخول: ${result.error}` : `Login failed: ${result.error}`,
        variant: 'destructive',
      });
    }
    
    setLoading(false);
  };

  const toggleLanguage = () => {
    const newLanguage = language === 'ar' ? 'en' : 'ar';
    changeLanguage(newLanguage);
  };

  const demoCredentials = [
    { email: 'manager@factory.com', role: isRTL ? 'مدير المصنع' : 'Factory Manager' },
    { email: 'operations@factory.com', role: isRTL ? 'مسؤول العمليات' : 'Operations Manager' },
    { email: 'quality@factory.com', role: isRTL ? 'مراقب الجودة' : 'Quality Controller' }
  ];

  return (
    <div className={`min-h-screen gradient-bg flex items-center justify-center p-4 ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="absolute top-4 right-4">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleLanguage}
          className="text-white hover:bg-white/20"
        >
          <Globe className="w-5 h-5" />
        </Button>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="glass-effect border-white/20 shadow-2xl">
          <CardHeader className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="mx-auto w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center"
            >
              <Factory className="w-8 h-8 text-white" />
            </motion.div>
            <div>
              <CardTitle className="text-2xl font-bold text-white">
                {isRTL ? 'نظام إدارة المصنع' : 'Factory Management System'}
              </CardTitle>
              <CardDescription className="text-white/80">
                {isRTL ? 'نظام متكامل لإدارة العمليات الصناعية' : 'Integrated Industrial Operations Management'}
              </CardDescription>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-white">
                  {t('email')}
                </Label>
                <div className="relative">
                  <Mail className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className={`${isRTL ? 'pr-10' : 'pl-10'} bg-white/10 border-white/20 text-white placeholder:text-white/60`}
                    placeholder={isRTL ? 'أدخل البريد الإلكتروني' : 'Enter your email'}
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">
                  {t('password')}
                </Label>
                <div className="relative">
                  <Lock className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className={`${isRTL ? 'pr-10 pl-10' : 'pl-10 pr-10'} bg-white/10 border-white/20 text-white placeholder:text-white/60`}
                    placeholder={isRTL ? 'أدخل كلمة المرور' : 'Enter your password'}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className={`absolute top-1 ${isRTL ? 'left-1' : 'right-1'} text-gray-400 hover:text-white`}
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </Button>
                </div>
              </div>

              <Button
                type="submit"
                className="w-full btn-primary"
                disabled={loading}
              >
                {loading ? (
                  <div className="loading-spinner"></div>
                ) : (
                  t('login')
                )}
              </Button>
            </form>

            <div className="space-y-3">
              <p className="text-white/80 text-sm text-center">
                {isRTL ? 'حسابات تجريبية (للتسجيل في Firebase):' : 'Demo Accounts (for Firebase Sign-up):'}
              </p>
              <div className="space-y-2">
                {demoCredentials.map((cred, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="bg-white/10 rounded-lg p-3 cursor-pointer hover:bg-white/20 transition-all"
                    onClick={() => {
                      setEmail(cred.email);
                      setPassword('password123'); // Default password for demo users
                    }}
                  >
                    <p className="text-white text-sm font-medium">{cred.email}</p>
                    <p className="text-white/70 text-xs">{cred.role}</p>
                  </motion.div>
                ))}
              </div>
              <p className="text-white/60 text-xs text-center">
                {isRTL ? 'كلمة المرور الافتراضية للحسابات التجريبية: password123' : 'Default password for demo accounts: password123'}
                <br/>
                {isRTL ? 'ملاحظة: تحتاج لإنشاء هذه الحسابات في لوحة تحكم Firebase Authentication أولاً.' : 'Note: You need to create these accounts in Firebase Authentication console first.'}
              </p>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-white/10 rounded-full animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-white/5 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white/5 rounded-full animate-pulse-slow"></div>
      </div>
    </div>
  );
};

export default LoginPage;