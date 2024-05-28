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
import UserDashbaord from "../Pages/User/UserDashboard";
import AccountSummaryDashboard from "../Pages/User/AccountSummary";
import AddCategory from "../components/Category/AddCategory";
import CreatePlan from "../components/Plans/CreatePlan";
import Pricing from "../components/Plans/Pricing";
import CheckoutForm from "../components/Plans/CheckoutForm";
import PaymentSuccess from "../components/Plans/PaymentSuccess";
import PayingFreePlan from "../components/Plans/PayingFreePlan";

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

        <Route path="/dashboard" element={<UserDashbaord />}>
          {/* Account Summary */}
          <Route
            index
            element={
              <AuthRoute>
                <AccountSummaryDashboard />
              </AuthRoute>
            }
          />
          {/* Create Post */}
          <Route
            path="create-post"
            element={
              <AuthRoute>
                <CreatePost />
              </AuthRoute>
            }
          />
          {/* Create Plan */}
          <Route
            path="create-plan"
            element={
              <AuthRoute>
                <CreatePlan />
              </AuthRoute>
            }
          />
          {/* Add category */}
          <Route
            path="add-category"
            element={
              <AuthRoute>
                <AddCategory />
              </AuthRoute>
            }
          />
        </Route>

        {/* public links */}
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/checkout/:planId" element={<CheckoutForm />} />

        <Route
          path="/success"
          element={
            <AuthRoute>
              <PaymentSuccess />
            </AuthRoute>
          }
        />
        <Route
          path="/free-subscription"
          element={
            <AuthRoute>
              <PayingFreePlan />
            </AuthRoute>
          }
        />
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
