import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { Navigate } from "react-router-dom";
import { checkAuthStatusAPI } from "../../src/APIServices/user/userAPI";
import AuthCheckingComponent from "./AuthCheckingComponent";

const AuthRoute = ({ children }) => {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatusAPI,
  });
  //   const navigate = useNavigate();

  if (isLoading) {
    return <AuthCheckingComponent />;
  }

  if (!data) {
    return <Navigate to="/login" />;
  }

  return children;
};

export default AuthRoute;
