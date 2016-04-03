/**
 * @file
 * This utils allows to watch the repository for changes
 */

import { getWorkingDirectoryDiff } from './GitClient';

const gitPollIntervalDuringFocus = 5000;
const gitPollIntervalDuringBlur = 15000;
const watchedRepositories = {};
const watchers = [];
let timer = setInterval(executeWatchers, gitPollIntervalDuringFocus);

export function watchRepository(repository, callback) {
  const repositoryPath = repository.path();
  if (watchedRepositories[repositoryPath]) {
    return;
  }
  watchedRepositories[repositoryPath] = true;
  /**
   * The watcher function which will execute the callback if the repository changed
   * If force is set to true it will execute the callback even without changes
   */
  const watchTask = (force) => {
    // Stop watching if the repository is not watched anymore
    if (!watchedRepositories[repositoryPath]) {
      return clearInterval(timer);
    }
    getWorkingDirectoryDiff(repository).then(({ stagedChanges, unstagedChanges }) => {
      const fingerprint = [
        stagedChanges.map((change) => change.size).join('-'),
        unstagedChanges.map((change) => change.size).join('-')
      ].join('##');
      if (force || fingerprint !== watchedRepositories[repositoryPath]) {
        watchedRepositories[repositoryPath] = fingerprint;
        callback({ stagedChanges, unstagedChanges, fingerprint });
      }
    });
  };
  watchTask(true);
  watchers.push(watchTask);
}

/**
 * Clears all repositories from the watch list
 */
export function stopWatching() {
  // Reset all repositories
  Object.keys(watchedRepositories)
    .forEach((repoPath) => delete watchedRepositories[repoPath]);
  watchers.splice(0, watchers.length);
}

/**
 * Execute all callbacks if the repository changed
 */
export function executeWatchers(force) {
  watchers.forEach((watcher) => watcher(force));
}

// Pause polling while window is not focused
document.body.addEventListener('electron-blur', () => {
  clearInterval(timer);
  timer = setInterval(executeWatchers, gitPollIntervalDuringBlur);
});

document.body.addEventListener('electron-focus', () => {
  executeWatchers(true);
  clearInterval(timer);
  timer = setInterval(executeWatchers, gitPollIntervalDuringFocus);
});
