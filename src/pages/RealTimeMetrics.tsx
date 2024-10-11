import React, { useState, useEffect } from 'react';
import { Activity, BarChart2, TrendingUp, Droplet, Wind } from 'lucide-react';

interface Metric {
  id: string;
  name: string;
  value: number;
  unit: string;
  trend: 'up' | 'down' | 'stable';
}

const RealTimeMetrics: React.FC = () => {
  const [metrics, setMetrics] = useState<Metric[]>([
    { id: '1', name: 'Energy Consumption', value: 250, unit: 'kWh', trend: 'down' },
    { id: '2', name: 'Water Usage', value: 1000, unit: 'Liters', trend: 'up' },
    { id: '3', name: 'Carbon Emissions', value: 50, unit: 'kg CO2e', trend: 'stable' },
    { id: '4', name: 'Waste Generated', value: 75, unit: 'kg', trend: 'down' },
  ]);

  useEffect(() => {
    // Simulating real-time updates
    const interval = setInterval(() => {
      setMetrics(prevMetrics =>
        prevMetrics.map(metric => ({
          ...metric,
          value: Math.max(0, metric.value + (Math.random() - 0.5) * 10),
          trend: Math.random() > 0.5 ? 'up' : 'down',
        }))
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="text-red-500" />;
      case 'down':
        return <TrendingUp className="text-green-500 transform rotate-180" />;
      default:
        return <Activity className="text-yellow-500" />;
    }
  };

  const getMetricIcon = (name: string) => {
    switch (name) {
      case 'Energy Consumption':
        return <BarChart2 className="text-yellow-500" />;
      case 'Water Usage':
        return <Droplet className="text-blue-500" />;
      case 'Carbon Emissions':
        return <Wind className="text-gray-500" />;
      default:
        return <Activity className="text-green-500" />;
    }
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">Real-Time Sustainability Metrics</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map(metric => (
          <div key={metric.id} className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                {getMetricIcon(metric.name)}
                <h2 className="text-lg font-semibold ml-2">{metric.name}</h2>
              </div>
              {getTrendIcon(metric.trend)}
            </div>
            <div className="text-3xl font-bold">
              {metric.value.toFixed(2)} <span className="text-sm font-normal">{metric.unit}</span>
            </div>
          </div>
        ))}
      </div>
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-4">Historical Data</h2>
        {/* Placeholder for a chart component */}
        <div className="h-64 bg-gray-100 flex items-center justify-center">
          <p className="text-gray-500">Chart placeholder: Historical data visualization would go here</p>
        </div>
      </div>
    </div>
  );
};

export default RealTimeMetrics;