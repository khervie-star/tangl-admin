/* eslint-disable @typescript-eslint/no-explicit-any */

export type TUserType = "INVESTMENT_COMPANY" | "INVESTOR";

export type TVerificationStatus = "UNVERIFIED" | "VERIFIED";

export interface IBrochureDownload {
  id: string;
  name: string;
  email: string;
  phoneNumber: string;
  communicationsOptIn: boolean;
}

export interface IWaitlistUser {
  id: string;
  _id?: string;
  name: string;
  email: string;
  accountType: TUserType | null;
  country: string;
  communicationsOptIn: boolean;
}

export interface IInvestmentRequest {
  _id?: string;
  id?: string;
  createdAt?: string;
  title?: string;
  nationalInsuranceNumber?: string;
  firstName?: string;
  lastName?: string;
  middleName?: string;
  maritalStatus?: string;
  dateOfBirth?: string;
  nationality?: string;
  emailAddress?: string;
  telephoneNumber?: string;
  mobileNumber?: string;
  otherPhoneNumber?: string;
  address?: string;
  investmentSize?: string;
  investmentAmount?: number;
  investmentCurrency?: string;
  sourceOfFunds?: string;
  accountName?: string;
  bankName?: string;
  accountNumber?: string;
  sortCode?: string;
  iban?: string;
  swift?: string;
  bankAddress?: string;
  signature?: string;
  companyName?: string;
  contactName?: string;
  dateOfIncorporation?: string;
  companyNumber?: string;
  fullName?: string;
  dateOfApplication?: string;
  investmentType?: TInvestorTypes | null;
  status?: TInvestmentApplicationStates;
}

export type TInvestorTypes =
  | "INDIVIDUAL"
  | "COMPANY"
  | "HIGHNETWORTHINDIVIDUAL"
  | "SOPHISTICATEDINDIVIDUAL";

export type TInvestmentApplicationStates = "PENDING" | "APPROVED" | "REJECTED";
