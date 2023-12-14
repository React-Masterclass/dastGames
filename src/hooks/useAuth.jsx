import { useState, useEffect } from "react";
import supabase from "../supabase/client";

export default function useAuth() {
  const [userSession, setUserSession] = useState(null);


  const signUp = async (email, password) => await supabase.auth.signUp(email, password);

  const signIn = async (email, password) => await supabase.auth.signInWithPassword(email, password);

  const signOut = async () => await supabase.auth.signOut();
  useEffect(() => {

    const getUserSession = async () => {
      const {
        data: { userSession },
      } = supabase.auth.getSession();
      if (userSession) {
        const { user } = userSession;
        setUserSession(user && null);
      }
    };

    getUserSession();

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setUserSession(session);
    });
    return () => subscription.unsubscribe();
  }, []);

  return{
    userSession,
    signUp,
    signIn,
    signOut
  }
}
