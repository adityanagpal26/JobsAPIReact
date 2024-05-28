import React from "react";
import { Outlet, redirect, useNavigation } from "react-router-dom";
import { Loading, Header } from "../components";

export const loader=(store)=>()=>{
  const user= store.getState().user.token;
  if(!user){
    return redirect('/')
  }
  return null;
}

const DashboardPage = () => {
  const navigation = useNavigation();
  const loading = navigation.state === "loading";

  return (
    <>
      <div>
        <Header />
        {loading ? <Loading /> : <Outlet />}
      </div>
    </>
  );
};

export default DashboardPage;
