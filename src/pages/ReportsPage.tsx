import { FileText, Download, Printer } from 'lucide-react';

const reportTypes = [
  { id: 'monthly', label: 'Monthly Summary', description: 'Complete facility overview for the month' },
  { id: 'progress', label: 'Progress Report', description: 'Individual participant progress tracking' },
  { id: 'financial', label: 'Financial Report', description: 'Payment history and outstanding balances' },
  { id: 'analytics', label: 'Program Analytics', description: 'Enrollment and completion rates' },
  { id: 'alerts', label: 'Alert Summary', description: 'Alert patterns and response times' },
  { id: 'trust', label: 'Trust Score Analysis', description: 'Trust score trends and patterns' },
];

export default function ReportsPage() {
  return (
    <div>
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between mb-6">
        <div>
          <h2 className="text-xl font-semibold text-text-primary">Reports Center</h2>
          <p className="text-sm text-text-secondary">Generate and export various program reports</p>
        </div>
        <button className="flex items-center gap-2 px-4 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
          <Download size={16} />
          Export All
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 2xl:grid-cols-3 gap-5">
        {reportTypes.map(report => (
          <div key={report.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:border-primary/50 transition-colors cursor-pointer">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-primary/10 rounded-lg">
                <FileText size={24} className="text-primary" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-text-primary">{report.label}</h3>
                <p className="text-sm text-text-secondary mt-1">{report.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2 mt-4 pt-4 border-t border-gray-100">
              <button className="flex items-center gap-1 px-3 py-1.5 bg-primary text-white rounded-lg text-xs font-medium hover:bg-primary/90 transition-colors">
                <FileText size={12} />
                Generate
              </button>
              <button className="flex items-center gap-1 px-3 py-1.5 bg-gray-100 text-text-primary rounded-lg text-xs font-medium hover:bg-gray-200 transition-colors">
                <Printer size={12} />
                Print
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-text-primary mb-4">Recent Reports</h3>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Report</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Generated</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Period</th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-text-secondary">Actions</th>
              </tr>
            </thead>
            <tbody>
              {[
                { name: 'Monthly Summary', date: '2025-03-01', period: 'February 2025' },
                { name: 'Progress Report', date: '2025-02-28', period: 'SC-001 to SC-010' },
                { name: 'Alert Summary', date: '2025-02-25', period: 'Feb 18-24' },
                { name: 'Financial Report', date: '2025-02-20', period: 'Q1 2025' },
              ].map((report, i) => (
                <tr key={i} className="border-t border-gray-100">
                  <td className="px-4 py-3 font-medium text-text-primary">{report.name}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{report.date}</td>
                  <td className="px-4 py-3 text-sm text-text-secondary">{report.period}</td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-2">
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <FileText size={14} className="text-text-secondary" />
                      </button>
                      <button className="p-1.5 hover:bg-gray-100 rounded transition-colors">
                        <Download size={14} className="text-text-secondary" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}