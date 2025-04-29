"use client";

import React, { useEffect, useState } from "react";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, Upload } from "lucide-react";
import { toast } from "sonner";
import { IInvestmentRequest } from "../../../types";
import { InvestmentsDataTable } from "@/components";
import { parse } from "json2csv";


const fields = [
  "title",
  "firstName",
  "middleName",
  "lastName",
  "fullName",
  "emailAddress",
  "telephoneNumber",
  "mobileNumber",
  "otherPhoneNumber",
  "address",
  "dateOfBirth",
  "maritalStatus",
  "nationality",
  "nationalInsuranceNumber",
  "investmentType",
  "investmentSize",
  "investmentAmount",
  "investmentCurrency",
  "sourceOfFunds",
  "accountName",
  "bankName",
  "accountNumber",
  "sortCode",
  "iban",
  "swift",
  "bankAddress",
  "signature",
  "status",
  "dateOfApplication",
];


function downloadCSV(data: any[]) {
  const cleanedData = data.map((entry) => {
    const cleaned: Record<string, any> = {};
    for (const field of fields) {
      cleaned[field] = entry[field] ?? "";
    }
    return cleaned;
  });

  const csv = parse(cleanedData, { fields });
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.setAttribute("download", "Investment-Request.csv");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}


const InvestmentRequestsPage = () => {
  const [requests, setRequests] = useState<IInvestmentRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [, setError] = useState<string | null>(null);

  const fetchInvestmentRequests = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch("/api/investments");

      if (!response.ok) {
        throw new Error(
          `Failed to fetch investment requests: ${response.status} ${response.statusText}`
        );
      }

      const data = await response.json();
      setRequests(data);
    } catch (err) {
      console.error("Error fetching investment requests:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load investment requests"
      );
      toast.error(
        "There was a problem fetching the investments data. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Load data on initial mount
  useEffect(() => {
    fetchInvestmentRequests();
  }, []);

  // Handle export
  const handleExport = async () => {
    if (requests.length === 0) {
      toast.error("There are no investors to export.");
      return;
    }
    toast.info("Preparing CSV export of investors");

    downloadCSV(requests);
  };

  return (
    <div className="container mx-auto py-10 space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            Investment requests
          </h1>
          <p className="text-muted-foreground">
            Manage your investors and their accounts
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="flex items-center gap-1">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button
            variant="outline"
            className="flex items-center gap-1"
            onClick={handleExport}>
            <Download className="h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      <div className="border border-border p-4 rounded-lg">
        <CardHeader className="pb-2">
          <CardTitle>All Requests</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <CardContent>
          <InvestmentsDataTable data={requests} isLoading={isLoading} />
        </CardContent>
      </div>
    </div>
  );
};

export default InvestmentRequestsPage;
