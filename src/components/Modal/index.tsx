"use client";

import { XMarkIcon } from "@heroicons/react/24/outline";
import IconButton from "@/components/IconButton";
import type { ModalProps } from "./type";

export default function Modal({
  title,
  onClose,
  children,
  maxHeight,
}: ModalProps) {
  const scrollable = !!maxHeight;

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "rgba(0,0,0,0.4)",
        zIndex: 50,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "16px",
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "16px",
          width: "100%",
          maxWidth: "400px",
          ...(scrollable
            ? { maxHeight, display: "flex", flexDirection: "column" as const }
            : {}),
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ヘッダー */}
        <div
          style={{
            position: "relative",
            padding: "16px",
            paddingRight: "60px",
            ...(scrollable ? { flexShrink: 0 } : {}),
          }}
        >
          <span className="text-lg font-semibold">{title}</span>
          <IconButton
            onClick={onClose}
            style={{
              position: "absolute",
              top: "12px",
              right: "16px",
              width: "36px",
              height: "36px",
            }}
          >
            <XMarkIcon className="w-5 h-5 text-foreground" />
          </IconButton>
        </div>

        {/* セパレーター */}
        <div
          style={{
            height: 1,
            backgroundColor: "#e5e7eb",
            ...(scrollable ? { flexShrink: 0 } : {}),
          }}
        />

        {/* ボディ */}
        <div style={scrollable ? { overflowY: "auto" } : undefined}>
          {children}
        </div>
      </div>
    </div>
  );
}
