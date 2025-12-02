import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { useUser } from '@/context/UserContext';
import { ProtectedRoute, GuestRoute, AnyRoute, AdminAuthRoute, AdminGuestRoute } from './Guard';
import { Loading } from '@/components/Tools/Misc';

const FaecesRouter = () => {
    const Home = lazy(() => import('@/pages/Advisor/Projects'));
    const OGPage = lazy(() => import('@/pages/PrivateSalePage'));
    const Index = lazy(() => import('@/pages/welcome'));
    const Dashboard = lazy(() => import('@/pages/Advisor/Auth/Dashboard'));
    const Login = lazy(() => import('@/pages/Advisor/Auth/Login'));
    const Register = lazy(() => import('@/pages/Advisor/Auth/Register'));
    const Profile = lazy(() => import('@/pages/Advisor/Auth/Profile'));
    const ForgotPassword = lazy(() => import('@/pages/Advisor/Auth/ForgotPassword'));
    const Market = lazy(() => import('@/pages/Advisor/Market'));
    const MarketPurchase = lazy(() => import('@/pages/Advisor/MarketPurchase'));
    const NotFound = lazy(() => import('@/pages/Error/404'));
    const Wallet = lazy(() => import('@/pages/Advisor/Wallet'));

    // Admin
    const AdminLogin = lazy(() => import('@/pages/Admin/Auth/Login'));
    const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard'));
    const AdminGlasses = lazy(() => import('@/pages/Admin/Glass/GlassIndex'))
    const AdminLens = lazy(() => import('@/pages/Admin/LensOffers/LensIndex'))
    const AdminProjects = lazy(() => import('@/pages/Admin/Projects/ProjectIndex'))
    const AdminProjectsCreate = lazy(() => import('@/pages/Admin/Projects/CreateProject'))
    const ProjectDetail = lazy(() => import('@/pages/Advisor/ProjectDetail'))
    const TrendBet = lazy(() => import('@/pages/Advisor/TrendBet'));

    const { user, loading } = useUser();

    const urls = [
        { path: '/', element: <Index />, type: 'any' },
        { path: '/projects', element: <Home />, type: 'any' },
        { path: '/index', element: <Index />, type: 'any' },
        { path: '/og/private_sale', element: <OGPage />, type: 'any' },
        { path: '/project/:id/:slug', element: <ProjectDetail/>, type: 'any'},
        { path: '/trendbet', element: <TrendBet/>, type: 'auth'},

        { path: '/register', element: <Register />, type: 'guest' },
        { path: '/login', element: <Login />, type: 'guest' },
        { path: '/reset-password', element: <ForgotPassword/>, type: 'any'},

        { path: '/dashboard', element: <Dashboard />, type: 'auth' },
        { path: '/profile', element: <Profile />, type: 'auth' },

        // Market 
        { path: '/market', element: <Market />, type: 'auth' },
        { path: '/market/purchase/:item/:slug', element: <MarketPurchase />, type: 'auth' },


        { path: '/wallet', element: <Wallet />, type: 'auth' },

        { path: '/admin/login', element: <AdminLogin />, type: 'any', admin: true },
        { path: '/admin/dashboard', element: <AdminDashboard />, type: 'auth', admin: true },
        { path: '/admin/glasses', element: <AdminGlasses/>, type: "auth", admin: true},
        { path: '/admin/lens', element: <AdminLens/>, type: "auth", admin: true},
        { path: '/admin/projects', element: <AdminProjects/>, type: "auth", admin: true},
        { path: '/admin/projects/create', element: <AdminProjectsCreate/>, type: "auth", admin: true},

        // catch-all 404 route (must be last)
        { path: '*', element: <NotFound />, type: 'any' },
    ];

    return (
        <HelmetProvider>
            <Router>
                <Suspense fallback={<Loading />}>
                {/* <Suspense> */}
                    <Routes>
                        {urls.map(({ path, element, type, admin }) => {
                            const Guard = admin
                                ? type === 'auth'
                                    ? AdminAuthRoute
                                    : AdminGuestRoute
                                : type === 'auth'
                                ? ProtectedRoute
                                : type === 'guest'
                                ? GuestRoute
                                : AnyRoute;
                            return (
                                <Route
                                    key={path}
                                    path={path}
                                    element={
                                        <Guard user={user} loading={loading}>
                                            {element}
                                        </Guard>
                                    }
                                />
                            );
                        })}
                    </Routes>
                </Suspense>
                <ToastContainer
                position='top-right'
                style={{zIndex: 999999999999999}}
                />
            </Router>
        </HelmetProvider>
    );
};

export default FaecesRouter;
