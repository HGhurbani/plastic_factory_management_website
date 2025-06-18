import React from 'react';
import { motion } from 'framer-motion';
import { Factory, Play, CheckCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductionStats = ({ orders }) => {
  const { t, isRTL } = useLanguage();

  const totalOrders = orders.length;
  const inProgressOrders = orders.filter(o => o.status === 'inProgress').length;
  const completedOrders = orders.filter(o => o.status === 'completed').length;
  const dailyProduction = 1250; // Placeholder

  const stats = [
    { title: isRTL ? 'إجمالي الأوامر' : 'Total Orders', value: totalOrders, icon: Factory, color: 'blue' },
    { title: isRTL ? 'قيد التنفيذ' : 'In Progress', value: inProgressOrders, icon: Play, color: 'blue' },
    { title: isRTL ? 'مكتملة' : 'Completed', value: completedOrders, icon: CheckCircle, color: 'green' },
    { title: isRTL ? 'الإنتاجية اليومية' : 'Daily Production', value: dailyProduction, icon: Factory, color: 'purple' },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'green': return 'bg-green-100 text-green-600';
      case 'purple': return 'bg-purple-100 text-purple-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
      {stats.map((stat, index) => {
        const Icon = stat.icon;
        const colorClasses = getColorClasses(stat.color);
        return (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * (index + 1) }}
          >
            <Card className="card-hover">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                  </div>
                  <div className={`w-12 h-12 rounded-lg ${colorClasses.split(' ')[0]} flex items-center justify-center`}>
                    <Icon className={`w-6 h-6 ${colorClasses.split(' ')[1]}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
};

export default ProductionStats;