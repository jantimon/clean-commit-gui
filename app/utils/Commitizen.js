/**
 * @file
 * This util helps to extract the projects commitizen settings
 */
import fs from 'mz/fs';
import path from 'path';

export async function resolveCommitizenSettings({ dir, gitDir }) {
  const packageJsonPath = await resolvePackageJson([dir, gitDir]);
  if (!packageJsonPath) {
    throw new Error('Could not resolve package.json');
  }
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath));
  const commitizenConfigPath = packageJson.config && packageJson.config.commitizen &&
    packageJson.config.commitizen.path;
  if (!commitizenConfigPath) {
    throw new Error('Could not find commitizen path configuration');
  }
  const commitizenPath = path.resolve(path.dirname(packageJsonPath), commitizenConfigPath);
  return await extractCommitizenSettings(commitizenPath);
}

const cache = {};
async function extractCommitizenSettings(commitizenPath) {
  if (cache[commitizenPath]) {
    return cache[commitizenPath];
  }
  // Trick webpack to leave the require alone
  const req = 'require';
  const commitizenAdapter = global[req](commitizenPath);

  if (!commitizenAdapter || !commitizenAdapter.prompter) {
    throw new Error(`Could not open commitizen adapter "${commitizenPath}".`);
  }
  // Try to extract the prompt information
  cache[commitizenPath] = new Promise((resolve, reject) => {
    const timeoutTimer = setTimeout(
      () => reject('`Commitizen adapter "${commitizenPath}" timed out.`'), 1500);
    const inquirerMock = { prompt: (config) => {
      clearTimeout(timeoutTimer);
      resolve(config);
    } };
    commitizenAdapter.prompter(inquirerMock, () => {});
  });
  const promptConfig = await cache[commitizenPath];
  return promptConfig;
}

async function resolvePackageJson(directories) {
  for (let i = 0; i < directories.length; i++) {
    const packageJsonPath = path.join(directories[i], 'package.json');
    if (await fs.exists(packageJsonPath)) {
      return packageJsonPath;
    }
  }
  return false;
}
