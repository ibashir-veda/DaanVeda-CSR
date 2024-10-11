import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { BarChart, PieChart, TrendingUp, Users, Folder, FileText } from 'lucide-react';

const Dashboard: React.FC = () => {
  const { projects } = useSelector((state: RootState) => state.projects);
  const { reports } = useSelector((state: RootState) => state.reports);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Dashboard</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Projects"
          value={projects.length}
          icon={<Folder className="text-blue-500" size={24} />}
        />
        <DashboardCard
          title="Reports Submitted"
          value={reports.filter(r => r.status === 'submitted').length}
          icon={<FileText className="text-green-500" size={24} />}
        />
        <DashboardCard
          title="Compliance Score"
          value="92%"
          icon={<TrendingUp className="text-yellow-500" size={24} />}
        />
        <DashboardCard
          title="Stakeholders Engaged"
          value="1,234"
          icon={<Users className="text-purple-500" size={24} />}
        />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Project Status</h2>
          <BarChart className="w-full h-64" />
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">ESG Performance</h2>
          <PieChart className="w-full h-64" />
        </div>
      </div>
    </div>
  );
};

interface DashboardCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
}

const DashboardCard: React.FC<DashboardCardProps> = ({ title, value, icon }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
};

export default Dashboard;