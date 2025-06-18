import React from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const SalesHeader = ({ onNewOrder }) => {
  const { t, isRTL } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3 rtl:space-x-reverse">
          <ShoppingCart className="w-8 h-8 text-green-600" />
          <span>{t('sales')}</span>
        </h1>
        <p className="text-gray-600 mt-1">
          {isRTL ? 'إدارة أوامر المبيعات ومتابعة العملاء' : 'Manage sales orders and track customers'}
        </p>
      </div>
      <Button onClick={onNewOrder} className="btn-primary">
        <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        {t('newSalesOrder')}
      </Button>
    </motion.div>
  );
};

export default SalesHeader;