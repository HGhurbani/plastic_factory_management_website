import React from 'react';
import { motion } from 'framer-motion';
import { Package, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const InventoryHeader = ({ onNewItem }) => {
  const { t, isRTL } = useLanguage();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4"
    >
      <div>
        <h1 className="text-3xl font-bold text-gray-900 flex items-center space-x-3 rtl:space-x-reverse">
          <Package className="w-8 h-8 text-purple-600" />
          <span>{t('inventory')}</span>
        </h1>
        <p className="text-gray-600 mt-1">
          {isRTL ? 'إدارة المخزون ومتابعة المستويات' : 'Manage inventory and track stock levels'}
        </p>
      </div>
      <Button onClick={onNewItem} className="btn-primary">
        <Plus className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
        {isRTL ? 'إضافة عنصر جديد' : 'Add New Item'}
      </Button>
    </motion.div>
  );
};

export default InventoryHeader;