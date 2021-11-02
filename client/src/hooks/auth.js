import { useState, useEffect, useCallback } from "react";

const useAuth = () => {
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const [isReady, setIsReady] = useState(false);

  const login = useCallback((jwtToken, userId) => {
    setToken(jwtToken);
    setId(userId);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: userId,
        token: jwtToken,
      })
    );
  }, []);

  const logout = useCallback(() => {
    setToken(null);
    setId(null);
    localStorage.removeItem("userData");
  }, []);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("userData"));
    if (data && data.token) {
      login(data.token, data.userId);
    }
    setIsReady(true);
  }, [login]);

  return { login, logout, token, id, isReady };
};

export default useAuth;
