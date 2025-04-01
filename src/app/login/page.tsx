"use client";

import React, { Suspense } from 'react';
import { LoginForm } from "./_components/login-form";
const LoginPage = () => {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <Suspense fallback={<section className='w-full h-full min-h-screen flex items-center justify-center'>
                <p className='text-body'>Loading</p>
            </section>}>
                <LoginForm />
            </Suspense>
        </div>
    );
};

export default LoginPage;
