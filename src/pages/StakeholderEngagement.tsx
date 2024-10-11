import React, { useState } from 'react';
import { Users, Plus, Edit, Trash } from 'lucide-react';

interface Stakeholder {
  id: string;
  name: string;
  type: string;
  lastInteraction: string;
  status: string;
}

const StakeholderEngagement: React.FC = () => {
  const [stakeholders, setStakeholders] = useState<Stakeholder[]>([
    { id: '1', name: 'John Doe', type: 'Employee', lastInteraction: '2024-03-15', status: 'Active' },
    { id: '2', name: 'Jane Smith', type: 'Investor', lastInteraction: '2024-03-10', status: 'Follow-up required' },
    { id: '3', name: 'Acme Corp', type: 'Customer', lastInteraction: '2024-03-05', status: 'Active' },
  ]);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentStakeholder, setCurrentStakeholder] = useState<Stakeholder | null>(null);

  const handleOpenModal = (stakeholder: Stakeholder | null = null) => {
    setCurrentStakeholder(stakeholder);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setCurrentStakeholder(null);
    setIsModalOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const stakeholderData: Stakeholder = {
      id: currentStakeholder?.id || Date.now().toString(),
      name: formData.get('name') as string,
      type: formData.get('type') as string,
      lastInteraction: formData.get('lastInteraction') as string,
      status: formData.get('status') as string,
    };

    if (currentStakeholder) {
      setStakeholders(stakeholders.map(s => s.id === stakeholderData.id ? stakeholderData : s));
    } else {
      setStakeholders([...stakeholders, stakeholderData]);
    }

    handleCloseModal();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Stakeholder Engagement</h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
        >
          <Plus size={18} className="mr-2" />
          Add Stakeholder
        </button>
      </div>
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Interaction</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {stakeholders.map((stakeholder) => (
              <tr key={stakeholder.id}>
                <td className="px-6 py-4 whitespace-nowrap">{stakeholder.name}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stakeholder.type}</td>
                <td className="px-6 py-4 whitespace-nowrap">{stakeholder.lastInteraction}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                    stakeholder.status === 'Active' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                  }`}>
                    {stakeholder.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => handleOpenModal(stakeholder)}
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
        <StakeholderModal
          stakeholder={currentStakeholder}
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

interface StakeholderModalProps {
  stakeholder: Stakeholder | null;
  onClose: () => void;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
}

const StakeholderModal: React.FC<StakeholderModalProps> = ({ stakeholder, onClose, onSubmit }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">
          {stakeholder ? 'Edit Stakeholder' : 'Add New Stakeholder'}
        </h2>
        <form onSubmit={onSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              defaultValue={stakeholder?.name}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
              Type
            </label>
            <select
              id="type"
              name="type"
              defaultValue={stakeholder?.type}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="Employee">Employee</option>
              <option value="Customer">Customer</option>
              <option value="Investor">Investor</option>
              <option value="Community">Community</option>
            </select>
          </div>
          <div className="mb-4">
            <label htmlFor="lastInteraction" className="block text-sm font-medium text-gray-700">
              Last Interaction
            </label>
            <input
              type="date"
              id="lastInteraction"
              name="lastInteraction"
              defaultValue={stakeholder?.lastInteraction}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            />
          </div>
          <div className="mb-4">
            <label htmlFor="status" className="block text-sm font-medium text-gray-700">
              Status
            </label>
            <select
              id="status"
              name="status"
              defaultValue={stakeholder?.status}
              required
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            >
              <option value="Active">Active</option>
              <option value="Follow-up required">Follow-up required</option>
              <option value="Inactive">Inactive</option>
            </select>
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
              {stakeholder ? 'Update' : 'Add'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StakeholderEngagement;