
import React, { createContext, useContext, useState, useEffect } from 'react';

const LanguageContext = createContext();

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const translations = {
  ar: {
    // Navigation
    dashboard: 'لوحة التحكم',
    production: 'الإنتاج',
    sales: 'المبيعات',
    inventory: 'المخزون',
    quality: 'مراقبة الجودة',
    maintenance: 'الصيانة',
    reports: 'التقارير',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    
    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    delete: 'حذف',
    edit: 'تعديل',
    add: 'إضافة',
    search: 'بحث',
    filter: 'تصفية',
    export: 'تصدير',
    import: 'استيراد',
    print: 'طباعة',
    loading: 'جاري التحميل...',
    success: 'تم بنجاح',
    error: 'خطأ',
    warning: 'تحذير',
    info: 'معلومات',
    
    // Auth
    login: 'تسجيل الدخول',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    rememberMe: 'تذكرني',
    forgotPassword: 'نسيت كلمة المرور؟',
    
    // Dashboard
    welcomeBack: 'مرحباً بعودتك',
    totalProduction: 'إجمالي الإنتاج',
    totalSales: 'إجمالي المبيعات',
    inventoryValue: 'قيمة المخزون',
    qualityScore: 'نقاط الجودة',
    recentActivities: 'الأنشطة الحديثة',
    quickActions: 'إجراءات سريعة',
    
    // Production
    productionOrders: 'أوامر الإنتاج',
    newProductionOrder: 'أمر إنتاج جديد',
    moldSetup: 'تركيب القالب',
    machineOperation: 'تشغيل الآلة',
    qualityCheck: 'فحص الجودة',
    warehouseDelivery: 'توريد المخزن',
    newOrder: "طلب جديد",
    moldInstall: "تركيب القالب",
    run: "تشغيل",
    warehouse: "المخزن",
    
    // Sales
    salesOrders: 'أوامر المبيعات',
    newSalesOrder: 'أمر مبيعات جديد',
    customerName: 'اسم العميل',
    orderDate: 'تاريخ الطلب',
    deliveryDate: 'تاريخ التسليم',
    orderStatus: 'حالة الطلب',
    
    // Inventory
    stockItems: 'عناصر المخزون',
    stockLevel: 'مستوى المخزون',
    reorderPoint: 'نقطة إعادة الطلب',
    lastUpdated: 'آخر تحديث',
    
    // Quality
    qualityInspections: 'فحوصات الجودة',
    inspectionDate: 'تاريخ الفحص',
    inspector: 'المفتش',
    result: 'النتيجة',
    passed: 'نجح',
    failed: 'فشل',
    
    // Maintenance
    maintenanceSchedule: 'جدولة الصيانة',
    equipmentStatus: 'حالة المعدات',
    nextMaintenance: 'الصيانة القادمة',
    
    // Reports
    productionReport: 'تقرير الإنتاج',
    salesReport: 'تقرير المبيعات',
    inventoryReport: 'تقرير المخزون',
    qualityReport: 'تقرير الجودة',
    
    // User Roles
    factoryManager: 'مدير المصنع',
    operationsManager: 'مسؤول العمليات',
    moldSupervisor: 'مشرف القوالب',
    shiftSupervisor: 'مشرف الوردية',
    machineOperator: 'مشغل الآلة',
    qualityController: 'مراقب الجودة',
    warehouseKeeper: 'أمين المخزن',
    maintenanceManager: 'مسؤول الصيانة',
    salesRepresentative: 'مندوب المبيعات',
    accountant: 'المحاسب',
    
    // Status
    active: 'نشط',
    inactive: 'غير نشط',
    pending: 'في الانتظار',
    completed: 'مكتمل',
    inProgress: 'قيد التنفيذ',
    cancelled: 'ملغي',
    
    // Notifications
    featureNotImplemented: '🚧 هذه الميزة غير مطبقة بعد—لكن لا تقلق! يمكنك طلبها في رسالتك التالية! 🚀'
  },
  en: {
    // Navigation
    dashboard: 'Dashboard',
    production: 'Production',
    sales: 'Sales',
    inventory: 'Inventory',
    quality: 'Quality Control',
    maintenance: 'Maintenance',
    reports: 'Reports',
    settings: 'Settings',
    logout: 'Logout',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    add: 'Add',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    print: 'Print',
    loading: 'Loading...',
    success: 'Success',
    error: 'Error',
    warning: 'Warning',
    info: 'Information',
    
    // Auth
    login: 'Login',
    email: 'Email',
    password: 'Password',
    rememberMe: 'Remember Me',
    forgotPassword: 'Forgot Password?',
    
    // Dashboard
    welcomeBack: 'Welcome Back',
    totalProduction: 'Total Production',
    totalSales: 'Total Sales',
    inventoryValue: 'Inventory Value',
    qualityScore: 'Quality Score',
    recentActivities: 'Recent Activities',
    quickActions: 'Quick Actions',
    
    // Production
    productionOrders: 'Production Orders',
    newProductionOrder: 'New Production Order',
    moldSetup: 'Mold Setup',
    machineOperation: 'Machine Operation',
    qualityCheck: 'Quality Check',
    warehouseDelivery: 'Warehouse Delivery',
    newOrder: "Order Created",
    moldInstall: "Mold Install",
    run: "Run",
    warehouse: "Warehouse",
    salesOrders: 'Sales Orders',
    newSalesOrder: 'New Sales Order',
    customerName: 'Customer Name',
    orderDate: 'Order Date',
    deliveryDate: 'Delivery Date',
    orderStatus: 'Order Status',
    
    // Inventory
    stockItems: 'Stock Items',
    stockLevel: 'Stock Level',
    reorderPoint: 'Reorder Point',
    lastUpdated: 'Last Updated',
    
    // Quality
    qualityInspections: 'Quality Inspections',
    inspectionDate: 'Inspection Date',
    inspector: 'Inspector',
    result: 'Result',
    passed: 'Passed',
    failed: 'Failed',
    
    // Maintenance
    maintenanceSchedule: 'Maintenance Schedule',
    equipmentStatus: 'Equipment Status',
    nextMaintenance: 'Next Maintenance',
    
    // Reports
    productionReport: 'Production Report',
    salesReport: 'Sales Report',
    inventoryReport: 'Inventory Report',
    qualityReport: 'Quality Report',
    
    // User Roles
    factoryManager: 'Factory Manager',
    operationsManager: 'Operations Manager',
    moldSupervisor: 'Mold Supervisor',
    shiftSupervisor: 'Shift Supervisor',
    machineOperator: 'Machine Operator',
    qualityController: 'Quality Controller',
    warehouseKeeper: 'Warehouse Keeper',
    maintenanceManager: 'Maintenance Manager',
    salesRepresentative: 'Sales Representative',
    accountant: 'Accountant',
    
    // Status
    active: 'Active',
    inactive: 'Inactive',
    pending: 'Pending',
    completed: 'Completed',
    inProgress: 'In Progress',
    cancelled: 'Cancelled',
    
    // Notifications
    featureNotImplemented: '🚧 This feature isn\'t implemented yet—but don\'t worry! You can request it in your next prompt! 🚀'
  }
};

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState('ar');
  const [direction, setDirection] = useState('rtl');

  useEffect(() => {
    const savedLanguage = localStorage.getItem('language') || 'ar';
    setLanguage(savedLanguage);
    setDirection(savedLanguage === 'ar' ? 'rtl' : 'ltr');
    
    document.documentElement.lang = savedLanguage;
    document.documentElement.dir = savedLanguage === 'ar' ? 'rtl' : 'ltr';
  }, []);

  const changeLanguage = (newLanguage) => {
    setLanguage(newLanguage);
    setDirection(newLanguage === 'ar' ? 'rtl' : 'ltr');
    localStorage.setItem('language', newLanguage);
    
    document.documentElement.lang = newLanguage;
    document.documentElement.dir = newLanguage === 'ar' ? 'rtl' : 'ltr';
  };

  const t = (key) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{
      language,
      direction,
      changeLanguage,
      t,
      isRTL: direction === 'rtl'
    }}>
      {children}
    </LanguageContext.Provider>
  );
};
