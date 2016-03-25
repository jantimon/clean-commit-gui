import { replaceDiff } from '../actions/git';

import NodeGit from 'nodegit';
import { Diff } from 'nodegit';

export default function syncGitWithStore({ store, path }) {
  const repo = NodeGit.Repository.open(path);
  store.dispatch(replaceDiff([]));
  return pushDiffIntoStore(repo, store);
}

async function pushDiffIntoStore(repo, store) {
  const diff = await Diff.indexToWorkdir(await repo, null, {
    flags: Diff.OPTION.INCLUDE_UNTRACKED |
           Diff.OPTION.RECURSE_UNTRACKED_DIRS
  });
  store.dispatch(replaceDiff(await diff.patches()));
}
