import mongoose, { Document } from "mongoose";

export interface IBrochureDownloads extends Document {
  name: string;
  email: string;
  phoneNumber: string;
  communicationsOptIn: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const BrochureDownloadsSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please provide a valid email address",
      ],
    },
    phoneNumber: {
      type: String,
      required: [true, "Phone number is required"],
      trim: true,
      match: [/^\+?[1-9]\d{1,14}$/, "Please provide a valid phone number"],
    },
    communicationsOptIn: {
      type: Boolean,
      required: [true, "Communications opt-in is required"],
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.models.BrochureDownloads ||
  mongoose.model("BrochureDownloads", BrochureDownloadsSchema);
