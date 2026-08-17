export const ASCII_BACKGROUND_ROWS = [
  " aattica. // human-made.aattica. // human-made.aattica. // human-made.aattica. // human-made....",
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

export const ASCII_BACKGROUND_ANIMATED_ROWS = [1, 5, 9] as const;

export function isAnimatedAsciiBackgroundRow(index: number) {
  return ASCII_BACKGROUND_ANIMATED_ROWS.some(
    (animatedIndex) => animatedIndex === index,
  );
}
