import { setWorkingDirectory } from '../actions/git';
import fs from 'fs';
import path from 'path';

export function attachDragAndDrop(store) {
  document.addEventListener('dragover', (event) => {
    event.preventDefault();
    return false;
  }, false);

  document.addEventListener('drop', (event) => {
    event.preventDefault();
    const file = event.dataTransfer.files[0];
    if (file) {
      handleDrop(store, file);
    }
    return false;
  }, false);
}

function handleDrop(store, file) {
  fs.lstat(file.path, (err, stats) => {
    if (!err) {
      if (stats.isFile()) {
        return store.dispatch(setWorkingDirectory(path.dirname(file.path)));
      }
      if (stats.isDirectory()) {
        return store.dispatch(setWorkingDirectory(file.path));
      }
    }
  });
}
