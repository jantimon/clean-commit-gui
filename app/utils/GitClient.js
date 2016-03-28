import NodeGit, { Diff } from 'nodegit';

export async function getUnstagedChanges(repo) {
  const diff = await Diff.indexToWorkdir(repo, null, {
    flags: Diff.OPTION.INCLUDE_UNTRACKED |
           Diff.OPTION.RECURSE_UNTRACKED_DIRS
  });
  return await diff.patches();
}

export async function getStagedChanges(repo) {
  const head = await repo.getHeadCommit();
  if (!head) {
    return [];
  }
  const diff = await Diff.treeToIndex(repo, await head.getTree(), null);
  return await diff.patches();
}

export async function openRepository(path) {
  return await NodeGit.Repository.openExt(path, 0, '');
}
