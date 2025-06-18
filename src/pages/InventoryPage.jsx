import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Layout from '@/components/Layout';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';
import InventoryHeader from '@/components/inventory/InventoryHeader';
import InventoryStats from '@/components/inventory/InventoryStats';
import InventoryFilters from '@/components/inventory/InventoryFilters';
import InventoryTable from '@/components/inventory/InventoryTable';

const InventoryPage = () => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState('');

  const initialInventoryItems = [
    {
      id: 'INV-001',
      name: isRTL ? 'قطعة بلاستيكية A' : 'Plastic Part A',
      sku: 'PPA-001',
      category: isRTL ? 'قطع بلاستيكية' : 'Plastic Parts',
      currentStock: 1250,
      minStock: 500,
      maxStock: 2000,
      unitPrice: 25.50,
      totalValue: 31875,
      location: 'A-01-01',
      lastUpdated: '2024-01-15',
      status: 'inStock'
    },
    {
      id: 'INV-002',
      name: isRTL ? 'قطعة بلاستيكية B' : 'Plastic Part B',
      sku: 'PPB-002',
      category: isRTL ? 'قطع بلاستيكية' : 'Plastic Parts',
      currentStock: 350,
      minStock: 400,
      maxStock: 1500,
      unitPrice: 18.75,
      totalValue: 6562.5,
      location: 'A-01-02',
      lastUpdated: '2024-01-14',
      status: 'lowStock'
    },
    {
      id: 'INV-003',
      name: isRTL ? 'قطعة بلاستيكية C' : 'Plastic Part C',
      sku: 'PPC-003',
      category: isRTL ? 'قطع بلاستيكية' : 'Plastic Parts',
      currentStock: 0,
      minStock: 200,
      maxStock: 1000,
      unitPrice: 32.00,
      totalValue: 0,
      location: 'A-02-01',
      lastUpdated: '2024-01-10',
      status: 'outOfStock'
    },
    {
      id: 'INV-004',
      name: isRTL ? 'مواد خام - بلاستيك' : 'Raw Material - Plastic',
      sku: 'RM-001',
      category: isRTL ? 'مواد خام' : 'Raw Materials',
      currentStock: 5000,
      minStock: 1000,
      maxStock: 10000,
      unitPrice: 2.50,
      totalValue: 12500,
      location: 'B-01-01',
      lastUpdated: '2024-01-16',
      status: 'inStock'
    }
  ];
  
  const [inventoryItems, setInventoryItems] = useState(initialInventoryItems);


  const filteredItems = inventoryItems.filter(item =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.sku.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = () => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleNewItem = () => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleViewItem = (itemId) => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleEditItem = (itemId) => {
    toast({ title: t('featureNotImplemented') });
  };

  const handleDeleteItem = (itemId) => {
    toast({ title: t('featureNotImplemented') });
  };

  return (
    <Layout>
      <div className="space-y-6">
        <InventoryHeader onNewItem={handleNewItem} />
        <InventoryStats items={inventoryItems} />
        <InventoryFilters 
          searchTerm={searchTerm} 
          setSearchTerm={setSearchTerm} 
          onExport={handleExport} 
        />
        <InventoryTable 
          items={filteredItems}
          onViewItem={handleViewItem}
          onEditItem={handleEditItem}
          onDeleteItem={handleDeleteItem}
        />
      </div>
    </Layout>
  );
};

export default InventoryPage;