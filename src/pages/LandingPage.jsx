import React from "react";
import { CreateJobForm, JobList } from "../components";
import { toast } from "react-toastify";
import { redirect } from "react-router-dom";
import { customFetch } from "../utils/utils";


const getJobs = {
  queryKey: ["jobs"],
  queryFn: async () => {
    const response = await customFetch.get("/jobs");
    return response.data;
  },
};

export const action =(queryClient)=> async ({ request, params }) => {
  try {
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await customFetch.post("/jobs", data);
    toast.success("Job created successfully");
    await queryClient.removeQueries({queryKey: ["jobs"]});
    return redirect("/dashboard");
  } catch (error) {
    toast.error(error.response.data.msg);
    return redirect("/dashboard");
  }
};


export const loader = (queryClient) =>async () =>{
  try {
   const response = await queryClient.ensureQueryData(getJobs);
    return response;
  } catch (error) {
    toast.error(error);
    return redirect("/dashboard");
  }
};

const LandingPage = () => {
  return (
    <>
      <CreateJobForm />
      <JobList />
    </>
  );
};

export default LandingPage;
