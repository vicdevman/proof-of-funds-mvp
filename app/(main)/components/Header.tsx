"use client";

import { Shield, LogOut } from "lucide-react";
import { ThemeToggle } from "@/components/theme-toggle";
import { useAppKit } from "@reown/appkit/react";
import { useMultiChain } from "@/hooks/useMultiChain";
import { useUnifiedDisconnect } from "@/hooks/useUnifiedDisconnect";
import { toast } from "sonner";

export function Header() {
  const { open } = useAppKit();
  const { isConnected, chainType } = useMultiChain();
  const { disconnect } = useUnifiedDisconnect();

  const handleDisconnect = async () => {
    await disconnect();
  };

  return (
    <header className="fixed top-2 sm:top-6 inset-x-0 z-100 px-4 pointer-events-none">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-14 sm:h-16 rounded-2xl sm:rounded-xl border border-glass bg-glass/70 backdrop-blur-md flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2 sm:gap-3 group">
          <div>
            <h1 className="text-base sm:text-lg font-bold bg-blue-600 bg-clip-text text-transparent leading-tight">
              WalletScan
            </h1>
            <p className="text-[10px] text-muted-foreground hidden sm:block">
              Portfolio Certificate
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {isConnected && chainType && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1 rounded-full bg-glass/50 border border-glass">
              <div
                className={`w-1.5 h-1.5 rounded-full ${
                  chainType === "evm"
                    ? "bg-blue-500"
                    : chainType === "solana"
                      ? "bg-purple-500"
                      : "bg-orange-500"
                }`}
              />
              <span className="text-[10px] font-medium text-theme capitalize">
                {chainType}
              </span>
            </div>
          )}

          {isConnected ? (
            <button
              onClick={handleDisconnect}
              className=" px-4 py-2 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 text-sm font-semibold hover:bg-red-500 hover:text-white transition-all flex items-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              Disconnect
            </button>
          ) : (
            <button
              onClick={() => open()}
              className=" px-4 py-2 rounded-lg bg-blue-600 text-white text-sm font-semibold hover:scale-105 transition-all shadow-lg flex items-center gap-2 active:scale-95"
            >
              Connect Wallet
            </button>
          )}

          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
