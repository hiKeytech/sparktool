function isDictionary(value) {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}
function isFunction(value) {
  return typeof value === "function";
}
function createBranches(register, prefix = []) {
  const entries = Object.entries(register);
  const branches = entries.reduce(
    (acc, [key, value]) => {
      const newPath = prefix.concat([key]);
      if (isFunction(value)) {
        return {
          ...acc,
          [key]: {
            $get: (...args) => [...newPath, ...args],
            $use: (...args) => [...newPath, ...args]
          }
        };
      }
      const root = {
        $get: (...args) => [...newPath, ...args],
        $use: () => newPath
      };
      return {
        ...acc,
        [key]: isDictionary(value) ? Object.assign(root, createBranches(value, newPath)) : root
      };
    },
    {}
  );
  return branches;
}
function createBuilder(register, options) {
  const { prefix = [], separator = "." } = { ...options };
  const branches = createBranches(register, prefix);
  return Object.assign(branches, {
    $get(...path) {
      if (path.length) return path.join(separator);
      return prefix;
    },
    get $use() {
      return register;
    }
  });
}
export {
  createBuilder as c
};
