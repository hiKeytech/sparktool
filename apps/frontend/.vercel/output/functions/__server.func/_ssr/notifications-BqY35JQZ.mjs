import { c as createServerRpc, a as api } from "./api-client-Cl2DaV5u.mjs";
import { c as createServerFn } from "./index.mjs";
import "../_libs/react.mjs";
import { o as object, s as string, b as boolean, n as number, _ as _enum } from "../_libs/zod.mjs";
import "node:async_hooks";
import "node:stream";
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
const createNotificationInputSchema = object({
  category: _enum(["achievement", "message", "reminder", "system"]),
  createdAt: number(),
  fromUserId: string().optional(),
  fromUserName: string().optional(),
  isRead: boolean(),
  message: string().min(1),
  title: string().min(1),
  userId: string().min(1)
});
const createNotificationFn_createServerFn_handler = createServerRpc({
  id: "f1dce1abee6017016792e7d1c7359eb92928e03031b1ba3852799ec827f619be",
  name: "createNotificationFn",
  filename: "src/server/notifications.ts"
}, (opts) => createNotificationFn.__executeServer(opts));
const createNotificationFn = createServerFn({
  method: "POST"
}).inputValidator(createNotificationInputSchema).handler(createNotificationFn_createServerFn_handler, async ({
  data
}) => {
  return api.post("/api/notifications", data);
});
const getUnreadNotificationCountFn_createServerFn_handler = createServerRpc({
  id: "8c946fb62b8beeaae330e97470a4191d06c92cebccc07050b741d8def5e0c7fb",
  name: "getUnreadNotificationCountFn",
  filename: "src/server/notifications.ts"
}, (opts) => getUnreadNotificationCountFn.__executeServer(opts));
const getUnreadNotificationCountFn = createServerFn({
  method: "GET"
}).inputValidator((userId) => userId).handler(getUnreadNotificationCountFn_createServerFn_handler, async ({
  data
}) => {
  return api.get(`/api/notifications/user/${data}/unread-count`);
});
const listNotificationsFn_createServerFn_handler = createServerRpc({
  id: "5f18ea2fce8cb072dacba08e3dcb8783afd127220d20f073e117436ed9706ee5",
  name: "listNotificationsFn",
  filename: "src/server/notifications.ts"
}, (opts) => listNotificationsFn.__executeServer(opts));
const listNotificationsFn = createServerFn({
  method: "GET"
}).inputValidator((userId) => userId).handler(listNotificationsFn_createServerFn_handler, async ({
  data
}) => {
  return api.get(`/api/notifications/user/${data}`);
});
const markAllNotificationsAsReadFn_createServerFn_handler = createServerRpc({
  id: "1b4caa73cabc4a75393732c3f1e809b829db6f6c258f735c90d6905dd7ba1317",
  name: "markAllNotificationsAsReadFn",
  filename: "src/server/notifications.ts"
}, (opts) => markAllNotificationsAsReadFn.__executeServer(opts));
const markAllNotificationsAsReadFn = createServerFn({
  method: "POST"
}).inputValidator((userId) => userId).handler(markAllNotificationsAsReadFn_createServerFn_handler, async ({
  data
}) => {
  return api.post(`/api/notifications/user/${data}/mark-all-read`, {});
});
const markNotificationAsReadFn_createServerFn_handler = createServerRpc({
  id: "485e6fea296ecd8b5e1ae32277510b4e16def8242baf570ab18e35e8312cff6b",
  name: "markNotificationAsReadFn",
  filename: "src/server/notifications.ts"
}, (opts) => markNotificationAsReadFn.__executeServer(opts));
const markNotificationAsReadFn = createServerFn({
  method: "POST"
}).inputValidator((notificationId) => notificationId).handler(markNotificationAsReadFn_createServerFn_handler, async ({
  data
}) => {
  return api.patch(`/api/notifications/${data}/read`, {});
});
export {
  createNotificationFn_createServerFn_handler,
  getUnreadNotificationCountFn_createServerFn_handler,
  listNotificationsFn_createServerFn_handler,
  markAllNotificationsAsReadFn_createServerFn_handler,
  markNotificationAsReadFn_createServerFn_handler
};
