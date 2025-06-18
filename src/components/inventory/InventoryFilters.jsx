import React from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Download } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useLanguage } from '@/contexts/LanguageContext';
import { useToast } from '@/components/ui/use-toast';


const InventoryFilters = ({ searchTerm, setSearchTerm, onExport }) => {
  const { t, isRTL } = useLanguage();
  const { toast } = useToast();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className={`absolute top-3 ${isRTL ? 'right-3' : 'left-3'} w-4 h-4 text-gray-400`} />
                <Input
                  placeholder={isRTL ? 'البحث في المخزون...' : 'Search inventory...'}
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className={`${isRTL ? 'pr-10' : 'pl-10'}`}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => toast({ title: t('featureNotImplemented') })}>
                <Filter className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('filter')}
              </Button>
              <Button variant="outline" onClick={onExport}>
                <Download className={`w-4 h-4 ${isRTL ? 'ml-2' : 'mr-2'}`} />
                {t('export')}
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default InventoryFilters;