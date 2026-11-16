import React, { useState } from 'react';
import { Eye, EyeOff, Printer, RefreshCw } from 'lucide-react';
import { DistributiveProblem, StudentProfile } from '../types/worksheet';
import { CopyDictionary } from '../utils/i18n';
import { ProportionalAreaDiagram } from './AreaModelDiagram';

interface PrintableWorksheetProps {
  problems: DistributiveProblem[];
  profile: StudentProfile;
  copy: CopyDictionary;
  onGenerateNewSet: () => void;
}

export function PrintableWorksheet({
  problems,
  profile,
  copy,
  onGenerateNewSet,
}: PrintableWorksheetProps) {
  const [includeAnswerKey, setIncludeAnswerKey] = useState(true);

  const renderMissingFormulaBlank = (p: DistributiveProblem) => {
    if (!p.missingTarget) return null;
    const { variant } = p.missingTarget;
    if (variant === 'missing_part_in_product') {
      return (
        <span>
          {p.factorA} × ({p.parts.join(' + ')}) = ({p.factorA} × _____)
          {p.parts.slice(1).map((part, idx) => (
            <React.Fragment key={idx}>
              {' + '}({p.factorA} × {part})
            </React.Fragment>
          ))}
        </span>
      );
    }
    if (variant === 'missing_part_in_sum') {
      const lastIdx = p.parts.length - 1;
      return (
        <span>
          {p.factorA} × {p.totalB} ={' '}
          {p.parts.slice(0, lastIdx).map((part, idx) => (
            <React.Fragment key={idx}>
              ({p.factorA} × {part}) +{' '}
            </React.Fragment>
          ))}
          ({p.factorA} × _____)
        </span>
      );
    }
    return (
      <span>
        {p.parts.map((part, idx) => (
          <React.Fragment key={idx}>
            {idx > 0 && ' + '}({p.factorA} × {part})
          </React.Fragment>
        ))}{' '}
        = _____ × ({p.parts.join(' + ')})
      </span>
    );
  };

  return (
    <section className="space-y-6">
      {/* Screen-only toolbar */}
      <div className="no-print flex flex-wrap items-center justify-between gap-4 bg-white border border-slate-200 rounded-xl p-5">
        <div>
          <h1 className="text-xl font-bold text-slate-900">{copy.printView.title}</h1>
          <p className="text-sm text-slate-600 mt-0.5">{copy.printView.subtitle}</p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <button
            type="button"
            onClick={() => setIncludeAnswerKey((v) => !v)}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            {includeAnswerKey ? (
              <EyeOff className="w-4 h-4" aria-hidden="true" />
            ) : (
              <Eye className="w-4 h-4" aria-hidden="true" />
            )}
            <span>
              {includeAnswerKey ? copy.printView.hideKey : copy.printView.showKey}
            </span>
          </button>

          <button
            type="button"
            onClick={onGenerateNewSet}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <RefreshCw className="w-4 h-4" aria-hidden="true" />
            <span>{copy.newRandomSet}</span>
          </button>

          <button
            type="button"
            onClick={() => window.print()}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
          >
            <Printer className="w-4 h-4" aria-hidden="true" />
            <span>{copy.printView.printNow}</span>
          </button>
        </div>
      </div>

      {/* Printable Worksheet Sheet */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 sm:p-10 print:border-0 print:p-0 print:rounded-none">
        {/* Student Info Header */}
        <div className="border-b-2 border-slate-900 pb-5 mb-6">
          <h2 className="text-xl font-bold text-slate-900">{copy.printView.title}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-4 text-sm text-slate-700">
            <div className="border-b border-slate-400 pb-1">
              {copy.printView.studentName}:{' '}
              <span className="font-semibold text-slate-900">{profile.name}</span>
            </div>
            <div className="border-b border-slate-400 pb-1">
              {copy.printView.studentClass}:{' '}
              <span className="font-semibold text-slate-900">{profile.className}</span>
            </div>
            <div className="border-b border-slate-400 pb-1">
              {copy.printView.studentDate}:
            </div>
            <div className="border-b border-slate-400 pb-1">
              {copy.printView.studentScore}: ____ / {problems.length}
            </div>
          </div>
          <p className="mt-4 text-xs sm:text-sm text-slate-600">
            {copy.printView.instructions}
          </p>
        </div>

        {/* Questions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 print:grid-cols-2">
          {problems.map((p) => (
            <div
              key={p.id}
              className="print-avoid-break border border-slate-300 rounded-lg p-4 flex flex-col justify-between space-y-3"
            >
              <div className="flex items-center justify-between text-xs text-slate-500">
                <span className="font-semibold text-slate-900">
                  {copy.questionWord} {p.index}
                </span>
                <span>{copy.kindNames[p.kind]}</span>
              </div>

              {p.kind === 'missing_factor' ? (
                <div className="py-4 font-mono tabular-nums text-base font-bold text-slate-900">
                  {renderMissingFormulaBlank(p)}
                </div>
              ) : (
                <>
                  <div className="font-mono tabular-nums text-lg font-bold text-slate-900">
                    {p.factorA} × {p.totalB} = _____
                  </div>

                  {p.kind === 'area_model' || p.kind === 'array_split' ? (
                    <ProportionalAreaDiagram
                      factorA={p.factorA}
                      parts={p.parts}
                      compact={true}
                    />
                  ) : (
                    <div className="border border-dashed border-slate-300 rounded-md p-3 text-xs text-slate-500 space-y-2 font-mono tabular-nums">
                      <div>
                        {p.factorA} × (_____ + _____{p.parts.length === 3 ? ' + _____' : ''})
                      </div>
                      <div>
                        = (_____ × _____) + (_____ × _____)
                        {p.parts.length === 3 ? ' + (_____ × _____)' : ''}
                      </div>
                      <div>= _____ + _____{p.parts.length === 3 ? ' + _____' : ''} = _____</div>
                    </div>
                  )}

                  {p.kind !== 'step_by_step' && (
                    <div className="font-mono tabular-nums text-xs text-slate-700 pt-1">
                      {p.parts.map((part, idx) => (
                        <span key={idx}>
                          {idx > 0 && ' + '}({p.factorA} × {part} = _____)
                        </span>
                      ))}{' '}
                      = _____
                    </div>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        {/* Teacher Answer Key */}
        {includeAnswerKey && (
          <div className="print-break-before mt-10 pt-8 border-t-2 border-slate-300">
            <h3 className="text-lg font-bold text-slate-900 mb-4">
              {copy.printView.answerKeyTitle}
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono tabular-nums text-sm">
              {problems.map((p) => (
                <div
                  key={`key-${p.id}`}
                  className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-800"
                >
                  <span className="font-bold text-slate-900 mr-2">
                    {p.index}.
                  </span>
                  {p.kind === 'missing_factor' && p.missingTarget ? (
                    <span>
                      Missing value = <strong>{p.missingTarget.expectedValue}</strong>
                    </span>
                  ) : (
                    <span>
                      {p.factorA} × ({p.parts.join(' + ')}) ={' '}
                      {p.partialProducts.join(' + ')} ={' '}
                      <strong>{p.totalProduct}</strong>
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
