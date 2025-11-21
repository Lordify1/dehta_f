import { appName } from '@/app';
import { useUser } from '@/context/UserContext';
import { AdminLayout } from '@/layouts/AdminLayout';
import React from 'react';
import { Helmet } from 'react-helmet-async';

const stats = [
  { title: 'Website Visits', value: '12,345', sub: 'This month' },
  { title: 'Newsletter Subscribers', value: '2,148', sub: 'All time' },
  { title: 'Team Members', value: '4', sub: 'Current live' },
  { title: 'Partners', value: '7', sub: 'Listed' },
  { title: 'Scheduled Newsletters', value: '3', sub: 'Pending' },
  { title: 'Sent Campaigns', value: '21', sub: 'Last 90 days' },
];

const AdminDashboard = () => {
    const {user} = useUser()
  return (
    <AdminLayout>
        <Helmet>
            <title>Admin Dashboard - {appName}</title>
        </Helmet>
        <div className="p-6">
            <h1 className="text-2xl md:text-3xl font-bold text-primary mb-6">Dashboard</h1>
            {/* <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {stats.map((stat, i) => (
                <div
                    key={i}
                    className="bg-[#121418] rounded-xl border border-[#1f1f1f] p-6 shadow-md hover:shadow-lg hover:border-[#1ecb8e] transition"
                >
                    <h3 className="text-gray-400 text-sm">{stat.title}</h3>
                    <p className="text-2xl text-white font-bold mt-1">{stat.value}</p>
                    <span className="text-xs text-gray-500">{stat.sub}</span>
                </div>
                ))}
            </div>

            <div className="mt-10">
                <h2 className="text-xl text-white font-semibold mb-4">Activity Log (Dummy)</h2>
                <ul className="space-y-3">
                <li className="text-gray-300 border-l-4 border-[#1ecb8e] pl-3">
                    New subscriber joined – <span className="text-gray-500 text-sm">2 hrs ago</span>
                </li>
                <li className="text-gray-300 border-l-4 border-[#1ecb8e] pl-3">
                    Newsletter “Welcome to Phi” sent – <span className="text-gray-500 text-sm">Yesterday</span>
                </li>
                <li className="text-gray-300 border-l-4 border-[#1ecb8e] pl-3">
                    Partner “GigaChain” added – <span className="text-gray-500 text-sm">2 days ago</span>
                </li>
                </ul>
            </div> */}
        </div>
    </AdminLayout>
  );
};

export default AdminDashboard;