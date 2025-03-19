"use client";
import React, { useState } from "react";
import { Button } from "./button";

const CopyLinkButton = ({ content }: { content: string }) => {
  const [copied, setCopied] = useState(false);
  const handleCopyLink = () => {
    navigator.clipboard
      .writeText(content)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      })
      .catch((err) => {
        console.error("Failed to copy link: ", err);
      });
  };
  return (
    <Button
      onClick={handleCopyLink}
      className="w-full py-6 mb-6 bg-gradient-to-r from-pink-500 to-orange-400 text-white rounded-full shadow-sm"
    >
      <span className="text-lg font-medium">
        {copied ? "Copied!" : "Copy link"}
      </span>
    </Button>
  );
};

export default CopyLinkButton;
