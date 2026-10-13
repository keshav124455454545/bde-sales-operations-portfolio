import React, { useState } from 'react';
import {
  Settings as SettingsIcon,
  Download,
  Upload,
  RefreshCw,
  HardDrive,
  Building,
  CheckCircle2,
  AlertTriangle,
  ShieldCheck,
  Info,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import {
  getStorageUsage,
  exportBackupJSON,
  loadStoredData,
  AppStateData,
} from '../services/storage';
import { ConfirmModal } from '../components/common/ConfirmModal';

export const Settings: React.FC = () => {
  const appState = useApp();
  const { resetData, restoreBackup, showToast } = appState;

  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [restoreText, setRestoreText] = useState('');
  const [restoreError, setRestoreError] = useState('');

  const usage = getStorageUsage();

  const handleExportBackup = () => {
    const currentState = loadStoredData();
    exportBackupJSON(currentState);
    showToast('Full workspace JSON backup exported.');
  };

  const handleRestoreFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text) as AppStateData;
        if (!parsed.leads || !Array.isArray(parsed.leads)) {
          setRestoreError('Invalid backup file schema.');
          return;
        }
        restoreBackup(parsed);
        setRestoreError('');
      } catch (err) {
        setRestoreError('Failed to parse JSON file.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
          <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
            <SettingsIcon className="w-5 h-5" />
          </div>
          Settings & Workspace Data Management
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Manage local persistent storage, backup and restore operational datasets, and review agency configurations.
        </p>
      </div>

      {/* Storage Information Card */}
      <div className="figma-card p-6 rounded-2xl space-y-4">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <HardDrive className="w-4 h-4 text-brand-600" /> Browser Storage Telemetry
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs">
          <div className="bg-slate-50/80 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Storage Used:</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 block">{usage.kb}</span>
            <p className="text-[10px] text-slate-500 mt-0.5">HTML5 LocalStorage allocation</p>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Total Records:</span>
            <span className="text-lg font-bold text-slate-900 dark:text-white mt-0.5 block">{usage.recordCount}</span>
            <p className="text-[10px] text-slate-500 mt-0.5">Leads, bids, contacts, proposals</p>
          </div>

          <div className="bg-slate-50/80 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200/80 dark:border-slate-700/80">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Schema Version:</span>
            <span className="text-lg font-bold text-brand-700 mt-0.5 block">v1.0.0</span>
            <p className="text-[10px] text-slate-500 mt-0.5">Persistent across browser refreshes</p>
          </div>
        </div>

        <div className="text-xs text-slate-500 leading-relaxed bg-blue-50/60 p-3 rounded-lg border border-blue-200/50 flex items-start gap-2">
          <Info className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
          <span>
            <strong>Local Storage Notice:</strong> Application data is securely stored inside your local browser. If you switch devices or clear your browser cache, you can export and re-import your operations data anytime using the backup tools below.
          </span>
        </div>
      </div>

      {/* Backup & Restore Tools */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4 text-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Download className="w-4 h-4 text-brand-600" /> Backup & Restore Workspace
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-800 text-xs">Export Backup (JSON)</h3>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Download your complete sales operations state (all leads, proposals, and logs) as a JSON file.
            </p>
            <button
              onClick={handleExportBackup}
              className="mt-2 inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition"
            >
              <Download className="w-3.5 h-3.5" /> Download JSON Backup
            </button>
          </div>

          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2">
            <h3 className="font-bold text-slate-800 text-xs">Restore Backup (JSON)</h3>
            <p className="text-slate-600 text-[11px] leading-relaxed">
              Select a previously exported JSON backup file to restore your customized operations data.
            </p>
            <input
              type="file"
              accept=".json"
              onChange={handleRestoreFile}
              className="mt-2 text-xs text-slate-500 file:mr-3 file:py-1.5 file:px-3 file:rounded file:border-0 file:text-xs file:font-semibold file:bg-slate-200 file:text-slate-800 hover:file:bg-slate-300"
            />
            {restoreError && <p className="text-xs text-rose-600 mt-1">{restoreError}</p>}
          </div>
        </div>
      </div>

      {/* Danger Zone: Reset to Baseline Seed Data */}
      <div className="bg-white p-5 rounded-xl border border-rose-200 shadow-2xs space-y-3 text-xs">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-rose-900 flex items-center gap-2">
              <RefreshCw className="w-4 h-4 text-rose-600" /> Reset to Baseline Operations Dataset
            </h2>
            <p className="text-slate-500 mt-0.5 text-xs">
              Restore all leads, bidding opportunities, proposals, and CRM records back to standard baseline defaults.
            </p>
          </div>

          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="px-4 py-2 text-xs font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 border border-rose-200 rounded-lg transition"
          >
            Reset Dataset
          </button>
        </div>
      </div>

      {/* Agency Profile */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-3 text-xs">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Building className="w-4 h-4 text-brand-600" /> Agency Profile — Nexora Digital Solutions
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-slate-600 pt-1">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Entity Name:</span>
            <span className="font-bold text-slate-800">Nexora Digital Solutions</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Headquarters:</span>
            <span className="font-bold text-slate-800">Phase 8B, Mohali, Punjab</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Operations:</span>
            <span className="font-bold text-slate-800">IT Services & Offshore Dev</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Markets:</span>
            <span className="font-bold text-slate-800">US, UK, Nordics, UAE, AU</span>
          </div>
        </div>
      </div>

      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetData}
        title="Reset All Demo Data?"
        message="This action will restore all demonstration leads, proposals, bids, and activities to default seed data."
        confirmLabel="Reset Demo Data"
        isDestructive={true}
      />
    </div>
  );
};
