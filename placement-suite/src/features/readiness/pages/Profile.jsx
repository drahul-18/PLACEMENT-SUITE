import { useState, useEffect } from 'react';
import { getItem, setItem } from '../../../lib/storage';
import { useToast } from '../../../context/ToastContext';
import { User, Save } from 'lucide-react';

export function Profile() {
  const [userName, setUserName] = useState('');
  const { addToast } = useToast();

  useEffect(() => {
    setUserName(getItem('app', 'userName') || '');
  }, []);

  const handleSave = () => {
    setItem('app', 'userName', userName.trim() || '');
    addToast('Profile updated! Your greeting will be personalized.', 'success');
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-slate-900">Profile</h2>
      <p className="text-slate-600">Manage your account and preferences.</p>

      <div className="bg-white rounded-2xl border border-slate-200 p-6 max-w-md">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-12 h-12 rounded-xl bg-indigo-50 flex items-center justify-center">
            <User className="w-6 h-6 text-indigo-600" />
          </div>
          <div>
            <h3 className="font-semibold text-slate-900">Display Name</h3>
            <p className="text-sm text-slate-500">Used for your personalized greeting</p>
          </div>
        </div>
        <div className="flex gap-3">
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Enter your name"
            className="flex-1 px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all"
          />
          <button
            type="button"
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-3 bg-indigo-600 text-white font-medium rounded-xl hover:bg-indigo-700 transition-colors"
          >
            <Save className="w-4 h-4" />
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
