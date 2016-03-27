export const REPLACE_DIFF = 'REPLACE_DIFF';

export function replaceDiff(repository, staged, unstaged) {
  return {
    type: REPLACE_DIFF,
    repository,
    staged,
    unstaged
  };
}
