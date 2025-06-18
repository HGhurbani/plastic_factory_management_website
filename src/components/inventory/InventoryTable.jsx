import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2, Package, AlertTriangle, TrendingDown, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const InventoryTable = ({ items, onViewItem, onEditItem, onDeleteItem }) => {
  const { t, isRTL } = useLanguage();

  const getStatusColor = (status) => {
    switch (status) {
      case 'inStock': return 'bg-green-100 text-green-800';
      case 'lowStock': return 'bg-yellow-100 text-yellow-800';
      case 'outOfStock': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'inStock': return TrendingUp;
      case 'lowStock': return AlertTriangle;
      case 'outOfStock': return TrendingDown;
      default: return Package;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t('stockItems')}</CardTitle>
          <CardDescription>
            {isRTL ? 'قائمة بجميع عناصر المخزون ومستوياتها' : 'List of all inventory items and their levels'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'رمز المنتج' : 'SKU'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'اسم المنتج' : 'Product Name'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الفئة' : 'Category'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('stockLevel')}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'سعر الوحدة' : 'Unit Price'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'القيمة الإجمالية' : 'Total Value'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الموقع' : 'Location'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الحالة' : 'Status'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item, index) => {
                  const StatusIcon = getStatusIcon(item.status);
                  const stockPercentage = (item.currentStock / item.maxStock) * 100;
                  return (
                    <motion.tr
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="table-row border-b border-gray-100"
                    >
                      <td className="p-3"><span className="font-medium text-gray-900">{item.sku}</span></td>
                      <td className="p-3"><span className="text-gray-900">{item.name}</span></td>
                      <td className="p-3"><span className="text-gray-600">{item.category}</span></td>
                      <td className="p-3">
                        <div className="space-y-1">
                          <div className="flex items-center justify-between">
                            <span className="text-sm font-medium text-gray-900">{item.currentStock}</span>
                            <span className="text-xs text-gray-500">{Math.round(stockPercentage)}%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div
                              className={`h-2 rounded-full transition-all duration-300 ${
                                item.status === 'outOfStock' ? 'bg-red-500' :
                                item.status === 'lowStock' ? 'bg-yellow-500' : 'bg-green-500'
                              }`}
                              style={{ width: `${Math.min(stockPercentage, 100)}%` }}
                            ></div>
                          </div>
                          <div className="text-xs text-gray-500">
                            {isRTL ? 'الحد الأدنى:' : 'Min:'} {item.minStock} | {isRTL ? 'الحد الأقصى:' : 'Max:'} {item.maxStock}
                          </div>
                        </div>
                      </td>
                      <td className="p-3"><span className="font-medium text-gray-900">${item.unitPrice.toFixed(2)}</span></td>
                      <td className="p-3"><span className="font-medium text-gray-900">${item.totalValue.toLocaleString()}</span></td>
                      <td className="p-3"><span className="text-gray-600">{item.location}</span></td>
                      <td className="p-3">
                        <span className={`status-badge ${getStatusColor(item.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {item.status === 'inStock' ? (isRTL ? 'متوفر' : 'In Stock') :
                           item.status === 'lowStock' ? (isRTL ? 'مخزون منخفض' : 'Low Stock') :
                           (isRTL ? 'نفد المخزون' : 'Out of Stock')}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="icon" onClick={() => onViewItem(item.id)} className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => onEditItem(item.id)} className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => onDeleteItem(item.id)} className="h-8 w-8 text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
                        </div>
                      </td>
                    </motion.tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InventoryTable;