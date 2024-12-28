import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  trend?: {
    value: string;
    positive?: boolean;
  };
  icon: LucideIcon;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, trend, icon: Icon }) => {
  return (
    <div className="bg-white rounded-xl p-6 border border-gray-100">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold">{title}</h3>
        <Icon className="w-5 h-5 text-gray-400" />
      </div>
      <div className="text-2xl font-bold">{value}</div>
      {trend && (
        <div className={`flex items-center mt-2 text-sm ${
          trend.positive ? 'text-green-600' : 'text-red-600'
        }`}>
          {trend.value}
        </div>
      )}
    </div>
  );
};

export default StatCard;