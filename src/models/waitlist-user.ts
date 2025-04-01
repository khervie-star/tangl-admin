import mongoose, { Document, Model } from "mongoose";

export interface IWaitlistUser extends Document {
  name: string;
  email: string;
  accountType: "INVESTOR" | "INVESTMENT_COMPANY";
  country: string;
  communicationsOptIn: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const WaitlistUserSchema = new mongoose.Schema<IWaitlistUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
      maxlength: [100, "Name cannot exceed 100 characters"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (value: string) =>
          /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(value),
        message: "Please provide a valid email address",
      },
    },
    accountType: {
      type: String,
      required: [true, "Account type is required"],
      enum: ["INVESTOR", "INVESTMENT_COMPANY"],
    },
    country: {
      type: String,
      required: [true, "Country is required"],
      trim: true,
    },
    communicationsOptIn: {
      type: Boolean,
      required: [true, "Communications opt-in is required"],
      default: false,
    },
  },
  {
    timestamps: true, 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }, 
  }
);


type WaitlistUserModel = Model<IWaitlistUser>;

export default (mongoose.models.WaitlistUser as WaitlistUserModel) ||
  mongoose.model<IWaitlistUser, WaitlistUserModel>(
    "WaitlistUser",
    WaitlistUserSchema
  );
