const bwPalette = new Uint8Array([
   255, 255, 255,
   0,   0,   0
]);

const gbPalette = new Uint8Array([
  155, 188, 15,
  139, 172, 15,
  48,  98,  48,
  15,  56,  15
]);
const candyPopPalette = new Uint8Array([
  95,  29,  175,
  243, 114, 191,
  254, 239, 138,
  0,   187, 249,
  0,   189, 164,
]);

const warnAutumnGlowPalette = new Uint8Array([
  0,   48,  73,
  214, 40,  40,
  247, 127, 0,
  252, 191, 73,
  234, 226, 183,
])

const ashPallete = new Uint8Array([
  26,  26,  26,
  104, 104, 104,
  255, 59,  48,
]);

const goldenSummerGlowPalette = new Uint8Array([
  13,  59,  102, 1,
  250, 240, 202, 1,
  244, 211, 94,  1,
  238, 150, 75,  1,
  249, 87,  56,  1,
]);


const bwPaletteOpt         = { value: 0, text: 'Black and white', bytes: bwPalette };
const gbPaletteOpt         = { value: 1, text: 'Gameboy',         bytes: gbPalette };
const candyPopPaletteOpt   = { value: 2, text: 'Candy Pop',       bytes: candyPopPalette };
const autumnGlowPaletteOpt = { value: 3, text: 'Autumn Glow',     bytes: warnAutumnGlowPalette };
const ashPalleteOpt        = { value: 4, text: 'Ash',             bytes: ashPallete };
const goldenSummerGlowPaletteOpt = { value: 5, text: 'Golden Summer Glow', bytes: goldenSummerGlowPalette };

export default [
  bwPaletteOpt,
  gbPaletteOpt,
  candyPopPaletteOpt,
  autumnGlowPaletteOpt,
  ashPalleteOpt,
  goldenSummerGlowPaletteOpt,
];
