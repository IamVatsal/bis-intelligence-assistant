import React, { useState } from 'react';
import {
  Gem,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  HelpCircle,
  Search,
  ExternalLink,
  Smartphone,
  Scale,
  Award
} from 'lucide-react';
import { HALLMARKING_PURITY_TABLE } from '../../server/data/bisData.js';
import { AppLanguage } from '../types/bis.js';

interface HallmarkingViewProps {
  language: AppLanguage;
  onAskChat: (prompt: string) => void;
}

export const HallmarkingView: React.FC<HallmarkingViewProps> = ({
  language,
  onAskChat
}) => {
  const [testHuid, setTestHuid] = useState('');
  const [simulatedResult, setSimulatedResult] = useState<any | null>(null);

  const handleSimulateHuid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!testHuid.trim() || testHuid.trim().length !== 6) {
      alert('Please enter a 6-digit alphanumeric HUID (e.g. AB1234)');
      return;
    }

    setSimulatedResult({
      huid: testHuid.toUpperCase(),
      status: 'VERIFIED & ACTIVE ON BIS CENTRAL PORTAL',
      articleType: 'Bangle / Bracelet',
      certifiedPurity: '22K (916 Fineness - 91.6% Pure Gold)',
      hallmarkingDate: '2024-03-12',
      registeredJeweller: 'Shree Krishna Jewellers & Sons (BIS Reg: CM/L-7821904)',
      assayingCentre: 'Reliable Gold Assaying & Hallmarking Centre (AHC-MH-042)',
      district: 'Mumbai Suburban, Maharashtra (Notified District)'
    });
  };

  return (
    <div className="max-w-5xl mx-auto space-y-10 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-100 text-amber-900 text-xs font-semibold">
          <Gem className="w-3.5 h-3.5 text-amber-700" />
          <span>Bureau of Indian Standards Hallmarking Scheme</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Official Gold & Silver Hallmarking Guide
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Hallmarking is the accurate determination and official recording of the proportionate content of precious metal in gold and silver articles to protect consumers from adulteration.
        </p>
      </div>

      {/* The 3 Mandatory Signs of Genuine Hallmarking */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900">
            The 3 Mandatory Signs of Genuine Gold Jewellery
          </h2>
          <p className="text-xs text-slate-500">
            As per BIS regulations, every genuine piece of gold jewellery must carry exactly three marks engraved by laser:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-black text-xl shadow-xs">
              ▲
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Mark 1
              </span>
              <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                BIS Standard Logo
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              The triangular BIS mark certifying that the article conforms to Indian Standards (IS 14111) and was tested by an authorized AHC.
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-bold text-sm shadow-xs font-mono">
              22K916
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Mark 2
              </span>
              <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                Purity in Carat & Fineness
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Indicates the exact carat grade and parts per thousand purity (e.g. 22K916 = 91.6% pure gold, 18K750 = 75.0% pure gold).
            </p>
          </div>

          <div className="p-5 rounded-xl bg-amber-50/70 border border-amber-200 space-y-3">
            <div className="w-12 h-12 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center font-mono font-bold text-sm shadow-xs">
              AB1234
            </div>
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-amber-800">
                Mark 3
              </span>
              <h3 className="font-bold text-sm text-slate-900 mt-0.5">
                6-Digit Alphanumeric HUID
              </h3>
            </div>
            <p className="text-xs text-slate-600 leading-relaxed">
              Hallmark Unique Identification code laser engraved onto each article giving end-to-end traceability and authenticity verification.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive HUID Verification Simulator */}
      <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 border border-slate-800 text-white shadow-xl space-y-6">
        <div className="flex items-start justify-between flex-wrap gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-medium border border-blue-400/30">
              <Smartphone className="w-3.5 h-3.5 text-amber-400" />
              <span>BIS CARE App Simulation</span>
            </div>
            <h2 className="text-xl font-bold text-white">
              Verify 6-Digit Hallmark Unique ID (HUID)
            </h2>
            <p className="text-xs text-slate-300">
              Enter any 6-digit alphanumeric code from your jewellery to inspect its registration, AHC centre, and declared purity.
            </p>
          </div>
        </div>

        <form onSubmit={handleSimulateHuid} className="flex gap-2 max-w-lg">
          <input
            type="text"
            maxLength={6}
            value={testHuid}
            onChange={(e) => setTestHuid(e.target.value.toUpperCase())}
            placeholder="e.g. AB1234, X9K2L1"
            className="flex-1 bg-white/10 border border-white/20 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-400 focus:outline-none focus:bg-white/15 uppercase font-mono tracking-wider font-bold"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-colors cursor-pointer"
          >
            Verify HUID
          </button>
        </form>

        {simulatedResult && (
          <div className="p-5 rounded-xl bg-white/10 border border-white/15 space-y-4 animate-in fade-in duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <div className="flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span className="font-mono text-base font-bold text-amber-400">
                  HUID: {simulatedResult.huid}
                </span>
              </div>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                {simulatedResult.status}
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div>
                <span className="text-slate-400">Certified Purity:</span>{' '}
                <span className="font-semibold text-white">{simulatedResult.certifiedPurity}</span>
              </div>
              <div>
                <span className="text-slate-400">Article Category:</span>{' '}
                <span className="font-semibold text-white">{simulatedResult.articleType}</span>
              </div>
              <div>
                <span className="text-slate-400">Registered Jeweller:</span>{' '}
                <span className="font-semibold text-white">{simulatedResult.registeredJeweller}</span>
              </div>
              <div>
                <span className="text-slate-400">Assaying Centre (AHC):</span>{' '}
                <span className="font-semibold text-white">{simulatedResult.assayingCentre}</span>
              </div>
              <div>
                <span className="text-slate-400">Hallmarking Date:</span>{' '}
                <span className="font-semibold text-white">{simulatedResult.hallmarkingDate}</span>
              </div>
              <div>
                <span className="text-slate-400">Jurisdiction:</span>{' '}
                <span className="font-semibold text-white">{simulatedResult.district}</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Official Gold Purity Standards Table */}
      <div className="p-6 sm:p-8 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <div>
          <h2 className="text-base font-bold text-slate-900">
            Official Gold Purity & Fineness Grades (IS 14111:2023)
          </h2>
          <p className="text-xs text-slate-500">
            Gold jewellery can only be legally sold in India under one of these six recognized purity marks:
          </p>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 text-slate-700 font-bold uppercase tracking-wider text-[10px] border-b border-slate-200">
              <tr>
                <th className="p-3">Carat Grade</th>
                <th className="p-3">Fineness</th>
                <th className="p-3">Purity %</th>
                <th className="p-3">Laser Inscribed Mark</th>
                <th className="p-3">Typical Application</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium">
              {HALLMARKING_PURITY_TABLE.map((item, idx) => (
                <tr key={idx} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3 font-bold text-slate-900">{item.grade}</td>
                  <td className="p-3 font-mono text-blue-700">{item.fineness}</td>
                  <td className="p-3 text-slate-700">{item.finenessPercent}</td>
                  <td className="p-3 font-mono font-bold text-amber-700 bg-amber-50/40 rounded">
                    {item.standardMark}
                  </td>
                  <td className="p-3 text-slate-500">{item.useCase}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Consumer Rights & ₹45 Testing Procedure */}
      <div className="p-6 rounded-2xl bg-amber-50/80 border border-amber-200 space-y-4 text-xs text-amber-950">
        <h3 className="font-bold text-sm text-amber-900 flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-700" />
          <span>Consumer Rights & Purity Dispute Redressal</span>
        </h3>
        <ul className="space-y-2">
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Right to Test at Any AHC:</strong> Any consumer can submit their hallmarked jewellery to any BIS-recognized Assaying & Hallmarking Centre for an independent purity check for a nominal fee of <strong>₹45 + GST</strong> per article.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Statutory Compensation for Shortfall:</strong> If the assayed purity is found to be lower than marked, the jeweller is legally bound under the BIS Act, 2016 to compensate the consumer with <strong>2 times the value of the shortfall</strong>.
            </span>
          </li>
          <li className="flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <span>
              <strong>Free Jeweller Registration:</strong> BIS registration for jewellers is 100% online, automatic, and free for life for micro-enterprises to encourage compliance.
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};
