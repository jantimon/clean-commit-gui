import NodeGit, { Diff } from 'nodegit';
const modifierNames = [
  'isAdded',
  'isConflicted',
  'isDeleted',
  'isModified',
  'isRenamed',
  'isUntracked'
];

export async function getUnstagedChanges(repository) {
  const diff = await Diff.indexToWorkdir(repository, null, {
    flags: Diff.OPTION.INCLUDE_UNTRACKED |
           Diff.OPTION.RECURSE_UNTRACKED_DIRS
  });
  return getFileInformationFromDiff(diff);
}

export async function getStagedChanges(repository) {
  const head = await repository.getHeadCommit();
  if (!head) {
    return [];
  }
  const diff = await Diff.treeToIndex(repository, await head.getTree(), null);
  return getFileInformationFromDiff(diff);
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

async function getFileInformationFromDiff(diff) {
  const patches = await diff.patches();
  const patchesJson = patches.map((patch, index) => {
    const filename = patch.newFile().path();
    const modifiers = {};
    modifierNames.forEach((modifierName) => {
      if (patch[modifierName]()) {
        modifiers[modifierName] = true;
      }
    });
    return {
      id: filename,
      index,
      size: patch.size(),
      filename,
      modifiers
    };
  });
  return patchesJson;
}
