import { T as TSS_SERVER_FUNCTION, a as getServerFnById, c as createServerFn } from "./index.mjs";
import { o as object, s as string, n as number, b as boolean, a as array, r as record, c as any, _ as _enum } from "../_libs/zod.mjs";
import "node:async_hooks";
import "node:stream";
import "../_libs/react.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
var createSsrRpc = (functionId, importer) => {
  const url = "/_serverFn/" + functionId;
  const serverFnMeta = { id: functionId };
  const fn = async (...args) => {
    return (await getServerFnById(functionId))(...args);
  };
  return Object.assign(fn, {
    url,
    serverFnMeta,
    [TSS_SERVER_FUNCTION]: true
  });
};
const createSectionInputSchema = object({
  data: object({
    courseId: string().min(1),
    description: string().nullish(),
    estimatedDurationInMinutes: number(),
    isPublished: boolean(),
    order: number().nullish(),
    title: string().nullish()
  }),
  userId: string().min(1)
});
const sectionIdInputSchema = string().min(1);
const reorderSectionsInputSchema = object({
  courseId: string().min(1),
  reorderData: array(object({
    itemId: string().min(1),
    newOrder: number(),
    type: string().optional()
  }))
});
const updateSectionInputSchema = object({
  sectionData: object({
    updates: record(string(), any()),
    userId: string().min(1)
  }),
  sectionId: string().min(1)
});
const createLessonInputSchema = object({
  lessonData: object({
    content: record(string(), any()),
    courseId: string().min(1),
    description: string().optional(),
    estimatedDuration: number(),
    isPublished: boolean(),
    isRequired: boolean(),
    order: number(),
    resources: array(any()),
    sectionId: string().min(1),
    title: string().min(1),
    type: _enum(["assignment", "live-session", "reading", "video"])
  }),
  userId: string().min(1).optional()
});
const updateLessonInputSchema = object({
  lessonData: record(string(), any()),
  lessonId: string().min(1)
});
const reorderLessonsInputSchema = object({
  reorderData: array(object({
    itemId: string().min(1),
    newOrder: number()
  })),
  sectionId: string().min(1)
});
const createSectionFn = createServerFn({
  method: "POST"
}).inputValidator(createSectionInputSchema).handler(createSsrRpc("b99ce59255e278e1e7a93f51b707fdbf6314ae2ae1130b25e045d7a61f7410a8"));
const deleteSectionFn = createServerFn({
  method: "POST"
}).inputValidator(sectionIdInputSchema).handler(createSsrRpc("c3bf21f7733247d81222fe67390bc6f0549ab7bbb9a641a0ea99b4b7a1afb3e2"));
const getSectionFn = createServerFn({
  method: "GET"
}).inputValidator((sectionId) => sectionId).handler(createSsrRpc("6096d1362e614aa7341bb887424899ca675fbbc17e92c95043a274abb6a22e91"));
const listSectionsFn = createServerFn({
  method: "GET"
}).inputValidator((courseId) => courseId).handler(createSsrRpc("508c83e2a74b08ca726d1e04e9a81128bbebd9eaefa4cbe1f405542d6ea7879f"));
const reorderSectionsFn = createServerFn({
  method: "POST"
}).inputValidator(reorderSectionsInputSchema).handler(createSsrRpc("301b1daa57f0b7b296af3428e3331fc1d959fc1d1c301ecdca5db6eee1eae36f"));
const updateSectionFn = createServerFn({
  method: "POST"
}).inputValidator(updateSectionInputSchema).handler(createSsrRpc("8c6dc1470d350b209be828b3bb0a8a8398400ba66d6d54b4ef07ac6e573d6f80"));
const createLessonFn = createServerFn({
  method: "POST"
}).inputValidator(createLessonInputSchema).handler(createSsrRpc("bd84d5d872970d7e7a5db4a75f8d6e52d3a62bbd755be85653640dada072d0fc"));
const deleteLessonFn = createServerFn({
  method: "POST"
}).inputValidator(sectionIdInputSchema).handler(createSsrRpc("ab578a44da89decf240a7206108935a573485e22a9c645a0ac1c214e982a69fa"));
const getLessonFn = createServerFn({
  method: "GET"
}).inputValidator((lessonId) => lessonId).handler(createSsrRpc("25251fc969ac01d59b1b88407d4b180e46ccbc7b12fc107930738dc996529fe3"));
const listLessonsFn = createServerFn({
  method: "GET"
}).inputValidator((sectionId) => sectionId).handler(createSsrRpc("f4af36950baad17e1123a8c403c81c4df3664cbb548af2cd82a9ef633ece34e2"));
const listLessonsByCourseFn = createServerFn({
  method: "GET"
}).inputValidator((courseId) => courseId).handler(createSsrRpc("18f2ad16ff260c22e40e249834653f7b42865f2a70574e74022c7dec3ec15d5a"));
const reorderLessonsFn = createServerFn({
  method: "POST"
}).inputValidator(reorderLessonsInputSchema).handler(createSsrRpc("0086d2a2de8fa476bb1d664795efd032b05fdf8bc4fcd1a30f5a470269bd4ee8"));
const updateLessonFn = createServerFn({
  method: "POST"
}).inputValidator(updateLessonInputSchema).handler(createSsrRpc("c2df491a3195b0db5841935865749241c1a5995a0a01ebdb181f40b693ec1e31"));
const courseStructure = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  createLessonFn,
  createSectionFn,
  deleteLessonFn,
  deleteSectionFn,
  getLessonFn,
  getSectionFn,
  listLessonsByCourseFn,
  listLessonsFn,
  listSectionsFn,
  reorderLessonsFn,
  reorderSectionsFn,
  updateLessonFn,
  updateSectionFn
}, Symbol.toStringTag, { value: "Module" }));
export {
  listLessonsFn as a,
  courseStructure as b,
  createSsrRpc as c,
  listSectionsFn as l
};
