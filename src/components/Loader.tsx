import React from "react";

export const Loader = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-white">
            <div className="flex flex-col items-center gap-4">
            <div className="h-10 w-10 border-4 border-gray-300 border-t-indigo-500 rounded-full animate-spin" />
            <p className="text-sm text-gray-500">Loading...</p>
            </div>
        </div>
    );
};