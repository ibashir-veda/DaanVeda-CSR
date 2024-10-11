import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { BarChart, FileText, Folder, Home, Users, AlertTriangle, Database, FileCheck, Activity } from 'lucide-react';

const Header: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);

  return (
    <header className="bg-blue-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-bold flex items-center">
          <BarChart className="mr-2" />
          CSR/ESG Platform
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link to="/" className="flex items-center hover:text-blue-200">
                <Home className="mr-1" size={18} />
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/projects" className="flex items-center hover:text-blue-200">
                <Folder className="mr-1" size={18} />
                Projects
              </Link>
            </li>
            <li>
              <Link to="/reports" className="flex items-center hover:text-blue-200">
                <FileText className="mr-1" size={18} />
                Reports
              </Link>
            </li>
            <li>
              <Link to="/compliance" className="flex items-center hover:text-blue-200">
                <FileCheck className="mr-1" size={18} />
                Compliance
              </Link>
            </li>
            <li>
              <Link to="/stakeholders" className="flex items-center hover:text-blue-200">
                <Users className="mr-1" size={18} />
                Stakeholders
              </Link>
            </li>
            <li>
              <Link to="/risk-assessment" className="flex items-center hover:text-blue-200">
                <AlertTriangle className="mr-1" size={18} />
                Risk Assessment
              </Link>
            </li>
            <li>
              <Link to="/documents" className="flex items-center hover:text-blue-200">
                <Database className="mr-1" size={18} />
                Documents
              </Link>
            </li>
            <li>
              <Link to="/real-time-metrics" className="flex items-center hover:text-blue-200">
                <Activity className="mr-1" size={18} />
                Real-time Metrics
              </Link>
            </li>
          </ul>
        </nav>
        <div className="flex items-center">
          {user.name ? (
            <span className="mr-4">{user.name}</span>
          ) : (
            <Link to="/login" className="hover:text-blue-200">Login</Link>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;