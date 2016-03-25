export const REPLACE_DIFF = 'REPLACE_DIFF';

export function replaceDiff(diff) {
  return {
    type: REPLACE_DIFF,
    diff
  };
}
