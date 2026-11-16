import { useEffect, useMemo, useState } from 'react';
import { CheckCheck, RotateCcw } from 'lucide-react';
import { ConceptGuide } from './components/ConceptGuide';
import { ActiveTab, Header } from './components/Header';
import { PrintableWorksheet } from './components/PrintableWorksheet';
import { ProblemCard } from './components/ProblemCard';
import { ResilientImage } from './components/ResilientImage';
import { SandboxExplorer } from './components/SandboxExplorer';
import { AVATAR_ASSETS, StudentDashboard } from './components/StudentDashboard';
import {
  DifficultyLevel,
  DistributiveProblem,
  Language,
  ProblemKind,
  SessionStats,
  StudentProfile,
  UserAnswerState,
  WorksheetConfig,
  WorksheetHistoryItem,
} from './types/worksheet';
import { COPY } from './utils/i18n';
import {
  createInitialAnswerState,
  generateWorksheetProblems,
  validateProblemAnswer,
} from './utils/problemGenerator';

const STORAGE_LANG_KEY = 'distrimath_lang_v2';
const STORAGE_STATS_KEY = 'distrimath_stats_v1';
const STORAGE_PROFILE_KEY = 'distrimath_profile_v1';
const STORAGE_HISTORY_KEY = 'distrimath_history_v1';

const DEFAULT_CONFIG: WorksheetConfig = {
  level: 'mixed',
  kind: 'all',
  count: 8,
};

const DEFAULT_PROFILE: StudentProfile = {
  name: '',
  className: '',
  avatar: 'owl',
};

function loadInitialLang(): Language {
  try {
    const saved = localStorage.getItem(STORAGE_LANG_KEY);
    if (saved === 'en' || saved === 'id') return saved;
  } catch {
    // ignore storage errors
  }
  return 'en';
}

function loadInitialStats(): SessionStats {
  try {
    const raw = localStorage.getItem(STORAGE_STATS_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<SessionStats>;
      return {
        completedSets: Number(parsed.completedSets) || 0,
        bestAccuracy: Number(parsed.bestAccuracy) || 0,
        totalSolvedCorrectly: Number(parsed.totalSolvedCorrectly) || 0,
      };
    }
  } catch {
    // ignore storage errors
  }
  return { completedSets: 0, bestAccuracy: 0, totalSolvedCorrectly: 0 };
}

function loadInitialProfile(): StudentProfile {
  try {
    const raw = localStorage.getItem(STORAGE_PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw) as Partial<StudentProfile>;
      const avatar =
        parsed.avatar === 'owl' || parsed.avatar === 'fox' || parsed.avatar === 'bot'
          ? parsed.avatar
          : 'owl';
      return {
        name: typeof parsed.name === 'string' ? parsed.name : '',
        className: typeof parsed.className === 'string' ? parsed.className : '',
        avatar,
      };
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_PROFILE;
}

function loadInitialHistory(): WorksheetHistoryItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_HISTORY_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (Array.isArray(parsed)) return parsed;
    }
  } catch {
    // ignore storage errors
  }
  return [];
}

export default function App() {
  const [lang, setLang] = useState<Language>(loadInitialLang);
  const [activeTab, setActiveTab] = useState<ActiveTab>('dashboard');
  const [config, setConfig] = useState<WorksheetConfig>(DEFAULT_CONFIG);
  const [profile, setProfile] = useState<StudentProfile>(loadInitialProfile);
  const [history, setHistory] = useState<WorksheetHistoryItem[]>(loadInitialHistory);
  const [problems, setProblems] = useState<DistributiveProblem[]>(() =>
    generateWorksheetProblems(DEFAULT_CONFIG.level, DEFAULT_CONFIG.kind, DEFAULT_CONFIG.count)
  );
  const [answers, setAnswers] = useState<Record<string, UserAnswerState>>(() => {
    const map: Record<string, UserAnswerState> = {};
    problems.forEach((p) => {
      map[p.id] = createInitialAnswerState(p);
    });
    return map;
  });
  const [stats, setStats] = useState<SessionStats>(loadInitialStats);

  const copy = COPY[lang];

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_LANG_KEY, lang);
    } catch {
      // ignore
    }
  }, [lang]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_STATS_KEY, JSON.stringify(stats));
    } catch {
      // ignore
    }
  }, [stats]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_PROFILE_KEY, JSON.stringify(profile));
    } catch {
      // ignore
    }
  }, [profile]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_HISTORY_KEY, JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  const regenerateSet = (nextConfig: WorksheetConfig = config) => {
    const nextProblems = generateWorksheetProblems(
      nextConfig.level,
      nextConfig.kind,
      nextConfig.count
    );
    const nextAnswers: Record<string, UserAnswerState> = {};
    nextProblems.forEach((p) => {
      nextAnswers[p.id] = createInitialAnswerState(p);
    });
    setProblems(nextProblems);
    setAnswers(nextAnswers);
  };

  const handleConfigChange = (patch: Partial<WorksheetConfig>) => {
    const updated = { ...config, ...patch };
    setConfig(updated);
    regenerateSet(updated);
  };

  const handleStartLevelFromDashboard = (level: DifficultyLevel) => {
    const updated = { ...config, level };
    setConfig(updated);
    regenerateSet(updated);
    setActiveTab('worksheet');
  };

  const handleUpdateAnswer = (problemId: string, updated: UserAnswerState) => {
    setAnswers((prev) => ({
      ...prev,
      [problemId]: updated,
    }));
  };

  const handleCheckProblem = (problem: DistributiveProblem) => {
    const current = answers[problem.id] ?? createInitialAnswerState(problem);
    const validated = validateProblemAnswer(problem, current);
    setAnswers((prev) => ({
      ...prev,
      [problem.id]: validated,
    }));
    if (validated.isCorrect && !current.isCorrect) {
      setStats((prev) => ({
        ...prev,
        totalSolvedCorrectly: prev.totalSolvedCorrectly + 1,
      }));
    }
  };

  const handleCheckAll = () => {
    const nextAnswers: Record<string, UserAnswerState> = {};
    let correctCount = 0;

    problems.forEach((p) => {
      const current = answers[p.id] ?? createInitialAnswerState(p);
      const validated = validateProblemAnswer(p, current);
      nextAnswers[p.id] = validated;
      if (validated.isCorrect) correctCount++;
    });

    setAnswers(nextAnswers);
    const accuracy = problems.length > 0 ? Math.round((correctCount / problems.length) * 100) : 0;
    setStats((prev) => ({
      completedSets: prev.completedSets + 1,
      bestAccuracy: Math.max(prev.bestAccuracy, accuracy),
      totalSolvedCorrectly: prev.totalSolvedCorrectly + correctCount,
    }));

    const timeLabel = new Date().toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
    const entry: WorksheetHistoryItem = {
      id: `${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
      completedAt: timeLabel,
      studentName: profile.name.trim(),
      level: config.level,
      correct: correctCount,
      total: problems.length,
      accuracy,
    };
    setHistory((prev) => [entry, ...prev].slice(0, 10));
  };

  const handleResetAnswers = () => {
    const resetMap: Record<string, UserAnswerState> = {};
    problems.forEach((p) => {
      resetMap[p.id] = createInitialAnswerState(p);
    });
    setAnswers(resetMap);
  };

  const summary = useMemo(() => {
    let checkedCount = 0;
    let correctCount = 0;
    let filledCount = 0;

    problems.forEach((p) => {
      const ans = answers[p.id];
      if (!ans) return;
      if (ans.finalAnswer.trim() !== '') filledCount++;
      if (ans.checked) checkedCount++;
      if (ans.isCorrect) correctCount++;
    });

    return { checkedCount, correctCount, filledCount };
  }, [problems, answers]);

  const levelOptions: Array<{ value: DifficultyLevel; label: string }> = [
    { value: 'mixed', label: copy.levelAll },
    { value: 1, label: copy.level1 },
    { value: 2, label: copy.level2 },
    { value: 3, label: copy.level3 },
  ];

  const kindOptions: Array<{ value: ProblemKind; label: string }> = [
    { value: 'all', label: copy.typeAll },
    { value: 'array_split', label: copy.typeArray },
    { value: 'area_model', label: copy.typeArea },
    { value: 'step_by_step', label: copy.typeStep },
    { value: 'missing_factor', label: copy.typeMissing },
  ];

  const countOptions: Array<5 | 8 | 10> = [5, 8, 10];

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 text-slate-900">
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        onGenerateNewSet={() => {
          regenerateSet();
          if (activeTab !== 'worksheet' && activeTab !== 'print') {
            setActiveTab('worksheet');
          }
        }}
        copy={copy}
      />

      <main className="flex-1 max-w-6xl w-full mx-auto px-4 sm:px-6 py-8">
        {/* Global Workspace Language Switch Bar */}
        <div className="no-print flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-2.5 text-sm text-slate-600">
            <ResilientImage
              src={AVATAR_ASSETS[profile.avatar]}
              alt={copy.dashboard.avatarNames[profile.avatar]}
              className="w-7 h-7 rounded-md object-cover border border-slate-200"
            />
            <span>
              {copy.studentLabel}:{' '}
              <strong className="text-slate-900">
                {profile.name.trim() || copy.dashboard.guestValue}
              </strong>
            </span>
            {profile.className.trim() && (
              <>
                <span aria-hidden="true">·</span>
                <span>{profile.className}</span>
              </>
            )}
            {activeTab !== 'dashboard' && (
              <>
                <span aria-hidden="true">·</span>
                <button
                  type="button"
                  onClick={() => setActiveTab('dashboard')}
                  className="text-blue-700 hover:underline font-medium cursor-pointer"
                >
                  {copy.editProfileLink}
                </button>
              </>
            )}
          </div>

          <div
            role="group"
            aria-label="Language"
            className="inline-flex items-center p-1 bg-slate-200/70 rounded-lg shrink-0"
          >
            <button
              type="button"
              onClick={() => setLang('en')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'en'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => setLang('id')}
              className={`px-3 py-1 text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer ${
                lang === 'id'
                  ? 'bg-white text-slate-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Bahasa ID
            </button>
          </div>
        </div>

        {activeTab === 'dashboard' && (
          <StudentDashboard
            profile={profile}
            stats={stats}
            history={history}
            copy={copy}
            onSaveProfile={setProfile}
            onStartLevel={handleStartLevelFromDashboard}
            onOpenSandbox={() => setActiveTab('sandbox')}
            onClearHistory={() => setHistory([])}
          />
        )}

        {activeTab === 'worksheet' && (
          <div className="space-y-6">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 tracking-tight text-balance">
                {copy.heroTitle}
              </h1>
              <p className="mt-1.5 text-sm sm:text-base text-slate-600 max-w-2xl">
                {copy.heroSubtitle}
              </p>
            </div>

            {/* Worksheet Generator Controls & Live Score Row */}
            <section
              aria-label="Worksheet Generator Controls"
              className="bg-white border border-slate-200 rounded-xl p-5 space-y-5"
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-end">
                {/* Difficulty Level */}
                <div className="md:col-span-5">
                  <label
                    htmlFor="level-select"
                    className="block text-xs font-semibold text-slate-600 mb-1.5"
                  >
                    {copy.levelLabel}
                  </label>
                  <select
                    id="level-select"
                    value={String(config.level)}
                    onChange={(e) => {
                      const v = e.target.value;
                      handleConfigChange({
                        level: v === 'mixed' ? 'mixed' : (Number(v) as 1 | 2 | 3),
                      });
                    }}
                    className="w-full h-10 px-3 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
                  >
                    {levelOptions.map((opt) => (
                      <option key={String(opt.value)} value={String(opt.value)}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Problem Type */}
                <div className="md:col-span-4">
                  <label
                    htmlFor="type-select"
                    className="block text-xs font-semibold text-slate-600 mb-1.5"
                  >
                    {copy.typeLabel}
                  </label>
                  <select
                    id="type-select"
                    value={config.kind}
                    onChange={(e) =>
                      handleConfigChange({ kind: e.target.value as ProblemKind })
                    }
                    className="w-full h-10 px-3 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-200 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 cursor-pointer"
                  >
                    {kindOptions.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Question Count Segmented Control */}
                <div className="md:col-span-3">
                  <div className="block text-xs font-semibold text-slate-600 mb-1.5">
                    {copy.countLabel}
                  </div>
                  <div className="grid grid-cols-3 gap-1 p-1 bg-slate-100 rounded-lg h-10">
                    {countOptions.map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => handleConfigChange({ count: cnt })}
                        className={`text-xs font-semibold rounded-md transition-colors whitespace-nowrap shrink-0 cursor-pointer tabular-nums ${
                          config.count === cnt
                            ? 'bg-white text-slate-900 shadow-xs'
                            : 'text-slate-600 hover:text-slate-900'
                        }`}
                      >
                        {cnt} {copy.questionsUnit}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Unboxed Inline Stats & Batch Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-wrap items-center gap-2.5 text-sm text-slate-600 tabular-nums">
                  <span>
                    {copy.progressLabel}:{' '}
                    <strong className="text-slate-900">
                      {summary.filledCount}/{problems.length}
                    </strong>
                  </span>
                  <span aria-hidden="true">·</span>
                  <span>
                    {copy.scoreLabel}:{' '}
                    <strong className="text-slate-900">
                      {summary.correctCount}/{problems.length}
                    </strong>
                  </span>
                  {stats.bestAccuracy > 0 && (
                    <>
                      <span aria-hidden="true">·</span>
                      <span>
                        {copy.bestScoreLabel}:{' '}
                        <strong className="text-emerald-700">
                          {stats.bestAccuracy}%
                        </strong>
                      </span>
                    </>
                  )}
                </div>

                <div className="flex flex-wrap items-center gap-2.5">
                  <button
                    type="button"
                    onClick={handleResetAnswers}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 text-sm font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                  >
                    <RotateCcw className="w-4 h-4" aria-hidden="true" />
                    <span>{copy.resetAnswers}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleCheckAll}
                    className="inline-flex items-center gap-1.5 px-4 py-2 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                  >
                    <CheckCheck className="w-4 h-4" aria-hidden="true" />
                    <span>{copy.checkAll}</span>
                  </button>
                </div>
              </div>
            </section>

            {/* Problems List */}
            <div className="space-y-5">
              {problems.map((problem) => (
                <ProblemCard
                  key={problem.id}
                  problem={problem}
                  totalQuestions={problems.length}
                  answer={answers[problem.id] ?? createInitialAnswerState(problem)}
                  copy={copy}
                  onUpdateAnswer={(updated) => handleUpdateAnswer(problem.id, updated)}
                  onCheckProblem={() => handleCheckProblem(problem)}
                />
              ))}
            </div>
          </div>
        )}

        {activeTab === 'sandbox' && <SandboxExplorer copy={copy} />}

        {activeTab === 'print' && (
          <PrintableWorksheet
            problems={problems}
            profile={profile}
            copy={copy}
            onGenerateNewSet={() => regenerateSet()}
          />
        )}

        {activeTab === 'guide' && <ConceptGuide copy={copy} />}
      </main>
    </div>
  );
}
