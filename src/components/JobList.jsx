import React from "react";
import { useLoaderData } from "react-router-dom";
import moment from "moment";
import { capitalizeFirstLetter, customFetch } from "../utils/utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { Link } from "react-router-dom";

const JobList = () => {
  const { jobs, count } = useLoaderData();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = React.useState(false);
  const [deletingJobId, setDeletingJobId] = React.useState(null); // Track the deleting job ID

  const deleteJob = async (id) => {
    try {
      setIsLoading(true);
      setDeletingJobId(id); // Set the current job ID being deleted
      const response = await customFetch.delete(`/jobs/${id}`);
      console.log(response);
      queryClient.removeQueries({ queryKey: ["jobs"] });
      toast.success("Job deleted successfully");
      navigate("/dashboard");
      setIsLoading(false);
      setDeletingJobId(null); // Reset the deleting job ID
    } catch (error) {
      toast.error(error?.response?.data?.msg || "An error occurred");
      navigate("/dashboard");
      setIsLoading(false);
      setDeletingJobId(null); // Reset the deleting job ID
    }
  };

  if (count === 0) {
    return <p className="text-2xl ml-8 mt-6">No jobs found</p>;
  }

  return (
    <section className="mt-6">
      <div className="overflow-x-auto">
        <table className="table table-zebra table-sm">
          {/* head */}
          <thead>
            <tr className="bg-base-200">
              <th>Position</th>
              <th>Company</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {jobs.map((job) => (
              <tr key={job._id}>
                <td>{job.position}</td>
                <td>{job.company}</td>
                <td>{moment(job.createdAt).format("MMM Do [,] YYYY")}</td>
                <td>{capitalizeFirstLetter(job.status)}</td>
                <td className="flex flex-col sm:flex-row gap-2">
                  <Link
                    to={`/dashboard/${job._id}`} // Correct path for edit
                    className="btn btn-xs sm:btn-sm btn-primary"
                  >
                    Edit
                  </Link>
                  <button
                    className="btn btn-xs sm:btn-sm btn-secondary"
                    onClick={() => deleteJob(job._id)}
                    disabled={isLoading && deletingJobId === job._id} // Disable only the button for the deleting job
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default JobList;
