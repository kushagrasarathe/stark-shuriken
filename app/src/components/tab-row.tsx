import { CopyIcon } from "lucide-react";
import React, { useState } from "react";
import { Badge } from "./ui/badge";

interface TabRowProps {
  text: string;
}

const TabRow: React.FC<TabRowProps> = ({ text }) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Hide the "Copied!" message after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="relative flex items-center justify-between gap-2 border-b p-2.5 border-b-neutral-600 hover:bg-secondary-2/70">
      <div className="text-sm text-amber-600">{text}</div>

      <button onClick={handleCopy}>
        <CopyIcon size={16} />
      </button>
      {copied && (
        <Badge
          variant={"secondary"}
          className="absolute right-8 rounded-sm border border-gray-700"
        >
          COPIED!
        </Badge>
      )}
    </div>
  );
};

export default TabRow;
