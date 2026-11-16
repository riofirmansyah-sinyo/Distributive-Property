import React, { useEffect, useState } from 'react';
import { ArrowRight, Check, Trash2, UserCheck } from 'lucide-react';
import {
  AvatarId,
  DifficultyLevel,
  SessionStats,
  StudentProfile,
  WorksheetHistoryItem,
} from '../types/worksheet';
import { CopyDictionary } from '../utils/i18n';
import { ResilientImage } from './ResilientImage';

export const AVATAR_ASSETS: Record<AvatarId, string> = {
  owl: '/src/assets/images/avatar_explorer_owl_1794817774245.jpg',
  fox: '/src/assets/images/avatar_explorer_fox_1794817772634.jpg',
  bot: '/src/assets/images/avatar_explorer_bot_1794817773480.jpg',
};

const HERO_IMAGE_PATH = '/src/assets/images/hero_math_blocks_1794817772158.jpg';
const AREA_CONCEPT_IMAGE_PATH = '/src/assets/images/visual_area_concept_1794817773599.jpg';

interface StudentDashboardProps {
  profile: StudentProfile;
  stats: SessionStats;
  history: WorksheetHistoryItem[];
  copy: CopyDictionary;
  onSaveProfile: (next: StudentProfile) => void;
  onStartLevel: (level: DifficultyLevel) => void;
  onOpenSandbox: () => void;
  onClearHistory: () => void;
}

export function StudentDashboard({
  profile,
  stats,
  history,
  copy,
  onSaveProfile,
  onStartLevel,
  onOpenSandbox,
  onClearHistory,
}: StudentDashboardProps) {
  const [nameInput, setNameInput] = useState(profile.name);
  const [classInput, setClassInput] = useState(profile.className);
  const [selectedAvatar, setSelectedAvatar] = useState<AvatarId>(profile.avatar);
  const [justSaved, setJustSaved] = useState(false);

  useEffect(() => {
    setNameInput(profile.name);
    setClassInput(profile.className);
    setSelectedAvatar(profile.avatar);
  }, [profile]);

  const handleSubmitProfile = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveProfile({
      name: nameInput.trim(),
      className: classInput.trim(),
      avatar: selectedAvatar,
    });
    setJustSaved(true);
    window.setTimeout(() => setJustSaved(false), 2000);
  };

  const handlePickAvatar = (avatar: AvatarId) => {
    setSelectedAvatar(avatar);
    onSaveProfile({
      name: nameInput.trim(),
      className: classInput.trim(),
      avatar,
    });
  };

  const displayName = profile.name.trim();
  const greeting = displayName
    ? copy.dashboard.welcomeNamed.replace('{name}', displayName)
    : copy.dashboard.welcomeGuest;

  const avatarOptions: Array<{ id: AvatarId; label: string }> = [
    { id: 'owl', label: copy.dashboard.avatarNames.owl },
    { id: 'fox', label: copy.dashboard.avatarNames.fox },
    { id: 'bot', label: copy.dashboard.avatarNames.bot },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Split: Student Check-In & Classroom Visual */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Left: Greeting + Student Name Form */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 sm:p-8 flex flex-col justify-between space-y-6">
          <div>
            <h1 className="text-2xl sm:text-4xl font-bold text-slate-900 tracking-tight text-balance">
              {greeting}
            </h1>
            <p className="mt-2.5 text-sm sm:text-base text-slate-600 max-w-xl leading-relaxed">
              {copy.dashboard.heroDesc}
            </p>
          </div>

          <form onSubmit={handleSubmitProfile} className="space-y-5 pt-4 border-t border-slate-100">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
              <div className="sm:col-span-7">
                <label
                  htmlFor="student-name-input"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  {copy.dashboard.nameLabel}
                </label>
                <input
                  id="student-name-input"
                  type="text"
                  maxLength={50}
                  value={nameInput}
                  onChange={(e) => setNameInput(e.target.value)}
                  placeholder={copy.dashboard.namePlaceholder}
                  className="w-full h-11 px-3.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus:bg-white transition-colors"
                />
              </div>

              <div className="sm:col-span-5">
                <label
                  htmlFor="student-class-input"
                  className="block text-xs font-semibold text-slate-700 mb-1.5"
                >
                  {copy.dashboard.classInputLabel}
                </label>
                <input
                  id="student-class-input"
                  type="text"
                  maxLength={24}
                  value={classInput}
                  onChange={(e) => setClassInput(e.target.value)}
                  placeholder={copy.dashboard.classPlaceholder}
                  className="w-full h-11 px-3.5 text-sm font-medium text-slate-900 bg-slate-50 border border-slate-300 rounded-lg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus:bg-white transition-colors"
                />
              </div>
            </div>

            {/* Avatar Selector */}
            <div>
              <div className="text-xs font-semibold text-slate-700 mb-2">
                {copy.dashboard.avatarLabel}
              </div>
              <div className="grid grid-cols-3 gap-3">
                {avatarOptions.map((item) => {
                  const active = selectedAvatar === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => handlePickAvatar(item.id)}
                      className={`flex items-center gap-2.5 p-2 rounded-lg border text-left transition-colors duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 ${
                        active
                          ? 'border-blue-700 bg-blue-50/70 text-slate-900'
                          : 'border-slate-200 bg-white hover:bg-slate-50 text-slate-700'
                      }`}
                    >
                      <ResilientImage
                        src={AVATAR_ASSETS[item.id]}
                        alt={item.label}
                        className="w-10 h-10 rounded-md object-cover shrink-0"
                      />
                      <span className="text-xs font-semibold truncate">
                        {item.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="submit"
                  className="inline-flex items-center gap-2 px-4 py-2.5 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
                >
                  {justSaved ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-700" aria-hidden="true" />
                      <span className="text-emerald-800">{copy.dashboard.savedFeedback}</span>
                    </>
                  ) : (
                    <>
                      <UserCheck className="w-4 h-4" aria-hidden="true" />
                      <span>{copy.dashboard.saveProfileBtn}</span>
                    </>
                  )}
                </button>

                <button
                  type="button"
                  onClick={() => {
                    onSaveProfile({
                      name: nameInput.trim(),
                      className: classInput.trim(),
                      avatar: selectedAvatar,
                    });
                    onStartLevel('mixed');
                  }}
                  className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600 focus-visible:ring-offset-2"
                >
                  <span>{copy.dashboard.startPracticeBtn}</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </button>
              </div>
            </div>
          </form>
        </div>

        {/* Right: Hero Tactile Math Blocks Illustration */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-3 flex flex-col">
          <div className="relative flex-1 min-h-56 overflow-hidden rounded-lg">
            <ResilientImage
              src={HERO_IMAGE_PATH}
              alt="Geometric math blocks and area grid tiles on a classroom desk"
              className="w-full h-full lg:h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* 4-Column KPI Strip Below Hero */}
      <section
        aria-label="Student Progress Summary"
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        <div className="bg-white border border-slate-200 rounded-xl p-5 flex items-center gap-3.5">
          <ResilientImage
            src={AVATAR_ASSETS[profile.avatar]}
            alt={copy.dashboard.avatarNames[profile.avatar]}
            className="w-12 h-12 rounded-lg object-cover shrink-0 border border-slate-200"
          />
          <div className="min-w-0">
            <div className="text-xs font-medium text-slate-500">
              {copy.dashboard.kpiActiveStudent}
            </div>
            <div className="text-base font-bold text-slate-900 truncate mt-0.5">
              {displayName || copy.dashboard.guestValue}
            </div>
            {profile.className.trim() && (
              <div className="text-xs text-slate-500 truncate">
                {profile.className}
              </div>
            )}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-center">
          <div className="text-xs font-medium text-slate-500">
            {copy.dashboard.kpiCompletedSets}
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            {stats.completedSets}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-center">
          <div className="text-xs font-medium text-slate-500">
            {copy.dashboard.kpiProblemsSolved}
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-slate-900 mt-1">
            {stats.totalSolvedCorrectly}
          </div>
        </div>

        <div className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-center">
          <div className="text-xs font-medium text-slate-500">
            {copy.dashboard.kpiBestAccuracy}
          </div>
          <div className="text-2xl font-bold font-mono tabular-nums text-emerald-700 mt-1">
            {stats.bestAccuracy}%
          </div>
        </div>
      </section>

      {/* Quick-Launch Practice Levels */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-slate-900 tracking-tight">
            {copy.dashboard.quickLaunchTitle}
          </h2>
          <p className="text-sm text-slate-600 mt-1">
            {copy.dashboard.quickLaunchSubtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {copy.dashboard.launchCards.map((card) => (
            <div
              key={String(card.level)}
              className="bg-white border border-slate-200 rounded-xl p-5 flex flex-col justify-between space-y-5"
            >
              <div className="space-y-2.5">
                <h3 className="text-base font-bold text-slate-900">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed">
                  {card.desc}
                </p>
                <div className="pt-2 font-mono tabular-nums text-xs font-semibold text-blue-700">
                  {card.sample}
                </div>
              </div>

              <button
                type="button"
                onClick={() => onStartLevel(card.level)}
                className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 text-sm font-semibold text-slate-900 bg-slate-100 hover:bg-blue-700 hover:text-white rounded-lg transition-colors duration-150 whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
              >
                <span>{card.cta}</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Concept Visual Spotlight + Recent Results */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Visual Spotlight */}
        <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            <div className="overflow-hidden rounded-lg border border-slate-200 bg-slate-50 aspect-[4/3]">
              <ResilientImage
                src={AREA_CONCEPT_IMAGE_PATH}
                alt="Area model diagram splitting a rectangle into blue and amber sections"
                className="w-full h-full object-cover"
              />
            </div>
            <h2 className="text-lg font-bold text-slate-900 pt-1">
              {copy.dashboard.spotlightTitle}
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              {copy.dashboard.spotlightDesc}
            </p>
          </div>

          <button
            type="button"
            onClick={onOpenSandbox}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 text-sm font-semibold text-blue-700 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors whitespace-nowrap cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-600"
          >
            <span>{copy.dashboard.spotlightBtn}</span>
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </button>
        </div>

        {/* Recent Practice Results Table */}
        <div className="lg:col-span-7 bg-white border border-slate-200 rounded-xl p-6 flex flex-col">
          <div className="flex items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <h2 className="text-lg font-bold text-slate-900">
              {copy.dashboard.historyTitle}
            </h2>
            {history.length > 0 && (
              <button
                type="button"
                onClick={onClearHistory}
                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-medium text-slate-500 hover:text-red-700 hover:bg-red-50 rounded-md transition-colors cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" aria-hidden="true" />
                <span>{copy.dashboard.clearHistoryBtn}</span>
              </button>
            )}
          </div>

          {history.length === 0 ? (
            <div className="flex-1 flex items-center justify-center py-12 text-center text-sm text-slate-500">
              {copy.dashboard.historyEmpty}
            </div>
          ) : (
            <div className="overflow-x-auto mt-2">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold text-slate-500">
                    <th className="py-2.5 pr-3">{copy.dashboard.colDate}</th>
                    <th className="py-2.5 pr-3">{copy.dashboard.colStudent}</th>
                    <th className="py-2.5 pr-3">{copy.dashboard.colLevel}</th>
                    <th className="py-2.5 pr-3 text-right">{copy.dashboard.colScore}</th>
                    <th className="py-2.5 text-right">{copy.dashboard.colAccuracy}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 tabular-nums">
                  {history.map((row) => (
                    <tr key={row.id} className="text-slate-700">
                      <td className="py-3 pr-3 text-xs text-slate-500 whitespace-nowrap">
                        {row.completedAt}
                      </td>
                      <td className="py-3 pr-3 font-medium text-slate-900">
                        {row.studentName || copy.dashboard.guestValue}
                      </td>
                      <td className="py-3 pr-3 whitespace-nowrap">
                        {row.level === 'mixed'
                          ? copy.levelAll
                          : `${copy.levelShort} ${row.level}`}
                      </td>
                      <td className="py-3 pr-3 text-right font-mono font-semibold text-slate-900">
                        {row.correct}/{row.total}
                      </td>
                      <td
                        className={`py-3 text-right font-mono font-bold ${
                          row.accuracy >= 80
                            ? 'text-emerald-700'
                            : row.accuracy >= 50
                            ? 'text-amber-700'
                            : 'text-red-700'
                        }`}
                      >
                        {row.accuracy}%
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
