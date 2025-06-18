import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2, Clock, CheckCircle, AlertCircle, Play } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const ProductionTable = ({ orders, onViewOrder, onEditOrder, onDeleteOrder }) => {
  const { t, isRTL } = useLanguage();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'inProgress': return 'bg-blue-100 text-blue-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'inProgress': return Play;
      case 'pending': return Clock;
      default: return AlertCircle;
    }
  };

  const getStep = (status) => {
    switch (status) {
      case "moldInstalled":
        return 1;
      case "inProgress":
        return 2;
      case "qualityCheck":
        return 3;
      case "completed":
        return 4;
      default:
        return 0;
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
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
          <CardTitle>{t('productionOrders')}</CardTitle>
          <CardDescription>
            {isRTL ? 'قائمة بجميع أوامر الإنتاج وحالتها' : 'List of all production orders and their status'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'رقم الأمر' : 'Order ID'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'المنتج' : 'Product'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الكمية' : 'Quantity'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'التقدم' : 'Progress'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الحالة' : 'Status'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الأولوية' : 'Priority'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'المشغل' : 'Operator'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order, index) => {
                  const StatusIcon = getStatusIcon(order.status);
                  const progress = (order.produced / order.quantity) * 100;
                  return (
                    <motion.tr
                      key={order.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="table-row border-b border-gray-100"
                    >
                      <td className="p-3"><span className="font-medium text-gray-900">{order.id}</span></td>
                      <td className="p-3"><span className="text-gray-900">{order.productName}</span></td>
                      <td className="p-3"><span className="text-gray-600">{order.produced} / {order.quantity}</span></td>
                      <td className="p-3">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                            style={{ width: `${progress}%` }}
                          ></div>
                        </div>
                        <span className="text-xs text-gray-500 mt-1">{Math.round(progress)}%</span>
                        <ProgressTimeline steps={[t("newOrder"), t("moldInstall"), t("run"), t("qualityCheck"), t("warehouse")]} current={getStep(order.status)} className="my-1" />
                      </td>
                      <td className="p-3">
                        <span className={`status-badge ${getStatusColor(order.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {order.status === 'completed' ? t('completed') :
                           order.status === 'inProgress' ? t('inProgress') :
                           t('pending')}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`status-badge ${getPriorityColor(order.priority)}`}>
                          {order.priority === 'high' ? (isRTL ? 'عالية' : 'High') :
                           order.priority === 'medium' ? (isRTL ? 'متوسطة' : 'Medium') :
                           (isRTL ? 'منخفضة' : 'Low')}
                        </span>
                      </td>
                      <td className="p-3"><span className="text-gray-600">{order.operator}</span></td>
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

export default ProductionTable;