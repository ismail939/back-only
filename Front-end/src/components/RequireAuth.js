import { useLocation, Outlet, Navigate } from "react-router";
import { useSelector , useDispatch } from "react-redux";
import { useEffect } from "react";

function RequireAuth(){
    const dispatch = useDispatch();
    const client = useSelector(state => state.auth)
    const location = useLocation();
    return(
        client?.user ? <Outlet /> : 
        <Navigate to="/login" state={{from:location}} replace/>
    )
}

export default RequireAuth;