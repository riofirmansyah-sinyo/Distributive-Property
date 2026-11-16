import { CopyDictionary } from '../utils/i18n';
import { ProportionalAreaDiagram } from './AreaModelDiagram';
import { ResilientImage } from './ResilientImage';

interface ConceptGuideProps {
  copy: CopyDictionary;
}

export function ConceptGuide({ copy }: ConceptGuideProps) {
  return (
    <section className="space-y-8 max-w-4xl">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
          {copy.guide.title}
        </h1>
        <p className="mt-2 text-base text-slate-600">{copy.guide.subtitle}</p>
      </div>

      {/* Core Rule Block */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
        <div className="text-xs font-semibold text-slate-500">
          {copy.guide.ruleTitle}
        </div>
        <div className="font-mono tabular-nums text-2xl sm:text-3xl font-bold text-blue-700">
          {copy.guide.ruleFormula}
        </div>
        <p className="text-sm sm:text-base text-slate-700 leading-relaxed">
          {copy.guide.ruleDesc}
        </p>
      </div>

      {/* Three Steps Grid */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          {copy.guide.stepsTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {copy.guide.stepItems.map((step, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-4"
            >
              <div>
                <h3 className="text-base font-bold text-slate-900">
                  {step.title}
                </h3>
                <p className="mt-1.5 text-sm text-slate-600 leading-relaxed">
                  {step.detail}
                </p>
              </div>
              <div className="pt-3 border-t border-slate-100 font-mono tabular-nums text-sm font-semibold text-slate-900">
                {step.example}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Visual Example */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
        <h2 className="text-lg font-bold text-slate-900">
          {copy.guide.visualExampleTitle}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
          <div className="md:col-span-7 bg-slate-50 border border-slate-200 rounded-lg p-5">
            <ProportionalAreaDiagram
              factorA={6}
              parts={[20, 4]}
              showSolvedValues={true}
            />
          </div>
          <div className="md:col-span-5 overflow-hidden rounded-lg border border-slate-200 aspect-[4/3]">
            <ResilientImage
              src="/src/assets/images/visual_area_concept_1794817773599.jpg"
              alt="Geometric rectangle split into blue and amber grid sections"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
        <p className="text-sm text-slate-600">
          {copy.guide.visualExampleCaption}{' '}
          <span className="font-mono tabular-nums font-semibold text-slate-900">
            120 + 24 = 144
          </span>
        </p>
      </div>

      {/* Tips */}
      <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-3">
        <h2 className="text-lg font-bold text-slate-900">
          {copy.guide.tipsTitle}
        </h2>
        <ul className="space-y-2.5 text-sm sm:text-base text-slate-700 list-disc pl-5">
          {copy.guide.tips.map((tip, idx) => (
            <li key={idx}>{tip}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
