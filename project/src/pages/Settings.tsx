import React from 'react';
import { User, Bell, Shield, CreditCard } from 'lucide-react';

const Settings = () => {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Settings</h1>
        <p className="text-gray-600 mt-1">Manage your account preferences</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-4">
            <div className="w-20 h-20 rounded-full bg-blue-600 flex items-center justify-center text-white text-2xl font-bold">
              JD
            </div>
            <div>
              <h2 className="text-xl font-semibold">John Doe</h2>
              <p className="text-gray-600">john@example.com</p>
            </div>
          </div>
        </div>

        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <h3 className="text-sm font-medium text-gray-900 flex items-center mb-4">
                <User className="w-4 h-4 mr-2" />
                Profile Settings
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Full Name</label>
                  <input type="text" defaultValue="John Doe" className="input" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Email</label>
                  <input type="email" defaultValue="john@example.com" className="input" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Company</label>
                  <input type="text" defaultValue="Acme Inc" className="input" />
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 flex items-center mb-4">
                <Bell className="w-4 h-4 mr-2" />
                Notification Preferences
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">Email Notifications</div>
                    <div className="text-sm text-gray-500">Receive email updates</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-sm">SMS Alerts</div>
                    <div className="text-sm text-gray-500">Get text notifications</div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                  </label>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-900 flex items-center mb-4">
                <Shield className="w-4 h-4 mr-2" />
                Security
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Current Password</label>
                  <input type="password" className="input" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">New Password</label>
                  <input type="password" className="input" />
                </div>
                <div>
                  <label className="block text-sm text-gray-700 mb-1">Confirm Password</label>
                  <input type="password" className="input" />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-100">
            <div className="flex justify-end space-x-3">
              <button className="btn btn-secondary">Cancel</button>
              <button className="btn btn-primary">Save Changes</button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 border-b border-gray-100">
          <h2 className="text-lg font-semibold">API Access</h2>
        </div>
        <div className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="font-medium">API Key</h3>
              <p className="text-sm text-gray-500">Use this key to access our API</p>
            </div>
            <button className="btn btn-secondary">Generate New Key</button>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm break-all">
            sk_live_51ABcd...
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;