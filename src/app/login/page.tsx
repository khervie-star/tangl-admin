"use client";

import React, { Suspense } from 'react';
import { LoginForm } from "./_components/login-form";
import { DotLoader } from "react-spinners";

const IndexPage = () => {

    return (
      <div className="">
        <Suspense
          fallback={
            <section className="w-full h-full min-h-screen flex items-center justify-center">
              <DotLoader size={36} color="#011122" />
            </section>
          }>
          <LoginForm />
        </Suspense>
      </div>
    );
};

export default IndexPage;
