// src/App.jsx — BHARAT: Living Heritage of India Routing System
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import HomePage from './pages/HomePage'
import HeritageSitePage from './pages/HeritageSitePage'
import QRHubPage from './pages/QRHubPage'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main landing experience */}
        <Route path="/" element={<HomePage />} />

        {/* Dedicated 8 Heritage Monument Destination Pages */}
        <Route path="/heritage/:slug" element={<HeritageSitePage />} />

        {/* Elephanta backwards compatibility routes */}
        <Route
          path="/elephanta"
          element={<Navigate to="/heritage/elephanta-caves" replace />}
        />
        <Route
          path="/heritage/elephanta"
          element={<Navigate to="/heritage/elephanta-caves" replace />}
        />

        {/* QR Code Navigation Hub and Registry */}
        <Route path="/qr-hub" element={<QRHubPage />} />
        <Route path="/qr-codes" element={<Navigate to="/qr-hub" replace />} />
        <Route path="/qr" element={<Navigate to="/qr-hub" replace />} />

        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
