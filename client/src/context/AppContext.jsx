import { createContext, useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export const AppContext = createContext();

const AppContextProvider = (props) => {
  const url = "https://pictoai-backend.onrender.com"
  const [user, setUser] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [credit, setCredit] = useState(0); // Initial credit
  const [loading, setLoading] = useState(false); // Loading state

  const backendUrl = import.meta.env.VITE_BACKEND_URL;
  const navigate = useNavigate();

  // Function to refresh the authentication token
  const refreshToken = async () => {
    try {
      const { data } = await axios.post(`${backendUrl}/api/auth/refresh-token`, {
        token,
      });

      if (data.success) {
        localStorage.setItem("token", data.newToken);
        setToken(data.newToken);
      } else {
        toast.error("Session expired. Please login again.");
        logout();
        navigate("/login");
      }
    } catch (error) {
      console.error("Error refreshing token:", error);
      toast.error("Failed to refresh session. Please login again.");
      logout();
      navigate("/login");
    }
  };

  // Function to generate images
  const generateImage = async (prompt) => {
    setLoading(true); // Start loading
    try {
      const { data } = await axios.post(
        `${backendUrl}/api/image/generate-image`,
        { prompt },
        { headers: { token } }
      );

      setLoading(false); // Stop loading

      if (data.success) {
        setCredit((prev) => prev - data.creditUsed); // Deduct credits directly
        return data.resultImage;
      } else {
        toast.error(data.message);
        if (data.creditBalance === 0) {
          navigate("/buycredit");
        }
      }
    } catch (error) {
      setLoading(false); // Stop loading
      console.error("Failed to generate image:", error);
      toast.error("Failed to generate image.");
    }
  };

  // Function to load user credit data
  const loadCreditsData = async () => {
    setLoading(true); // Start loading
    try {
      const { data } = await axios.get(`${backendUrl}/api/user/credits`, {
        headers: { token },
      });

      setLoading(false); // Stop loading

      if (data.success) {
        setCredit(data.credits);
        setUser(data.user);

        // Redirect to buy credits if the balance is zero
        if (data.credits === 0) {
          navigate("/buycredit");
        }
      } else {
        toast.error(data.message);
        if (data.message.includes("Invalid token")) {
          logout();
          navigate("/login");
        }
      }
    } catch (error) {
      setLoading(false); // Stop loading
      console.error("Error loading credit data:", error);
      setCredit(0);
      setUser(null);
      toast.error("Failed to load credit data.");
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setCredit(0);
    navigate("/login");
  };

  // UseEffect to check token and load data
  useEffect(() => {
    if (token) {
      loadCreditsData();
    } else {
      refreshToken();
    }
  }, [token]);

  // Context value
  const value = {
    user,
    setUser,
    showLogin,
    setShowLogin,
    backendUrl,
    token,
    setToken,
    credit,
    setCredit,
    loading,
    loadCreditsData,
    logout,
    generateImage,
  };

  return (
    <AppContext.Provider value={value}>
      {props.children}
    </AppContext.Provider>
  );
};

export default AppContextProvider;
