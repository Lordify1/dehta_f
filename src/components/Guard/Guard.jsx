import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import {advisorUrl} from '../../app'
import { router } from "@inertiajs/react";


export const Guard = ({children, requireAuth = false, guestOnly = false, redirectTo = `${advisorUrl}/login`}) => {
    const user = useAuth();

    if(requireAuth && !user){
        router.visit(redirectTo)
        return null;
    }

    if(guestOnly && user){
        router.visit('/')
        return null
    }

    return children;
}

export const InlineGuard = ({action,requireAuth = false, fallback}) => {
    const user = useAuth()
    const redirectTo = `${advisorUrl}/login`

    if(requireAuth && user == null){
        return fallback
    }else{
        return action
    }
    
    
}

export const navigateTo = (url) => {
    router.visit(url)
}