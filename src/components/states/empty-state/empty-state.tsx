import React from "react";
import animationData from "../../../assets/lottie/empty.json";
import Lottie from "react-lottie";
import { AppButton } from "../..";

export const EmptyState: React.FC<IEmptyStateProps> = ({
  text,
  btnFxn,
  btnText,
}) => {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="border border-dashed w-full h-full bg-gray-50 rounded-[8px] p-8">
      <div className="w-full h-full flex justify-center items-center text-center mx-auto max-w-[500px]">
        <div>
          <Lottie options={defaultOptions} height={200} width={200} />
          <p className="text-gray-500 text-[16px] font-normal mb-6">{text}</p>
          {!!btnText && <AppButton onClick={btnFxn}>{btnText}</AppButton>}
        </div>
      </div>
    </div>
  );
};

interface IEmptyStateProps {
  text: string;
  btnText?: string;
  btnFxn?: () => void;
}
