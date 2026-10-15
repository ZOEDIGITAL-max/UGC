import React, { useState, useMemo } from 'react';
import { Search, ExternalLink } from 'lucide-react';
import { ARCHIVE_RECORDS, CASE_STUDIES } from '../data/studioData';
import { CaseStudyData } from '../types';

interface PracticeArchiveProps {
  onOpenCaseStudy: (caseStudy: CaseStudyData) => void;
}

export const PracticeArchive: React.FC<PracticeArchiveProps> = ({ onOpenCaseStudy }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Commercial' | 'Concept Exploration'>('All');

  const filteredRecords = useMemo(() => {
    return ARCHIVE_RECORDS.filter((rec) => {
      const matchesSearch =
        rec.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
        rec.role.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesStatus = statusFilter === 'All' || rec.status === statusFilter;
      return matchesSearch && matchesStatus;
    });
  }, [searchTerm, statusFilter]);

  const handleRowClick = (caseStudyId?: string) => {
    if (caseStudyId && CASE_STUDIES[caseStudyId]) {
      onOpenCaseStudy(CASE_STUDIES[caseStudyId]);
    }
  };

  return (
    <section className="py-20 md:py-32 bg-[#f6f3ed] border-t border-[#c4c7c7]/40" id="archive">
      <div className="px-6 md:px-16 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-6 border-b border-[#c4c7c7]/40">
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-[0.2em] text-[#745a36]">
              Studio Provenance &amp; Explorations
            </span>
            <h2 className="font-headline text-3xl sm:text-4xl md:text-5xl text-[#000000] tracking-tight mt-2 text-balance">
              Experience Built Through Creative Practice
            </h2>
          </div>
          <p className="text-sm md:text-base text-[#444748] max-w-md mt-4 md:mt-0 leading-relaxed">
            We maintain transparent attribution between commissioned commercial productions and speculative studio explorations.
          </p>
        </div>

        {/* Search & Filter Controls */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 mb-8">
          <div className="relative max-w-md w-full">
            <Search className="w-4 h-4 text-[#444748] absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by project, category, or role..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-[#fcf9f3] border border-[#c4c7c7]/60 pl-9 pr-4 py-2 text-xs text-[#1c1c18] placeholder:text-[#444748] focus:border-[#000000] focus:outline-none transition-colors"
            />
          </div>

          <div className="flex items-center space-x-2">
            {(['All', 'Commercial', 'Concept Exploration'] as const).map((filter) => (
              <button
                key={filter}
                type="button"
                onClick={() => setStatusFilter(filter)}
                className={`px-3 py-1.5 text-[10px] font-semibold uppercase tracking-wider border cursor-pointer transition-colors ${
                  statusFilter === filter
                    ? 'bg-[#000000] text-white border-[#000000]'
                    : 'bg-[#fcf9f3] text-[#1c1c18] border-[#c4c7c7]/60 hover:border-[#000000]'
                }`}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        {/* Editorial Archive Table */}
        <div className="overflow-x-auto border border-[#c4c7c7]/40 bg-[#fcf9f3]">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#c4c7c7]/60 text-[10px] font-semibold uppercase tracking-widest text-[#745a36] bg-[#f6f3ed]/60">
                <th className="py-4 px-6">Project Descriptor</th>
                <th className="py-4 px-6">Category</th>
                <th className="py-4 px-6">Role &amp; Responsibilities</th>
                <th className="py-4 px-6">Year</th>
                <th className="py-4 px-6">Deliverables</th>
                <th className="py-4 px-6">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#c4c7c7]/30 text-xs text-[#1c1c18]">
              {filteredRecords.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-xs text-[#444748]">
                    No archive records match your search criteria.
                  </td>
                </tr>
              ) : (
                filteredRecords.map((row) => (
                  <tr
                    key={row.id}
                    onClick={() => handleRowClick(row.caseStudyId)}
                    className={`transition-colors ${
                      row.caseStudyId ? 'cursor-pointer hover:bg-[#f6f3ed]' : 'hover:bg-[#f6f3ed]/50'
                    }`}
                  >
                    <td className="py-4 px-6 font-medium text-[#000000] flex items-center space-x-2">
                      <span>{row.title}</span>
                      {row.caseStudyId && (
                        <ExternalLink className="w-3 h-3 text-[#745a36] opacity-60" />
                      )}
                    </td>
                    <td className="py-4 px-6 text-[#444748]">{row.category}</td>
                    <td className="py-4 px-6">{row.role}</td>
                    <td className="py-4 px-6 font-mono text-[#444748]">{row.year}</td>
                    <td className="py-4 px-6 text-[#444748]">{row.deliverables}</td>
                    <td className="py-4 px-6">
                      {row.status === 'Commercial' ? (
                        <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider bg-[#000000] text-white">
                          Commercial
                        </span>
                      ) : (
                        <span className="inline-block px-2.5 py-1 text-[10px] font-semibold uppercase tracking-wider border border-[#c4c7c7] text-[#1c1c18] bg-[#fcf9f3]">
                          Concept Exploration
                        </span>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
