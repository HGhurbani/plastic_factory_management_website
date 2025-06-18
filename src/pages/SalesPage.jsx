import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import SalesHeader from '@/components/sales/SalesHeader';
import SalesStats from '@/components/sales/SalesStats';
import SalesFilters from '@/components/sales/SalesFilters';
import SalesTable from '@/components/sales/SalesTable';

const SalesPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const initialSalesOrders = [
    {
      id: 'SO-2024-001',
      customerName: isRTL ? 'شركة الأمل للتجارة' : 'Al-Amal Trading Company',
      customerEmail: 'info@alamal.com',
      orderDate: '2024-01-15',
      deliveryDate: '2024-01-25',
      totalAmount: 15750,
      status: 'confirmed',
      items: [
        { product: isRTL ? 'قطعة بلاستيكية A' : 'Plastic Part A', quantity: 500, price: 25 },
        { product: isRTL ? 'قطعة بلاستيكية B' : 'Plastic Part B', quantity: 250, price: 18 }
      ],
      salesRep: isRTL ? 'أحمد محمد' : 'Ahmed Mohamed'
    },
    {
      id: 'SO-2024-002',
      customerName: isRTL ? 'مصنع النور للبلاستيك' : 'Al-Noor Plastic Factory',
      customerEmail: 'orders@alnoor.com',
      orderDate: '2024-01-12',
      deliveryDate: '2024-01-20',
      totalAmount: 28500,
      status: 'delivered',
      items: [
        { product: isRTL ? 'قطعة بلاستيكية C' : 'Plastic Part C', quantity: 1000, price: 28.5 }
      ],
      salesRep: isRTL ? 'فاطمة علي' : 'Fatima Ali'
    },
    {
      id: 'SO-2024-003',
      customerName: isRTL ? 'شركة المستقبل الصناعية' : 'Future Industrial Company',
      customerEmail: 'procurement@future.com',
      orderDate: '2024-01-18',
      deliveryDate: '2024-01-28',
      totalAmount: 42300,
      status: 'pending',
      items: [
        { product: isRTL ? 'قطعة بلاستيكية A' : 'Plastic Part A', quantity: 800, price: 25 },
        { product: isRTL ? 'قطعة بلاستيكية B' : 'Plastic Part B', quantity: 900, price: 18 }
      ],
      salesRep: isRTL ? 'محمد حسن' : 'Mohamed Hassan'
    }
  ];
  
  const [salesOrders, setSalesOrders] = useState(initialSalesOrders);

  const filteredOrders = salesOrders.filter(order =>
    order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
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
        <SalesHeader onNewOrder={handleNewOrder} />
        <SalesStats orders={salesOrders} />
        <SalesFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onExport={handleExport}
        />
        <SalesTable
          orders={filteredOrders}
          onViewOrder={handleViewOrder}
          onEditOrder={handleEditOrder}
          onDeleteOrder={handleDeleteOrder}
        />
      </div>
    </Layout>
  );
};

export default SalesPage;