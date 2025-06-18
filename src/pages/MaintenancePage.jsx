import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import MaintenanceHeader from '@/components/maintenance/MaintenanceHeader';
import MaintenanceStats from '@/components/maintenance/MaintenanceStats';
import MaintenanceFilters from '@/components/maintenance/MaintenanceFilters';
import MaintenanceTable from '@/components/maintenance/MaintenanceTable';

const MaintenancePage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const initialMaintenanceSchedule = [
    {
      id: 'MT-2024-001',
      equipmentId: 'MC-001',
      equipmentName: isRTL ? 'آلة الحقن رقم 1' : 'Injection Machine #1',
      maintenanceType: 'preventive',
      scheduledDate: '2024-01-20',
      lastMaintenance: '2024-01-05',
      nextMaintenance: '2024-02-05',
      status: 'scheduled',
      priority: 'medium',
      technician: isRTL ? 'علي أحمد' : 'Ali Ahmed',
      estimatedDuration: 4,
      description: isRTL ? 'صيانة دورية شاملة' : 'Comprehensive routine maintenance',
      location: 'Production Line A'
    },
    {
      id: 'MT-2024-002',
      equipmentId: 'MC-002',
      equipmentName: isRTL ? 'آلة الحقن رقم 2' : 'Injection Machine #2',
      maintenanceType: 'corrective',
      scheduledDate: '2024-01-18',
      lastMaintenance: '2024-01-10',
      nextMaintenance: '2024-02-10',
      status: 'inProgress',
      priority: 'high',
      technician: isRTL ? 'محمد سالم' : 'Mohamed Salem',
      estimatedDuration: 6,
      description: isRTL ? 'إصلاح عطل في نظام التبريد' : 'Repair cooling system malfunction',
      location: 'Production Line B'
    },
    {
      id: 'MT-2024-003',
      equipmentId: 'CV-001',
      equipmentName: isRTL ? 'سير النقل الرئيسي' : 'Main Conveyor Belt',
      maintenanceType: 'preventive',
      scheduledDate: '2024-01-15',
      lastMaintenance: '2024-01-15',
      nextMaintenance: '2024-02-15',
      status: 'completed',
      priority: 'low',
      technician: isRTL ? 'فاطمة حسن' : 'Fatima Hassan',
      estimatedDuration: 2,
      description: isRTL ? 'تشحيم وفحص الأجزاء المتحركة' : 'Lubrication and moving parts inspection',
      location: 'Warehouse'
    }
  ];
  
  const [maintenanceSchedule, setMaintenanceSchedule] = useState(initialMaintenanceSchedule);

  const filteredSchedule = maintenanceSchedule.filter(item =>
    item.equipmentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.equipmentId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleNewMaintenance = () => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleViewMaintenance = (maintenanceId) => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleEditMaintenance = (maintenanceId) => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleDeleteMaintenance = (maintenanceId) => {
    toast({ title: t('featureNotImplemented') });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <MaintenanceHeader onNewMaintenance={handleNewMaintenance} />
        <MaintenanceStats schedule={maintenanceSchedule} />
        <MaintenanceFilters 
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onExport={handleExport}
        />
        <MaintenanceTable
          schedule={filteredSchedule}
          onViewMaintenance={handleViewMaintenance}
          onEditMaintenance={handleEditMaintenance}
          onDeleteMaintenance={handleDeleteMaintenance}
        />
      </div>
    </Layout>
  );
};

export default MaintenancePage;