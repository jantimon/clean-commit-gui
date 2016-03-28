export const WORKING_DIRECTORY_RESOLVING = 'WORKING_DIRECTORY_RESOLVING';
export const WORKING_DIRECTORY_CHANGED = 'WORKING_DIRECTORY_CHANGED';
export const WORKING_DIRECTORY_FAILED = 'WORKING_DIRECTORY_FAILED';
export const STAGED_DIFF_CHANGED = 'STAGED_DIFF_CHANGED';
export const UNSTAGED_DIFF_CHANGED = 'UNSTAGED_DIFF_CHANGED';

import { openRepository, getStagedChanges, getUnstagedChanges } from '../utils/GitClient';

/**
 * Set a new path to a git repostiory or a sub folder of a git repository
 */
export function setWorkingDirectory(workingDirectory) {
  return async (dispatch) => {
    // Dispatch start of asyncronous opening of the repository
    dispatch({ type: WORKING_DIRECTORY_RESOLVING, action: { workingDirectory } });
    let repository;
    try {
      // Try to access the repository and to receive the git informations
      repository = await openRepository(workingDirectory);
      await (setRepository(repository))(dispatch);
    } catch (err) {
      // Incase of an error dispatch a failed event
      dispatch({ type: WORKING_DIRECTORY_FAILED, err });
      return;
    }
    // Dispatch the success event
    dispatch({ type: WORKING_DIRECTORY_CHANGED, repository });
  };
}

/**
 * Set a new nodegit repository
 * @see http://www.nodegit.org/api/repository/
 */
export function setRepository(repository) {
  return async (dispatch) => {
    // Get staged changes and unstaged changes in parallel
    const stagedChangesPromise = getStagedChanges(repository);
    const unstagedChangesPromise = getUnstagedChanges(repository);
    // Dispatch events
    dispatch({ type: STAGED_DIFF_CHANGED, stagedChanges: await stagedChangesPromise });
    dispatch({ type: UNSTAGED_DIFF_CHANGED, unstagedChanges: await unstagedChangesPromise });
  };
}
