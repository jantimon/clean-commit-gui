export const WORKING_DIRECTORY_RESOLVING = 'WORKING_DIRECTORY_RESOLVING';
export const WORKING_DIRECTORY_CHANGED = 'WORKING_DIRECTORY_CHANGED';
export const WORKING_DIRECTORY_FAILED = 'WORKING_DIRECTORY_FAILED';
export const STAGED_DIFF_CHANGED = 'STAGED_DIFF_CHANGED';
export const UNSTAGED_DIFF_CHANGED = 'UNSTAGED_DIFF_CHANGED';
export const COMMITIZEN_SETTINGS_CHANGED = 'COMMITIZEN_SETTINGS_CHANGED';

import { stopWatching, watchRepository } from '../utils/repositoryWatcher';
import { openRepository } from '../utils/GitClient';
import { resolveCommitizenSettings } from '../utils/Commitizen';

/**
 * Set a new path to a git repostiory or a sub folder of a git repository
 */
export function setWorkingDirectory(workingDirectory) {
  return async (dispatch) => {
    let repository;
    // Dispatch start of asyncronous opening of the repository
    dispatch({ type: WORKING_DIRECTORY_RESOLVING, action: { workingDirectory } });
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
    // Dispatch commitizen details
    const commitizenSettings = await resolveCommitizenSettings({
      dir: workingDirectory,
      gitDir: repository.workdir()
    });
    dispatch({ type: COMMITIZEN_SETTINGS_CHANGED, commitizenSettings });
  };
}

/**
 * Set a new nodegit repository
 * @see http://www.nodegit.org/api/repository/
 */
export function setRepository(repository) {
  return async (dispatch) => {
    stopWatching();
    // Watch repository and set it on change
    watchRepository(repository, ({ stagedChanges, unstagedChanges }) => {
      dispatch({ type: STAGED_DIFF_CHANGED, stagedChanges });
      dispatch({ type: UNSTAGED_DIFF_CHANGED, unstagedChanges });
    });
  };
}
