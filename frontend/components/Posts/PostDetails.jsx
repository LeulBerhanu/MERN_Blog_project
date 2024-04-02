import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getSinglePostAPI } from "../../src/APIServices/posts/postsAPI";

const PostDetails = () => {
  const { postId } = useParams();

  const { isSuccess, isLoading, data, error } = useQuery({
    queryKey: ["post-detail"],
    queryFn: () => getSinglePostAPI(postId),
  });

  console.log(data);

  return (
    <div>
      PostDetails
      {isLoading && <p>Loading...</p>}
      {error && <p>{error.message}</p>}
      <h1>{data?.title}</h1>
    </div>
  );
};

export default PostDetails;
