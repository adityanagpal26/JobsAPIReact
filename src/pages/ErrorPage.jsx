import React from 'react'
import notfound from '../assets/not-found.svg'
import { useRouteError } from "react-router-dom";
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';

const ErrorPage = () => {
  const user= useSelector(state=>state.user.token);
  const error = useRouteError();
  console.error(error);

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <img src={notfound} alt="not found" className="w-96" />
      <h1 className="text-4xl font-bold my-4"><span>{error.status}</span> <span>{error.statusText}</span></h1>
      <p className="text-lg text-center">
        {error.error.message}
      </p>
      <Link to={user? '/dashboard': '/'} className="btn btn-wide mt-4">Go Home</Link>
    </div>
  )
}

export default ErrorPage