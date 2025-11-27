import { Loading } from "@/components/Tools/Misc";
import { Navigate } from "react-router-dom";

type Props = {
    user: any,
    loading: boolean,
    children: any
}

export const ProtectedRoute = ({ user, loading, children }: Props) => {
    if (loading) {
        return <Loading/>
    }
    if (!user) {
        return <Navigate to="/login" replace />;
    }

    if(user?.is_admin === 'yes'){
        return <Navigate to='/admin/dashboard' replace />;
    }
    return children;
};

export const GuestRoute = ({ user, loading, children }: Props) => {
    if (loading) {
        return <Loading/>
    }
    if (user) {
        return <Navigate to="/dashboard" replace />;
    }
    return children;
};

export const AnyRoute = ({ user, loading, children }: Props) => {
    if (loading) {
        return <Loading/>
    }
    return children;
};


export const AdminGuestRoute = ({user, loading, children}: Props) => {
    if (loading) {
        return <Loading/>
    }

    if(user){
        return <Navigate to="/admin/dashboard" replace />;
    }

    return children;
}


export const AdminAuthRoute = ({user, loading, children}: Props) => {
    if (loading) {
        return <Loading/>
    }
    if (!user) {
        return <Navigate to="/admin/login" replace />;
    }

    if(user?.role !== 'admin') {
        return <Navigate to="/dashboard" replace />
    }
    return children;    
}