import React from "react";
import { Header } from "../components";
import { Link } from "react-router-dom";
import main from "../assets/main.svg";

const HomePage = () => {
  return (
    <>
      <Header />
      <section className="grid grid-cols-1 lg:grid-cols-2 mt-16 gap-16">
        <div className="flex flex-col min-w-[400px] pt-20">
          <h1 className="text-5xl font-bold mb-6">Job Tracking App</h1>
          <p className="mb-6">
            I'm baby viral enamel pin chartreuse cliche retro af selfies kinfolk
            photo booth plaid jianbing actually squid 3 wolf moon lumbersexual.
            Hell of humblebrag gluten-free lo-fi man braid leggings.
          </p>
          <Link className="btn btn-wide btn-primary" to="/register">
            Login/Register
          </Link>
        </div>
        <div className="hidden  lg:flex items-center justify-center mt-4">
          <img src={main} alt="job" className="rounded-lg shadow-2xl" />
        </div>
      </section>
    </>
  );
};

export default HomePage;
