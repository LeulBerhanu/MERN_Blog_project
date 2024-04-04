import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { useMutation } from "@tanstack/react-query";
import { createPostAPI } from "../../src/APIServices/posts/postsAPI";

const CreatePost = () => {
  // const [description, setDescription] = useState("");

  const postMutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPostAPI,
  });

  const formik = useFormik({
    initialValues: {
      description: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
    }),
    onSubmit: (values) => {
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
  const errorMsg = postMutation?.error?.response?.data?.message;
  // console.log(errorMsg);

  return (
    <div>
      {isLoading && <p>Loading ...</p>}
      {isSuccess && <p>Post created Successfully</p>}
      {isError && <p>{errorMsg}</p>}
      <form onSubmit={formik.handleSubmit}>
        <ReactQuill
          value={formik.values.description}
          onChange={(value) => {
            // setDescription(value);
            formik.setFieldValue("description", value);
          }}
        />

        {/* Display error msg */}
        {formik.touched.description && formik.errors.description && (
          <span>{formik.errors.description}</span>
        )}

        <button type="submit">Create</button>
      </form>
    </div>
  );
};

export default CreatePost;
