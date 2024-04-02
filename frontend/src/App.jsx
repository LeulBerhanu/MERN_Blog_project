import { useState } from "react";
import CreatePost from "../components/Posts/CreatePost";
import PostsList from "../components/Posts/PostsList";
import UpdatePost from "../components/Posts/UpdatePost";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import PublicNavbar from "../components/Navbar/PublicNavbar";
import HomePage from "../Pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <PublicNavbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/posts" element={<PostsList />} />
        <Route path="/posts/:postId" element={<UpdatePost />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
