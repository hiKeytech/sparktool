import { r as reactExports, j as jsxRuntimeExports } from "./react.mjs";
import { B as Box, G as Group, a as Button, c as createUseExternalEvents, M as Modal, g as getDefaultZIndex } from "./mantine__core.mjs";
import { s as randomId } from "./mantine__hooks.mjs";
const ModalsContext = reactExports.createContext(null);
ModalsContext.displayName = "@mantine/modals/ModalsContext";
function useModals() {
  const ctx = reactExports.useContext(ModalsContext);
  if (!ctx) {
    throw new Error(
      "[@mantine/modals] useModals hook was called outside of context, wrap your app with ModalsProvider component"
    );
  }
  return ctx;
}
function ConfirmModal({
  id,
  cancelProps,
  confirmProps,
  labels = { cancel: "", confirm: "" },
  closeOnConfirm = true,
  closeOnCancel = true,
  groupProps,
  onCancel,
  onConfirm,
  children
}) {
  const { cancel: cancelLabel, confirm: confirmLabel } = labels;
  const ctx = useModals();
  const handleCancel = (event) => {
    typeof cancelProps?.onClick === "function" && cancelProps?.onClick(event);
    typeof onCancel === "function" && onCancel();
    closeOnCancel && ctx.closeModal(id);
  };
  const handleConfirm = (event) => {
    typeof confirmProps?.onClick === "function" && confirmProps?.onClick(event);
    typeof onConfirm === "function" && onConfirm();
    closeOnConfirm && ctx.closeModal(id);
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(jsxRuntimeExports.Fragment, { children: [
    children && /* @__PURE__ */ jsxRuntimeExports.jsx(Box, { mb: "md", children }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { mt: children ? 0 : "md", justify: "flex-end", ...groupProps, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { variant: "default", ...cancelProps, onClick: handleCancel, children: cancelProps?.children || cancelLabel }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { ...confirmProps, onClick: handleConfirm, children: confirmProps?.children || confirmLabel })
    ] })
  ] });
}
const [useModalsEvents, createEvent] = createUseExternalEvents("mantine-modals");
const openModal = (payload) => {
  const id = payload.modalId || randomId();
  createEvent("openModal")({ ...payload, modalId: id });
  return id;
};
const openConfirmModal = (payload) => {
  const id = payload.modalId || randomId();
  createEvent("openConfirmModal")({ ...payload, modalId: id });
  return id;
};
const openContextModal = (payload) => {
  const id = payload.modalId || randomId();
  createEvent("openContextModal")({ ...payload, modalId: id });
  return id;
};
const closeModal = createEvent("closeModal");
const closeAllModals = createEvent("closeAllModals");
const updateModal = (payload) => createEvent("updateModal")(payload);
const updateContextModal = (payload) => createEvent("updateContextModal")(payload);
const modals = {
  open: openModal,
  close: closeModal,
  closeAll: closeAllModals,
  openConfirmModal,
  openContextModal,
  updateModal,
  updateContextModal
};
function handleCloseModal(modal, canceled) {
  if (canceled && modal.type === "confirm") {
    modal.props.onCancel?.();
  }
  modal.props.onClose?.();
}
function modalsReducer(state, action) {
  switch (action.type) {
    case "OPEN": {
      return {
        current: action.modal,
        modals: [...state.modals, action.modal]
      };
    }
    case "CLOSE": {
      const modal = state.modals.find((m) => m.id === action.modalId);
      if (!modal) {
        return state;
      }
      const remainingModals = state.modals.filter((m) => m.id !== action.modalId);
      return {
        current: remainingModals[remainingModals.length - 1] || state.current,
        modals: remainingModals
      };
    }
    case "CLOSE_ALL": {
      if (!state.modals.length) {
        return state;
      }
      return {
        current: state.current,
        modals: []
      };
    }
    case "UPDATE": {
      const { modalId, newProps } = action;
      const updatedModals = state.modals.map((modal) => {
        if (modal.id !== modalId) {
          return modal;
        }
        if (modal.type === "content" || modal.type === "confirm") {
          return {
            ...modal,
            props: {
              ...modal.props,
              ...newProps
            }
          };
        }
        if (modal.type === "context") {
          return {
            ...modal,
            props: {
              ...modal.props,
              ...newProps,
              innerProps: {
                ...modal.props.innerProps,
                ...newProps.innerProps
              }
            }
          };
        }
        return modal;
      });
      const currentModal = state.current?.id === modalId ? updatedModals.find((modal) => modal.id === modalId) || state.current : state.current;
      return {
        ...state,
        modals: updatedModals,
        current: currentModal
      };
    }
    default: {
      return state;
    }
  }
}
function separateConfirmModalProps(props) {
  if (!props) {
    return { confirmProps: {}, modalProps: {} };
  }
  const {
    id,
    children,
    onCancel,
    onConfirm,
    closeOnConfirm,
    closeOnCancel,
    cancelProps,
    confirmProps,
    groupProps,
    labels,
    ...others
  } = props;
  return {
    confirmProps: {
      id,
      children,
      onCancel,
      onConfirm,
      closeOnConfirm,
      closeOnCancel,
      cancelProps,
      confirmProps,
      groupProps,
      labels
    },
    modalProps: {
      id,
      ...others
    }
  };
}
function ModalsProvider({ children, modalProps, labels, modals: modals2 }) {
  const [state, dispatch] = reactExports.useReducer(modalsReducer, { modals: [], current: null });
  const stateRef = reactExports.useRef(state);
  stateRef.current = state;
  const closeAll = reactExports.useCallback(
    (canceled) => {
      stateRef.current.modals.concat().reverse().forEach((modal) => {
        handleCloseModal(modal, canceled);
      });
      dispatch({ type: "CLOSE_ALL", canceled });
    },
    [stateRef, dispatch]
  );
  const openModal2 = reactExports.useCallback(
    ({ modalId, ...props }) => {
      const id = modalId || randomId();
      dispatch({
        type: "OPEN",
        modal: {
          id,
          type: "content",
          props
        }
      });
      return id;
    },
    [dispatch]
  );
  const openConfirmModal2 = reactExports.useCallback(
    ({ modalId, ...props }) => {
      const id = modalId || randomId();
      dispatch({
        type: "OPEN",
        modal: {
          id,
          type: "confirm",
          props
        }
      });
      return id;
    },
    [dispatch]
  );
  const openContextModal2 = reactExports.useCallback(
    (modal, { modalId, ...props }) => {
      const id = modalId || randomId();
      dispatch({
        type: "OPEN",
        modal: {
          id,
          type: "context",
          props,
          ctx: modal
        }
      });
      return id;
    },
    [dispatch]
  );
  const closeModal2 = reactExports.useCallback(
    (id, canceled) => {
      const modal = stateRef.current.modals.find((m) => m.id === id);
      if (modal) {
        handleCloseModal(modal, canceled);
      }
      dispatch({ type: "CLOSE", modalId: id, canceled });
    },
    [stateRef, dispatch]
  );
  const updateModal2 = reactExports.useCallback(
    ({ modalId, ...newProps }) => {
      dispatch({
        type: "UPDATE",
        modalId,
        newProps
      });
    },
    [dispatch]
  );
  const updateContextModal2 = reactExports.useCallback(
    ({ modalId, ...newProps }) => {
      dispatch({ type: "UPDATE", modalId, newProps });
    },
    [dispatch]
  );
  useModalsEvents({
    openModal: openModal2,
    openConfirmModal: openConfirmModal2,
    openContextModal: ({ modal, ...payload }) => openContextModal2(modal, payload),
    closeModal: closeModal2,
    closeContextModal: closeModal2,
    closeAllModals: closeAll,
    updateModal: updateModal2,
    updateContextModal: updateContextModal2
  });
  const ctx = {
    modalProps: modalProps || {},
    modals: state.modals,
    openModal: openModal2,
    openConfirmModal: openConfirmModal2,
    openContextModal: openContextModal2,
    closeModal: closeModal2,
    closeContextModal: closeModal2,
    closeAll,
    updateModal: updateModal2,
    updateContextModal: updateContextModal2
  };
  const getCurrentModal = () => {
    const currentModal = stateRef.current.current;
    switch (currentModal?.type) {
      case "context": {
        const { innerProps, ...rest } = currentModal.props;
        const ContextModal = modals2[currentModal.ctx];
        return {
          modalProps: rest,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(ContextModal, { innerProps, context: ctx, id: currentModal.id })
        };
      }
      case "confirm": {
        const { modalProps: separatedModalProps, confirmProps: separatedConfirmProps } = separateConfirmModalProps(currentModal.props);
        return {
          modalProps: separatedModalProps,
          content: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ConfirmModal,
            {
              ...separatedConfirmProps,
              id: currentModal.id,
              labels: currentModal.props.labels || labels
            }
          )
        };
      }
      case "content": {
        const { children: currentModalChildren, ...rest } = currentModal.props;
        return {
          modalProps: rest,
          content: currentModalChildren
        };
      }
      default: {
        return {
          modalProps: {},
          content: null
        };
      }
    }
  };
  const { modalProps: currentModalProps, content } = getCurrentModal();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(ModalsContext.Provider, { value: ctx, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Modal,
      {
        zIndex: getDefaultZIndex("modal") + 1,
        ...modalProps,
        ...currentModalProps,
        opened: state.modals.length > 0,
        onClose: () => closeModal2(state.current?.id),
        children: content
      }
    ),
    children
  ] });
}
export {
  ModalsProvider as M,
  modals as m
};
