import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  getSinglePostAPI,
  updatePostAPI,
} from "../../src/APIServices/posts/postsAPI";

const UpdatePost = () => {
  const { postId } = useParams();

  const { data } = useQuery({
    queryKey: ["post-detail"],
    queryFn: () => getSinglePostAPI(postId),
  });

  //   console.log("queryData", data);

  const postMutation = useMutation({
    mutationKey: ["update-post"],
    mutationFn: updatePostAPI,
  });

  const formik = useFormik({
    initialValues: {
      title: data?.title || "",
      description: data?.description || "",
    },
    enableReinitialize: true,
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      postMutation.mutate({ postId, ...values });
    },
  });

  // loading state
  const isLoading = postMutation.isPending;
  // Error state
  const isError = postMutation.isError;
  // success state
  const isSuccess = postMutation.isSuccess;
  // Error
  const error = postMutation.error;

  return (
    <div>
      {isLoading && <p>Loading ...</p>}
      {isSuccess && <p>Post updated Successfully</p>}
      {isError && <p>{error.message}</p>}
      <form onSubmit={formik.handleSubmit}>
        <input
          type="text"
          name="title"
          placeholder="Enter title"
          {...formik.getFieldProps("title")}
        />
        {formik.touched.title && formik.errors.title && (
          <span>{formik.errors.title}</span>
        )}

        <input
          type="text"
          name="description"
          placeholder="Enter description"
          {...formik.getFieldProps("description")}
        />
        {formik.touched.description && formik.errors.description && (
          <span>{formik.errors.description}</span>
        )}

        <button type="submit">Update</button>
      </form>
    </div>
  );
};

export default UpdatePost;
