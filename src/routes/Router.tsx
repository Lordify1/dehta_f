import React, { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import { ToastContainer } from 'react-toastify';
import { useUser } from '@/context/UserContext';
import { ProtectedRoute, GuestRoute, AnyRoute, AdminAuthRoute, AdminGuestRoute, FounderRoute } from './Guard';
import { Loading } from '@/components/Tools/Misc';
import 'react-toastify/dist/ReactToastify.css'
import NewPassword from '../pages/Advisor/Auth/NewPassword';

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
    const EarnFi = lazy(() => import('@/pages/Advisor/EarnFi'));


    // Founder
    const EditProject = lazy(() => import('@/pages/Advisor/Founder/EditProject'));

    // Admin
    const AdminLogin = lazy(() => import('@/pages/Admin/Auth/Login'));
    const AdminDashboard = lazy(() => import('@/pages/Admin/Dashboard'));
    const AdminGlasses = lazy(() => import('@/pages/Admin/Glass/GlassIndex'))
    const AdminLens = lazy(() => import('@/pages/Admin/LensOffers/LensIndex'))
    const AdminProjects = lazy(() => import('@/pages/Admin/Projects/ProjectIndex'))
    const AdminProjectsCreate = lazy(() => import('@/pages/Admin/Projects/CreateProject'))
    const AdminQuest = lazy(() => import('@/pages/Admin/Quest/QuestIndex'));
    const AdminUsers = lazy(() => import('@/pages/Admin/Users/UsersIndex'));
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
        { path: '/new-password', element: <NewPassword/>, type: 'any'},


        { path: '/dashboard', element: <Dashboard />, type: 'auth' },
        { path: '/profile', element: <Profile />, type: 'auth' },

        { path: '/edit-project', element: <EditProject />, type: 'auth', userType: 'founder'},

        // Market 
        { path: '/market', element: <Market />, type: 'auth' },
        { path: '/market/purchase/:item/:slug', element: <MarketPurchase />, type: 'auth' },

        { path: '/earnfi', element: <EarnFi />, type: 'any' },

        // { path: '/wallet', element: <Wallet />, type: 'auth' },

        { path: '/admin/login', element: <AdminLogin />, type: 'any', userType: 'admin' },
        { path: '/admin/dashboard', element: <AdminDashboard />, type: 'auth', userType: 'admin' },
        { path: '/admin/users', element: <AdminUsers />, type: 'auth', userType: 'admin' },
        { path: '/admin/glasses', element: <AdminGlasses/>, type: "auth", userType: 'admin'},
        { path: '/admin/lens', element: <AdminLens/>, type: "auth", userType: 'admin'},
        { path: '/admin/lens', element: <AdminLens/>, type: "auth", userType: 'admin'},
        { path: '/admin/projects', element: <AdminProjects/>, type: "auth", userType: 'admin'},
        { path: '/admin/projects/create', element: <AdminProjectsCreate/>, type: "auth", userType: 'admin'},
        { path: '/admin/quests', element: <AdminQuest/>, type: "auth", userType: 'admin'},
        // catch-all 404 route (must be last)
        { path: '*', element: <NotFound />, type: 'any' },
    ];

    return (
        <HelmetProvider>
            <Router>
                <Suspense fallback={import.meta.env.DEV ? null : <Loading />}>
                {/* <Suspense> */}
                    <Routes>
                        {urls.map(({ path, element, type, userType }) => {
                            let Guard = null
                            switch(userType){
                                case 'admin':
                                    Guard = type === 'auth'
                                    ? AdminAuthRoute
                                    : AdminGuestRoute
                                    break
                                case 'founder':
                                    Guard = FounderRoute
                                    break
                                case 'investor':
                                    break
                                default:
                                Guard = type === 'auth'
                                ? ProtectedRoute
                                : type === 'guest'
                                ? GuestRoute
                                : AnyRoute;
                                break
                            }
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
                style={{'zIndex': 999999999999999}}
                position="top-right"
                autoClose={3000}
                newestOnTop={true}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                className={`rounded-3xl mt-2`}
                />
            </Router>
        </HelmetProvider>
    );
};

export default FaecesRouter;
