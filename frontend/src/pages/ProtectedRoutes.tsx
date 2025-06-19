import { useState } from "react"
import { Outlet, Navigate } from "react-router"
import { useAuth } from "../auth/AuthProvider"

export default function ProtectedRoutes(){
    const auth = useAuth()
    return auth ? <Outlet/> : <Navigate to={"/"}/>
}