import { useEffect } from "react";
import CreatePost from "../components/Posts/CreatePost";
import PostsList from "../components/Posts/PostsList";
import Login from "../Pages/User/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import PrivateNavbar from "../components/Navbar/PrivateNavbar";
import Home from "../Pages/Home/Home";
import PostDetails from "../components/Posts/PostDetails";
import Register from "../Pages/User/Register";
import Profile from "../Pages/User/Profile";
import { useSelector, useDispatch } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { isAuthenticated } from "./redux/slices/authSlices";
import { checkAuthStatusAPI } from "./APIServices/user/userAPI";
import AuthRoute from "../components/AuthRoute/AuthRoute";

function App() {
  const { isError, isLoading, data, error, isSuccess, refetch } = useQuery({
    queryKey: ["user-auth"],
    queryFn: checkAuthStatusAPI,
  });

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(isAuthenticated(data));
  }, [data]);

  const { userAuth } = useSelector((state) => state.auth);

  return (
    <BrowserRouter>
      {userAuth ? <PrivateNavbar /> : <PublicNavbar />}

      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/create-post"
          element={
            <AuthRoute>
              <CreatePost />
            </AuthRoute>
          }
        />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route
          path="/profile"
          element={
            <AuthRoute>
              <Profile />
            </AuthRoute>
          }
        />
        {/* <Route path="/posts/:postId" element={<UpdatePost />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
