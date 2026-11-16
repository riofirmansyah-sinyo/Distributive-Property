import { RefreshCw } from 'lucide-react';
import { CopyDictionary } from '../utils/i18n';

export type ActiveTab = 'dashboard' | 'worksheet' | 'sandbox' | 'print' | 'guide';

interface HeaderProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  onGenerateNewSet: () => void;
  copy: CopyDictionary;
}

export function Header({
  activeTab,
  onSelectTab,
  onGenerateNewSet,
  copy,
}: HeaderProps) {
  const navItems: Array<{ id: ActiveTab; label: string }> = [
    { id: 'dashboard', label: copy.navDashboard },
    { id: 'worksheet', label: copy.navWorksheet },
    { id: 'sandbox', label: copy.navSandbox },
    { id: 'print', label: copy.navPrint },
    { id: 'guide', label: copy.navGuide },
  ];

  return (
    <header className="no-print sticky top-0 z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-8">
        {/* Zone 1: Single-element Brand wordmark */}
        <button
          type="button"
          onClick={() => onSelectTab('dashboard')}
          className="text-lg font-bold tracking-tight text-slate-900 whitespace-nowrap shrink-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-md px-1 -ml-1 cursor-pointer"
        >
          {copy.brand}
        </button>

        {/* Zone 2: 5 clean single-line text navigation links */}
        <nav
          aria-label="Primary"
          className="flex items-center gap-5 sm:gap-7 overflow-x-auto"
        >
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onSelectTab(item.id)}
                className={`relative py-5 text-sm font-medium transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 rounded-sm ${
                  isActive
                    ? 'text-blue-700 font-semibold'
                    : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {item.label}
                {isActive && (
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-700"
                  />
                )}
              </button>
            );
          })}
        </nav>

        {/* Zone 3: Single Primary Action */}
        <div className="shrink-0">
          <button
            type="button"
            onClick={onGenerateNewSet}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 active:scale-[0.99] rounded-lg transition-colors duration-150 whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">{copy.newRandomSet}</span>
          </button>
        </div>
      </div>
    </header>
  );
}
