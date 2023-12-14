import { useState, useEffect, useContext, useMemo } from "react";
import AppContext from "../contexts/Appcontext";
import supabase from "../supabase/client";

export default function useProfile() {
  const { userSession } = useContext(AppContext);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState(null);

  const getProfile = useMemo(
    () => async () => {
      try {
        const session = await userSession;
        const { data, error } = await supabase
          .from("profiles")
          .select(`id,username, first_name, last_name, avatar_url`)
          .eq("id", session.user.id)
          .single();

        if (!ignore) {
          if (error) {
            console.warn(error.message);
          } else if (data) {
            setProfile(data);
          }
        }
      } catch (error) {
        console.error("Error fetching profile:", error.message);
      } finally {
        setLoading(false);
      }
    },
    [userSession]
  );

  let ignore = false;

  useEffect(() => {
    const fetchData = async () => {
      await getProfile();
    };

    fetchData();

    return () => {
      ignore = true;
    };
  }, [getProfile]);

  return {
    loading,
    profile,
    setLoading,
    setProfile,
  };
}
