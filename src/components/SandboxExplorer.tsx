import { useState } from 'react';
import { CopyDictionary } from '../utils/i18n';
import { ProportionalAreaDiagram, TileArrayDiagram } from './AreaModelDiagram';

interface SandboxExplorerProps {
  copy: CopyDictionary;
}

export function SandboxExplorer({ copy }: SandboxExplorerProps) {
  const [rows, setRows] = useState<number>(6);
  const [totalCols, setTotalCols] = useState<number>(14);
  const [splitAt, setSplitAt] = useState<number>(10);

  const safeSplit = Math.min(totalCols - 1, Math.max(1, splitAt));
  const rightCols = totalCols - safeSplit;
  const leftProduct = rows * safeSplit;
  const rightProduct = rows * rightCols;
  const totalProduct = rows * totalCols;

  const handleTotalColsChange = (nextCols: number) => {
    setTotalCols(nextCols);
    if (splitAt >= nextCols) {
      setSplitAt(Math.max(1, nextCols - 1));
    }
  };

  const applyPreset = (preset: 'ten' | 'five' | 'half') => {
    if (preset === 'ten') {
      if (totalCols <= 10) {
        setTotalCols(14);
        setSplitAt(10);
      } else {
        setSplitAt(Math.floor(totalCols / 10) * 10);
      }
      return;
    }
    if (preset === 'five') {
      if (totalCols <= 5) {
        setTotalCols(8);
        setSplitAt(5);
      } else {
        setSplitAt(5);
      }
      return;
    }
    setSplitAt(Math.max(1, Math.floor(totalCols / 2)));
  };

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
          {copy.sandbox.title}
        </h1>
        <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
          {copy.sandbox.subtitle}
        </p>
      </div>

      {/* Two-Zone Sandbox Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left Zone (~65%): Interactive Stage */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between gap-4 pb-4 mb-5 border-b border-slate-100">
              <div className="font-mono tabular-nums text-xl sm:text-2xl font-bold text-slate-900">
                {rows} × {totalCols} = {rows} × ({safeSplit} + {rightCols})
              </div>
              <div className="text-xs font-medium text-slate-500 tabular-nums whitespace-nowrap">
                {totalProduct} total
              </div>
            </div>

            <div className="bg-slate-50 border border-slate-200 rounded-lg p-5 overflow-x-auto">
              {totalCols <= 16 ? (
                <TileArrayDiagram
                  rows={rows}
                  leftCols={safeSplit}
                  rightCols={rightCols}
                  onChangeSplit={setSplitAt}
                  showValues={true}
                  interactive={true}
                />
              ) : (
                <ProportionalAreaDiagram
                  factorA={rows}
                  parts={[safeSplit, rightCols]}
                  showSolvedValues={true}
                />
              )}
            </div>
          </div>

          <p className="mt-5 text-sm text-slate-600 pt-4 border-t border-slate-100">
            {copy.sandbox.conceptNote}
          </p>
        </div>

        {/* Right Zone (~35%): Control & Concept Deck */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-6">
          {/* Labeled Sliders */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between text-sm font-medium mb-1.5">
                <label htmlFor="sandbox-rows" className="text-slate-700">
                  {copy.sandbox.rowsLabel}
                </label>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {rows}
                </span>
              </div>
              <input
                id="sandbox-rows"
                type="range"
                min={2}
                max={9}
                value={rows}
                onChange={(e) => setRows(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-medium mb-1.5">
                <label htmlFor="sandbox-cols" className="text-slate-700">
                  {copy.sandbox.colsLabel}
                </label>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {totalCols}
                </span>
              </div>
              <input
                id="sandbox-cols"
                type="range"
                min={4}
                max={30}
                value={totalCols}
                onChange={(e) => handleTotalColsChange(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>

            <div>
              <div className="flex items-center justify-between text-sm font-medium mb-1.5">
                <label htmlFor="sandbox-split" className="text-slate-700">
                  {copy.sandbox.splitLabel}
                </label>
                <span className="font-mono tabular-nums font-bold text-slate-900">
                  {safeSplit} + {rightCols}
                </span>
              </div>
              <input
                id="sandbox-split"
                type="range"
                min={1}
                max={totalCols - 1}
                value={safeSplit}
                onChange={(e) => setSplitAt(Number(e.target.value))}
                className="w-full accent-blue-700 cursor-pointer"
              />
            </div>
          </div>

          {/* Friendly Split Presets */}
          <div className="pt-4 border-t border-slate-100">
            <div className="text-xs font-semibold text-slate-500 mb-2.5">
              {copy.sandbox.presetsLabel}
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => applyPreset('ten')}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {copy.sandbox.presetTen}
              </button>
              <button
                type="button"
                onClick={() => applyPreset('five')}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {copy.sandbox.presetFive}
              </button>
              <button
                type="button"
                onClick={() => applyPreset('half')}
                className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                {copy.sandbox.presetHalf}
              </button>
            </div>
          </div>

          {/* Live Equation Breakdown */}
          <div className="pt-4 border-t border-slate-100 space-y-3">
            <div className="text-xs font-semibold text-slate-500">
              {copy.sandbox.equationTitle}
            </div>

            <div className="space-y-2.5 font-mono tabular-nums text-sm">
              <div className="flex items-center justify-between gap-2 py-2 border-b border-slate-100">
                <span className="font-sans text-xs text-slate-500">{copy.sandbox.step1}</span>
                <span className="font-semibold text-slate-900">
                  {rows} × (<span className="text-sky-700">{safeSplit}</span> +{' '}
                  <span className="text-amber-700">{rightCols}</span>)
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2 border-b border-slate-100">
                <span className="font-sans text-xs text-slate-500">{copy.sandbox.step2}</span>
                <span className="font-semibold text-slate-900">
                  (<span className="text-sky-700">{leftProduct}</span>) + (
                  <span className="text-amber-700">{rightProduct}</span>)
                </span>
              </div>

              <div className="flex items-center justify-between gap-2 py-2">
                <span className="font-sans text-xs text-slate-500">{copy.sandbox.step3}</span>
                <span className="text-lg font-bold text-blue-700">
                  {totalProduct}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
