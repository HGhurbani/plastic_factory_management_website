
import React from 'react';
import { motion } from 'framer-motion';

const HomePage = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-center p-10 glassmorphism"
    >
      <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 via-blue-400 to-blue-300">
        مرحباً بك في نظام إدارة المصنع
      </h1>
      <p className="text-xl text-slate-300 mb-8">
        لوحة التحكم المركزية لإدارة عمليات المصنع بكفاءة وفعالية.
      </p>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[
          { title: "إدارة الإنتاج", description: "تتبع أوامر الإنتاج وخطوط التشغيل." },
          { title: "مراقبة الجودة", description: "ضمان جودة المنتجات في كل مرحلة." },
          { title: "إدارة المخزون", description: "تحكم دقيق في مستويات المخزون." },
          { title: "عمليات الصيانة", description: "جدولة وتتبع مهام الصيانة للآلات." },
          { title: "تقارير شاملة", description: "احصل على رؤى قيمة حول أداء المصنع." },
          { title: "إعدادات النظام", description: "تخصيص النظام ليناسب احتياجاتك." },
        ].map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="p-6 rounded-lg shadow-lg bg-slate-800/70 hover:bg-slate-700/90 transition-all"
          >
            <h3 className="text-2xl font-semibold mb-3 text-sky-400">{item.title}</h3>
            <p className="text-slate-400">{item.description}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default HomePage;
  