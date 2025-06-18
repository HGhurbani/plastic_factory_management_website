
import React from 'react';
import { motion } from 'framer-motion';
import { 
  TrendingUp, 
  Package, 
  DollarSign, 
  Shield, 
  Factory, 
  Users, 
  AlertTriangle,
  CheckCircle,
  Clock,
  BarChart3
} from 'lucide-react';
import Layout from '@/components/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/components/ui/use-toast';

const Dashboard = () => {
  const { t, isRTL } = useLanguage();
  const { user } = useAuth();
  const { toast } = useToast();

  const metrics = [
    {
      title: t('totalProduction'),
      value: '2,847',
      change: '+12.5%',
      icon: Factory,
      color: 'from-blue-600 to-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: t('totalSales'),
      value: '$45,230',
      change: '+8.2%',
      icon: DollarSign,
      color: 'from-blue-600 to-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: t('inventoryValue'),
      value: '$128,450',
      change: '-2.1%',
      icon: Package,
      color: 'from-blue-600 to-blue-500',
      bgColor: 'bg-blue-50'
    },
    {
      title: t('qualityScore'),
      value: '98.5%',
      change: '+1.3%',
      icon: Shield,
      color: 'from-blue-600 to-blue-500',
      bgColor: 'bg-blue-50'
    }
  ];

  const recentActivities = [
    {
      id: 1,
      type: 'production',
      title: isRTL ? 'تم إنتاج دفعة جديدة' : 'New batch produced',
      description: isRTL ? 'دفعة رقم #2847 - 500 قطعة' : 'Batch #2847 - 500 units',
      time: isRTL ? 'منذ 5 دقائق' : '5 minutes ago',
      icon: Factory,
      status: 'success'
    },
    {
      id: 2,
      type: 'quality',
      title: isRTL ? 'فحص جودة مكتمل' : 'Quality inspection completed',
      description: isRTL ? 'نتيجة الفحص: نجح' : 'Inspection result: Passed',
      time: isRTL ? 'منذ 15 دقيقة' : '15 minutes ago',
      icon: CheckCircle,
      status: 'success'
    },
    {
      id: 3,
      type: 'maintenance',
      title: isRTL ? 'صيانة مجدولة' : 'Scheduled maintenance',
      description: isRTL ? 'آلة رقم #M-001' : 'Machine #M-001',
      time: isRTL ? 'منذ ساعة' : '1 hour ago',
      icon: AlertTriangle,
      status: 'warning'
    },
    {
      id: 4,
      type: 'sales',
      title: isRTL ? 'طلب مبيعات جديد' : 'New sales order',
      description: isRTL ? 'طلب #SO-1234' : 'Order #SO-1234',
      time: isRTL ? 'منذ ساعتين' : '2 hours ago',
      icon: TrendingUp,
      status: 'info'
    }
  ];

  const quickActions = [
    {
      title: isRTL ? 'أمر إنتاج جديد' : 'New Production Order',
      description: isRTL ? 'إنشاء أمر إنتاج جديد' : 'Create a new production order',
      icon: Factory,
      color: 'from-blue-600 to-blue-500',
      action: () => toast({ title: t('featureNotImplemented') })
    },
    {
      title: isRTL ? 'فحص جودة' : 'Quality Inspection',
      description: isRTL ? 'بدء فحص جودة جديد' : 'Start a new quality inspection',
      icon: Shield,
      color: 'from-blue-600 to-blue-500',
      action: () => toast({ title: t('featureNotImplemented') })
    },
    {
      title: isRTL ? 'تقرير المخزون' : 'Inventory Report',
      description: isRTL ? 'عرض تقرير المخزون' : 'View inventory report',
      icon: Package,
      color: 'from-blue-600 to-blue-500',
      action: () => toast({ title: t('featureNotImplemented') })
    },
    {
      title: isRTL ? 'تحليل الأداء' : 'Performance Analytics',
      description: isRTL ? 'عرض تحليل الأداء' : 'View performance analytics',
      icon: BarChart3,
      color: 'from-blue-600 to-blue-500',
      action: () => toast({ title: t('featureNotImplemented') })
    }
  ];

  return (
    <Layout>
      <div className="space-y-6">
        {/* Welcome Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-gradient-to-r from-blue-600 to-blue-500 rounded-xl p-6 text-white"
        >
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-2">
                {t('welcomeBack')}, {isRTL ? user?.name : user?.nameEn}!
              </h1>
              <p className="text-blue-100">
                {isRTL ? 'إليك نظرة عامة على أداء المصنع اليوم' : 'Here\'s an overview of your factory performance today'}
              </p>
            </div>
            <div className="hidden md:block">
              <img  alt="Factory dashboard illustration" className="w-32 h-32 opacity-80" src="https://images.unsplash.com/photo-1516383274235-5f42d6c6426d" />
            </div>
          </div>
        </motion.div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((metric, index) => {
            const Icon = metric.icon;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="card-hover">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {metric.title}
                        </p>
                        <p className="text-2xl font-bold text-gray-900">
                          {metric.value}
                        </p>
                        <p className={`text-sm ${
                          metric.change.startsWith('+') ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {metric.change}
                        </p>
                      </div>
                      <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${metric.color} flex items-center justify-center`}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Recent Activities */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? 20 : -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <Clock className="w-5 h-5" />
                  <span>{t('recentActivities')}</span>
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'آخر الأنشطة في النظام' : 'Latest activities in the system'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivities.map((activity) => {
                    const Icon = activity.icon;
                    return (
                      <div key={activity.id} className="flex items-start space-x-3 rtl:space-x-reverse">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          activity.status === 'success' ? 'bg-green-100 text-green-600' :
                          activity.status === 'warning' ? 'bg-yellow-100 text-yellow-600' :
                          'bg-blue-100 text-blue-600'
                        }`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-gray-900">
                            {activity.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {activity.description}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Quick Actions */}
          <motion.div
            initial={{ opacity: 0, x: isRTL ? -20 : 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 rtl:space-x-reverse">
                  <TrendingUp className="w-5 h-5" />
                  <span>{t('quickActions')}</span>
                </CardTitle>
                <CardDescription>
                  {isRTL ? 'إجراءات سريعة للمهام الشائعة' : 'Quick actions for common tasks'}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {quickActions.map((action, index) => {
                    const Icon = action.icon;
                    return (
                      <motion.div
                        key={index}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <Button
                          variant="ghost"
                          className="h-auto p-4 flex flex-col items-start space-y-2 w-full hover:bg-gray-50"
                          onClick={action.action}
                        >
                          <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${action.color} flex items-center justify-center`}>
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <div className="text-left rtl:text-right">
                            <p className="font-medium text-gray-900 text-sm">
                              {action.title}
                            </p>
                            <p className="text-xs text-gray-500">
                              {action.description}
                            </p>
                          </div>
                        </Button>
                      </motion.div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
