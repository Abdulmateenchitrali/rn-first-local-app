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

    const signIn = useCallback(async (email: string, password: string) => {
        setLoading(false);
        setError("");
        setUser(null);
        try {
            const {
                data: { session, user },
                error,
            } = await supabase.auth.signInWithPassword({ email, password });

            if (session && user) {
                setSignedIn(true);
                setUser(user);
            } else {
                throw new Error(`Couldn't sign in ${error?.message}`);
                setSignedIn(false);
                setUser(null)
            }

        } catch (error: any) {
            setError(error?.message ?? "Unknow error: ");
            setSignedIn(false);
            setUser(null)

        } finally {
            setLoading(false);
        }
    }, [
        setSignedIn, setUser, setLoading, setError, supabase
    ])

    const signUp = useCallback(async (email: string, password: string) => {
        try {
            const {
                data: { session, user },
                error
            } = await supabase.auth.signUp({ email, password });

            if (error) {
                setSignedIn(false);
                setError(error?.message);
            } else if (session) {
                await supabase.auth.setSession(session);
                setSignedIn(true);
                setUser(user);
            }

        } catch (error) {
            setUser(null)
            setSignedIn(false)
            setError(error?.message ?? "Unknown error")
        } finally {
            setLoading(false)
        }
    }, [setSignedIn, setLoading, setError, setUser, supabase]);

    const signOut = useCallback(async () => {
        setLoading(true)
        await supabase.auth.signOut()
        setError("")
        setSignedIn(false)
        setLoading(false)
        setUser(null)
    }, [
        setSignedIn, setLoading, setError, setUser, supabase
    ])

    const value = useMemo(() => ({
        signIn, signOut, signUp, signedIn, loading, error, user
    }), [signIn, signOut, signUp, signedIn, loading, error, user])


    return (<AuthContext.Provider value={value}>{children}</AuthContext.Provider>)

}