import React from "react";
import FormInput from "./FormInput";
import { Form, useNavigation } from "react-router-dom";




const CreateJobForm = () => {
const navigation= useNavigation();
const isSubmitting = navigation.state === "submitting";
  return (
    <section className="mt-12 bg-gray-50 py-8 px-8">
      <Form method="post" className="flex flex-col lg:flex-row items-center justify-between gap-6 ">
        <FormInput placeholder="Position" name="position"  />
        <FormInput placeholder="Company" name="company"   />
        <button type="submit" className="btn btn-primary lg:btn-wide w-full" disabled= {isSubmitting}>Add Job</button>
      </Form>
    </section>
  );
};

export default CreateJobForm;
