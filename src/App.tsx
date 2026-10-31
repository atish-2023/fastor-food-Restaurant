import { BrowserRouter } from 'react-router-dom';
import { AppRoutes } from './routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      {/* Phone frame only - top control bar removed */}
      <div className="min-h-screen bg-slate-100 flex items-center justify-center p-0 sm:py-6 sm:px-4 font-sans">
        <div className="w-full sm:max-w-[390px] min-h-[844px] bg-white sm:rounded-[36px] sm:shadow-2xl sm:border-[8px] sm:border-gray-900 overflow-hidden relative flex flex-col">
          <AppRoutes />
        </div>
      </div>
    </BrowserRouter>
  );
}
