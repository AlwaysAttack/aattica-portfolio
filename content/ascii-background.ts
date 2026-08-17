export const ASCII_BACKGROUND_ROWS = [
  "aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.....",
  "....aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
  "::::aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
  "----aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
  "++++aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
  "@@@@aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
  "0000aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
  "LLLLaattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
  "iiiiaattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
  "....aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
  "----aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
  "::::aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made.",
] as const satisfies readonly string[];

export type AsciiBackgroundDisplayRow = {
  id: number;
  text: string;
  motionIndex: 1 | 5 | 9 | null;
};

const MOTION_BY_DISPLAY_ROW = new Map<number, 1 | 5 | 9>([
  [8, 1],
  [24, 5],
  [40, 9],
]);

export const ASCII_BACKGROUND_DISPLAY_ROWS = Array.from(
  { length: 48 },
  (_, id): AsciiBackgroundDisplayRow => ({
    id,
    text: ASCII_BACKGROUND_ROWS[id % ASCII_BACKGROUND_ROWS.length],
    motionIndex: MOTION_BY_DISPLAY_ROW.get(id) ?? null,
  }),
);
