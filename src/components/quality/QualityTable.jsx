import React from 'react';
import { motion } from 'framer-motion';
import { Eye, Edit, Trash2, Shield, CheckCircle, XCircle, AlertTriangle, Camera } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';

const QualityTable = ({ inspections, onViewInspection, onEditInspection, onDeleteInspection }) => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  const getResultColor = (result) => {
    switch (result) {
      case 'passed': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getResultIcon = (result) => {
    switch (result) {
      case 'passed': return CheckCircle;
      case 'failed': return XCircle;
      case 'pending': return AlertTriangle;
      default: return Shield;
    }
  };

  const getScoreColor = (score) => {
    if (score >= 95) return 'text-green-600';
    if (score >= 85) return 'text-yellow-600';
    return 'text-red-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <Card>
        <CardHeader>
          <CardTitle>{t('qualityInspections')}</CardTitle>
          <CardDescription>
            {isRTL ? 'قائمة بجميع فحوصات الجودة ونتائجها' : 'List of all quality inspections and their results'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'رقم الفحص' : 'Inspection ID'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'رقم الدفعة' : 'Batch ID'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'المنتج' : 'Product'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('inspectionDate')}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('inspector')}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'العينات' : 'Samples'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'النقاط' : 'Score'}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{t('result')}</th>
                  <th className={`table-header p-3 ${isRTL ? 'text-right' : 'text-left'}`}>{isRTL ? 'الإجراءات' : 'Actions'}</th>
                </tr>
              </thead>
              <tbody>
                {inspections.map((inspection, index) => {
                  const ResultIcon = getResultIcon(inspection.result);
                  return (
                    <motion.tr
                      key={inspection.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 * index }}
                      className="table-row border-b border-gray-100"
                    >
                      <td className="p-3"><span className="font-medium text-gray-900">{inspection.id}</span></td>
                      <td className="p-3"><span className="text-blue-600 font-medium">{inspection.batchId}</span></td>
                      <td className="p-3"><span className="text-gray-900">{inspection.productName}</span></td>
                      <td className="p-3"><span className="text-gray-600">{inspection.inspectionDate}</span></td>
                      <td className="p-3"><span className="text-gray-600">{inspection.inspector}</span></td>
                      <td className="p-3">
                        <div className="text-sm">
                          <span className="font-medium text-gray-900">{inspection.samplesInspected}/{inspection.samplesTotal}</span>
                          <p className="text-gray-500">{isRTL ? 'عيوب:' : 'Defects:'} {inspection.defectsFound}</p>
                        </div>
                      </td>
                      <td className="p-3"><span className={`text-lg font-bold ${getScoreColor(inspection.qualityScore)}`}>{inspection.qualityScore}%</span></td>
                      <td className="p-3">
                        <span className={`status-badge ${getResultColor(inspection.result)}`}>
                          <ResultIcon className="w-3 h-3 mr-1" />
                          {inspection.result === 'passed' ? t('passed') :
                           inspection.result === 'failed' ? t('failed') :
                           t('pending')}
                        </span>
                      </td>
                      <td className="p-3">
                        <div className="flex items-center space-x-2 rtl:space-x-reverse">
                          <Button variant="ghost" size="icon" onClick={() => onViewInspection(inspection.id)} className="h-8 w-8"><Eye className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => toast({ title: t('featureNotImplemented') })} className="h-8 w-8"><Camera className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => onEditInspection(inspection.id)} className="h-8 w-8"><Edit className="w-4 h-4" /></Button>
                          <Button variant="ghost" size="icon" onClick={() => onDeleteInspection(inspection.id)} className="h-8 w-8 text-red-600 hover:text-red-700"><Trash2 className="w-4 h-4" /></Button>
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

export default QualityTable;