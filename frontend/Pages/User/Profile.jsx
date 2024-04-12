import React, { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { checkAuthStatusAPI } from "../../src/APIServices/user/userAPI";
import { useDispatch } from "react-redux";
import { isAuthenticated } from "../../src/redux/slices/authSlices";

const Profile = () => {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatusAPI,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);

  return <div>Profile</div>;
};

export default Profile;
