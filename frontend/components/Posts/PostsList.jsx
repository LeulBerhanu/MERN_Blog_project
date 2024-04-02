import React, { useState } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getPostAPI } from "../../src/APIServices/posts/postsAPI";

const PostsList = () => {
  const { isSuccess, isLoading, data, error } = useQuery({
    queryKey: ["lists-post"],
    queryFn: getPostAPI,
  });
  console.log(data);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {isSuccess && <p>Posts fetched!</p>}
      {error && <p>{error.message}</p>}
      {data?.map((post, idx) => (
        <div key={idx}>
          {
            <div>
              <h2>{post.title}</h2>
              <p>{post.description}</p>
            </div>
          }
        </div>
      ))}
    </div>
  );
};

export default PostsList;
