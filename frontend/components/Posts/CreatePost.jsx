import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ReactQuill from "react-quill";
import Select from "react-select";
import "react-quill/dist/quill.snow.css";
import { FaTimesCircle } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import { createPostAPI } from "../../src/APIServices/posts/postsAPI";
import AlertMessage from "../Alert/AlertMessage";
import { fetchCategoriesAPI } from "../../src/APIServices/category/categoryAPI";

const CreatePost = () => {
  const [description, setDescription] = useState("");
  // File upload state
  const [imageError, setImageError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);

  const postMutation = useMutation({
    mutationKey: ["create-post"],
    mutationFn: createPostAPI,
  });

  const formik = useFormik({
    initialValues: {
      description: "",
      image: "",
      category: "",
    },
    validationSchema: Yup.object({
      description: Yup.string().required("Description is required"),
      image: Yup.string().required("Image is required"),
      category: Yup.string().required("Category is required"),
    }),
    onSubmit: (values) => {
      const formData = new FormData();
      formData.append("description", description);
      formData.append("image", values.image);
      formData.append("category", values.category);
      postMutation.mutate(formData);
    },
  });

  // Fetch catagories
  const { data: categoriesData } = useQuery({
    queryKey: ["fetch-categories"],
    queryFn: fetchCategoriesAPI,
  });

  // File upload logics
  const handleFileChange = (e) => {
    // get the file selected
    const file = e.currentTarget.files[0];
    // limit the file size
    if (file.size > 1048576) {
      setImageError("File size exceed 1MB");
      return;
    }
    // limit the file types
    if (!["image/jpeg", "image/jpg", "image/png"].includes(file.type)) {
      setImageError("Invalid file type");
    }
    // set the image preview
    formik.setFieldValue("image", file);
    setImagePreview(URL.createObjectURL(file));
  };

  // Handle file change

  const removeImage = () => {
    formik.setFieldValue("image", null);
    setImagePreview(null);
  };

  return (
    <div className="flex items-center justify-center">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 m-4">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Add New Post
        </h2>
        {/* show alert */}
        {postMutation.isPending && (
          <AlertMessage type="loading" message="Loading please wait" />
        )}
        {postMutation.isSuccess && (
          <AlertMessage type="success" message="Post created successfully" />
        )}
        {postMutation.isError && (
          <AlertMessage
            type="error"
            message={postMutation?.error?.response?.data?.message}
          />
        )}
        <form onSubmit={formik.handleSubmit} className="space-y-6">
          {/* Description Input - Using ReactQuill for rich text editing */}
          <div className="mb-16">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <ReactQuill
              value={formik.values.description}
              onChange={(value) => {
                setDescription(value);
                formik.setFieldValue("description", value);
              }}
              className="h-40"
            />

            {/* Display error msg */}
            {formik.touched.description && formik.errors.description && (
              <span>{formik.errors.description}</span>
            )}
          </div>

          {/* Category Input - Dropdown for selecting post category */}
          <div>
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <Select
              name="category"
              options={categoriesData?.categories?.map((item) => ({
                value: item._id,
                label: item.categoryName,
              }))}
              onChange={(option) => {
                return formik.setFieldValue("category", option.value);
              }}
              value={categoriesData?.categories?.find(
                (option) => option.value === formik.values.category
              )}
              className="mt-1 block w-full"
            />
            {/* display error */}
            {formik.touched.category && formik.errors.category && (
              <p className="text-sm text-red-600">{formik.errors.category}</p>
            )}
          </div>

          {/* Image Upload Input - File input for uploading images */}
          <div className="flex flex-col items-center justify-center bg-gray-50 p-4 shadow rounded-lg">
            <label
              htmlFor="images"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Upload Image
            </label>
            <div className="flex justify-center items-center w-full">
              <input
                id="images"
                type="file"
                name="image"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <label
                htmlFor="images"
                className="cursor-pointer bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
              >
                Choose a file
              </label>
            </div>
            {/* Display error message */}
            {formik.touched.image && formik.errors.image && (
              <p className="text-sm text-red-600">{formik.errors.image}</p>
            )}

            {/* error message */}
            {imageError && <p className="text-sm text-red-600">{imageError}</p>}

            {/* Preview image */}

            {imagePreview && (
              <div className="mt-2 relative">
                <img
                  src={imagePreview}
                  alt="Preview"
                  className="mt-2 h-24 w-24 object-cover rounded-full"
                />
                <button
                  onClick={removeImage}
                  className="absolute right-0 top-0 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-1"
                >
                  <FaTimesCircle className="text-red-500" />
                </button>
              </div>
            )}
          </div>

          {/* Submit Button - Button to submit the form */}
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-orange-500 to-orange-500 hover:from-indigo-600 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add Post
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreatePost;
