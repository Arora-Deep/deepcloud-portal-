import React from 'react';
import { MessageSquare, Search, Plus } from 'lucide-react';
import toast from 'react-hot-toast';

const Support = () => {
  const tickets = [
    {
      id: 1,
      subject: 'VPS Performance Issues',
      status: 'Open',
      priority: 'High',
      lastUpdate: '2 hours ago',
      messages: 3,
    },
    {
      id: 2,
      subject: 'Storage Quota Increase Request',
      status: 'Closed',
      priority: 'Medium',
      lastUpdate: '2 days ago',
      messages: 5,
    },
  ];

  const handleNewTicket = () => {
    toast.success('Creating new support ticket...');
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Support</h1>
          <p className="text-gray-600 mt-1">Get help with your services</p>
        </div>
        <button 
          className="btn btn-primary flex items-center"
          onClick={handleNewTicket}
        >
          <Plus className="w-4 h-4 mr-2" />
          New Ticket
        </button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg font-semibold">Support Tickets</h2>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search tickets..."
                className="pl-9 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex space-x-2">
            <button className="btn btn-secondary text-sm">All</button>
            <button className="btn btn-secondary text-sm">Open</button>
            <button className="btn btn-secondary text-sm">Closed</button>
          </div>
        </div>
        <div className="divide-y divide-gray-100">
          {tickets.map((ticket) => (
            <div key={ticket.id} className="p-6 hover:bg-gray-50 transition-colors cursor-pointer">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-medium text-gray-900">{ticket.subject}</h3>
                  <div className="flex items-center space-x-2 mt-1">
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      ticket.status === 'Open' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {ticket.status}
                    </span>
                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                      ticket.priority === 'High'
                        ? 'bg-red-100 text-red-800'
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {ticket.priority}
                    </span>
                    <span className="text-sm text-gray-500">
                      Updated {ticket.lastUpdate}
                    </span>
                  </div>
                </div>
                <div className="flex items-center space-x-2 text-gray-500">
                  <MessageSquare className="w-4 h-4" />
                  <span className="text-sm">{ticket.messages}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Support;