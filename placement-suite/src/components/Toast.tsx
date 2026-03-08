import { useToast } from '../context/ToastContext';
import { CheckCircle2, Info, AlertTriangle, XCircle } from 'lucide-react';

const icons = {
  success: CheckCircle2,
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
};

const styles = {
  success: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  info: 'bg-sky-50 border-sky-200 text-sky-800',
  warning: 'bg-amber-50 border-amber-200 text-amber-800',
  error: 'bg-rose-50 border-rose-200 text-rose-800',
};

export function ToastContainer() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3 max-w-sm">
      {toasts.map((toast) => {
        const Icon = icons[toast.type];
        return (
          <div
            key={toast.id}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg animate-slide-in ${styles[toast.type]}`}
          >
            <Icon className="w-5 h-5 shrink-0" />
            <p className="text-sm font-medium">{toast.message}</p>
          </div>
        );
      })}
    </div>
  );
}
