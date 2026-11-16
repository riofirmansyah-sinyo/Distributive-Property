import {
  ConcreteProblemKind,
  DifficultyLevel,
  DistributiveProblem,
  ProblemKind,
  UserAnswerState,
} from '../types/worksheet';

function randInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function pickRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function createId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function pickConcreteKind(kind: ProblemKind, level: 1 | 2 | 3): ConcreteProblemKind {
  if (kind !== 'all') {
    // Array split grids work best up to 16 columns (Level 1 or small Level 2)
    if (kind === 'array_split' && level === 3) {
      return 'area_model';
    }
    return kind;
  }
  if (level === 1) {
    return pickRandom(['array_split', 'area_model', 'step_by_step', 'missing_factor']);
  }
  if (level === 2) {
    return pickRandom(['area_model', 'step_by_step', 'missing_factor']);
  }
  return pickRandom(['area_model', 'step_by_step', 'missing_factor']);
}

function generateFactors(level: 1 | 2 | 3, kind: ConcreteProblemKind): { factorA: number; parts: number[] } {
  if (level === 1) {
    // Grade 4 basic facts & teen numbers (e.g., 6 × 7, 7 × 8, 4 × 12, 6 × 14)
    const factorA = randInt(3, 9);
    if (kind === 'array_split') {
      // Total width 6..14 so tiles fit crisply on mobile and desktop
      const totalB = randInt(6, 14);
      const splitA = totalB >= 10 ? 10 : Math.min(5, totalB - 2);
      const splitB = totalB - splitA;
      return { factorA, parts: [splitA, splitB] };
    }
    const useTeen = Math.random() > 0.45;
    if (useTeen) {
      const ones = randInt(2, 8);
      return { factorA, parts: [10, ones] };
    }
    const totalB = randInt(6, 9);
    const part1 = 5;
    const part2 = totalB - 5;
    return { factorA, parts: [part1, part2] };
  }

  if (level === 2) {
    // 2-digit × 1-digit: 12..89 × 3..9
    const factorA = randInt(3, 9);
    if (kind === 'array_split') {
      const ones = randInt(2, 6);
      return { factorA, parts: [10, ones] };
    }
    const tens = randInt(2, 8) * 10;
    const ones = randInt(2, 9);
    return { factorA, parts: [tens, ones] };
  }

  // Level 3: 3-digit × 1-digit (hundreds + tens + ones)
  const factorA = randInt(2, 7);
  const hundreds = randInt(1, 3) * 100;
  const tens = randInt(2, 6) * 10;
  const ones = randInt(2, 9);
  return { factorA, parts: [hundreds, tens, ones] };
}

export function generateWorksheetProblems(
  level: DifficultyLevel,
  kind: ProblemKind,
  count: 5 | 8 | 10
): DistributiveProblem[] {
  const problems: DistributiveProblem[] = [];
  const usedSignatures = new Set<string>();
  let safety = 0;

  while (problems.length < count && safety < 250) {
    safety++;
    const resolvedLevel: 1 | 2 | 3 =
      level === 'mixed' ? pickRandom([1, 2, 3]) : level;
    const resolvedKind = pickConcreteKind(kind, resolvedLevel);
    const { factorA, parts } = generateFactors(resolvedLevel, resolvedKind);
    const totalB = parts.reduce((sum, n) => sum + n, 0);
    const signature = `${resolvedKind}-${factorA}x${totalB}`;

    if (usedSignatures.has(signature)) continue;
    usedSignatures.add(signature);

    const partialProducts = parts.map((p) => factorA * p);
    const totalProduct = factorA * totalB;

    let missingTarget: DistributiveProblem['missingTarget'];
    if (resolvedKind === 'missing_factor') {
      const variants: Array<'missing_part_in_product' | 'missing_part_in_sum' | 'missing_outer_factor'> = [
        'missing_part_in_product',
        'missing_part_in_sum',
        'missing_outer_factor',
      ];
      const variant = pickRandom(variants);
      const expectedValue =
        variant === 'missing_outer_factor'
          ? factorA
          : variant === 'missing_part_in_product'
          ? parts[0]
          : parts[parts.length - 1];
      missingTarget = { variant, expectedValue };
    }

    problems.push({
      id: createId(),
      index: problems.length + 1,
      level: resolvedLevel,
      kind: resolvedKind,
      factorA,
      totalB,
      parts,
      partialProducts,
      totalProduct,
      missingTarget,
    });
  }

  return problems;
}

export function createInitialAnswerState(problem: DistributiveProblem): UserAnswerState {
  return {
    splitParts:
      problem.kind === 'array_split'
        ? problem.parts.map(String)
        : problem.parts.map(() => ''),
    partialProducts: problem.parts.map(() => ''),
    finalAnswer: '',
    checked: false,
    isCorrect: false,
    errors: {},
    hintVisible: false,
  };
}

export function validateProblemAnswer(
  problem: DistributiveProblem,
  answer: UserAnswerState
): UserAnswerState {
  if (problem.kind === 'missing_factor' && problem.missingTarget) {
    const val = Number(answer.finalAnswer.trim());
    const valid = answer.finalAnswer.trim() !== '' && Number.isFinite(val) && val === problem.missingTarget.expectedValue;
    return {
      ...answer,
      checked: true,
      isCorrect: valid,
      errors: {
        final: !valid,
      },
    };
  }

  if (problem.kind === 'step_by_step') {
    const parsedParts = answer.splitParts.map((s) => Number(s.trim()));
    const allPartsValidNums =
      answer.splitParts.every((s) => s.trim() !== '') &&
      parsedParts.every((n) => Number.isInteger(n) && n > 0);
    const splitSumCorrect =
      allPartsValidNums && parsedParts.reduce((a, b) => a + b, 0) === problem.totalB;

    const parsedPartials = answer.partialProducts.map((s) => Number(s.trim()));
    const partialErrors = parsedPartials.map((val, idx) => {
      if (answer.partialProducts[idx].trim() === '' || !Number.isFinite(val)) return true;
      const expectedPart = splitSumCorrect ? parsedParts[idx] : problem.parts[idx];
      return val !== problem.factorA * expectedPart;
    });

    const finalVal = Number(answer.finalAnswer.trim());
    const finalError =
      answer.finalAnswer.trim() === '' ||
      !Number.isFinite(finalVal) ||
      finalVal !== problem.totalProduct;

    const isCorrect =
      splitSumCorrect && partialErrors.every((e) => !e) && !finalError;

    return {
      ...answer,
      checked: true,
      isCorrect,
      errors: {
        split: !splitSumCorrect,
        partials: partialErrors,
        final: finalError,
      },
    };
  }

  // array_split or area_model: parts are given (or controlled by the interactive array split)
  const activeParts =
    problem.kind === 'array_split'
      ? answer.splitParts.map((s, idx) => {
          const n = Number(s);
          return Number.isInteger(n) && n > 0 ? n : problem.parts[idx];
        })
      : problem.parts;

  const parsedPartials = answer.partialProducts.map((s) => Number(s.trim()));
  const partialErrors = parsedPartials.map((val, idx) => {
    if (answer.partialProducts[idx].trim() === '' || !Number.isFinite(val)) return true;
    return val !== problem.factorA * activeParts[idx];
  });

  const finalVal = Number(answer.finalAnswer.trim());
  const finalError =
    answer.finalAnswer.trim() === '' ||
    !Number.isFinite(finalVal) ||
    finalVal !== problem.totalProduct;

  const isCorrect = partialErrors.every((e) => !e) && !finalError;

  return {
    ...answer,
    checked: true,
    isCorrect,
    errors: {
      partials: partialErrors,
      final: finalError,
    },
  };
}
