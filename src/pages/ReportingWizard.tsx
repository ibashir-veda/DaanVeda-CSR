import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Check } from 'lucide-react';

const reportingStandards = [
  { id: 'gri', name: 'Global Reporting Initiative (GRI)' },
  { id: 'sasb', name: 'Sustainability Accounting Standards Board (SASB)' },
  { id: 'tcfd', name: 'Task Force on Climate-related Financial Disclosures (TCFD)' },
  { id: 'cdp', name: 'Carbon Disclosure Project (CDP)' },
];

const ReportingWizard: React.FC = () => {
  const [step, setStep] = useState(1);
  const [selectedStandards, setSelectedStandards] = useState<string[]>([]);
  const [reportingPeriod, setReportingPeriod] = useState({ start: '', end: '' });
  const [companyInfo, setCompanyInfo] = useState({ name: '', industry: '', size: '' });

  const handleStandardToggle = (standardId: string) => {
    setSelectedStandards(prev =>
      prev.includes(standardId)
        ? prev.filter(id => id !== standardId)
        : [...prev, standardId]
    );
  };

  const handleNext = () => {
    setStep(prev => Math.min(prev + 1, 4));
  };

  const handlePrevious = () => {
    setStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the collected data to a backend service
    console.log('Submitting report with:', { selectedStandards, reportingPeriod, companyInfo });
    // For demo purposes, we'll just move to a "completion" step
    setStep(5);
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Sustainability Reporting Wizard</h1>
      <div className="mb-8">
        <div className="flex items-center">
          {[1, 2, 3, 4].map((s) => (
            <React.Fragment key={s}>
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= s ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {step > s ? <Check size={16} /> : s}
              </div>
              {s < 4 && (
                <div className={`flex-1 h-1 ${step > s ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              )}
            </React.Fragment>
          ))}
        </div>
        <div className="flex justify-between mt-2">
          <span className="text-xs">Select Standards</span>
          <span className="text-xs">Reporting Period</span>
          <span className="text-xs">Company Info</span>
          <span className="text-xs">Review</span>
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        {step === 1 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Select Reporting Standards</h2>
            {reportingStandards.map(standard => (
              <div key={standard.id} className="mb-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedStandards.includes(standard.id)}
                    onChange={() => handleStandardToggle(standard.id)}
                    className="form-checkbox h-5 w-5 text-blue-600"
                  />
                  <span>{standard.name}</span>
                </label>
              </div>
            ))}
          </div>
        )}

        {step === 2 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Set Reporting Period</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="start-date" className="block text-sm font-medium text-gray-700">Start Date</label>
                <input
                  type="date"
                  id="start-date"
                  value={reportingPeriod.start}
                  onChange={(e) => setReportingPeriod(prev => ({ ...prev, start: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="end-date" className="block text-sm font-medium text-gray-700">End Date</label>
                <input
                  type="date"
                  id="end-date"
                  value={reportingPeriod.end}
                  onChange={(e) => setReportingPeriod(prev => ({ ...prev, end: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
            </div>
          </div>
        )}

        {step === 3 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Company Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="company-name" className="block text-sm font-medium text-gray-700">Company Name</label>
                <input
                  type="text"
                  id="company-name"
                  value={companyInfo.name}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="industry" className="block text-sm font-medium text-gray-700">Industry</label>
                <input
                  type="text"
                  id="industry"
                  value={companyInfo.industry}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, industry: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                />
              </div>
              <div>
                <label htmlFor="company-size" className="block text-sm font-medium text-gray-700">Company Size</label>
                <select
                  id="company-size"
                  value={companyInfo.size}
                  onChange={(e) => setCompanyInfo(prev => ({ ...prev, size: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                  required
                >
                  <option value="">Select size</option>
                  <option value="small">Small (&lt;50 employees)</option>
                  <option value="medium">Medium (50-250 employees)</option>
                  <option value="large">Large (&gt;250 employees)</option>
                </select>
              </div>
            </div>
          </div>
        )}

        {step === 4 && (
          <div>
            <h2 className="text-xl font-semibold mb-4">Review Your Information</h2>
            <div className="space-y-4">
              <div>
                <h3 className="font-medium">Selected Standards:</h3>
                <ul className="list-disc list-inside">
                  {selectedStandards.map(id => (
                    <li key={id}>{reportingStandards.find(s => s.id === id)?.name}</li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="font-medium">Reporting Period:</h3>
                <p>From {reportingPeriod.start} to {reportingPeriod.end}</p>
              </div>
              <div>
                <h3 className="font-medium">Company Information:</h3>
                <p>Name: {companyInfo.name}</p>
                <p>Industry: {companyInfo.industry}</p>
                <p>Size: {companyInfo.size}</p>
              </div>
            </div>
          </div>
        )}

        {step === 5 && (
          <div className="text-center">
            <Check size={48} className="mx-auto text-green-500 mb-4" />
            <h2 className="text-2xl font-bold mb-2">Report Configuration Complete!</h2>
            <p className="text-gray-600">
              Your sustainability report configuration has been saved. You can now proceed to generate your report based on these settings.
            </p>
          </div>
        )}

        {step < 5 && (
          <div className="mt-8 flex justify-between">
            {step > 1 && (
              <button
                type="button"
                onClick={handlePrevious}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                <ChevronLeft size={16} className="mr-2" />
                Previous
              </button>
            )}
            {step < 4 ? (
              <button
                type="button"
                onClick={handleNext}
                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 ml-auto"
              >
                Next
                <ChevronRight size={16} className="ml-2" />
              </button>
            ) : (
              <button
                type="submit"
                className="flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 ml-auto"
              >
                Generate Report
                <Check size={16} className="ml-2" />
              </button>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default ReportingWizard;