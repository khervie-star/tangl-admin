/* eslint-disable @typescript-eslint/no-explicit-any */

export type TUserType = "INVESTMENT_COMPANY" | "INVESTOR";

export type TVerificationStatus = "UNVERIFIED" | "VERIFIED";

export interface IBrochureDownload{
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
