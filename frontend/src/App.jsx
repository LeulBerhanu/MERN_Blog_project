import { useState } from "react";
import CreatePost from "../components/Posts/CreatePost";
import PostsList from "../components/Posts/PostsList";
import Login from "../Pages/User/Login";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import Home from "../Pages/Home/Home";
import PostDetails from "../components/Posts/PostDetails";
import Register from "../Pages/User/Register";
function App() {
  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:postId" element={<PostDetails />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Register />} />
        {/* <Route path="/posts/:postId" element={<UpdatePost />} /> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;
