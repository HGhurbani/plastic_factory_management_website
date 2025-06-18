import React from 'react';
import { motion } from 'framer-motion';
import { Shield, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const QualityHeader = ({ onNewInspection }) => {
  const { t, isRTL } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3 rtl:space-x-reverse">
          <Shield className="w-8 h-8 text-green-600" />
          <span>{t('quality')}</span>
        </h1>
        <p className="text-gray-600 mt-1">
          {isRTL ? 'إدارة فحوصات الجودة ومراقبة المعايير' : 'Manage quality inspections and monitor standards'}
        </p>
      </div>
      <Button onClick={onNewInspection} className="btn-primary">
        <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        {isRTL ? 'فحص جودة جديد' : 'New Quality Inspection'}
      </Button>
    </motion.div>
  );
};

export default QualityHeader;