import React from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, BarChart3, CheckCircle, XCircle } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { useLanguage } from '@/contexts/LanguageContext';

const QualityStats = ({ inspections }) => {
  const { t, isRTL } = useLanguage();

  const totalInspections = inspections.length;
  const passedInspections = inspections.filter(i => i.result === 'passed').length;
  const failedInspections = inspections.filter(i => i.result === 'failed').length;
  const averageScore = totalInspections > 0 ? inspections.reduce((sum, i) => sum + i.qualityScore, 0) / totalInspections : 0;
  
  const getScoreColor = (score) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  const stats = [
    { title: t('qualityScore'), value: `${averageScore.toFixed(1)}%`, icon: TrendingUp, color: getScoreColor(averageScore).split(' ')[0].replace('text-','') },
    { title: isRTL ? 'إجمالي الفحوصات' : 'Total Inspections', value: totalInspections, icon: BarChart3, color: 'blue' },
    { title: t('passed'), value: passedInspections, icon: CheckCircle, color: 'green' },
    { title: t('failed'), value: failedInspections, icon: XCircle, color: 'red' },
  ];

  const getColorClasses = (color) => {
    switch (color) {
      case 'green': return 'bg-green-100 text-green-600';
      case 'blue': return 'bg-blue-100 text-blue-600';
      case 'yellow': return 'bg-yellow-100 text-yellow-600';
      case 'red': return 'bg-red-100 text-red-600';
      default: return `bg-${color}-100 text-${color}-600`;
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
                    <p className={`text-2xl font-bold ${stat.title === t('qualityScore') ? getScoreColor(averageScore) : 'text-gray-900'}`}>{stat.value}</p>
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

export default QualityStats;