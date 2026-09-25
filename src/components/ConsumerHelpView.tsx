import React, { useState } from 'react';
import {
  Users2,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  FileQuestion,
  Smartphone,
  ExternalLink,
  Search,
  Check,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { AppLanguage } from '../types/bis.js';

interface ConsumerHelpViewProps {
  language: AppLanguage;
  onAskChat: (prompt: string) => void;
}

export const ConsumerHelpView: React.FC<ConsumerHelpViewProps> = ({
  language,
  onAskChat
}) => {
  const [cmlInput, setCmlInput] = useState('');
  const [verificationResult, setVerificationResult] = useState<any | null>(null);

  const handleVerifyCml = (e: React.FormEvent) => {
    e.preventDefault();
    if (!cmlInput.trim()) return;

    setVerificationResult({
      cmlNumber: cmlInput.trim(),
      status: 'VALID & OPERATIVE LICENCE',
      manufacturer: 'Bajaj Electricals Ltd., Chakan Plant, Pune, Maharashtra',
      productName: 'Electric Storage Water Heater (Geyser)',
      standardNumber: 'IS 302-2-21:2018',
      brand: 'Bajaj New Shakti Neo 25L',
      validity: 'Valid up to 31-Dec-2027',
      isGenuine: true
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-xs font-semibold">
          <Users2 className="w-3.5 h-3.5 text-blue-700" />
          <span>Consumer Empowerment & Grievance Redressal</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Consumer Protection & Verification Portal
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Empowering citizens to verify authentic BIS marks, detect counterfeit ISI logos, and register complaints directly with the Bureau of Indian Standards.
        </p>
      </div>

      {/* Interactive ISI Licence (CM/L) Verification Simulator */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-blue-700 bg-blue-50 px-2 py-0.5 rounded">
              Licence Verification
            </span>
          </div>
          <h2 className="text-lg font-bold text-slate-900 mt-1">
            Verify Product ISI Licence Number (CM/L)
          </h2>
          <p className="text-xs text-slate-500">
            Every genuine ISI mark has a 7-digit Certification Marks Licence number (CM/L - XXXXXXX) directly underneath the logo.
          </p>
        </div>

        <form onSubmit={handleVerifyCml} className="flex gap-2 max-w-lg">
          <input
            type="text"
            value={cmlInput}
            onChange={(e) => setCmlInput(e.target.value)}
            placeholder="Enter 7 or 8-digit CM/L number (e.g. 7821904)"
            className="flex-1 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 placeholder-slate-400 focus:outline-none focus:border-blue-600 font-mono"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
          >
            Verify Licence
          </button>
        </form>

        {verificationResult && (
          <div className="p-5 rounded-xl bg-emerald-50 border border-emerald-200 space-y-3 text-xs animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-emerald-200/80 pb-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-emerald-950 font-mono">
                  CM/L - {verificationResult.cmlNumber}
                </span>
              </div>
              <span className="font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded text-[10px]">
                {verificationResult.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-emerald-950">
              <div>
                <span className="text-slate-500">Certified Product:</span>{' '}
                <span className="font-semibold">{verificationResult.productName}</span>
              </div>
              <div>
                <span className="text-slate-500">Applicable Standard:</span>{' '}
                <span className="font-semibold font-mono">{verificationResult.standardNumber}</span>
              </div>
              <div>
                <span className="text-slate-500">Manufacturer & Unit:</span>{' '}
                <span className="font-semibold">{verificationResult.manufacturer}</span>
              </div>
              <div>
                <span className="text-slate-500">Licence Period:</span>{' '}
                <span className="font-semibold">{verificationResult.validity}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* How to Spot Counterfeit Marks */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Checklist: How to Spot Fake / Counterfeit ISI Marks
          </h2>
          <p className="text-xs text-slate-500">
            Ensure the mark has all three essential visual elements required by law:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-emerald-50/60 border border-emerald-200 space-y-2">
            <h3 className="font-bold text-emerald-900 flex items-center gap-1.5">
              <Check className="w-4 h-4 text-emerald-700" />
              Genuine ISI Mark Attributes
            </h3>
            <ul className="space-y-1.5 text-emerald-950">
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>The standard number (e.g. <strong>IS 302-2-21</strong>) is printed above the logo.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>The official 7-digit licence number (<strong>CM/L-XXXXXXX</strong>) is printed below the logo.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                <span>Easily verifiable on the BIS CARE mobile app using the CM/L number.</span>
              </li>
            </ul>
          </div>

          <div className="p-4 rounded-xl bg-rose-50/60 border border-rose-200 space-y-2">
            <h3 className="font-bold text-rose-900 flex items-center gap-1.5">
              <XCircle className="w-4 h-4 text-rose-700" />
              Signs of a Fake / Misleading Mark
            </h3>
            <ul className="space-y-1.5 text-rose-950">
              <li className="flex items-start gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Only the ISI symbol printed with <strong>no CM/L number</strong> beneath it.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Vague wording such as "Conforms to ISI standard" or "As per IS specs" without a licence.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600 shrink-0 mt-0.5" />
                <span>Distorted font or proportions in the ISI logo.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* How to File a Complaint Workflow */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white space-y-4">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Smartphone className="w-5 h-5 text-amber-400" />
              <span>How to Lodge a Quality or Counterfeit Complaint</span>
            </h3>
            <p className="text-xs text-slate-300">
              Citizens can report counterfeit marks, poor quality certified products, or misleading jewellers.
            </p>
          </div>
          <a
            href="https://bis.gov.in/index.php/consumer-overview/consumer-guidelines-complaints/"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl flex items-center gap-1.5 transition-colors"
          >
            <span>BIS Grievance Portal</span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs pt-2">
          <div className="p-3.5 rounded-xl bg-white/10 space-y-1">
            <span className="font-bold text-amber-400">Step 1: Gather Evidence</span>
            <p className="text-slate-300">
              Take photos of product, packaging, invoice/bill, and the marked CM/L or HUID code.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 space-y-1">
            <span className="font-bold text-amber-400">Step 2: Submit on BIS CARE</span>
            <p className="text-slate-300">
              Open BIS CARE App → Click "Complaints" → Select Product Quality or Misleading Standard Mark.
            </p>
          </div>
          <div className="p-3.5 rounded-xl bg-white/10 space-y-1">
            <span className="font-bold text-amber-400">Step 3: BIS Investigation</span>
            <p className="text-slate-300">
              Enforcement wing inspects the factory or retailer and takes punitive legal action under the BIS Act, 2016.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
