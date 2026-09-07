import { ReactNode } from "react"
import { userAuth } from "../context/AuthContext"
import { Navigate } from "react-router-dom"

export default function ProtectedRoute ({children}:{children:ReactNode}){
  const {isLoggedIn}=userAuth()

  if (!isLoggedIn) {
    return <Navigate to='/login' replace/>
  }

  return <>{children}</>
}