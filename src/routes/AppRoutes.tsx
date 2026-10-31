import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { PhonePage } from '../pages/PhonePage';
import { OtpPage } from '../pages/OtpPage';
import { HomePage } from '../pages/HomePage';
import { ItemDetailPage } from '../pages/ItemDetailPage';
import { CrmApiDocsPage } from '../pages/CrmApiDocsPage';
import { FigmaGalleryPage } from '../pages/FigmaGalleryPage';
import { useAuth } from '../hooks/useAuth';

/** Redirects to Sign Up when there is no token in localStorage */
const RequireAuth: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Navigate to="/signup" replace />;
  return <>{children}</>;
};

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Mobile-first Fastor App Flow */}
      <Route path="/" element={<PhonePage />} />
      <Route path="/signup" element={<PhonePage />} />
      <Route path="/otp" element={<OtpPage />} />
      <Route path="/home" element={<RequireAuth><HomePage /></RequireAuth>} />
      <Route path="/detail" element={<RequireAuth><ItemDetailPage /></RequireAuth>} />
      <Route path="/detail/:id" element={<RequireAuth><ItemDetailPage /></RequireAuth>} />

      {/* CRM API Documentation & Live Inspector */}
      <Route path="/crm-backend" element={<CrmApiDocsPage />} />

      {/* Figma All 4 Screens Comparison Canvas */}
      <Route path="/figma-canvas" element={<FigmaGalleryPage />} />

      {/* Fallback */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
