import { r as reactExports, j as jsxRuntimeExports } from "./react.mjs";
const DEFAULT_DOMAIN = "meet.jit.si";
var __awaiter = function(thisArg, _arguments, P, generator) {
  function adopt(value) {
    return value instanceof P ? value : new P(function(resolve) {
      resolve(value);
    });
  }
  return new (P || (P = Promise))(function(resolve, reject) {
    function fulfilled(value) {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    }
    function rejected(value) {
      try {
        step(generator["throw"](value));
      } catch (e) {
        reject(e);
      }
    }
    function step(result) {
      result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected);
    }
    step((generator = generator.apply(thisArg, _arguments || [])).next());
  });
};
const loadExternalApi = (domain, release, appId) => __awaiter(void 0, void 0, void 0, function* () {
  return new Promise((resolve, reject) => {
    if (window.JitsiMeetExternalAPI) {
      return resolve(window.JitsiMeetExternalAPI);
    }
    const script = document.createElement("script");
    const releaseParam = release ? `?release=${release}` : "";
    const appIdPath = appId ? `${appId}/` : "";
    script.async = true;
    script.src = `https://${domain}/${appIdPath}external_api.js${releaseParam}`;
    script.onload = () => resolve(window.JitsiMeetExternalAPI);
    script.onerror = () => reject(new Error(`Script load error: ${script.src}`));
    document.head.appendChild(script);
  });
});
let scriptPromise;
const fetchExternalApi = (domain = DEFAULT_DOMAIN, release, appId) => {
  if (scriptPromise) {
    return scriptPromise;
  }
  scriptPromise = loadExternalApi(domain, release, appId);
  return scriptPromise;
};
const getAppId = (roomName) => {
  const roomParts = roomName.split("/");
  if (roomParts.length <= 1) {
    return;
  }
  return roomParts[0];
};
let instancesCounter = 0;
const generateComponentId = (prefix) => `${prefix}-${instancesCounter++}`;
const JitsiMeeting = ({ domain = DEFAULT_DOMAIN, roomName, configOverwrite, interfaceConfigOverwrite, jwt, invitees, devices, userInfo, release, lang, spinner: Spinner, onApiReady, onReadyToClose, getIFrameRef }) => {
  const [loading, setLoading] = reactExports.useState(true);
  const [apiLoaded, setApiLoaded] = reactExports.useState(false);
  const externalApi = reactExports.useRef();
  const apiRef = reactExports.useRef();
  const meetingRef = reactExports.useRef(null);
  const componentId = reactExports.useMemo(() => generateComponentId("jitsiMeeting"), [generateComponentId]);
  reactExports.useEffect(() => {
    fetchExternalApi(domain, release, getAppId(roomName)).then((api) => {
      externalApi.current = api;
      setApiLoaded(true);
    }).catch((e) => console.error(e.message));
  }, []);
  const loadIFrame = reactExports.useCallback((JitsiMeetExternalAPI) => {
    apiRef.current = new JitsiMeetExternalAPI(domain, {
      roomName,
      configOverwrite,
      interfaceConfigOverwrite,
      jwt,
      invitees,
      devices,
      userInfo,
      release,
      lang,
      parentNode: meetingRef.current
    });
    setLoading(false);
    if (apiRef.current) {
      typeof onApiReady === "function" && onApiReady(apiRef.current);
      apiRef.current.on("readyToClose", () => {
        typeof onReadyToClose === "function" && onReadyToClose();
      });
      if (meetingRef.current && typeof getIFrameRef === "function") {
        getIFrameRef(meetingRef.current);
      }
    }
  }, [
    apiRef,
    meetingRef,
    onApiReady,
    onReadyToClose,
    getIFrameRef,
    domain,
    roomName,
    configOverwrite,
    interfaceConfigOverwrite,
    jwt,
    invitees,
    devices,
    userInfo,
    release,
    lang
  ]);
  reactExports.useEffect(() => {
    if (apiLoaded && !apiRef.current) {
      if (externalApi.current) {
        loadIFrame(externalApi.current);
      }
    }
  }, [apiLoaded, loadIFrame]);
  const renderLoadingSpinner = reactExports.useCallback(() => {
    if (!Spinner) {
      return null;
    }
    if (!loading || apiRef.current) {
      return null;
    }
    return jsxRuntimeExports.jsx(Spinner, {}, void 0);
  }, [Spinner, apiRef.current]);
  return jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [renderLoadingSpinner(), jsxRuntimeExports.jsx("div", { id: componentId, ref: meetingRef }, componentId)] }, void 0);
};
(function(s, e) {
  var t = {};
  for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
    t[p] = s[p];
  if (s != null && typeof Object.getOwnPropertySymbols === "function")
    for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
      if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
        t[p[i]] = s[p[i]];
    }
  return t;
});
export {
  JitsiMeeting as J
};
