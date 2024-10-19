import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1월', 사용량: 4000 },
  { name: '2월', 사용량: 3000 },
  { name: '3월', 사용량: 2000 },
  { name: '4월', 사용량: 2780 },
  { name: '5월', 사용량: 1890 },
  { name: '6월', 사용량: 2390 },
];

const Dashboard: React.FC = () => {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">대시보드</h2>
      <div className="mb-8">
        <h3 className="text-lg font-medium mb-4">월별 사용량</h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="사용량" fill="#3B82F6" />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-blue-100 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-2">총 사용량</h4>
          <p className="text-3xl font-bold">15,060</p>
        </div>
        <div className="bg-green-100 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-2">활성 사용자</h4>
          <p className="text-3xl font-bold">1,234</p>
        </div>
        <div className="bg-yellow-100 p-4 rounded-lg">
          <h4 className="text-lg font-medium mb-2">평균 응답 시간</h4>
          <p className="text-3xl font-bold">2.5초</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;