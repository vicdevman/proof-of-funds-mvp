import { CheckCircle2 } from "lucide-react";
import React from "react";
import type { CertificateProps } from "@/types";
import { QRCodeSVG } from "qrcode.react";

const formatAddress = (address: string) =>
  `${address.slice(0, 6)}...${address.slice(-4)}`;

/**
 * ReceiptShape — renders the card using a single SVG <path> as the background.
 * The notch cutouts are part of the path itself, so they work on ANY background
 * (dark mode, colored pages, print, PDF export) without any DOM hacks.
 *
 * The SVG stretches to fill its container via viewBox + preserveAspectRatio="none".
 * Content is layered on top with absolute positioning inside a relative wrapper.
 */
const ReceiptSVGBackground: React.FC<{
  height: number;
  tearY: number;
  isDark?: boolean;
}> = ({ height, tearY, isDark = false }) => {
  const W = 100; // percentage units
  const R = 4.2; // notch radius as % of width

  // Build the SVG path in percentage-like units (viewBox 0 0 100 height)
  // Full rect with two semicircular bites out of left/right at tearY
  const path = [
    `M 0 0`,
    `L ${W} 0`,
    `L ${W} ${tearY - R}`,
    // Right notch — bite inward (arc curves LEFT into the card)
    `A ${R} ${R} 0 0 0 ${W} ${tearY + R}`,
    `L ${W} ${height}`,
    `L 0 ${height}`,
    `L 0 ${tearY + R}`,
    // Left notch — bite inward (arc curves RIGHT into the card)
    `A ${R} ${R} 0 0 0 0 ${tearY - R}`,
    `L 0 0`,
    `Z`,
  ].join(" ");

  const fill = isDark ? "#0a0a0a" : "#ffffff";

  return (
    <svg
      viewBox={`0 0 ${W} ${height}`}
      preserveAspectRatio="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
      style={{ filter: "drop-shadow(0 8px 40px rgba(0,0,0,0.10))" }}
    >
      <path d={path} fill={fill} />
      {/* Dashed tear line baked into SVG */}
      <line
        x1={R + 1}
        y1={tearY}
        x2={W - R - 1}
        y2={tearY}
        stroke={isDark ? "#262626" : "#e5e7eb"}
        strokeWidth="0.4"
        strokeDasharray="2 1.5"
      />
    </svg>
  );
};

const Certificate: React.FC<CertificateProps> = ({
  walletAddress,
  totalValue,
  balances,
  totalBalances,
  certificateId,
  issueDate,
  verificationDate,
  certificateHash,
  companyName,
  companyUrl,
  supportEmail,
  disclaimer,
  verifications,
  holderName,
}) => {
  // tearY and height are in SVG user-unit percentages matching the viewBox
  // These control where the notch appears relative to card height
  const TEAR_Y = 85; // ~82% down the card
  const SVG_H = 100;

  return (
    <div className="w-full sm:max-w-lg mx-auto">
      {/* Card */}
      <div className="relative" style={{ paddingBottom: "0px" }}>
        {/* SVG background with baked-in notches */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ zIndex: 0 }}
          aria-hidden="true"
        >
          {/* Light mode SVG */}
          <svg
            viewBox={`0 0 100 100`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full dark:hidden"
            style={{ filter: "drop-shadow(0 6px 32px rgba(0,0,0,0.09))" }}
          >
            <path
              d={[
                `M 0 0 L 100 0 L 100 ${TEAR_Y - 4.2}`,
                `A 0.5 0.5 0 0 0 100 ${TEAR_Y + 4.2}`,
                `L 100 100 L 0 100 L 0 ${TEAR_Y + 4.2}`,
                `A 0.5 0.5 0 0 0 0 ${TEAR_Y - 4.2}`,
                `L 0 0 Z`,
              ].join(" ")}
              fill="#ffffff"
            />
            {/* Dashed tear line inside SVG */}
            <line
              x1="5.5"
              y1={TEAR_Y}
              x2="94.5"
              y2={TEAR_Y}
              stroke="#e5e7eb"
              strokeWidth="0.2"
              strokeDasharray="2 1.5"
            />
          </svg>

          {/* Dark mode SVG */}
          <svg
            viewBox={`0 0 100 100`}
            preserveAspectRatio="none"
            xmlns="http://www.w3.org/2000/svg"
            className="w-full h-full hidden dark:block"
            style={{ filter: "drop-shadow(0 6px 32px rgba(0,0,0,0.5))" }}
          >
            <path
              d={[
                `M 0 0 L 100 0 L 100 ${TEAR_Y - 4.2}`,
                `A 4.2 4.2 0 0 0 100 ${TEAR_Y + 4.2}`,
                `L 100 100 L 0 100 L 0 ${TEAR_Y + 4.2}`,
                `A 4.2 4.2 0 0 0 0 ${TEAR_Y - 4.2}`,
                `L 0 0 Z`,
              ].join(" ")}
              fill="#0f0f0f"
            />
            <line
              x1="5.5"
              y1={TEAR_Y}
              x2="94.5"
              y2={TEAR_Y}
              stroke="#262626"
              strokeWidth="0.35"
              strokeDasharray="2 1.5"
            />
          </svg>
        </div>

        {/* ── CONTENT ─────────────────────────────────────── */}
        <div className="relative z-10 px-8 sm:px-10">
          {/* ── TOP SECTION ────────────────────────── */}
          <div className="pt-9 pb-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-9">
              <div>
                <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 dark:text-gray-600 mb-1 text-left">
                  Issued by
                </p>
                <h1 className="text-xl font-bold text-gray-900 dark:text-white leading-none tracking-tight">
                  {companyName}
                </h1>
              </div>
              <div className="text-right">
                <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 dark:text-gray-600 mb-1">
                  Date
                </p>
                <p className="text-[11px] text-gray-600 dark:text-gray-400">
                  {issueDate}
                </p>
              </div>
            </div>

            {/* Title */}
            <div className="mb-8">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 dark:text-gray-600 mb-1.5">
                Document Type
              </p>
              <h2 className="text-[26px] font-bold text-gray-900 dark:text-white leading-tight">
                Portfolio Certificate
              </h2>
              <p className="text-[11px] text-gray-400 dark:text-gray-600 mt-1.5">
                Verified {verificationDate}
              </p>
            </div>

            <hr className="border-dashed border-gray-200 dark:border-neutral-800 mb-7" />

            {/* Holder */}
            {holderName && (
              <div className="flex items-start justify-between mb-7">
                <div>
                  <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 dark:text-gray-600 mb-1">
                    Certificate Holder
                  </p>
                  <p className="text-base font-bold text-gray-900 dark:text-white text-left">
                    {holderName}
                  </p>
                </div>
                <span className="text-[8px] uppercase tracking-widest border border-amber-300 dark:border-amber-800 text-amber-600 dark:text-amber-500 px-2 py-1 mt-0.5">
                  Unverified
                </span>
              </div>
            )}

            {/* Wallet */}
            <div className="mb-7">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 dark:text-gray-600 mb-1.5">
                Wallet Address
              </p>
              <p className="text-[11px] text-gray-700 dark:text-gray-300 break-all leading-relaxed">
                {walletAddress}
              </p>
            </div>

            <hr className="border-dashed border-gray-200 dark:border-neutral-800 mb-6" />

            {/* Asset table */}
            <div className="flex items-center justify-between mb-4">
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 dark:text-gray-600">
                Description
              </p>
              <p className="text-[11px] uppercase tracking-[0.22em] text-gray-400 dark:text-gray-600">
                Subtotal
              </p>
            </div>

            <div className="space-y-5 mb-7">
              {balances.map((balance, idx) => (
                <div
                  key={idx}
                  className="flex text-left items-start justify-between gap-3"
                >
                  <div className="min-w-0">
                    <p className="text-[13px] font-medium text-gray-900 dark:text-white">
                      {balance.amount.toLocaleString()} {balance.token}
                    </p>
                    <p className="text-[10px] text-gray-400 dark:text-gray-600 mt-0.5">
                      {balance.chain} · {formatAddress(balance.address)}
                    </p>
                  </div>
                  <p className="text-[13px] font-semibold text-gray-900 dark:text-white shrink-0 tabular-nums">
                    ${balance.value.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            {/* Total */}
            <div className="border-t border-gray-800 dark:border-gray-200 pt-4 mb-9">
              <div className="flex items-baseline justify-between">
                <div>
                  <p className="text-[11px] font-medium text-gray-900 dark:text-white text-left">
                    Total
                  </p>
                  <p className="text-[9px] text-gray-400 dark:text-gray-600 mt-0.5">
                    {balances.length}/{totalBalances || balances.length} assets
                    · USD
                  </p>
                </div>
                <p className="text-[34px] font-bold text-gray-900 dark:text-white tabular-nums">
                  $
                  {totalValue.toLocaleString("en-US", {
                    minimumFractionDigits: 2,
                  })}
                </p>
              </div>
            </div>

            <hr className="border-dashed border-gray-200 dark:border-neutral-800 mb-7" />

            {/* Verification + QR */}
            <div className="flex items-start justify-between gap-6 mb-7">
              <div className="flex-1 min-w-0">
                <p className="text-[11px] text-left uppercase tracking-[0.22em] text-gray-400 dark:text-gray-600 mb-3">
                  Verifications
                </p>
                <div className="space-y-2.5">
                  {verifications.map((v, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <CheckCircle2 className="w-3 h-3 text-gray-900 dark:text-white mt-0.5 shrink-0" />
                      <p className="text-[10px] text-gray-700 dark:text-gray-300 leading-snug">
                        {v}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-center">
                <div className="border border-gray-200 dark:border-neutral-700 p-1.5 inline-block mb-1.5 ">
                  <QRCodeSVG
                    value={`${process.env.NEXT_PUBLIC_APP_URL}/verify/${certificateId}`}
                    size={72}
                    bgColor="transparent"
                    fgColor=""
                    level="L"
                  />
                </div>
                <p className="text-[9px] text-gray-400 dark:text-gray-600">
                  Scan to verify
                </p>
              </div>
            </div>

            {/* Meta rows */}
            <div className="space-y-2.5 mb-7">
              {[
                ["Certificate ID ", certificateId],
                ["Hash", certificateHash],
              ].map(([label, value]) => (
                <div key={label} className="flex items-start gap-4">
                  <p className="text-[11px] text-right whitespace-nowrap uppercase tracking-[0.18em] text-gray-400 dark:text-gray-600 w-24 shrink-0 pt-0.5 leading-relaxed">
                    {label}
                  </p>
                  <p className="text-[10px] text-gray-600 dark:text-gray-400 break-all leading-relaxed">
                    {value}
                  </p>
                </div>
              ))}
            </div>

            {/* Company line */}
            {/* <div className="flex items-center justify-between pb-5">
              <p className="text-[9px] text-gray-400 dark:text-gray-600">{companyUrl}</p>
              <p className="text-[9px] text-gray-400 dark:text-gray-600">{supportEmail}</p>
            </div> */}
          </div>

          {/* ── BARCODE STUB ──────────────────────── */}
          {/* This sits below the tear line (the SVG dashed line + notches) */}
          <div className="pt-5 pb-8 flex flex-col items-center gap-2">
            <div className="mt-5 px-1">
              <p className="text-[9px] text-gray-400 dark:text-gray-600 leading-relaxed">
                <span className="font-semibold text-gray-500 dark:text-gray-500">
                  Disclaimer:{" "}
                </span>
                {disclaimer}
              </p>
            </div>
            <p className="text-[8px] tracking-[0.35em] text-gray-400 dark:text-gray-600 uppercase">
              {certificateId}
            </p>
          </div>
        </div>
      </div>

      {/* Disclaimer — outside card */}
    </div>
  );
};

export default Certificate;
