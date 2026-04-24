import { p as parse, $ as $ZodError } from "./zod.mjs";
function zod4Resolver(schema, options) {
  return (values) => {
    try {
      parse(schema, values);
      return {};
    } catch (error) {
      if (error instanceof $ZodError) {
        const results = {};
        error.issues.forEach((issue) => {
          results[issue.path.join(".")] = issue.message;
        });
        return results;
      }
      throw error;
    }
  };
}
export {
  zod4Resolver as z
};
