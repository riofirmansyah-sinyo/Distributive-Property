export type Language = 'id' | 'en';

export type DifficultyLevel = 1 | 2 | 3 | 'mixed';

export type ProblemKind = 'array_split' | 'area_model' | 'step_by_step' | 'missing_factor' | 'all';

export type ConcreteProblemKind = Exclude<ProblemKind, 'all'>;

export type AvatarId = 'owl' | 'fox' | 'bot';

export interface StudentProfile {
  name: string;
  className: string;
  avatar: AvatarId;
}

export interface WorksheetHistoryItem {
  id: string;
  completedAt: string;
  studentName: string;
  level: DifficultyLevel;
  correct: number;
  total: number;
  accuracy: number;
}

export interface DistributiveProblem {
  id: string;
  index: number;
  level: 1 | 2 | 3;
  kind: ConcreteProblemKind;
  factorA: number;
  totalB: number;
  /** Canonical split parts (2 parts for Level 1 & 2, 2 or 3 parts for Level 3) */
  parts: number[];
  /** Partial products corresponding to parts */
  partialProducts: number[];
  totalProduct: number;
  /** For missing_factor questions */
  missingTarget?: {
    variant: 'missing_part_in_product' | 'missing_part_in_sum' | 'missing_outer_factor';
    expectedValue: number;
  };
}

export interface UserAnswerState {
  /** Student's split parts (for step_by_step or array_split) */
  splitParts: string[];
  /** Student's partial products */
  partialProducts: string[];
  /** Student's final total product (or single missing factor value) */
  finalAnswer: string;
  /** Whether the user has checked this problem */
  checked: boolean;
  /** Whether the answer is fully correct */
  isCorrect: boolean;
  /** Per-section feedback flags */
  errors: {
    split?: boolean;
    partials?: boolean[];
    final?: boolean;
  };
  hintVisible: boolean;
}

export interface WorksheetConfig {
  level: DifficultyLevel;
  kind: ProblemKind;
  count: 5 | 8 | 10;
}

export interface SessionStats {
  completedSets: number;
  bestAccuracy: number;
  totalSolvedCorrectly: number;
}
