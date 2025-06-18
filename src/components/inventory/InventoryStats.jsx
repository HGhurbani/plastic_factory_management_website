import React from 'react';
import { motion } from 'framer-motion';
import { BarChart3, Package as PackageIcon, AlertTriangle, TrendingDown } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const InventoryStats = ({ items }) => {
  const { t, isRTL } = useLanguage();

  const totalValue = items.reduce((sum, item) => sum + item.totalValue, 0);
  const lowStockItems = items.filter(item => item.status === 'lowStock').length;
  const outOfStockItems = items.filter(item => item.status === 'outOfStock').length;
  const totalItems = items.length;

  const stats = [
    { title: t('inventoryValue'), value: `$${totalValue.toLocaleString()}`, icon: BarChart3, color: 'purple' },
    { title: isRTL ? 'إجمالي العناصر' : 'Total Items', value: totalItems, icon: PackageIcon, color: 'blue' },
    { title: isRTL ? 'مخزون منخفض' : 'Low Stock Items', value: lowStockItems, icon: AlertTriangle, color: 'yellow' },
    { title: isRTL ? 'نفد المخزون' : 'Out of Stock', value: outOfStockItems, icon: TrendingDown, color: 'red' },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'purple': return 'bg-purple-100 text-purple-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'red': return 'bg-red-100 text-red-600';
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

export default InventoryStats;