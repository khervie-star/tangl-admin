import React from "react";

export const CardLoader = () => {
  return (
    <div className="w-full bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Image placeholder */}
      <div className="w-full h-48 bg-gray-200" />

      <div className="p-4 space-y-4">
        {/* Title placeholder */}
        <div className="h-4 bg-gray-200 rounded-full w-3/4" />

        {/* Description lines placeholder */}
        <div className="space-y-2">
          <div className="h-3 bg-gray-200 rounded-full w-full" />
          <div className="h-3 bg-gray-200 rounded-full w-5/6" />
        </div>

        {/* Additional info placeholder */}
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 bg-gray-200 rounded-full" />
          <div className="h-3 bg-gray-200 rounded-full w-24" />
        </div>

        {/* Button placeholder */}
        <div className="h-10 bg-gray-200 rounded-lg w-full" />
      </div>
    </div>
  );
};
