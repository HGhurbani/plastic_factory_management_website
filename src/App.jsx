import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from '@/components/ui/toaster';
import { LanguageProvider } from '@/contexts/LanguageContext';
import { AuthProvider } from '@/contexts/AuthContext';
import LoginPage from '@/pages/LoginPage';
import Dashboard from '@/pages/Dashboard';
import ProductionPage from '@/pages/ProductionPage';
import SalesPage from '@/pages/SalesPage';
import InventoryPage from '@/pages/InventoryPage';
import QualityPage from '@/pages/QualityPage';
import MaintenancePage from '@/pages/MaintenancePage';
import ReportsPage from '@/pages/ReportsPage';
import SettingsPage from '@/pages/SettingsPage';
import ProtectedRoute from '@/components/ProtectedRoute';

function App() {
  return (
    <AuthProvider>
      <LanguageProvider>
        <Router>
          <div className="min-h-screen bg-gradient-to-br from-blue-50 via-blue-100 to-blue-200">
            <Routes>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              <Route path="/production" element={
                <ProtectedRoute>
                  <ProductionPage />
                </ProtectedRoute>
              } />
              <Route path="/sales" element={
                <ProtectedRoute>
                  <SalesPage />
                </ProtectedRoute>
              } />
              <Route path="/inventory" element={
                <ProtectedRoute>
                  <InventoryPage />
                </ProtectedRoute>
              } />
              <Route path="/quality" element={
                <ProtectedRoute>
                  <QualityPage />
                </ProtectedRoute>
              } />
              <Route path="/maintenance" element={
                <ProtectedRoute>
                  <MaintenancePage />
                </ProtectedRoute>
              } />
              <Route path="/reports" element={
                <ProtectedRoute>
                  <ReportsPage />
                </ProtectedRoute>
              } />
              <Route path="/settings" element={
                <ProtectedRoute>
                  <SettingsPage />
                </ProtectedRoute>
              } />
            </Routes>
            <Toaster />
          </div>
        </Router>
      </LanguageProvider>
    </AuthProvider>
  );
}

export default App;