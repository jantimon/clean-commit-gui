import { setWorkingDirectory } from '../actions/git';
import chokidar from 'chokidar';
import gitignoreParser from 'gitignore-globs';
import path from 'path';

let watcher;
let timer;

export function watchRepository(repoPath) {
  return (dispatch) => {
    const ignored = gitignoreParser(path.join(repoPath, '.gitignore'));
    ignored.push('**/.git/**');
    stopWatching();
    watcher = chokidar.watch(repoPath, {
      followSymlinks: false,
      ignored
    });
    watcher.on('ready', () => watcher.on('all', () => {
      // Wait at least 25ms for further file changes
      clearTimeout(timer);
      setTimeout(() => {
        dispatch(setWorkingDirectory(repoPath));
      }, 25);
    }));
  };
}

export function stopWatching() {
  if (watcher) {
    watcher.close();
    watcher = null;
  }
}
