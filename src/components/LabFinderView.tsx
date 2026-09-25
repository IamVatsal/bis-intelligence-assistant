import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Search,
  MapPin,
  Mail,
  Phone,
  ShieldCheck,
  CheckCircle2,
  ExternalLink,
  Filter,
  Building
} from 'lucide-react';
import { BISLaboratory, AppLanguage } from '../types/bis.js';

interface LabFinderViewProps {
  language: AppLanguage;
  onAskChat: (prompt: string) => void;
}

export const LabFinderView: React.FC<LabFinderViewProps> = ({
  language,
  onAskChat
}) => {
  const [labs, setLabs] = useState<BISLaboratory[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchLabs();
  }, [selectedState, selectedCategory]);

  const fetchLabs = async () => {
    setIsLoading(true);
    try {
      const params = new URLSearchParams();
      if (selectedState !== 'All') params.append('state', selectedState);
      if (selectedCategory !== 'All') params.append('category', selectedCategory);
      if (searchQuery) params.append('q', searchQuery);

      const res = await fetch(`/api/laboratories?${params.toString()}`);
      const data = await res.json();
      setLabs(data.laboratories || []);
    } catch (e) {
      console.error('Failed to fetch labs:', e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    fetchLabs();
  };

  const states = ['All', 'Uttar Pradesh', 'Maharashtra', 'Tamil Nadu', 'West Bengal', 'Punjab', 'Gujarat', 'Delhi', 'Karnataka'];
  const categories = ['All', 'Electrical Appliances', 'Stainless Steel & Cookware', 'Chemicals & Plastics', 'Food & Drinking Water', 'Safety Helmets & Toys', 'Steel & Metallurgy'];

  return (
    <div className="max-w-5xl mx-auto space-y-8 pb-16">
      {/* Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-semibold">
          <FlaskConical className="w-3.5 h-3.5 text-emerald-700" />
          <span>BIS Laboratory Recognition Scheme (LRS)</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900">
          Find Recognized Testing Laboratories
        </h1>
        <p className="text-sm text-slate-600 max-w-3xl">
          Locate BIS Central, Regional, and NABL-accredited commercial laboratories authorized to test products for Scheme I (ISI mark) and Scheme II (CRS) certification.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-5 rounded-2xl bg-white border border-slate-200 shadow-xs space-y-4">
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by lab name, city, test capability (e.g. dielectric, burst pressure, migration)..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 text-xs sm:text-sm bg-slate-50 focus:bg-white focus:border-blue-600 focus:outline-none"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-xs sm:text-sm font-semibold transition-colors"
          >
            Search
          </button>
        </form>

        <div className="flex flex-wrap items-center gap-3 text-xs">
          <div className="flex items-center gap-1.5">
            <Filter className="w-3.5 h-3.5 text-slate-400" />
            <span className="font-semibold text-slate-600">Filters:</span>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-500">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium"
            >
              {states.map((st) => (
                <option key={st} value={st}>{st}</option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-1">
            <span className="text-slate-500">Product Area:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-1.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-700 font-medium"
            >
              {categories.map((cat) => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lab Cards Grid */}
      <div className="space-y-4">
        <div className="flex items-center justify-between text-xs font-semibold text-slate-500">
          <span>Active Recognized Testing Facilities ({labs.length})</span>
          <span>Accreditation as per ISO/IEC 17025</span>
        </div>

        {isLoading ? (
          <div className="p-12 text-center text-xs text-slate-500">
            Loading testing laboratories...
          </div>
        ) : labs.length === 0 ? (
          <div className="p-8 text-center bg-white rounded-2xl border border-slate-200 text-xs text-slate-500">
            No laboratories found matching your criteria. Try adjusting state or category filters.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {labs.map((lab) => (
              <div
                key={lab.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 transition-all shadow-xs space-y-4 flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded ${
                        lab.type === 'Central Lab'
                          ? 'bg-blue-100 text-blue-800'
                          : lab.type === 'Regional Lab'
                          ? 'bg-indigo-100 text-indigo-800'
                          : 'bg-emerald-100 text-emerald-800'
                      }`}>
                        {lab.type}
                      </span>
                      <h3 className="font-bold text-sm text-slate-900 mt-1.5">
                        {lab.name}
                      </h3>
                    </div>
                    {lab.nablAccreditationNo && (
                      <span className="font-mono text-[10px] bg-slate-100 text-slate-600 px-2 py-0.5 rounded border border-slate-200" title="NABL Certificate Number">
                        NABL: {lab.nablAccreditationNo}
                      </span>
                    )}
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-slate-600">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                    <span>{lab.city}, {lab.state}</span>
                  </div>

                  <p className="text-xs text-slate-500 leading-relaxed line-clamp-2">
                    {lab.address}
                  </p>

                  {/* Tested Standards */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Accredited Standard Scope
                    </span>
                    <div className="flex flex-wrap gap-1">
                      {lab.testedStandards.map((std, sIdx) => (
                        <span key={sIdx} className="text-[10px] font-mono bg-blue-50 text-blue-700 px-2 py-0.5 rounded">
                          {std}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Key Tests */}
                  <div className="space-y-1">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                      Specialized Testing Capabilities
                    </span>
                    <ul className="text-xs text-slate-600 space-y-1">
                      {lab.keyTests.map((t, tIdx) => (
                        <li key={tIdx} className="flex items-center gap-1.5 truncate">
                          <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                          <span>{t}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Footer contact info */}
                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
                  <div className="flex items-center gap-3">
                    <a href={`mailto:${lab.contactEmail}`} className="hover:text-blue-600 flex items-center gap-1" title={lab.contactEmail}>
                      <Mail className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Email</span>
                    </a>
                    <span className="flex items-center gap-1" title={lab.phone}>
                      <Phone className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">{lab.phone}</span>
                    </span>
                  </div>
                  <button
                    onClick={() => onAskChat(`Can ${lab.name} perform testing for my product?`)}
                    className="text-blue-700 hover:text-blue-900 font-semibold"
                  >
                    Inquire Lab →
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
