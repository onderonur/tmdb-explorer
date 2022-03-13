export const queryParser = {
  string: (val: unknown) => (typeof val === 'string' && val ? val : undefined),
  number: (val: unknown) => (Number(val) ? Number(val) : undefined),
};
