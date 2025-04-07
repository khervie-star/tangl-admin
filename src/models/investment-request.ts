import mongoose, { Document, Model } from "mongoose";

export interface IInvestmentRequest extends Document {
  // Personal Information
  title?: string;
  nationalInsuranceNumber?: string;
  firstName: string;
  lastName: string;
  middleName?: string;
  maritalStatus?: string;
  dateOfBirth?: Date;
  nationality?: string;
  emailAddress: string;
  telephoneNumber?: string;
  mobileNumber?: string;
  otherPhoneNumber?: string;
  address?: string;

  // Investment Details
  investmentType:
    | "INDIVIDUAL"
    | "COMPANY"
    | "HIGHNETWORTHINDIVIDUAL"
    | "SOPHISTICATEDINDIVIDUAL";
  investmentSize?: "LessThan100" | "GreaterOrEqualTo100";
  investmentAmount: number;
  investmentCurrency?: string;
  sourceOfFunds?: string;

  // Bank Details
  accountName?: string;
  bankName?: string;
  accountNumber?: string; // For UK accounts
  sortCode?: string; // For UK accounts
  iban?: string; // For international accounts
  swift?: string; // For international accounts
  bankAddress?: string;

  // Company Information (if investmentType is COMPANY)
  companyName?: string;
  contactName?: string;
  dateOfIncorporation?: Date;
  companyNumber?: string;

  // Metadata
  signature?: string;
  fullName?: string;
  dateOfApplication?: Date;
  status?: "PENDING" | "APPROVED" | "REJECTED";
  createdAt?: Date;
  updatedAt?: Date;
}

const InvestmentRequestSchema = new mongoose.Schema<IInvestmentRequest>(
  {
    // Personal Information
    title: { type: String, trim: true },
    nationalInsuranceNumber: { type: String, trim: true },
    firstName: {
      type: String,
      required: [true, "First name is required"],
      trim: true,
      maxlength: [100, "First name cannot exceed 100 characters"],
    },
    lastName: {
      type: String,
      required: [true, "Last name is required"],
      trim: true,
      maxlength: [100, "Last name cannot exceed 100 characters"],
    },
    middleName: { type: String, trim: true },
    maritalStatus: { type: String, trim: true },
    dateOfBirth: { type: Date },
    nationality: { type: String, trim: true },
    emailAddress: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    telephoneNumber: { type: String, trim: true },
    mobileNumber: { type: String, trim: true },
    otherPhoneNumber: { type: String, trim: true },
    address: { type: String, trim: true },

    // Investment Details
    investmentType: {
      type: String,
      required: [true, "Investment type is required"],
      enum: [
        "INDIVIDUAL",
        "COMPANY",
        "HIGHNETWORTHINDIVIDUAL",
        "SOPHISTICATEDINDIVIDUAL",
      ],
    },
    investmentSize: {
      type: String,
      enum: ["LessThan100", "GreaterOrEqualTo100"],
    },
    investmentAmount: {
      type: Number,
      required: [true, "Investment amount is required"],
      min: [0, "Investment amount must be positive"],
    },
    investmentCurrency: {
      type: String,
      default: "GBP",
      enum: ["GBP", "USD", "EUR", "JPY"],
    },
    sourceOfFunds: { type: String, trim: true },

    // Bank Details
    accountName: { type: String, trim: true },
    bankName: { type: String, trim: true },
    accountNumber: { type: String, trim: true },
    sortCode: { type: String, trim: true },
    iban: { type: String, trim: true },
    swift: { type: String, trim: true },
    bankAddress: { type: String, trim: true },

    // Company Information
    companyName: { type: String, trim: true },
    contactName: { type: String, trim: true },
    dateOfIncorporation: { type: Date },
    companyNumber: { type: String, trim: true },

    // Metadata
    signature: { type: String },
    fullName: { type: String, trim: true },
    dateOfApplication: { type: Date, default: Date.now },
    status: {
      type: String,
      enum: ["PENDING", "APPROVED", "REJECTED"],
      default: "PENDING",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Indexes for faster querying
InvestmentRequestSchema.index({ emailAddress: 1 });
InvestmentRequestSchema.index({ investmentType: 1 });
InvestmentRequestSchema.index({ status: 1 });
InvestmentRequestSchema.index({ dateOfApplication: -1 });
InvestmentRequestSchema.index({ investmentAmount: -1 }); 

// Pre-save hook to format names and set fullName
InvestmentRequestSchema.pre<IInvestmentRequest>("save", function (next) {
  // Format names
  if (this.firstName) {
    this.firstName =
      this.firstName.charAt(0).toUpperCase() +
      this.firstName.slice(1).toLowerCase();
  }
  if (this.lastName) {
    this.lastName =
      this.lastName.charAt(0).toUpperCase() +
      this.lastName.slice(1).toLowerCase();
  }

  // Set fullName if not provided
  if (!this.fullName && this.firstName && this.lastName) {
    this.fullName = `${this.firstName} ${this.lastName}`;
  }

  next();
});

type InvestmentRequestModel = Model<IInvestmentRequest>;

// Export the model
export default (mongoose.models.InvestmentRequest as InvestmentRequestModel) ||
  mongoose.model<IInvestmentRequest, InvestmentRequestModel>(
    "InvestmentRequest",
    InvestmentRequestSchema
  );
