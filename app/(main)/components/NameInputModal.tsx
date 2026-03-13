"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, User, Info } from "lucide-react";

interface NameInputModalProps {
  isOpen: boolean;
  onClose: () => void;
  name: string;
  setName: (name: string) => void;
  onSubmit: () => void;
  nameError?: string;
}

export function NameInputModal({
  isOpen,
  onClose,
  name,
  setName,
  onSubmit,
  nameError,
}: NameInputModalProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Prevent scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-100 flex items-center justify-center sm:p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal / Drawer Panel */}
          <motion.div
            initial={
              isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 20 }
            }
            animate={isMobile ? { y: 0 } : { opacity: 1, scale: 1, y: 0 }}
            exit={isMobile ? { y: "100%" } : { opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 50, stiffness: 500 }}
            className={`
              relative w-full bg-background border-t sm:border border-border shadow-2xl overflow-hidden
              ${isMobile ? "mt-auto rounded-t-[32px] pb-12" : "max-w-md rounded-[32px]"}
            `}
          >
            {/* Header */}
            <div className="p-6 pb-0 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/10 flex items-center justify-center">
                  <User className="w-5 h-5 text-blue-500" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-foreground">
                    Enter Your Name
                  </h3>
                  <p className="text-xs text-muted-foreground">
                    Self-reported for the certificate
                  </p>
                </div>
              </div>
              <button
                onClick={onClose}
                className="w-10 h-10 rounded-full bg-muted/50 flex items-center justify-center hover:bg-muted transition-colors"
              >
                <X className="w-5 h-5 text-muted-foreground" />
              </button>
            </div>

            {/* Content */}
            <form onSubmit={handleSubmit} className="p-6 space-y-6">
              <div className="space-y-2">
                <div className="relative">
                  <input
                    autoFocus
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., John Doe"
                    className={`
                      w-full bg-muted/50 border border-border rounded-2xl p-4 text-foreground placeholder:text-muted-foreground
                      focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500/50 transition-all
                      ${nameError ? "border-red-500/50 ring-2 ring-red-500/20" : ""}
                    `}
                  />
                </div>
                {nameError && (
                  <p className="text-red-400 text-xs pl-1 flex items-center gap-1.5">
                    <span className="w-1 h-1 rounded-full bg-red-400" />
                    {nameError}
                  </p>
                )}
              </div>

              {/* Disclaimer */}
              <div className="p-4 rounded-2xl bg-blue-600/5 border border-blue-600/10 flex gap-3">
                <Info className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <p className="text-[11px] text-muted-foreground leading-relaxed">
                  <span className="text-blue-500 font-semibold">
                    Disclaimer:
                  </span>{" "}
                  We verify wallet addresses only, not your identity. This is
                  for informational purposes only.
                </p>
              </div>

              {/* Action */}
              <button
                type="submit"
                className="w-full py-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-lg shadow-xl shadow-blue-600/20 transition-all active:scale-[0.98]"
              >
                Generate Certificate
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
