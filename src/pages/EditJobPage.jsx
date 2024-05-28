import React from "react";
import { toast } from 'react-toastify';
import { redirect, useLoaderData } from 'react-router-dom';
import { customFetch, capitalizeFirstLetter } from '../utils/utils';
import { FormInput, FormSelect } from '../components';
import { Form, useNavigate } from 'react-router-dom';

export const loader =(store)=> async ({ params }) => {
  const user= store.getState().user.token;
  if(!user){
    return redirect('/')
  }
  const {id} = params;
  try{
    const res = await customFetch.get(`/jobs/${id}`);
    return res?.data;
  }
  catch(error){
    toast.error(error?.response?.data?.msg || "An error occurred");
    return redirect('/dashboard');
  }
};

export const action=(queryClient)=> async ({request, params})=>{
  const {id} = params;
  try{
    const formData = await request.formData();
    const data = Object.fromEntries(formData);
    const response = await customFetch.patch(`/jobs/${id}`, data);
    toast.success("Job updated successfully");
    await queryClient.removeQueries({ queryKey: ["jobs"] });
    return redirect('/dashboard');
  }
  catch(error){
    console.log(error);
    toast.error(error?.response?.data?.msg || "An error occurred");
    return null;
  }
}

const EditJobPage = () => {

  const {job}= useLoaderData();
  const {id, position, company, status} = job;
  const navigate= useNavigate();
  return (
    <section>
      <h1>Edit Job</h1>
      <Form method="post">
        <FormInput
          label="Position"
          name="position"
          type="text"
          defaultValue={position}
          width="w-1/2"
        />
        <FormInput
          label="Company"
          name="company"
          type="text"
          defaultValue={company}
          width="w-1/2"
        />
        <FormSelect
          label="Status"
          name="status"
          type="text"
          defaultValue={capitalizeFirstLetter(status)}
          options={["interview", "pending", "declined"]}
          width="w-1/2"
        />
        <button type='submit' className="btn sm:btn-wide w-full">Wide</button>
      </Form>
    </section>
  );
};

export default EditJobPage;
