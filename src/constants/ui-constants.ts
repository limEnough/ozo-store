// #region colors
const COLORS = {
  BLACK: 'black',
  WHITE: 'white',
  GREY: 'grey',
  BLUE: 'blue',
  RED: 'red',
};

type Colors = (typeof COLORS)[keyof typeof COLORS];
// #endregion

// #region sizes
const SIZES = {
  XS: 'xs',
  S: 's',
  M: 'm',
  L: 'l',
  XL: 'xl',
} as const;

type Sizes = (typeof SIZES)[keyof typeof SIZES];
// #endregion

// #region fonts
type FontWeights = '200' | '400' | '600' | '800' | '900';
// #endregion

// #region input states
const INPUT_STATES = {
  FAIL: 'fail',
  SUCCESS: 'success',
} as const;

type InputStates = '' | (typeof INPUT_STATES)[keyof typeof INPUT_STATES];
// #endregion

export { COLORS, SIZES, INPUT_STATES };

export type { Colors, Sizes, FontWeights, InputStates };
