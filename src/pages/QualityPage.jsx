import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import QualityHeader from '@/components/quality/QualityHeader';
import QualityStats from '@/components/quality/QualityStats';
import QualityFilters from '@/components/quality/QualityFilters';
import QualityTable from '@/components/quality/QualityTable';

const QualityPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const initialQualityInspections = [
    {
      id: 'QI-2024-001',
      batchId: 'PO-2024-001',
      productName: isRTL ? 'قطعة بلاستيكية A' : 'Plastic Part A',
      inspectionDate: '2024-01-15',
      inspector: isRTL ? 'محمد حسن' : 'Mohamed Hassan',
      samplesInspected: 50,
      samplesTotal: 500,
      defectsFound: 2,
      result: 'passed',
      qualityScore: 96,
      notes: isRTL ? 'جودة ممتازة، عيوب طفيفة في التشطيب' : 'Excellent quality, minor finishing defects',
      images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop']
    },
    {
      id: 'QI-2024-002',
      batchId: 'PO-2024-002',
      productName: isRTL ? 'قطعة بلاستيكية B' : 'Plastic Part B',
      inspectionDate: '2024-01-14',
      inspector: isRTL ? 'فاطمة علي' : 'Fatima Ali',
      samplesInspected: 25,
      samplesTotal: 250,
      defectsFound: 0,
      result: 'passed',
      qualityScore: 100,
      notes: isRTL ? 'جودة مثالية، لا توجد عيوب' : 'Perfect quality, no defects found',
      images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop']
    },
    {
      id: 'QI-2024-003',
      batchId: 'PO-2024-003',
      productName: isRTL ? 'قطعة بلاستيكية C' : 'Plastic Part C',
      inspectionDate: '2024-01-13',
      inspector: isRTL ? 'أحمد محمد' : 'Ahmed Mohamed',
      samplesInspected: 100,
      samplesTotal: 1000,
      defectsFound: 15,
      result: 'failed',
      qualityScore: 85,
      notes: isRTL ? 'عيوب في الأبعاد، يحتاج إعادة معايرة' : 'Dimensional defects, requires recalibration',
      images: ['https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=150&h=150&fit=crop']
    }
  ];
  
  const [qualityInspections, setQualityInspections] = useState(initialQualityInspections);

  const filteredInspections = qualityInspections.filter(inspection =>
    inspection.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    inspection.batchId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleNewInspection = () => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleViewInspection = (inspectionId) => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleEditInspection = (inspectionId) => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleDeleteInspection = (inspectionId) => {
    toast({ title: t('featureNotImplemented') });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <QualityHeader onNewInspection={handleNewInspection} />
        <QualityStats inspections={qualityInspections} />
        <QualityFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onExport={handleExport}
        />
        <QualityTable
          inspections={filteredInspections}
          onViewInspection={handleViewInspection}
          onEditInspection={handleEditInspection}
          onDeleteInspection={handleDeleteInspection}
        />
      </div>
    </Layout>
  );
};

export default QualityPage;