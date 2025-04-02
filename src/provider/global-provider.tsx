"use client";

// import { AuthProvider } from "@/context/auth-context";
// import { UserProvider } from "@/context/user-context";
import ThemeRegistry from "@/themes/ThemeRegistry";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v13-appRouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import React from "react";
import { Toaster } from 'sonner'
import { SessionProvider } from "next-auth/react";


const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
    refetchOnMount: false
  }
  }
});

const GlobalProvider = ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return (
    <SessionProvider>
      <QueryClientProvider client={queryClient}>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <AppRouterCacheProvider>
            <ThemeRegistry>
              <Toaster richColors className="!font-outfit" />
              {children}
            </ThemeRegistry>
          </AppRouterCacheProvider>
        </LocalizationProvider>
      </QueryClientProvider>
    </SessionProvider>

  );
};

export default GlobalProvider;
