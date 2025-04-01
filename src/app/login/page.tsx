"use client";

import { DeleteIcon, NavTwoLogo } from "@/assets/svg";
import { AppButton } from "@/components";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import { useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Formik } from 'formik';
import * as Yup from "yup";
import { BsEye, BsEyeSlash } from 'react-icons/bs';
import { signIn } from "next-auth/react";
import { toast } from "sonner";


const validationSchema = Yup.object().shape({
    username: Yup.string()
        .required("Username is required"),
    password: Yup.string().required("Password is required"),
});

interface ILoginRequest {
    username: string;
    password: string;
}


const LoginPage = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const errorParam = searchParams.get("error");
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [showPassword, setShowPassword] = React.useState(false);
    const [loginStatus, setLoginStatus] = React.useState<{
        type: 'success' | 'error' | null;
        message: string;
    }>({ type: null, message: '' });


    const [initialValues] = React.useState({
        username: "",
        password: "",
    });

    React.useEffect(() => {
        if (errorParam) {
            setLoginStatus({
                type: 'error',
                message: "Authentication failed. Please check your credentials."
            });
        }
    }, [errorParam]);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };

    const handleMouseUpPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };


    return (
        <section className="container mx-auto">
            <nav className="bg-white text-[#324a64] flex justify-between items-center px-6 py-9">
                <div
                    className="flex items-center pr-10 cursor-pointer"
                >
                    <NavTwoLogo />
                    <div className="ml-[0.971rem] text-2xl font-normal leading-8">
                        Tangl
                    </div>
                </div>
                <button

                    className="bg-white cursor-pointer border-0">
                    <DeleteIcon />
                </button>
            </nav>
            <div className="px-8 py-9">
                <div className="mx-auto pb-68">
                    <div className="mx-auto px-0 md:px-8 py-2 box-border w-full lg:max-w-[50%] md:max-w-[75%] max-w-full">
                        <div className="mb-15">
                            <h1 className="font-outfit font-bold text-3xl leading-10 text-center tracking-tight text-[#324a64] mb-[3.75rem]">
                                Login
                            </h1>
                        </div>
                        <div className="rounded-lg sm:border border-[#e1e8f4] bg-white p-0 md:p-4 border-0 sm:p-8">
                            {loginStatus.type && (
                                <div className={`mb-6 p-4 rounded-md ${loginStatus.type === 'success'
                                        ? 'bg-green-50 text-green-700 border border-green-200'
                                        : 'bg-red-50 text-red-700 border border-red-200'
                                    }`}>
                                    {loginStatus.message}
                                </div>
                            )}

                            
                            <Formik
                                initialValues={initialValues}
                                validationSchema={validationSchema}
                                onSubmit={async (values: ILoginRequest) => {
                                    // setIsLoading(true);
                                    // await signIn("credentials", {
                                    //     username: values.username,
                                    //     password: values.password,
                                    //     callbackUrl: "/"
                                    // });
                                    // setIsLoading(false)

                                    setIsLoading(true);
                                    const result = await signIn("credentials", {
                                        username: values.username,
                                        password: values.password,
                                        redirect: false,
                                    });

                                    if (result?.error) {
                                        setLoginStatus({
                                            type: 'error',
                                            message: "Invalid username or password. Please try again."
                                        });
                                        toast.error("Login failed. Please check your credentials.");
                                    } else {
                                        setLoginStatus({
                                            type: 'success',
                                            message: "Login successful! Redirecting to dashboard..."
                                        });
                                        toast.success("Login successful!");
                                        // Redirect after a short delay to show the success message
                                        setTimeout(() => {
                                            router.push("/");
                                        }, 1500);
                                    }
                                    setIsLoading(false);

                                }}>
                                {({
                                    errors,
                                    touched,
                                    handleChange,
                                    handleSubmit,
                                    values: { username, password },
                                }) => (
                                    <form className="" onSubmit={handleSubmit}>
                                        <div className="mb-8">
                                            <label
                                                htmlFor="username"
                                                className="font-outfit font-medium text-base text-[#43566a] mb-2 block">
                                                Enter username
                                            </label>
                                            <TextField
                                                fullWidth
                                                name="username"
                                                value={username}
                                                onChange={handleChange}
                                                variant="standard"
                                                error={touched.username && Boolean(errors.username)}
                                                helperText={errors.username}
                                                placeholder="blessing@gmail.com"
                                            />
                                        </div>
                                        <div className="mb-8">
                                            <label
                                                htmlFor="password"
                                                className="font-outfit font-medium text-base text-[#43566a] mb-2 block">
                                                Enter password
                                            </label>
                                            <TextField
                                                fullWidth
                                                name="password"
                                                type={showPassword ? "text" : "password"}
                                                value={password}
                                                onChange={handleChange}
                                                variant="standard"
                                                error={touched.password && Boolean(errors.password)}
                                                helperText={errors.password}
                                                placeholder="********"
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="end">
                                                            <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                onMouseUp={handleMouseUpPassword}>
                                                                {showPassword ? (
                                                                    <BsEyeSlash className="text-app_gray" />
                                                                ) : (
                                                                    <BsEye className="text-app_gray" />
                                                                )}
                                                            </IconButton>
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                        </div>

                            
                                        <div className="flex justify-center">
                                            <AppButton
                                                type="submit"
                                                loading={isLoading}
                                                isDisabled={isLoading}
                                                extraClass="!px-16 !py-3 !mt-8 !rounded !font-medium !text-lg !text-white">
                                                Continue
                                            </AppButton>
                                        </div>
                                    </form>
                                )}
                            </Formik>
                        </div>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default LoginPage;
