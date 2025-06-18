import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2, Calendar, AlertTriangle, CheckCircle, Clock, Activity } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';

const MaintenanceTable = ({ schedule, onViewMaintenance, onEditMaintenance, onDeleteMaintenance }) => {
  const { t, isRTL } = useLanguage();

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'inProgress': return 'bg-blue-100 text-blue-800';
      case 'scheduled': return 'bg-yellow-100 text-yellow-800';
      case 'overdue': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return CheckCircle;
      case 'inProgress': return Activity;
      case 'scheduled': return Clock;
      case 'overdue': return AlertTriangle;
      default: return Calendar;
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

  const getTypeColor = (type) => {
    switch (type) {
      case 'preventive': return 'bg-blue-100 text-blue-800';
      case 'corrective': return 'bg-orange-100 text-orange-800';
      case 'emergency': return 'bg-red-100 text-red-800';
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
          <CardTitle>{t('maintenanceSchedule')}</CardTitle>
          <CardDescription>
            {isRTL ? 'قائمة بجميع أعمال الصيانة المجدولة والمكتملة' : 'List of all scheduled and completed maintenance work'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'رقم الصيانة' : 'Maintenance ID'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'المعدة' : 'Equipment'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'نوع الصيانة' : 'Type'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'التاريخ المجدول' : 'Scheduled Date'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الفني' : 'Technician'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'المدة المقدرة' : 'Duration'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الأولوية' : 'Priority'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الحالة' : 'Status'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {schedule.map((maintenance, index) => {
                  const StatusIcon = getStatusIcon(maintenance.status);
                  return (
                    <motion.tr
                      key={maintenance.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="table-row border-b border-gray-100"
                    >
                      <td className="p-3"><span className="font-medium text-gray-900">{maintenance.id}</span></td>
                      <td className="p-3">
                        <div>
                          <span className="text-gray-900 font-medium">{maintenance.equipmentName}</span>
                          <p className="text-sm text-gray-500">{maintenance.equipmentId}</p>
                          <p className="text-xs text-gray-400">{maintenance.location}</p>
                        </div>
                      </td>
                      <td className="p-3">
                        <span className={`status-badge ${getTypeColor(maintenance.maintenanceType)}`}>
                          {maintenance.maintenanceType === 'preventive' ? (isRTL ? 'وقائية' : 'Preventive') :
                           maintenance.maintenanceType === 'corrective' ? (isRTL ? 'تصحيحية' : 'Corrective') :
                           (isRTL ? 'طارئة' : 'Emergency')}
                        </span>
                      </td>
                      <td className="p-3"><span className="text-gray-600">{maintenance.scheduledDate}</span></td>
                      <td className="p-3"><span className="text-gray-600">{maintenance.technician}</span></td>
                      <td className="p-3"><span className="text-gray-600">{maintenance.estimatedDuration} {isRTL ? 'ساعات' : 'hours'}</span></td>
                      <td className="p-3">
                        <span className={`status-badge ${getPriorityColor(maintenance.priority)}`}>
                          {maintenance.priority === 'high' ? (isRTL ? 'عالية' : 'High') :
                           maintenance.priority === 'medium' ? (isRTL ? 'متوسطة' : 'Medium') :
                           (isRTL ? 'منخفضة' : 'Low')}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`status-badge ${getStatusColor(maintenance.status)}`}>
                          <StatusIcon className="w-3 h-3 mr-1" />
                          {maintenance.status === 'completed' ? t('completed') :
                           maintenance.status === 'inProgress' ? t('inProgress') :
                           maintenance.status === 'scheduled' ? (isRTL ? 'مجدولة' : 'Scheduled') :
                           (isRTL ? 'متأخرة' : 'Overdue')}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="icon" onClick={() => onViewMaintenance(maintenance.id)} className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => onEditMaintenance(maintenance.id)} className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => onDeleteMaintenance(maintenance.id)} className="h-8 w-8 text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
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

export default MaintenanceTable;