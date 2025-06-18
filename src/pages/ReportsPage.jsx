
import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { BarChart3 } from 'lucide-react';

const ReportsPage = () => {
  const { toast } = useToast();

  const handleNotImplemented = () => {
    toast({
      title: "🚧 هذه الميزة لم تُنفذ بعد!",
      description: "لا تقلق! يمكنك طلبها في رسالتك القادمة! 🚀",
      variant: "default",
      duration: 5000,
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="p-6 glassmorphism"
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-lime-400 via-green-500 to-emerald-600 flex items-center">
          <BarChart3 className="mr-3 ml-3 h-10 w-10" />
          التقارير والإحصائيات
        </h1>
        <Button onClick={handleNotImplemented} className="bg-gradient-to-r from-lime-500 to-green-600 hover:from-lime-600 hover:to-green-700 text-white">
          تصدير تقرير
        </Button>
      </div>
      <p className="text-lg text-slate-300 mb-6">
        هذه هي صفحة التقارير. يمكنك هنا عرض مختلف التقارير المتعلقة بالإنتاج، الجودة، المخزون، والمبيعات.
      </p>
      <div className="neumorphism-inset p-6 rounded-lg">
        <p className="text-slate-200">الرسوم البيانية والمؤشرات الرئيسية ستظهر هنا...</p>
        <img  alt="Dashboard with charts and graphs" class="mt-4 rounded-lg shadow-md w-full h-64 object-cover" src="https://images.unsplash.com/photo-1625296276703-3fbc924f07b5" />
      </div>
    </motion.div>
  );
};

export default ReportsPage;
  