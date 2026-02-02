import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import LawyerServices from './pages/LawyerServices';
import DocumentationServices from './pages/DocumentationServices';
import ContactUs from './pages/ContactUs';
import TaxCompliance from './pages/TaxCompliance';
import BusinessRegistration from './pages/BusinessRegistration';
import Partner from './pages/Partner';
import ConsultationBooking from './pages/ConsultationBooking';

import ServicePage from './pages/ServicePage';
import SeedDatabase from './pages/SeedDatabase';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProtectedRoute from './components/ProtectedRoute';
import PublicLayout from './layouts/PublicLayout';

function App() {
    return (
        <Router>
            <Routes>
                {/* Public Routes with Navbar & Footer */}
                <Route element={<PublicLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<AboutUs />} />
                    <Route path="/services" element={<LawyerServices />} />
                    <Route path="/documentation" element={<DocumentationServices />} />
                    <Route path="/tax-compliance" element={<TaxCompliance />} />
                    <Route path="/business-registration" element={<BusinessRegistration />} />
                    <Route path="/contact" element={<ContactUs />} />
                    <Route path="/partner" element={<Partner />} />
                    <Route path="/book-consultation" element={<ConsultationBooking />} />

                    {/* Dynamic Service Routes */}
                    <Route path="/service/:id" element={<ServicePage />} />
                    <Route path="/consumer/:id" element={<ServicePage />} />
                    <Route path="/doc/:id" element={<ServicePage />} />
                    <Route path="/ip/:id" element={<ServicePage />} />
                    <Route path="/seed" element={<SeedDatabase />} />
                    <Route path="/trademark-ip" element={<Navigate to="/ip/trademark-registration" replace />} />
                </Route>

                {/* Admin Routes (Standalone) */}
                <Route path="/admin/login" element={<AdminLogin />} />
                <Route path="/admin/dashboard" element={<ProtectedRoute><AdminDashboard /></ProtectedRoute>} />
            </Routes>
        </Router>
    );
}

export default App;
