import React, { useState } from 'react';
import { AlertTriangle, Plus, Edit, Trash, ChevronUp, ChevronDown } from 'lucide-react';

interface Risk {
  id: string;
  name: string;
  category: string;
  likelihood: number;
  impact: number;
  mitigationStrategy: string;
}

const RiskAssessment: React.FC = () => {
  const [risks, setRisks] = useState<Risk[]>([
    { id: '1', name: 'Climate Change Impact', category: 'Environmental', likelihood: 4, impact: 5, mitigationStrategy: 'Implement carbon reduction initiatives' },
    { id: '2', name: 'Supply Chain Disruption', category: 'Social', likelihood: 3, impact: 4, mitigationStrategy: 'Diversify suppliers and increase inventory' },
    { id: '3', name: 'Data Privacy Breach', category: 'Governance', likelihood: 2, impact: 5, mitigationStrategy: 'Enhance cybersecurity measures and employee training' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentRisk, setCurrentRisk] = useState<Risk | null>(null);

  const handleOpenModal = (risk: Risk | null = null) => {
    setCurrentRisk(risk);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentRisk(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const riskData: Risk = {
      id: currentRisk?.id || Date.now().toString(),
      name: formData.get('name') as string,
      category: formData.get('category') as string,
      likelihood: Number(formData.get('likelihood')),
      impact: Number(formData.get('impact')),
      mitigationStrategy: formData.get('mitigationStrategy') as string,
    };

    if (currentRisk) {
      setRisks(risks.map(r => r.id === riskData.id ? riskData : r));
    } else {
      setRisks([...risks, riskData]);
    }

    handleCloseModal();
  };

  const getRiskLevel = (likelihood: number, impact: number) => {
    const score = likelihood * impact;
    if (score >= 15) return 'High';
    if (score >= 8) return 'Medium';
    return 'Low';
  };

  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'bg-red-100 text-red-800';
      case 'Medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'Low':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">ESG Risk Assessment</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Risk
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Likelihood</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Impact</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {risks.map((risk) => (
              <tr key={risk.id}>
                <td className="px-6 py-4 whitespace-nowrap">{risk.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{risk.category}</td>
                <td className="px-6 py-4 whitespace-nowrap">{risk.likelihood}</td>
                <td className="px-6 py-4 whitespace-nowrap">{risk.impact}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    getRiskLevelColor(getRiskLevel(risk.likelihood, risk.impact))
                  }`}>
                    {getRiskLevel(risk.likelihood, risk.impact)}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(risk)}
                    className="text-indigo-600 hover:text-indigo-900 mr-4"
                  >
                    <Edit size={18} />
                  </button>
                  <button className="text-red-600 hover:text-red-900">
                    <Trash size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {isModalOpen && (
        <RiskModal
          risk={currentRisk}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

interface RiskModalProps {
  risk: Risk | null;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const RiskModal: React.FC<RiskModalProps> = ({ risk, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {risk ? 'Edit Risk' : 'Add New Risk'}
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Risk Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={risk?.name}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">
              Category
            </label>
            <select
              id="category"
              name="category"
              defaultValue={risk?.category}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="Environmental">Environmental</option>
              <option value="Social">Social</option>
              <option value="Governance">Governance</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="likelihood" className="block text-sm font-medium text-gray-700">
              Likelihood (1-5)
            </label>
            <input
              type="number"
              id="likelihood"
              name="likelihood"
              min="1"
              max="5"
              defaultValue={risk?.likelihood}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="impact" className="block text-sm font-medium text-gray-700">
              Impact (1-5)
            </label>
            <input
              type="number"
              id="impact"
              name="impact"
              min="1"
              max="5"
              defaultValue={risk?.impact}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="mitigationStrategy" className="block text-sm font-medium text-gray-700">
              Mitigation Strategy
            </label>
            <textarea
              id="mitigationStrategy"
              name="mitigationStrategy"
              defaultValue={risk?.mitigationStrategy}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            ></textarea>
          </div>
          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {risk ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RiskAssessment;