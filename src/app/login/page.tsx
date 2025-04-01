"use client";

import React, { Suspense } from 'react';
import { LoginForm } from "./_components/login-form";
const LoginPage = () => {

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow">
                <div className="text-center">
                    <h1 className="text-2xl font-bold">Admin Login</h1>
                    <p className="text-gray-600">Sign in to your admin account</p>
                </div>

                <Suspense fallback={<section className='w-full h-full min-h-screen flex items-center justify-center'>
                    <p className='text-body'>Loading</p>
                </section>}>
                    <LoginForm />
                </Suspense>
            </div>
        </div>
    );
};

export default LoginPage;
