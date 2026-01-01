"use client";
import { useSearchParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Download, ArrowLeft, CheckCircle2, Clock, FileText, Building2 } from 'lucide-react';


type ChecklistItem = {
  step: string;
  approval: string;
  deadline: string;
  source: string;
};

const mockChecklist: ChecklistItem[] = [
  {
    step: 'Submit registration form',
    approval: 'Company Registrar',
    deadline: '2026-01-15',
    source: 'Company Registration Act',
  },
  {
    step: 'Pay registration fee',
    approval: 'Tax Office',
    deadline: '2026-01-20',
    source: 'Tax Act',
  },
];

export default function ResultsPage() {
  const params = useSearchParams();
  const [loading, setLoading] = useState(true);
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setChecklist(mockChecklist);
      setLoading(false);
    }, 1200);
  }, []);

  const handleDownload = () => {
    // Generate PDF content and open in new window
    const businessType = params.get('businessType');
    const action = params.get('action');
    
    let pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /Resources << /Font << /F1 4 0 R >> >> /MediaBox [0 0 612 792] /Contents 5 0 R >>
endobj
4 0 obj
<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>
endobj
5 0 obj
<< /Length 1200 >>
stream
BT
/F1 24 Tf
50 720 Td
(Compliance Checklist) Tj
0 -40 Td
/F1 12 Tf
(Business Type: ${businessType}) Tj
0 -20 Td
(Action: ${action}) Tj
0 -40 Td
(Required Steps) Tj
0 -30 Td
`;

    checklist.forEach((item, idx) => {
      pdfContent += `${idx + 1}. ${item.step} Tj
0 -20 Td
   Approval: ${item.approval} | Deadline: ${item.deadline} | Source: ${item.source} Tj
0 -25 Td
`;
    });

    pdfContent += `ET
endstream
endobj
xref
0 6
0000000000 65535 f 
0000000009 00000 n 
0000000058 00000 n 
0000000115 00000 n 
0000000244 00000 n 
0000000333 00000 n 
trailer
<< /Size 6 /Root 1 0 R >>
startxref
1533
%%EOF`;

    // Create blob and open in new window
    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    window.open(url, '_blank');
  };

  return (
    <main className="min-h-screen flex flex-col gap-8 py-10 px-4" style={{ background: 'linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #312e81 100%)' }}>
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-white mb-2">Compliance Checklist</h1>
          <p className="text-cyan-200 text-lg">Review and download your compliance requirements</p>
        </div>
        <Link
          href="/dashboard/businesses"
          className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-semibold transition"
        >
          <ArrowLeft className="w-5 h-5" />
          Back
        </Link>
      </div>

      {/* Business Info Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <Building2 className="w-5 h-5 text-cyan-300" />
            <h3 className="text-sm font-semibold text-cyan-200">Business Type</h3>
          </div>
          <p className="text-2xl font-bold text-white">{params.get('businessType') || 'N/A'}</p>
        </div>
        <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <FileText className="w-5 h-5 text-blue-300" />
            <h3 className="text-sm font-semibold text-cyan-200">Action</h3>
          </div>
          <p className="text-2xl font-bold text-white capitalize">{params.get('action') || 'N/A'}</p>
        </div>
      </div>

      {/* Checklist Items */}
      <div className="bg-white/15 backdrop-blur-xl rounded-2xl p-6 border border-white/30 shadow-lg">
        <h2 className="text-2xl font-bold text-white mb-6">Required Steps</h2>
        {loading ? (
          <div className="flex items-center justify-center py-12">
            <div className="flex flex-col items-center gap-3">
              <div className="w-8 h-8 border-4 border-cyan-500/30 border-t-cyan-300 rounded-full animate-spin"></div>
              <p className="text-cyan-200 font-medium">Loading compliance checklist...</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {checklist.map((item, idx) => (
              <div
                key={idx}
                className="bg-blue-600/20 border border-blue-400/40 rounded-xl p-6 hover:border-blue-400/70 transition"
              >
                <div className="flex gap-4">
                  <div className="flex-shrink-0 mt-1">
                    <CheckCircle2 className="w-6 h-6 text-cyan-300" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-bold text-white mb-3 text-lg">{item.step}</h4>
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">Approval Authority</p>
                        <p className="text-base text-cyan-100 font-medium">{item.approval}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-yellow-300" />
                        <div>
                          <p className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">Deadline</p>
                          <p className="text-base text-yellow-200 font-bold">{item.deadline}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-xs font-semibold text-gray-300 mb-2 uppercase tracking-wide">Source</p>
                        <p className="text-base text-cyan-100 font-medium">{item.source}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4">
        <button
          onClick={handleDownload}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white rounded-lg font-bold shadow-lg transition"
        >
          <Download className="w-5 h-5" />
          Download as PDF
        </button>
        <Link
          href="/dashboard/businesses"
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg font-bold transition"
        >
          Done
        </Link>
      </div>
    </main>
  );
}
