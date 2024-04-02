import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation } from "@tanstack/react-query";
import { createPostAPI } from "../../src/APIServices/posts/postsAPI";

const CreatePost = () => {
  const postMutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPostAPI,
  });

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
    },
    validationSchema: Yup.object({
      title: Yup.string().required("Title is required"),
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
      console.log(values);
      postMutation.mutate(values);
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
      {isSuccess && <p>Post created Successfully</p>}
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

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
