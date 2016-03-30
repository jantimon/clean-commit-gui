import NodeGit, { Diff } from 'nodegit';

export async function getUnstagedChanges(repository) {
  const diff = await Diff.indexToWorkdir(repository, null, {
    flags: Diff.OPTION.INCLUDE_UNTRACKED |
           Diff.OPTION.RECURSE_UNTRACKED_DIRS
  });
  return await diff.patches();
}

export async function getStagedChanges(repository) {
  const head = await repository.getHeadCommit();
  if (!head) {
    return [];
  }
  const diff = await Diff.treeToIndex(repository, await head.getTree(), null);
  return await diff.patches();
}

export async function getWorkingDirectoryDiff(repository) {
  // Get both values asyncronous
  const stagedChangesPromise = getStagedChanges(repository);
  const unstagedChangesPromise = getUnstagedChanges(repository);
  // Wait for both values
  const stagedChanges = await stagedChangesPromise;
  const unstagedChanges = await unstagedChangesPromise;
  return { stagedChanges, unstagedChanges };
}

export async function openRepository(path) {
  return await NodeGit.Repository.openExt(path, 0, '');
}
