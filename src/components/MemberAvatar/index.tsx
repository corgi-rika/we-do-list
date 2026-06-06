"use client";

import { useState } from "react";
import { StarIcon } from "@heroicons/react/24/solid";
import Avatar from "@/components/Avatar";
import type { MemberAvatarProps } from "./type";

export default function MemberAvatar({
  name,
  isLeader = false,
  onClick,
}: MemberAvatarProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div className="flex flex-col items-center gap-1">
      <div
        style={{
          cursor: onClick ? "pointer" : "default",
          transform: hovered ? "scale(1.15)" : "scale(1)",
          transition: "transform 0.15s ease",
        }}
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <Avatar name={name} />
      </div>
      <div className="flex items-center gap-0.5">
        <span style={{ whiteSpace: "nowrap", fontSize: "10px" }}>
          {name.length > 6 ? name.slice(0, 6) + "…" : name}
        </span>
        {isLeader && (
          <StarIcon
            className="text-primary shrink-0"
            style={{ width: 12, height: 12 }}
          />
        )}
      </div>
    </div>
  );
}
