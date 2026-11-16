import React from 'react';
import { AlertCircle, CheckCircle2, HelpCircle } from 'lucide-react';
import { DistributiveProblem, UserAnswerState } from '../types/worksheet';
import { CopyDictionary } from '../utils/i18n';
import { ProportionalAreaDiagram, TileArrayDiagram } from './AreaModelDiagram';

interface ProblemCardProps {
  problem: DistributiveProblem;
  totalQuestions: number;
  answer: UserAnswerState;
  copy: CopyDictionary;
  onUpdateAnswer: (updated: UserAnswerState) => void;
  onCheckProblem: () => void;
}

export function ProblemCard({
  problem,
  totalQuestions,
  answer,
  copy,
  onUpdateAnswer,
  onCheckProblem,
}: ProblemCardProps) {
  const handleSplitPartChange = (idx: number, val: string) => {
    const nextParts = [...answer.splitParts];
    nextParts[idx] = val;
    onUpdateAnswer({
      ...answer,
      splitParts: nextParts,
      checked: false,
      errors: {},
    });
  };

  const handleArraySplitSlider = (newLeftCols: number) => {
    const rightCols = problem.totalB - newLeftCols;
    onUpdateAnswer({
      ...answer,
      splitParts: [String(newLeftCols), String(rightCols)],
      partialProducts: ['', ''],
      finalAnswer: '',
      checked: false,
      errors: {},
    });
  };

  const handlePartialChange = (idx: number, val: string) => {
    const nextPartials = [...answer.partialProducts];
    nextPartials[idx] = val;
    onUpdateAnswer({
      ...answer,
      partialProducts: nextPartials,
      checked: false,
      errors: {},
    });
  };

  const handleFinalChange = (val: string) => {
    onUpdateAnswer({
      ...answer,
      finalAnswer: val,
      checked: false,
      errors: {},
    });
  };

  const toggleHint = () => {
    onUpdateAnswer({
      ...answer,
      hintVisible: !answer.hintVisible,
    });
  };

  // Compute live parts for diagram rendering
  const activeArrayLeft =
    problem.kind === 'array_split'
      ? Math.min(problem.totalB - 1, Math.max(1, Number(answer.splitParts[0]) || problem.parts[0]))
      : problem.parts[0];
  const activeArrayRight = problem.totalB - activeArrayLeft;

  const liveStepParts =
    problem.kind === 'step_by_step'
      ? answer.splitParts.map((s) => {
          const n = Number(s);
          return Number.isInteger(n) && n > 0 ? n : 0;
        })
      : problem.parts;

  const renderMissingFactorEquation = () => {
    if (!problem.missingTarget) return null;
    const { variant } = problem.missingTarget;
    const inputClass = `w-20 h-11 text-center font-mono tabular-nums text-lg font-bold rounded-lg border-2 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
      answer.checked
        ? answer.errors.final
          ? 'border-red-500 bg-red-50 text-red-900'
          : 'border-emerald-600 bg-emerald-50 text-emerald-900'
        : 'border-blue-400 bg-blue-50/40 text-slate-900 focus:border-blue-600 focus:bg-white'
    }`;

    const missingInput = (
      <input
        type="number"
        inputMode="numeric"
        aria-label={copy.fillMissingLabel}
        value={answer.finalAnswer}
        onChange={(e) => handleFinalChange(e.target.value)}
        placeholder="?"
        className={inputClass}
      />
    );

    if (variant === 'missing_part_in_product') {
      // a × (p0 + p1 [+ p2]) = (a × [__]) + (a × p1) [+ (a × p2)]
      return (
        <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums text-lg sm:text-xl font-semibold text-slate-900">
          <span>
            {problem.factorA} × ({problem.parts.join(' + ')})
          </span>
          <span className="text-slate-400">=</span>
          <span className="inline-flex items-center gap-1.5">
            <span>({problem.factorA} ×</span>
            {missingInput}
            <span>)</span>
          </span>
          {problem.parts.slice(1).map((p, idx) => (
            <React.Fragment key={idx}>
              <span className="text-slate-400">+</span>
              <span>
                ({problem.factorA} × {p})
              </span>
            </React.Fragment>
          ))}
        </div>
      );
    }

    if (variant === 'missing_part_in_sum') {
      // a × N = (a × p0) + ... + (a × [__])
      const lastIdx = problem.parts.length - 1;
      return (
        <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums text-lg sm:text-xl font-semibold text-slate-900">
          <span>
            {problem.factorA} × {problem.totalB}
          </span>
          <span className="text-slate-400">=</span>
          {problem.parts.slice(0, lastIdx).map((p, idx) => (
            <React.Fragment key={idx}>
              <span>
                ({problem.factorA} × {p})
              </span>
              <span className="text-slate-400">+</span>
            </React.Fragment>
          ))}
          <span className="inline-flex items-center gap-1.5">
            <span>({problem.factorA} ×</span>
            {missingInput}
            <span>)</span>
          </span>
        </div>
      );
    }

    // missing_outer_factor: (a × p0) + (a × p1) = [__] × (p0 + p1)
    return (
      <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums text-lg sm:text-xl font-semibold text-slate-900">
        {problem.parts.map((p, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && <span className="text-slate-400">+</span>}
            <span>
              ({problem.factorA} × {p})
            </span>
          </React.Fragment>
        ))}
        <span className="text-slate-400">=</span>
        <span className="inline-flex items-center gap-1.5">
          {missingInput}
          <span>× ({problem.parts.join(' + ')})</span>
        </span>
      </div>
    );
  };

  return (
    <article className="bg-white border border-slate-200 rounded-xl p-5 sm:p-6">
      {/* Unboxed inline metadata row (Zero-Pill Rule) */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
          <span className="text-slate-900 font-semibold tabular-nums">
            {copy.questionWord} {problem.index} {copy.ofWord} {totalQuestions}
          </span>
          <span aria-hidden="true">·</span>
          <span>
            {copy.levelShort} {problem.level}
          </span>
          <span aria-hidden="true">·</span>
          <span>{copy.kindNames[problem.kind]}</span>
        </div>

        {/* Dual-coded state readout (never hue-only) */}
        <div className="flex items-center gap-1.5 text-xs font-semibold">
          {answer.checked ? (
            answer.isCorrect ? (
              <span className="inline-flex items-center gap-1.5 text-emerald-700">
                <CheckCircle2 className="w-4 h-4" aria-hidden="true" />
                <span>{copy.statusCorrect}</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1.5 text-red-700">
                <AlertCircle className="w-4 h-4" aria-hidden="true" />
                <span>{copy.statusNeedsCheck}</span>
              </span>
            )
          ) : (
            <span className="text-slate-400 font-medium">{copy.statusNotChecked}</span>
          )}
        </div>
      </div>

      {/* Prompt + Core Expression */}
      <div className="pt-4 pb-5">
        <p className="text-sm text-slate-600 mb-3">{copy.prompts[problem.kind]}</p>

        {problem.kind !== 'missing_factor' ? (
          <div className="text-2xl sm:text-3xl font-bold font-mono tabular-nums text-slate-900 tracking-tight">
            {problem.factorA} × {problem.totalB}
          </div>
        ) : (
          <div className="py-2">{renderMissingFactorEquation()}</div>
        )}
      </div>

      {/* Main Interactive Workspace Split */}
      {problem.kind !== 'missing_factor' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Stage: Visual Diagram */}
          <div className="lg:col-span-6 bg-slate-50 border border-slate-200 rounded-lg p-4">
            {problem.kind === 'array_split' ? (
              <div className="space-y-3">
                <TileArrayDiagram
                  rows={problem.factorA}
                  leftCols={activeArrayLeft}
                  rightCols={activeArrayRight}
                  onChangeSplit={handleArraySplitSlider}
                  interactive={true}
                />
                <p className="text-xs text-slate-500">{copy.clickGridHint}</p>
              </div>
            ) : (
              <ProportionalAreaDiagram
                factorA={problem.factorA}
                parts={liveStepParts}
                partialValues={answer.partialProducts}
              />
            )}
          </div>

          {/* Right Deck: Step-by-step inputs */}
          <div className="lg:col-span-6 space-y-4">
            {/* Step 1: Break Apart (only editable for step_by_step) */}
            {problem.kind === 'step_by_step' && (
              <div>
                <div className="text-xs font-semibold text-slate-700 mb-2">
                  {copy.breakApartLabel}
                </div>
                <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums text-base font-semibold text-slate-800">
                  <span>{problem.factorA} × (</span>
                  {answer.splitParts.map((val, idx) => (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-slate-400">+</span>}
                      <input
                        type="number"
                        inputMode="numeric"
                        aria-label={`${copy.partLabel} ${idx + 1}`}
                        value={val}
                        onChange={(e) => handleSplitPartChange(idx, e.target.value)}
                        placeholder="?"
                        className={`w-16 h-10 text-center rounded-lg border font-mono tabular-nums text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                          answer.checked && answer.errors.split
                            ? 'border-red-500 bg-red-50 text-red-900'
                            : 'border-slate-300 bg-white text-slate-900 focus:border-blue-600'
                        }`}
                      />
                    </React.Fragment>
                  ))}
                  <span>)</span>
                </div>
                {answer.checked && answer.errors.split && (
                  <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                    <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                    <span>{copy.errorSplitSum}</span>
                  </p>
                )}
              </div>
            )}

            {/* Step 2: Partial Products */}
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-2">
                {problem.kind === 'step_by_step'
                  ? copy.multiplyEachLabel
                  : `1. ${copy.multiplyEachLabel.replace(/^\d+\.\s*/, '')}`}
              </div>
              <div className="flex flex-wrap items-center gap-2 font-mono tabular-nums text-sm sm:text-base font-semibold text-slate-800">
                {(problem.kind === 'array_split'
                  ? [activeArrayLeft, activeArrayRight]
                  : liveStepParts
                ).map((partVal, idx) => {
                  const hasPartialError = answer.checked && answer.errors.partials?.[idx];
                  const partColor =
                    idx === 0
                      ? 'text-sky-800'
                      : idx === 1
                      ? 'text-amber-800'
                      : 'text-emerald-800';
                  return (
                    <React.Fragment key={idx}>
                      {idx > 0 && <span className="text-slate-400">+</span>}
                      <div className="inline-flex items-center gap-1.5 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5">
                        <span className={partColor}>
                          {problem.factorA} × {partVal > 0 ? partVal : '?'} =
                        </span>
                        <input
                          type="number"
                          inputMode="numeric"
                          aria-label={`${copy.partLabel} ${idx + 1} product`}
                          value={answer.partialProducts[idx] ?? ''}
                          onChange={(e) => handlePartialChange(idx, e.target.value)}
                          placeholder="?"
                          className={`w-16 h-9 text-center rounded-md border font-mono tabular-nums text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                            hasPartialError
                              ? 'border-red-500 bg-red-50 text-red-900'
                              : answer.checked && !hasPartialError
                              ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                              : 'border-slate-300 bg-white text-slate-900 focus:border-blue-600'
                          }`}
                        />
                      </div>
                    </React.Fragment>
                  );
                })}
              </div>
              {answer.checked && answer.errors.partials?.some(Boolean) && (
                <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{copy.errorPartial}</span>
                </p>
              )}
            </div>

            {/* Step 3: Final Sum */}
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-2">
                {problem.kind === 'step_by_step'
                  ? copy.addProductsLabel
                  : `2. ${copy.totalAreaLabel}`}
              </div>
              <div className="flex items-center gap-2 font-mono tabular-nums text-base font-bold text-slate-900">
                <span>
                  {problem.factorA} × {problem.totalB} =
                </span>
                <input
                  type="number"
                  inputMode="numeric"
                  aria-label={copy.totalAreaLabel}
                  value={answer.finalAnswer}
                  onChange={(e) => handleFinalChange(e.target.value)}
                  placeholder="?"
                  className={`w-24 h-10 text-center rounded-lg border font-mono tabular-nums text-base font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                    answer.checked && answer.errors.final
                      ? 'border-red-500 bg-red-50 text-red-900'
                      : answer.checked && !answer.errors.final
                      ? 'border-emerald-600 bg-emerald-50 text-emerald-900'
                      : 'border-slate-300 bg-white text-slate-900 focus:border-blue-600'
                  }`}
                />
              </div>
              {answer.checked && answer.errors.final && (
                <p className="mt-1.5 text-xs text-red-700 flex items-center gap-1">
                  <AlertCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  <span>{copy.errorTotal}</span>
                </p>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Error feedback for missing_factor */}
      {problem.kind === 'missing_factor' && answer.checked && answer.errors.final && (
        <p className="mt-2 text-xs text-red-700 flex items-center gap-1.5">
          <AlertCircle className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{copy.errorMissing}</span>
        </p>
      )}

      {/* Optional Hint Callout (subtle hairline border, no thick left bar) */}
      {answer.hintVisible && (
        <div className="mt-4 p-3.5 bg-slate-50 border border-slate-200 rounded-lg text-sm text-slate-700">
          {copy.hintText[problem.kind]}
        </div>
      )}

      {/* Card Action Footer */}
      <div className="mt-5 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={toggleHint}
          className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
        >
          <HelpCircle className="w-4 h-4" aria-hidden="true" />
          <span>{answer.hintVisible ? copy.hideHintBtn : copy.hintBtn}</span>
        </button>

        <button
          type="button"
          onClick={onCheckProblem}
          className="px-4 py-2 text-sm font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
        >
          {copy.checkBtn}
        </button>
      </div>
    </article>
  );
}
