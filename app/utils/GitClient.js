import { replaceDiff } from '../actions/git';

import NodeGit from 'nodegit';
import { Diff } from 'nodegit';

export default function syncGitWithStore({ store, path }) {
  store.dispatch(replaceDiff([]));
  try {
    const repo = NodeGit.Repository.openExt(path, 0, '');
    return pushDiffIntoStore(repo, store);
  } catch (e) {
    console.log('Failed to open repository ', path, e);
  }
}

async function pushDiffIntoStore(repo, store) {
  const diff = await Diff.indexToWorkdir(await repo, null, {
    flags: Diff.OPTION.INCLUDE_UNTRACKED |
           Diff.OPTION.RECURSE_UNTRACKED_DIRS
  });
  store.dispatch(replaceDiff(await diff.patches()));
}
