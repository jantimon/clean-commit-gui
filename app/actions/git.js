export const REPLACE_DIFF = 'REPLACE_DIFF';

export function replaceDiff(repository, diff) {
  return {
    type: REPLACE_DIFF,
    repository,
    diff
  };
}
