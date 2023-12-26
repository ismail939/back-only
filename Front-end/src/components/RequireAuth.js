import { useLocation, Outlet, Navigate } from "react-router";
import { useSelector , useDispatch } from "react-redux";
import { useEffect } from "react";
import PageNotFound from "../pages/PageNotFound";

function RequireAuth({allowedRoles}){
    const dispatch = useDispatch();
    const client = useSelector(state => state.auth)
    const location = useLocation();
    return(
        allowedRoles.includes(client.usertype) ?
        client?.user ? <Outlet /> : 
        <Navigate to="/login" state={{from:location}} replace/>
        : <PageNotFound />
    )
}

export default RequireAuth;