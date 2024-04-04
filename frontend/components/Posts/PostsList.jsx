import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  deletePostAPI,
  getPostAPI,
} from "../../src/APIServices/posts/postsAPI";
import { Link } from "react-router-dom";

const PostsList = () => {
  const { isSuccess, isLoading, data, error, refetch } = useQuery({
    queryKey: ["lists-post"],
    queryFn: getPostAPI,
  });
  console.log(data);
  const deletePostMutation = useMutation({
    mutationKey: ["delete-post"],
    mutationFn: deletePostAPI,
  });

  const handleDelete = async (postId) => {
    deletePostMutation
      .mutateAsync(postId)
      .then(() => refetch())
      .catch((error) => console.error(error));
  };

  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Posts fetched!</p>}
      {error && <p>{error.message}</p>}s
      {data?.map((post, idx) => (
        <div key={idx}>
          {
            <div>
              <div dangerouslySetInnerHTML={{ __html: post.description }} />
              <Link to={"/posts/" + post?._id}>
                <button>Edit</button>
              </Link>
              <button onClick={() => handleDelete(post?._id)}>Delete</button>
            </div>
          }
        </div>
      ))}
    </div>
  );
};

export default PostsList;
