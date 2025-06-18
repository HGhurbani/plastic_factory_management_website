import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2, CheckCircle, Clock, AlertTriangle, TrendingUp } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const SalesTable = ({ orders, onViewOrder, onEditOrder, onDeleteOrder }) => {
  const { t, isRTL } = useLanguage();

  const getStatusColor = (status) => {
    switch (status) {
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'delivered': return CheckCircle;
      case 'confirmed': return TrendingUp;
      case 'pending': return Clock;
      case 'cancelled': return AlertTriangle;
      default: return Clock;
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
          <CardTitle>{t('salesOrders')}</CardTitle>
          <CardDescription>
            {isRTL ? 'قائمة بجميع أوامر المبيعات وحالتها' : 'List of all sales orders and their status'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'رقم الأمر' : 'Order ID'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('customerName')}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('orderDate')}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('deliveryDate')}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'المبلغ الإجمالي' : 'Total Amount'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('orderStatus')}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'مندوب المبيعات' : 'Sales Rep'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const StatusIcon = getStatusIcon(order.status);
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="table-row border-b border-gray-100"
                    >
                      <td className="p-3"><span className="font-medium text-gray-900">{order.id}</span></td>
                      <td className="p-3">
                        <div>
                          <span className="text-gray-900 font-medium">{order.customerName}</span>
                          <p className="text-sm text-gray-500">{order.customerEmail}</p>
                        </div>
                      </td>
                      <td className="p-3"><span className="text-gray-600">{order.orderDate}</span></td>
                      <td className="p-3"><span className="text-gray-600">{order.deliveryDate}</span></td>
                      <td className="p-3"><span className="font-medium text-gray-900">${order.totalAmount.toLocaleString()}</span></td>
                      <td className="p-3">
                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {order.status === 'delivered' ? (isRTL ? 'مسلم' : 'Delivered') :
                           order.status === 'confirmed' ? (isRTL ? 'مؤكد' : 'Confirmed') :
                           order.status === 'pending' ? t('pending') :
                           t('cancelled')}
                        </span>
                      </td>
                      <td className="p-3"><span className="text-gray-600">{order.salesRep}</span></td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="icon" onClick={() => onViewOrder(order.id)} className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => onEditOrder(order.id)} className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => onDeleteOrder(order.id)} className="h-8 w-8 text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
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

export default SalesTable;