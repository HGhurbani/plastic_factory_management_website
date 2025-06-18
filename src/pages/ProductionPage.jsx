import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import ProductionHeader from '@/components/production/ProductionHeader';
import ProductionStats from '@/components/production/ProductionStats';
import ProductionFilters from '@/components/production/ProductionFilters';
import ProductionTable from '@/components/production/ProductionTable';

const ProductionPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const initialProductionOrders = [
    {
      id: 'PO-2024-001',
      productName: isRTL ? 'قطعة بلاستيكية A' : 'Plastic Part A',
      quantity: 1000,
      produced: 750,
      status: 'inProgress',
      startDate: '2024-01-15',
      dueDate: '2024-01-20',
      moldId: 'M-001',
      machineId: 'MC-001',
      operator: isRTL ? 'أحمد محمد' : 'Ahmed Mohamed',
      priority: 'high'
    },
    {
      id: 'PO-2024-002',
      productName: isRTL ? 'قطعة بلاستيكية B' : 'Plastic Part B',
      quantity: 500,
      produced: 500,
      status: 'completed',
      startDate: '2024-01-10',
      dueDate: '2024-01-15',
      moldId: 'M-002',
      machineId: 'MC-002',
      operator: isRTL ? 'فاطمة علي' : 'Fatima Ali',
      priority: 'medium'
    },
    {
      id: 'PO-2024-003',
      productName: isRTL ? 'قطعة بلاستيكية C' : 'Plastic Part C',
      quantity: 2000,
      produced: 0,
      status: 'pending',
      startDate: '2024-01-20',
      dueDate: '2024-01-25',
      moldId: 'M-003',
      machineId: 'MC-001',
      operator: isRTL ? 'محمد حسن' : 'Mohamed Hassan',
      priority: 'low'
    }
  ];
  
  const [productionOrders, setProductionOrders] = useState(initialProductionOrders);

  const filteredOrders = productionOrders.filter(order =>
    order.productName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    order.id.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleNewOrder = () => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleViewOrder = (orderId) => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleEditOrder = (orderId) => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleDeleteOrder = (orderId) => {
    toast({ title: t('featureNotImplemented') });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <ProductionHeader onNewOrder={handleNewOrder} />
        <ProductionStats orders={productionOrders} />
        <ProductionFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onExport={handleExport}
        />
        <ProductionTable
          orders={filteredOrders}
          onViewOrder={handleViewOrder}
          onEditOrder={handleEditOrder}
          onDeleteOrder={handleDeleteOrder}
        />
      </div>
    </Layout>
  );
};

export default ProductionPage;