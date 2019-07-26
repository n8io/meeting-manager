const {
  exists: nativeExists,
  mkdir: nativeMkDir,
  readFile: nativeReadFile,
  writeFile: nativeWriteFile,
} = require("fs");
const util = require("util");

const exists = util.promisify(nativeExists);
const mkDirTemp = util.promisify(nativeMkDir);
const mkDir = async dirPath => {
  const isExisting = await exists(dirPath);

  if (isExisting) return;

  return mkDirTemp(dirPath, { recursive: true });
};
const readFile = util.promisify(nativeReadFile);
const readJson = async filePath => {
  const content = await readFile(filePath);

  return JSON.parse(content.toString());
};
const writeFile = util.promisify(nativeWriteFile);
const writeJson = async (filePath, object) =>
  writeFile(filePath, JSON.stringify(object, null, 2));

module.exports = { exists, mkDir, readFile, readJson, writeFile, writeJson };
