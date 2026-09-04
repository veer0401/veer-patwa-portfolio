import React from 'react';
import { useIDEStore } from '../../store/ideStore';
import { Monitor, ArrowLeft, Terminal, ShieldAlert } from 'lucide-react';
import profileData from '../../data/profile.json';

export const MobileDevOsBlocker: React.FC = () => {
  const setViewMode = useIDEStore((s) => s.setViewMode);

  return (
    <div className="min-h-screen w-full bg-[#080A0D] text-slate-200 flex flex-col items-center justify-center p-6 select-none font-mono">
      <div className="max-w-md w-full rounded-xl bg-[#0B0F14] border border-[#1C2636] p-6 sm:p-8 shadow-2xl relative overflow-hidden text-center space-y-5">
        {/* Glow accent */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-[#F89820] to-transparent" />

        {/* Icon / Logo */}
        <div className="mx-auto w-16 h-16 rounded-2xl bg-[#10151C] border border-[#1C2636] flex items-center justify-center text-[#F89820] shadow-[0_0_25px_rgba(248,152,32,0.15)] overflow-hidden p-2">
          <img
            src="/logo.png"
            alt="Logo"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLElement).style.display = 'none';
              if (e.currentTarget.nextElementSibling) {
                (e.currentTarget.nextElementSibling as HTMLElement).style.display = 'block';
              }
            }}
          />
          <Monitor style={{ display: 'none' }} className="w-8 h-8" />
        </div>

        {/* Badge & Title */}
        <div>
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#F89820]/10 border border-[#F89820]/30 text-[#F89820] text-[11px] font-semibold uppercase tracking-wider mb-2">
            <ShieldAlert className="w-3.5 h-3.5" />
            <span>PC / DESKTOP MODE REQUIRED</span>
          </div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            DEV.OS Workspace
          </h1>
          <p className="text-[11px] text-zinc-400 mt-0.5">
            Interactive IDE for {profileData.name}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs text-zinc-300 leading-relaxed font-sans text-left bg-[#080A0D] p-3.5 rounded-lg border border-[#1C2636]">
          <strong>DEV.OS</strong> is an interactive developer IDE featuring multi-pane code inspection, Spring Boot architecture diagrams, a virtual file tree, and a live CLI terminal.
          <br /><br />
          It is engineered specifically for <strong>PC, laptop, or desktop displays</strong> with keyboard navigation. Mobile screen sizes cannot accommodate the multi-window IDE workspace.
        </p>

        {/* Instructions */}
        <div className="text-left text-[11px] text-zinc-400 space-y-1.5 font-sans">
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-mono font-bold">•</span>
            <span>Please access on a PC or laptop for the full DEV.OS developer experience.</span>
          </div>
          <div className="flex items-start gap-2">
            <span className="text-emerald-400 font-mono font-bold">•</span>
            <span>Or enable <strong className="text-zinc-200">"Desktop Site"</strong> in your mobile browser settings to view it in desktop mode.</span>
          </div>
        </div>

        {/* Return Button */}
        <div className="pt-2">
          <button
            onClick={() => setViewMode('hr-portfolio')}
            className="w-full py-3 px-4 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-black font-semibold text-xs flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(16,185,129,0.2)] cursor-pointer"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Continue In Mobile Portfolio (HR View)</span>
          </button>
        </div>

        {/* Note */}
        <div className="text-[10px] text-zinc-500 flex items-center justify-center gap-1.5 pt-1">
          <Terminal className="w-3 h-3 text-emerald-400" />
          <span>The HR Portfolio is 100% mobile-friendly and responsive.</span>
        </div>
      </div>
    </div>
  );
};
