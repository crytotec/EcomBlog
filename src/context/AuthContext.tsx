import { createContext, ReactNode, useContext, useEffect, useState } from "react"
import { LoginUser, LogoutUser, SignupUser, verifyUser } from "../Connection/connectToDB"


type User = {
  name: string,
  email: string,
  phone?: number,
}

type AuthUser = {
  isLoggedIn: boolean,
  user: User | null,
  signup: (name: string, email: string, password: string) => Promise<void>,
  login: (email: string, password: string, keepSignedIn: boolean) => Promise<void>,
  logout: () => Promise<void>,
  setPhone: (phone: number) => Promise<void>
}

const userContext = createContext<AuthUser | null>(null)

export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState<User | null>(null)

  useEffect(() => {
    const data = async () => {
      const verify= await verifyUser();
      if (!verify?.user) {
        return
      }

      setUser(verify?.user);
      setIsLoggedIn(true)
    }
    data()
  }, [])

  const signup = async (name: string, email: string, password: string): Promise<void> => {
    const signup= await SignupUser(name, email, password)
    if (!signup) {
      throw Error("signup failed")
    }
    setUser(signup)
    setIsLoggedIn(true)
  }

  const login = async (email: string, password: string,  keepSignedIn: boolean): Promise<void> => {
    const login= await LoginUser(email, password, keepSignedIn)
    if(!login){
       throw Error("login failed")
    }
    setUser(login)
    setIsLoggedIn(true)
  }

  

  const logout = async (): Promise<void> => {
    const logout = await LogoutUser()
    setUser(logout || null)
    setIsLoggedIn(false)
  }

  const setPhone = async (phone: number): Promise<void> => {
    setUser((prev) => (prev ? { ...prev, phone } : prev))
  }

  const value: AuthUser = {
    isLoggedIn,
    user,
    signup,
    login,
    logout,
    setPhone
  }

  return <userContext.Provider value={value}>{children}</userContext.Provider>
}

export const userAuth = () => {
  const context = useContext(userContext)
  if (!context) {
    throw Error("userAuth can't be used outside UserProvider")
  }
  return context
}