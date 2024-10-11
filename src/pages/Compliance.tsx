import React, { useState } from 'react';
import { getStatusIcon, getStatusColor } from '../utils/complianceUtils';

const complianceStandards = [
  { id: 'gri', name: 'Global Reporting Initiative (GRI)', status: 'compliant' },
  { id: 'sasb', name: 'Sustainability Accounting Standards Board (SASB)', status: 'partial' },
  { id: 'tcfd', name: 'Task Force on Climate-related Financial Disclosures (TCFD)', status: 'non-compliant' },
  { id: 'ungc', name: 'UN Global Compact (UNGC)', status: 'compliant' },
  { id: 'brsr', name: 'Business Responsibility and Sustainability Report (BRSR)', status: 'partial' },
  { id: 'lodr', name: 'SEBI Listing Obligations and Disclosure Requirements (LODR)', status: 'compliant' },
  { id: 'ccdr', name: 'Canadian Climate-related Disclosure Requirements (CCDR)', status: 'non-compliant' },
  { id: 'csrd', name: 'Corporate Sustainability Reporting Directive (CSRD)', status: 'partial' },
  { id: 'nfrd', name: 'Non-Financial Reporting Directive (NFRD)', status: 'compliant' },
  { id: 'sfdr', name: 'Sustainable Finance Disclosure Regulation (SFDR)', status: 'non-compliant' },
  { id: 'cdp', name: 'Carbon Disclosure Project (CDP)', status: 'partial' },
  { id: 'djsi', name: 'Dow Jones Sustainability Indices (DJSI)', status: 'compliant' },
];

const Compliance: React.FC = () => {
  const [selectedStandard, setSelectedStandard] = useState<string | null>(null);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Compliance Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Compliance Standards</h2>
          <ul className="space-y-2">
            {complianceStandards.map((standard) => (
              <li
                key={standard.id}
                className="flex items-center justify-between p-2 hover:bg-gray-100 rounded cursor-pointer"
                onClick={() => setSelectedStandard(standard.id)}
              >
                <span className="flex items-center">
                  {getStatusIcon(standard.status)}
                  <span className="ml-2">{standard.name}</span>
                </span>
                <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(standard.status)}`}>
                  {standard.status}
                </span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Standard Details</h2>
          {selectedStandard ? (
            <StandardDetails standard={complianceStandards.find(s => s.id === selectedStandard)!} />
          ) : (
            <p className="text-gray-500">Select a standard to view details</p>
          )}
        </div>
      </div>
    </div>
  );
};

interface StandardDetailsProps {
  standard: {
    id: string;
    name: string;
    status: string;
  };
}

const StandardDetails: React.FC<StandardDetailsProps> = ({ standard }) => {
  const getComplianceActions = (status: string) => {
    switch (status) {
      case 'compliant':
        return [
          'Maintain current practices',
          'Stay updated on any changes to the standard',
          'Prepare for the next reporting cycle',
        ];
      case 'partial':
        return [
          'Identify gaps in current reporting',
          'Develop action plan to address non-compliant areas',
          'Allocate resources for improvement',
        ];
      case 'non-compliant':
        return [
          'Conduct a thorough gap analysis',
          'Develop a comprehensive compliance strategy',
          'Engage with experts or consultants for guidance',
          'Set up internal training programs',
        ];
      default:
        return ['Assess applicability of the standard', 'Determine potential impact on operations'];
    }
  };

  return (
    <div>
      <h3 className="text-lg font-semibold mb-2">{standard.name}</h3>
      <p className="mb-4">
        Status: <span className={`px-2 py-1 rounded-full text-xs ${getStatusColor(standard.status)}`}>
          {standard.status}
        </span>
      </p>
      <h4 className="font-semibold mb-2">Recommended Actions:</h4>
      <ul className="list-disc pl-5 space-y-1">
        {getComplianceActions(standard.status).map((action, index) => (
          <li key={index}>{action}</li>
        ))}
      </ul>
    </div>
  );
};

export default Compliance;