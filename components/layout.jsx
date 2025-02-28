import { useRouter } from "next/router";
import Navbar from "@/components/common/navbar/Navbar";
import Footer from "./common/footer/footer";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import { getSetData } from "@/utils";
import ApiClient from "@/api/apiClient";
import ConditionalDownloadButton from "@/pages/ConditionalDownloadButton";

export default function Layout({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [userData, setUserData] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [error, setError] = useState(null);

  const router = useRouter();
  const { user_id } = getSetData("userData", false, true);

  const getUserProfile = () => {
    if (!user_id) return; // Don't make API call if user_id is not available
    
    setIsLoading(true);
    setError(null);
    let payload = {
      user_id: user_id,
    };

    ApiClient.userProfile(payload)
      .then((res) => {
        if (res?.data?.profile[0]) {
          setUserData(res.data.profile[0]);
        } else {
          setError("No profile data found");
        }
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to fetch user profile");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  // Check authentication status
  useEffect(() => {
    const checkAuth = () => {
      const token = getSetData("token");
      setIsAuthenticated(!!token);
      setIsLoading(false);
    };

    checkAuth();
  }, [router]);

  // Set client-side rendering flag and fetch user profile
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Fetch user profile when user_id is available and authenticated
  useEffect(() => {
    if (isAuthenticated && user_id) {
      getUserProfile();
    }
  }, [isAuthenticated, user_id]);

  // Define the pages where the navbar should be hidden
  const hideNavbarPages = [
    "/sridevi",
    "/karnataka-day",
    "/kalyan-matka",
    "/milan-morning",
    "/rudraksh-morning",
    "/main-bazaar",
    "/time-bazaar",
    "/main-mumbai",
    "/rajdhani-matka",
    "/galidisawarpage",
    "/madhur-morning",
  ];


  return (
    <>
      {/* Show Navbar (and the welcome text) only if the current path is not in hideNavbarPages */}
      {!hideNavbarPages.includes(router.pathname) && (
        <>
          <Navbar />
          {/* Render welcome message only on the homepage */}
          {router.pathname === "/"  && isAuthenticated && (
            <div className="p-2 text-center flex flex-col gap-y-2">
              <h1 className="text-xl mt-3 text-black font-semibold">
                Hi <b>{userData?.user_name}</b>, welcome to Daily Kalyan!
              </h1>
              {/* Container for animated text */}
              <div className="overflow-hidden">
                <h6 className="animate-slide text-black whitespace-nowrap">
                  Welcome to Daily Kalyan - Online Matka Play App. - India's Most Trusted Satta Matka Games with 24x7 Customer Support.
                </h6>
              </div>
            </div>
          )}
          {router.pathname === "/galidesawar" && isAuthenticated && (<div className="p-2 text-center flex flex-col gap-y-2">
              <h1 className="text-xl mt-3 text-black font-semibold">
                Hi <b>{userData?.user_name}</b>, welcome to Daily Kalyan!
              </h1>
              {/* Container for animated text */}
              <div className="overflow-hidden">
                <h6 className="animate-slide text-black whitespace-nowrap">
                  Welcome to Daily Kalyan - Online Matka Play App. - India's Most Trusted Satta Matka Games with 24x7 Customer Support.
                </h6>
              </div>
            </div>)}
        </>
      )}

      <Toaster position="top-right" />

      <main>{children}</main>

      {/* <Footer /> */}
    </>
  );
}