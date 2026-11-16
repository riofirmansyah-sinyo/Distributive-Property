import React from 'react';

interface TileArrayDiagramProps {
  rows: number;
  leftCols: number;
  rightCols: number;
  onChangeSplit?: (newLeftCols: number) => void;
  showValues?: boolean;
  interactive?: boolean;
}

export function TileArrayDiagram({
  rows,
  leftCols,
  rightCols,
  onChangeSplit,
  showValues = false,
  interactive = true,
}: TileArrayDiagramProps) {
  const totalCols = leftCols + rightCols;

  return (
    <div className="w-full overflow-x-auto">
      <div className="inline-flex flex-col min-w-fit select-none">
        {/* Top split dimensions */}
        <div className="flex items-end pl-9 pb-2 gap-0">
          <div
            style={{ width: `${leftCols * 26}px` }}
            className="text-center font-mono tabular-nums text-xs font-semibold text-sky-700 border-b-2 border-sky-500 pb-1 transition-all duration-150"
          >
            {leftCols}
          </div>
          <div className="w-3 shrink-0" />
          <div
            style={{ width: `${rightCols * 26}px` }}
            className="text-center font-mono tabular-nums text-xs font-semibold text-amber-700 border-b-2 border-amber-500 pb-1 transition-all duration-150"
          >
            {rightCols}
          </div>
        </div>

        <div className="flex items-center">
          {/* Left side row count */}
          <div className="w-9 pr-2.5 flex items-center justify-end">
            <span className="font-mono tabular-nums text-sm font-bold text-slate-800">
              {rows}
            </span>
          </div>

          {/* Grid container with clickable split dividers */}
          <div className="relative inline-flex items-stretch">
            {/* Left block */}
            <div
              className="grid gap-1 p-1.5 rounded-lg bg-sky-50 border border-sky-300"
              style={{
                gridTemplateColumns: `repeat(${leftCols}, 20px)`,
              }}
            >
              {Array.from({ length: rows * leftCols }).map((_, idx) => (
                <div
                  key={`l-${idx}`}
                  className="w-5 h-5 rounded-xs bg-sky-500/85 border border-sky-600/30"
                />
              ))}
            </div>

            {/* Interactive split bar */}
            <div className="w-3 flex flex-col items-center justify-center relative">
              <div className="w-0.5 h-full bg-slate-800 rounded-full" />
            </div>

            {/* Right block */}
            <div
              className="grid gap-1 p-1.5 rounded-lg bg-amber-50 border border-amber-300"
              style={{
                gridTemplateColumns: `repeat(${rightCols}, 20px)`,
              }}
            >
              {Array.from({ length: rows * rightCols }).map((_, idx) => (
                <div
                  key={`r-${idx}`}
                  className="w-5 h-5 rounded-xs bg-amber-500/85 border border-amber-600/30"
                />
              ))}
            </div>
          </div>
        </div>

        {/* Bottom quick split selectors + optional product readouts */}
        <div className="pl-9 pt-2.5 space-y-2">
          {showValues && (
            <div className="flex items-center font-mono tabular-nums text-xs font-semibold">
              <div
                style={{ width: `${leftCols * 26}px` }}
                className="text-center text-sky-800"
              >
                {rows} × {leftCols} = {rows * leftCols}
              </div>
              <div className="w-3 shrink-0 text-center text-slate-400">+</div>
              <div
                style={{ width: `${rightCols * 26}px` }}
                className="text-center text-amber-800"
              >
                {rows} × {rightCols} = {rows * rightCols}
              </div>
            </div>
          )}

          {interactive && onChangeSplit && totalCols > 2 && (
            <div className="flex items-center gap-1 pt-1 flex-wrap">
              {Array.from({ length: totalCols - 1 }).map((_, idx) => {
                const splitPos = idx + 1;
                const active = splitPos === leftCols;
                return (
                  <button
                    key={splitPos}
                    type="button"
                    onClick={() => onChangeSplit(splitPos)}
                    aria-label={`Split at ${splitPos} + ${totalCols - splitPos}`}
                    className={`min-w-7 h-7 px-1.5 rounded-md text-xs font-mono tabular-nums transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                      active
                        ? 'bg-slate-900 text-white font-semibold'
                        : 'bg-slate-100 text-slate-600 hover:bg-slate-200 hover:text-slate-900'
                    }`}
                  >
                    {splitPos}
                  </button>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

interface ProportionalAreaDiagramProps {
  factorA: number;
  parts: number[];
  partialValues?: Array<number | string>;
  showSolvedValues?: boolean;
  compact?: boolean;
}

const PART_STYLES = [
  {
    bg: 'bg-sky-50',
    border: 'border-sky-300',
    headerText: 'text-sky-800',
    formulaText: 'text-sky-900',
    topLine: 'border-sky-500',
  },
  {
    bg: 'bg-amber-50',
    border: 'border-amber-300',
    headerText: 'text-amber-800',
    formulaText: 'text-amber-900',
    topLine: 'border-amber-500',
  },
  {
    bg: 'bg-emerald-50',
    border: 'border-emerald-300',
    headerText: 'text-emerald-800',
    formulaText: 'text-emerald-900',
    topLine: 'border-emerald-500',
  },
];

export function ProportionalAreaDiagram({
  factorA,
  parts,
  partialValues,
  showSolvedValues = false,
  compact = false,
}: ProportionalAreaDiagramProps) {
  const validParts = parts.map((p) => (p > 0 ? p : 1));
  const total = validParts.reduce((a, b) => a + b, 0) || 1;

  // Give each box a readable minimum flex share so small ones-digit boxes still fit text cleanly
  const flexWeights = validParts.map((p) => Math.max(18, Math.round((p / total) * 100)));

  return (
    <div className="w-full select-none">
      {/* Top dimension headers */}
      <div className="flex items-end pl-9 pb-1.5 gap-1.5">
        {parts.map((part, idx) => {
          const style = PART_STYLES[idx % PART_STYLES.length];
          return (
            <div
              key={idx}
              style={{ flex: `${flexWeights[idx]} 1 0%` }}
              className={`text-center font-mono tabular-nums ${
                compact ? 'text-xs' : 'text-sm'
              } font-bold ${style.headerText} border-b-2 ${style.topLine} pb-1`}
            >
              {part > 0 ? part : '?'}
            </div>
          );
        })}
      </div>

      {/* Main row with factor A + area boxes */}
      <div className="flex items-stretch">
        <div className="w-9 pr-2.5 flex items-center justify-end">
          <span
            className={`font-mono tabular-nums font-bold text-slate-900 ${
              compact ? 'text-sm' : 'text-base'
            }`}
          >
            {factorA}
          </span>
        </div>

        <div className="flex-1 flex items-stretch gap-1.5">
          {parts.map((part, idx) => {
            const style = PART_STYLES[idx % PART_STYLES.length];
            const displayPartial =
              partialValues && partialValues[idx] !== '' && partialValues[idx] !== undefined
                ? partialValues[idx]
                : showSolvedValues && part > 0
                ? factorA * part
                : '?';

            return (
              <div
                key={idx}
                style={{ flex: `${flexWeights[idx]} 1 0%` }}
                className={`${style.bg} border ${style.border} rounded-lg ${
                  compact ? 'py-3 px-2' : 'py-5 px-3'
                } flex flex-col items-center justify-center text-center transition-all duration-150`}
              >
                <span
                  className={`font-mono tabular-nums ${
                    compact ? 'text-xs' : 'text-sm'
                  } ${style.headerText} opacity-85`}
                >
                  {factorA} × {part > 0 ? part : '?'}
                </span>
                <span
                  className={`font-mono tabular-nums font-bold ${
                    compact ? 'text-sm mt-0.5' : 'text-lg mt-1'
                  } ${style.formulaText}`}
                >
                  = {displayPartial}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
