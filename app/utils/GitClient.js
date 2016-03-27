import { replaceDiff } from '../actions/git';

import NodeGit from 'nodegit';
import { Diff } from 'nodegit';

export default async function syncGitWithStore({ store, path }) {
  try {
    const repo = await NodeGit.Repository.openExt(path, 0, '');
    return pushDiffIntoStore(repo, store);
  } catch (e) {
    console.log('Failed to open repository ', path, e);
  }
}

async function getUnstagedChanges(repo) {
  return await Diff.indexToWorkdir(repo, null, {
    flags: Diff.OPTION.INCLUDE_UNTRACKED |
           Diff.OPTION.RECURSE_UNTRACKED_DIRS
  });
}

async function getStagedChnages(repo) {
  const head = await repo.getHeadCommit();
  if (!head) {
    return [];
  }
  return await Diff.treeToIndex(repo, await head.getTree(), null);
}

async function pushDiffIntoStore(repo, store) {
  const unstaged = await getUnstagedChanges(repo);
  const staged = await getStagedChnages(repo);
  store.dispatch(replaceDiff(repo, await staged.patches(), await unstaged.patches()));
}
