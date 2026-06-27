const fs = require("fs");

const emptySourceMap = JSON.stringify({
  version: 3,
  sources: [],
  names: [],
  mappings: "",
});

function isNextSourceMap(file) {
  return (
    typeof file === "string" &&
    file.includes(`${require("path").sep}node_modules${require("path").sep}next${require("path").sep}`) &&
    file.endsWith(".js.map")
  );
}

const originalReadFileSync = fs.readFileSync;
fs.readFileSync = function patchedReadFileSync(file, options) {
  if (isNextSourceMap(file)) {
    if (options === null || options === undefined || options === "utf8" || options?.encoding) {
      return emptySourceMap;
    }
    return Buffer.from(emptySourceMap);
  }

  return originalReadFileSync.apply(this, arguments);
};

const originalReadFile = fs.readFile;
fs.readFile = function patchedReadFile(file, options, callback) {
  if (typeof options === "function") {
    callback = options;
    options = undefined;
  }

  if (isNextSourceMap(file)) {
    queueMicrotask(() => {
      callback(null, options === "utf8" || options?.encoding ? emptySourceMap : Buffer.from(emptySourceMap));
    });
    return;
  }

  return originalReadFile.apply(this, arguments);
};

if (fs.promises?.readFile) {
  const originalPromiseReadFile = fs.promises.readFile;
  fs.promises.readFile = async function patchedPromiseReadFile(file, options) {
    if (isNextSourceMap(file)) {
      return options === "utf8" || options?.encoding ? emptySourceMap : Buffer.from(emptySourceMap);
    }

    return originalPromiseReadFile.apply(this, arguments);
  };
}
