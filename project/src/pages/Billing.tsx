import React from 'react';
import { CreditCard, DollarSign, Receipt, Clock, Download } from 'lucide-react';

const Billing = () => {
  const invoices = [
    { id: 1, date: '2024-03-01', amount: 99.97, status: 'Paid' },
    { id: 2, date: '2024-02-01', amount: 89.97, status: 'Paid' },
    { id: 3, date: '2024-01-01', amount: 89.97, status: 'Paid' },
  ];

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Billing & Payments</h1>
        <p className="text-gray-600 mt-1">Manage your billing information and view invoices</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Current Balance</h3>
            <DollarSign className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold text-green-600">$75.00</div>
          <div className="text-sm text-gray-500 mt-1">Available Credit</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Next Payment</h3>
            <Clock className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">$99.97</div>
          <div className="text-sm text-gray-500 mt-1">Due on Apr 1, 2024</div>
        </div>

        <div className="bg-white rounded-xl p-6 border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-semibold">Payment Method</h3>
            <CreditCard className="w-5 h-5 text-gray-400" />
          </div>
          <div className="text-2xl font-bold">•••• 4242</div>
          <div className="text-sm text-gray-500 mt-1">Expires 12/25</div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">Billing History</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Invoice
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((invoice) => (
                <tr key={invoice.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {invoice.date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    ${invoice.amount}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                    <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center justify-end space-x-1">
                      <Download className="w-4 h-4" />
                      <span>PDF</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Billing;