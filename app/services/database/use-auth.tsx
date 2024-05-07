import { User } from "@supabase/supabase-js";
import { supabase } from "./supabase";
import React, { PropsWithChildren, useCallback, useMemo, useState } from "react";

type AuthContextType {
    signIn: (email: string, password: string) => void;
    signUp: (email: string, password: string) => void;
    signOut: () => Promise<void>;
    signedIn: boolean,
    loading: boolean,
    error: string,
    user: User | null
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren<any>) => {

    const [signedIn, setSignedIn] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [user, setUser] = useState<User | null>(null)

    const signIn = useCallback(async (email:string,password:string) => {
         
    },[])


    const value = useMemo(()=>{
        signIn
    },[])


    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)

}