"use client";
import { AppButton } from "@/components";
import { IInvestmentRequest } from "@/types";
import { FormGroup, FormControlLabel, Checkbox, Button } from "@mui/material";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";
import { FaArrowLeftLong } from "react-icons/fa6";
import { toast } from "sonner";

async function fetchSingleInvestmentDetail({ id }: { id: string }) {
  const res = await fetch(`/api/investments/single`, {
    method: "POST",
    body: JSON.stringify({ id: id }),
  });
  if (!res.ok) throw new Error("Failed to fetch investment");
  return res.json();
}

const InvestmentDetailPage = () => {
  const params = useParams();
  const router = useRouter();
  const queryClient = useQueryClient();
  const { status } = useSession();
  const { id } = params;

  console.log("Investment ID:", id);
  console.log(params);

  const { data, isLoading, error } = useQuery<IInvestmentRequest>({
    queryKey: ["InvestmentDetail", id],
    queryFn: () =>
      fetchSingleInvestmentDetail({
        id: id as string,
      }),
    enabled: status === "authenticated" && !!id,
  });

  const mutation = useMutation({
    mutationFn: async (status: "APPROVED" | "REJECTED") => {
      const res = await fetch("/api/investments/single", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: id as string,
          status: status,
        }),
      });
      if (!res.ok) throw new Error("Failed to update status");
      return res.json();
    },
    onSuccess: () => {
      toast.success("Investment status updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["InvestmentDetail"] });
    },
    onError: (error) => {
      console.error("Error updating status:", error);
      toast.error(
        "There was a problem updating the investment status. Please try again."
      );
    },
  });

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    });
  };

  // Format currency for display
  const formatCurrency = (amount?: number, currency?: string) => {
    if (!amount) return "";
    return new Intl.NumberFormat("en-GB", {
      style: "currency",
      currency: currency || "GBP",
    }).format(amount);
  };

  console.log(data);

  if (isLoading) {
    return (
      <section className="w-screen h-screen flex items-center justify-center">
        Loading...
      </section>
    );
  }

  if (error) {
    console.error("Error fetching investment details:", error);
    return <div>Error loading investment details</div>;
  }
  return (
    <section>
      <Button
        className="text-primary !normal-case !flex !items-center !gap-2"
        onClick={() => router.back()}>
        <FaArrowLeftLong />
        Back
      </Button>
      <p className="font-medium text-secondary text-[20px] lg:text-[24px] mb-8">
        Investment Summary
      </p>

      <div className="flex flex-col lg:flex-row gap-10">
        <div className="w-full lg:w-[65%]">
          {/* <p className="font-medium text-body text-[20px] lg:text-[24px] mb-4">
            Preview Application
          </p> */}
          <div className="flex items-center gap-5 mb-4">
            <p className="font-medium text-body text-[20px] lg:text-[24px]">
              Preview Application
            </p>
            <div>
              <p
                className={`font-semibold px-3 py-1 rounded-full capitalize ${
                  data?.status?.toLocaleLowerCase() === "approved"
                    ? "bg-green-100 text-green-600"
                    : data?.status?.toLocaleLowerCase() === "rejected"
                    ? "bg-red-100 text-red-600"
                    : "bg-yellow-100 text-yellow-600"
                }`}>
                {data?.status || "PENDING"}
              </p>
            </div>
          </div>

          <div className="border border-border rounded-lg p-5 lg:p-8 mb-10">
            {/* Applicant Information Section */}
            <section className="mb-10">
              <p className="text-app_gray_light text-base font-medium mb-4">
                Applicant(s) Information
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-body font-medium text-base mb-2">Title</p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.title || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    National Insurance Number
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.nationalInsuranceNumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    First Name
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.firstName || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Last Name
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.lastName || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Middle Name
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.middleName || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Marital Status
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.maritalStatus || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Date of Birth
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {formatDate(data?.dateOfBirth) || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Nationality
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.nationality || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Email Address
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.emailAddress || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Telephone Number
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.telephoneNumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Mobile Number
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.mobileNumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Other Phone Number
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.otherPhoneNumber || "Not provided"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-body font-medium text-base mb-2">
                    Address
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.address || "Not provided"}
                  </p>
                </div>
              </div>
            </section>

            {/* Investment Choice Section */}
            <section className="mb-10">
              <p className="text-app_gray_light text-base font-medium mb-4">
                Investment Choice
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Investment Size
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.investmentSize === "LessThan100"
                      ? "£25,000 to £99,999 Investment"
                      : "£100,000 and above"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Amount to Invest
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {formatCurrency(
                      data?.investmentAmount,
                      data?.investmentCurrency
                    ) || "Not provided"}
                  </p>
                </div>
                <div className="md:col-span-2">
                  <p className="text-body font-medium text-base mb-2">
                    Source of Funds
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.sourceOfFunds || "Not provided"}
                  </p>
                </div>
              </div>
            </section>

            {/* Bank Details Section */}
            <section className="mb-10">
              <p className="text-app_gray_light text-base font-medium mb-4">
                Bank Details
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Account Name
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.accountName || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Bank Name
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.bankName || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Account Number
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.accountNumber || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    Sort Code
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.sortCode || "Not provided"}
                  </p>
                </div>

                <div>
                  <p className="text-body font-medium text-base mb-2">IBAN</p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.iban || "Not provided"}
                  </p>
                </div>
                <div>
                  <p className="text-body font-medium text-base mb-2">
                    SWIFT Code
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.swift || "Not provided"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-body font-medium text-base mb-2">
                    Bank Address
                  </p>
                  <p className="text-app_gray font-normal text-base">
                    {data?.bankAddress || "Not provided"}
                  </p>
                </div>

                <div className="md:col-span-2">
                  <p className="text-body font-medium text-base mb-2">
                    Signature
                  </p>
                  {data?.signature && (
                    <div className="w-[187px] h-[77px] rounded-lg relative">
                      <Image
                        src={data?.signature || ""}
                        alt="Signature"
                        fill
                        className="rounded-lg object-cover"
                      />
                    </div>
                  )}
                </div>
              </div>
            </section>
          </div>
        </div>
        <div className="w-full lg:w-[35%]">
          <div className="mb-10">
            <p className="font-medium text-body text-[20px] lg:text-[24px] mb-4">
              Consent and Declaration
            </p>

            <div className="border border-border rounded-lg p-5 lg:p-8">
              <div className="w-full mb-4">
                <FormGroup className="!w-full !gap-4 !m-0">
                  <FormControlLabel
                    control={<Checkbox defaultChecked disabled />}
                    className="border rounded-lg p-3 !m-0"
                    label={
                      <p className="text-[14px] font-medium text-app_gray">
                        I declare that the information I have provided above is
                        true, accurate, and complete to the best of my
                        knowledge. I understand that any false statement may
                        result in consequences as per applicable policies and
                        regulations.
                      </p>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked disabled />}
                    className="border rounded-lg p-3 !m-0"
                    label={
                      <p className="text-[14px] font-medium text-app_gray">
                        I hereby give consent for my personal data included in
                        this Investment Application Form to be processed by the
                        Company and its related companies.
                      </p>
                    }
                  />
                  <FormControlLabel
                    control={<Checkbox defaultChecked disabled />}
                    className="border rounded-lg p-3 !m-0"
                    label={
                      <p className="text-[14px] font-medium text-app_gray">
                        By entering my email address, I agree to receive
                        newsletters from the Company. Collected information will
                        not be shared with any third party and complies with the
                        Company stated Privacy Policy.
                      </p>
                    }
                  />
                </FormGroup>
              </div>
            </div>
          </div>

          <div className="mt-10">
            <p className="font-medium text-body text-[20px] lg:text-[24px] mb-4">
              Actions
            </p>

            <div className="border border-border rounded-lg p-5 lg:p-8">
              <div className="flex flex-col md:flex-row items-center gap-4">
                <AppButton
                  isDisabled={mutation.isPending}
                  loading={
                    mutation.isPending && mutation.variables === "APPROVED"
                  }
                  onClick={() => mutation.mutate("APPROVED")}
                  extraClass="!normal-case !py-3 !bg-green-600 !text-white !border-none !w-full lg:!w-1/2">
                  {mutation.isPending && mutation.variables === "APPROVED"
                    ? "Approving"
                    : "Approve Application"}
                </AppButton>

                <AppButton
                  isDisabled={mutation.isPending}
                  loading={
                    mutation.isPending && mutation.variables === "REJECTED"
                  }
                  onClick={() => mutation.mutate("REJECTED")}
                  extraClass="!normal-case !py-3 !bg-red-600 !text-white !border-none !w-full lg:!w-1/2">
                  {mutation.isPending && mutation.variables === "REJECTED"
                    ? "Rejecting"
                    : "Reject Application"}
                </AppButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InvestmentDetailPage;
