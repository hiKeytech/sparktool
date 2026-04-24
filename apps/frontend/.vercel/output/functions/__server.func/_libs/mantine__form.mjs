import { r as reactExports } from "./react.mjs";
import { k as klona } from "./klona.mjs";
import { i as isEqual } from "./fast-deep-equal.mjs";
function validateFormName(name) {
  if (!/^[0-9a-zA-Z-]+$/.test(name)) {
    throw new Error(
      `[@mantine/use-form] Form name "${name}" is invalid, it should contain only letters, numbers and dashes`
    );
  }
}
const useIsomorphicEffect = typeof window !== "undefined" ? reactExports.useLayoutEffect : reactExports.useEffect;
function useFormEvent(eventKey, handler) {
  useIsomorphicEffect(() => {
    if (eventKey) {
      window.addEventListener(eventKey, handler);
      return () => window.removeEventListener(eventKey, handler);
    }
    return void 0;
  }, [eventKey]);
}
function useFormActions(name, form) {
  if (name) {
    validateFormName(name);
  }
  useFormEvent(
    `mantine-form:${name}:set-field-value`,
    (event) => form.setFieldValue(event.detail.path, event.detail.value)
  );
  useFormEvent(
    `mantine-form:${name}:set-values`,
    (event) => form.setValues(event.detail)
  );
  useFormEvent(
    `mantine-form:${name}:set-initial-values`,
    (event) => form.setInitialValues(event.detail)
  );
  useFormEvent(
    `mantine-form:${name}:set-errors`,
    (event) => form.setErrors(event.detail)
  );
  useFormEvent(
    `mantine-form:${name}:set-field-error`,
    (event) => form.setFieldError(event.detail.path, event.detail.error)
  );
  useFormEvent(
    `mantine-form:${name}:clear-field-error`,
    (event) => form.clearFieldError(event.detail)
  );
  useFormEvent(`mantine-form:${name}:clear-errors`, form.clearErrors);
  useFormEvent(`mantine-form:${name}:reset`, form.reset);
  useFormEvent(`mantine-form:${name}:validate`, form.validate);
  useFormEvent(
    `mantine-form:${name}:validate-field`,
    (event) => form.validateField(event.detail)
  );
  useFormEvent(
    `mantine-form:${name}:reorder-list-item`,
    (event) => form.reorderListItem(event.detail.path, event.detail.payload)
  );
  useFormEvent(
    `mantine-form:${name}:remove-list-item`,
    (event) => form.removeListItem(event.detail.path, event.detail.index)
  );
  useFormEvent(
    `mantine-form:${name}:insert-list-item`,
    (event) => form.insertListItem(event.detail.path, event.detail.item, event.detail.index)
  );
  useFormEvent(
    `mantine-form:${name}:set-dirty`,
    (event) => form.setDirty(event.detail)
  );
  useFormEvent(
    `mantine-form:${name}:set-touched`,
    (event) => form.setTouched(event.detail)
  );
  useFormEvent(
    `mantine-form:${name}:reset-dirty`,
    (event) => form.resetDirty(event.detail)
  );
  useFormEvent(`mantine-form:${name}:reset-touched`, form.resetTouched);
}
function getInputOnChange(setValue) {
  return (val) => {
    if (!val) {
      setValue(val);
    } else if (typeof val === "function") {
      setValue(val);
    } else if (typeof val === "object" && "nativeEvent" in val) {
      const { currentTarget } = val;
      if (currentTarget instanceof HTMLInputElement) {
        if (currentTarget.type === "checkbox") {
          setValue(currentTarget.checked);
        } else {
          setValue(currentTarget.value);
        }
      } else if (currentTarget instanceof HTMLTextAreaElement || currentTarget instanceof HTMLSelectElement) {
        setValue(currentTarget.value);
      }
    } else {
      setValue(val);
    }
  };
}
function filterErrors(errors) {
  if (errors === null || typeof errors !== "object") {
    return {};
  }
  return Object.keys(errors).reduce((acc, key) => {
    const errorValue = errors[key];
    if (errorValue !== void 0 && errorValue !== null && errorValue !== false) {
      acc[key] = errorValue;
    }
    return acc;
  }, {});
}
function useFormErrors(initialErrors) {
  const [errorsState, setErrorsState] = reactExports.useState(filterErrors(initialErrors));
  const errorsRef = reactExports.useRef(errorsState);
  const setErrors = reactExports.useCallback((errors) => {
    setErrorsState((current) => {
      const newErrors = filterErrors(typeof errors === "function" ? errors(current) : errors);
      errorsRef.current = newErrors;
      return newErrors;
    });
  }, []);
  const clearErrors = reactExports.useCallback(() => setErrors({}), []);
  const clearFieldError = reactExports.useCallback(
    (path) => {
      if (errorsRef.current[path] === void 0) {
        return;
      }
      setErrors((current) => {
        const errors = { ...current };
        delete errors[path];
        return errors;
      });
    },
    [errorsState]
  );
  const setFieldError = reactExports.useCallback(
    (path, error) => {
      if (error == null || error === false) {
        clearFieldError(path);
      } else if (errorsRef.current[path] !== error) {
        setErrors((current) => ({ ...current, [path]: error }));
      }
    },
    [errorsState]
  );
  return {
    errorsState,
    setErrors,
    clearErrors,
    setFieldError,
    clearFieldError
  };
}
function clearListState(field, state) {
  if (state === null || typeof state !== "object") {
    return {};
  }
  const clone = { ...state };
  Object.keys(state).forEach((errorKey) => {
    if (errorKey.includes(`${String(field)}.`)) {
      delete clone[errorKey];
    }
  });
  return clone;
}
function getIndexFromKeyAfterPath(key, path) {
  const split = key.substring(path.length + 1).split(".")[0];
  return parseInt(split, 10);
}
function changeErrorIndices(path, index, errors, change) {
  if (index === void 0) {
    return errors;
  }
  const pathString = `${String(path)}`;
  let clearedErrors = errors;
  if (change === -1) {
    clearedErrors = clearListState(`${pathString}.${index}`, clearedErrors);
  }
  const cloned = { ...clearedErrors };
  const changedKeys = /* @__PURE__ */ new Set();
  Object.entries(clearedErrors).filter(([key]) => {
    if (!key.startsWith(`${pathString}.`)) {
      return false;
    }
    const currIndex = getIndexFromKeyAfterPath(key, pathString);
    if (Number.isNaN(currIndex)) {
      return false;
    }
    return currIndex >= index;
  }).forEach(([key, value]) => {
    const currIndex = getIndexFromKeyAfterPath(key, pathString);
    const newKey = key.replace(
      `${pathString}.${currIndex}`,
      `${pathString}.${currIndex + change}`
    );
    cloned[newKey] = value;
    changedKeys.add(newKey);
    if (!changedKeys.has(key)) {
      delete cloned[key];
    }
  });
  return cloned;
}
function reorderErrors(path, { from, to }, errors) {
  const oldKeyStart = `${path}.${from}`;
  const newKeyStart = `${path}.${to}`;
  const clone = { ...errors };
  const processedKeys = /* @__PURE__ */ new Set();
  Object.keys(errors).forEach((key) => {
    if (processedKeys.has(key)) {
      return;
    }
    let oldKey;
    let newKey;
    if (key.startsWith(oldKeyStart)) {
      oldKey = key;
      newKey = key.replace(oldKeyStart, newKeyStart);
    } else if (key.startsWith(newKeyStart)) {
      oldKey = key.replace(newKeyStart, oldKeyStart);
      newKey = key;
    }
    if (oldKey && newKey) {
      const value1 = clone[oldKey];
      const value2 = clone[newKey];
      value2 === void 0 ? delete clone[oldKey] : clone[oldKey] = value2;
      value1 === void 0 ? delete clone[newKey] : clone[newKey] = value1;
      processedKeys.add(oldKey);
      processedKeys.add(newKey);
    }
  });
  return clone;
}
function getSplittedPath(path) {
  if (typeof path !== "string") {
    return [];
  }
  return path.split(".");
}
function getPath(path, values) {
  const splittedPath = getSplittedPath(path);
  if (splittedPath.length === 0 || typeof values !== "object" || values === null) {
    return void 0;
  }
  let value = values[splittedPath[0]];
  for (let i = 1; i < splittedPath.length; i += 1) {
    if (value == null) {
      break;
    }
    value = value[splittedPath[i]];
  }
  return value;
}
function setPath(path, value, values) {
  const splittedPath = getSplittedPath(path);
  if (splittedPath.length === 0) {
    return values;
  }
  const cloned = klona(values);
  if (splittedPath.length === 1) {
    cloned[splittedPath[0]] = value;
    return cloned;
  }
  let val = cloned[splittedPath[0]];
  for (let i = 1; i < splittedPath.length - 1; i += 1) {
    if (val === void 0) {
      return cloned;
    }
    val = val[splittedPath[i]];
  }
  val[splittedPath[splittedPath.length - 1]] = value;
  return cloned;
}
function reorderPath(path, { from, to }, values) {
  const currentValue = getPath(path, values);
  if (!Array.isArray(currentValue)) {
    return values;
  }
  const cloned = [...currentValue];
  const item = currentValue[from];
  cloned.splice(from, 1);
  cloned.splice(to, 0, item);
  return setPath(path, cloned, values);
}
function insertPath(path, value, index, values) {
  const currentValue = getPath(path, values);
  if (!Array.isArray(currentValue)) {
    return values;
  }
  const cloned = [...currentValue];
  cloned.splice(typeof index === "number" ? index : cloned.length, 0, value);
  return setPath(path, cloned, values);
}
function removePath(path, index, values) {
  const currentValue = getPath(path, values);
  if (!Array.isArray(currentValue)) {
    return values;
  }
  return setPath(
    path,
    currentValue.filter((_, itemIndex) => itemIndex !== index),
    values
  );
}
function replacePath(path, item, index, values) {
  const currentValue = getPath(path, values);
  if (!Array.isArray(currentValue)) {
    return values;
  }
  if (currentValue.length <= index) {
    return values;
  }
  const cloned = [...currentValue];
  cloned[index] = item;
  return setPath(path, cloned, values);
}
function useFormList({
  $values,
  $errors,
  $status
}) {
  const reorderListItem = reactExports.useCallback((path, payload) => {
    $status.clearFieldDirty(path);
    $errors.setErrors((errs) => reorderErrors(path, payload, errs));
    $values.setValues({
      values: reorderPath(path, payload, $values.refValues.current),
      updateState: true
    });
  }, []);
  const removeListItem = reactExports.useCallback((path, index) => {
    $status.clearFieldDirty(path);
    $errors.setErrors((errs) => changeErrorIndices(path, index, errs, -1));
    $values.setValues({
      values: removePath(path, index, $values.refValues.current),
      updateState: true
    });
  }, []);
  const insertListItem = reactExports.useCallback((path, item, index) => {
    $status.clearFieldDirty(path);
    $errors.setErrors((errs) => changeErrorIndices(path, index, errs, 1));
    $values.setValues({
      values: insertPath(path, item, index, $values.refValues.current),
      updateState: true
    });
  }, []);
  const replaceListItem = reactExports.useCallback((path, index, item) => {
    $status.clearFieldDirty(path);
    $values.setValues({
      values: replacePath(path, item, index, $values.refValues.current),
      updateState: true
    });
  }, []);
  return { reorderListItem, removeListItem, insertListItem, replaceListItem };
}
function getStatus(status, path) {
  const paths = Object.keys(status);
  if (typeof path === "string") {
    const nestedPaths = paths.filter((statusPath) => statusPath.startsWith(`${path}.`));
    return status[path] || nestedPaths.some((statusPath) => status[statusPath]) || false;
  }
  return paths.some((statusPath) => status[statusPath]);
}
function useFormStatus({
  initialDirty,
  initialTouched,
  mode,
  $values
}) {
  const [touchedState, setTouchedState] = reactExports.useState(initialTouched);
  const [dirtyState, setDirtyState] = reactExports.useState(initialDirty);
  const touchedRef = reactExports.useRef(initialTouched);
  const dirtyRef = reactExports.useRef(initialDirty);
  const setTouched = reactExports.useCallback((values) => {
    const resolvedValues = typeof values === "function" ? values(touchedRef.current) : values;
    touchedRef.current = resolvedValues;
    if (mode === "controlled") {
      setTouchedState(resolvedValues);
    }
  }, []);
  const setDirty = reactExports.useCallback(
    (values, forceUpdate = false) => {
      const resolvedValues = typeof values === "function" ? values(dirtyRef.current) : values;
      dirtyRef.current = resolvedValues;
      if (mode === "controlled" || forceUpdate) {
        setDirtyState(resolvedValues);
      }
    },
    []
  );
  const resetTouched = reactExports.useCallback(() => setTouched({}), []);
  const resetDirty = reactExports.useCallback((values) => {
    const newSnapshot = values ? { ...$values.refValues.current, ...values } : $values.refValues.current;
    $values.setValuesSnapshot(newSnapshot);
    setDirty({});
  }, []);
  const setFieldTouched = reactExports.useCallback((path, touched) => {
    setTouched((currentTouched) => {
      if (getStatus(currentTouched, path) === touched) {
        return currentTouched;
      }
      return { ...currentTouched, [path]: touched };
    });
  }, []);
  const setFieldDirty = reactExports.useCallback((path, dirty, forceUpdate) => {
    setDirty((currentDirty) => {
      if (getStatus(currentDirty, path) === dirty) {
        return currentDirty;
      }
      return { ...currentDirty, [path]: dirty };
    }, forceUpdate);
  }, []);
  const setCalculatedFieldDirty = reactExports.useCallback((path, value) => {
    const currentDirty = getStatus(dirtyRef.current, path);
    const dirty = !isEqual(getPath(path, $values.getValuesSnapshot()), value);
    const clearedState = clearListState(path, dirtyRef.current);
    clearedState[path] = dirty;
    setDirty(clearedState, currentDirty !== dirty);
  }, []);
  const isTouched = reactExports.useCallback(
    (path) => getStatus(touchedRef.current, path),
    []
  );
  const clearFieldDirty = reactExports.useCallback(
    (path) => setDirty((current) => {
      if (typeof path !== "string") {
        return current;
      }
      const result = clearListState(path, current);
      delete result[path];
      if (isEqual(result, current)) {
        return current;
      }
      return result;
    }),
    []
  );
  const isDirty = reactExports.useCallback((path) => {
    if (path) {
      const overriddenValue = getPath(path, dirtyRef.current);
      if (typeof overriddenValue === "boolean") {
        return overriddenValue;
      }
      const sliceOfValues = getPath(path, $values.refValues.current);
      const sliceOfInitialValues = getPath(path, $values.valuesSnapshot.current);
      return !isEqual(sliceOfValues, sliceOfInitialValues);
    }
    const isOverridden = Object.keys(dirtyRef.current).length > 0;
    if (isOverridden) {
      return getStatus(dirtyRef.current);
    }
    return !isEqual($values.refValues.current, $values.valuesSnapshot.current);
  }, []);
  const getDirty = reactExports.useCallback(() => dirtyRef.current, []);
  const getTouched = reactExports.useCallback(() => touchedRef.current, []);
  return {
    touchedState,
    dirtyState,
    touchedRef,
    dirtyRef,
    setTouched,
    setDirty,
    resetDirty,
    resetTouched,
    isTouched,
    setFieldTouched,
    setFieldDirty,
    setTouchedState,
    setDirtyState,
    clearFieldDirty,
    isDirty,
    getDirty,
    getTouched,
    setCalculatedFieldDirty
  };
}
function useFormValues({
  initialValues,
  onValuesChange,
  mode
}) {
  const initialized = reactExports.useRef(false);
  const [stateValues, setStateValues] = reactExports.useState(initialValues || {});
  const refValues = reactExports.useRef(stateValues);
  const valuesSnapshot = reactExports.useRef(stateValues);
  const setValues = reactExports.useCallback(
    ({
      values,
      subscribers,
      updateState = true,
      mergeWithPreviousValues = true
    }) => {
      const previousValues = refValues.current;
      const resolvedValues = values instanceof Function ? values(refValues.current) : values;
      const updatedValues = mergeWithPreviousValues ? { ...previousValues, ...resolvedValues } : resolvedValues;
      refValues.current = updatedValues;
      if (updateState) {
        setStateValues(updatedValues);
        if (mode === "uncontrolled") {
          refValues.current = updatedValues;
        }
      }
      onValuesChange?.(updatedValues, previousValues);
      subscribers?.filter(Boolean).forEach((subscriber) => subscriber({ updatedValues, previousValues }));
    },
    [onValuesChange]
  );
  const setFieldValue = reactExports.useCallback(
    (payload) => {
      const currentValue = getPath(payload.path, refValues.current);
      const updatedValue = payload.value instanceof Function ? payload.value(currentValue) : payload.value;
      if (currentValue !== updatedValue) {
        const previousValues = refValues.current;
        const updatedValues = setPath(payload.path, updatedValue, refValues.current);
        setValues({ values: updatedValues, updateState: payload.updateState });
        payload.subscribers?.filter(Boolean).forEach(
          (subscriber) => subscriber({ path: payload.path, updatedValues, previousValues })
        );
      }
    },
    [setValues]
  );
  const setValuesSnapshot = reactExports.useCallback((payload) => {
    valuesSnapshot.current = payload;
  }, []);
  const initialize = reactExports.useCallback(
    (values, onInitialize) => {
      if (!initialized.current) {
        initialized.current = true;
        setValues({ values, updateState: mode === "controlled" });
        setValuesSnapshot(values);
        onInitialize();
      }
    },
    [setValues]
  );
  const resetValues = reactExports.useCallback(() => {
    setValues({
      values: valuesSnapshot.current,
      updateState: true,
      mergeWithPreviousValues: false
    });
  }, [setValues]);
  const getValues = reactExports.useCallback(() => refValues.current, []);
  const getValuesSnapshot = reactExports.useCallback(() => valuesSnapshot.current, []);
  const resetField = reactExports.useCallback(
    (path, subscribers) => {
      const snapshotValue = getPath(path, valuesSnapshot.current);
      if (typeof snapshotValue === "undefined") {
        return;
      }
      setFieldValue({
        path,
        value: snapshotValue,
        updateState: mode === "controlled",
        subscribers
      });
    },
    [setFieldValue, mode]
  );
  return {
    initialized,
    stateValues,
    refValues,
    valuesSnapshot,
    setValues,
    setFieldValue,
    resetValues,
    setValuesSnapshot,
    initialize,
    getValues,
    getValuesSnapshot,
    resetField
  };
}
function useFormWatch({
  $status,
  cascadeUpdates
}) {
  const subscribers = reactExports.useRef(
    {}
  );
  const watch = reactExports.useCallback((path, callback) => {
    reactExports.useEffect(() => {
      subscribers.current[path] = subscribers.current[path] || [];
      subscribers.current[path].push(callback);
      return () => {
        subscribers.current[path] = subscribers.current[path].filter((cb) => cb !== callback);
      };
    }, [callback]);
  }, []);
  const getFieldSubscribers = reactExports.useCallback((path) => {
    const result = subscribers.current[path]?.map(
      (callback) => (input) => callback({
        previousValue: getPath(path, input.previousValues),
        value: getPath(path, input.updatedValues),
        touched: $status.isTouched(path),
        dirty: $status.isDirty(path)
      })
    ) ?? [];
    if (cascadeUpdates) {
      for (const subscriptionKey in subscribers.current) {
        if (subscriptionKey.startsWith(`${path}.`) || path.startsWith(`${subscriptionKey}.`)) {
          result.push(
            ...subscribers.current[subscriptionKey].map(
              (cb) => (input) => cb({
                previousValue: getPath(subscriptionKey, input.previousValues),
                value: getPath(subscriptionKey, input.updatedValues),
                touched: $status.isTouched(subscriptionKey),
                dirty: $status.isDirty(subscriptionKey)
              })
            )
          );
        }
      }
    }
    return result;
  }, []);
  return {
    subscribers,
    watch,
    getFieldSubscribers
  };
}
function getDataPath(formName, fieldPath) {
  return formName ? `${formName}-${fieldPath.toString()}` : fieldPath.toString();
}
const formRootRule = /* @__PURE__ */ Symbol("root-rule");
function getValidationResults(errors) {
  const filteredErrors = filterErrors(errors);
  return { hasErrors: Object.keys(filteredErrors).length > 0, errors: filteredErrors };
}
function validateRulesRecord(rules, values, path = "", errors = {}) {
  if (typeof rules !== "object" || rules === null) {
    return errors;
  }
  return Object.keys(rules).reduce((acc, ruleKey) => {
    const rule = rules[ruleKey];
    const rulePath = `${path === "" ? "" : `${path}.`}${ruleKey}`;
    const value = getPath(rulePath, values);
    let arrayValidation = false;
    if (typeof rule === "function") {
      acc[rulePath] = rule(value, values, rulePath);
    }
    if (typeof rule === "object" && Array.isArray(value)) {
      arrayValidation = true;
      value.forEach(
        (_item, index) => validateRulesRecord(rule, values, `${rulePath}.${index}`, acc)
      );
      if (formRootRule in rule) {
        acc[rulePath] = rule[formRootRule](value, values, rulePath);
      }
    }
    if (typeof rule === "object" && typeof value === "object" && value !== null) {
      if (!arrayValidation) {
        validateRulesRecord(rule, values, rulePath, acc);
      }
      if (formRootRule in rule) {
        acc[rulePath] = rule[formRootRule](value, values, rulePath);
      }
    }
    return acc;
  }, errors);
}
function validateValues(validate, values) {
  if (typeof validate === "function") {
    return getValidationResults(validate(values));
  }
  return getValidationResults(validateRulesRecord(validate, values));
}
function validateFieldValue(path, rules, values) {
  if (typeof path !== "string") {
    return { hasError: false, error: null };
  }
  const results = validateValues(rules, values);
  const pathInError = Object.keys(results.errors).find(
    (errorKey) => path.split(".").every((pathPart, i) => pathPart === errorKey.split(".")[i])
  );
  return { hasError: !!pathInError, error: pathInError ? results.errors[pathInError] : null };
}
const FORM_INDEX = "__MANTINE_FORM_INDEX__";
function shouldValidateOnChange(path, validateInputOnChange) {
  if (!validateInputOnChange) {
    return false;
  }
  if (typeof validateInputOnChange === "boolean") {
    return validateInputOnChange;
  }
  if (Array.isArray(validateInputOnChange)) {
    return validateInputOnChange.includes(path.replace(/[.][0-9]+/g, `.${FORM_INDEX}`));
  }
  return false;
}
function useForm({
  name,
  mode = "controlled",
  initialValues,
  initialErrors = {},
  initialDirty = {},
  initialTouched = {},
  clearInputErrorOnChange = true,
  validateInputOnChange = false,
  validateInputOnBlur = false,
  onValuesChange,
  transformValues = ((values) => values),
  enhanceGetInputProps,
  validate: rules,
  onSubmitPreventDefault = "always",
  touchTrigger = "change",
  cascadeUpdates = false
} = {}) {
  const $errors = useFormErrors(initialErrors);
  const $values = useFormValues({ initialValues, onValuesChange, mode });
  const $status = useFormStatus({ initialDirty, initialTouched, $values, mode });
  const $list = useFormList({ $values, $errors, $status });
  const $watch = useFormWatch({ $status, cascadeUpdates });
  const [formKey, setFormKey] = reactExports.useState(0);
  const [fieldKeys, setFieldKeys] = reactExports.useState({});
  const [submitting, setSubmitting] = reactExports.useState(false);
  const reset = reactExports.useCallback(() => {
    $values.resetValues();
    $errors.clearErrors();
    $status.resetDirty();
    $status.resetTouched();
    mode === "uncontrolled" && setFormKey((key2) => key2 + 1);
  }, []);
  const handleValuesChanges = reactExports.useCallback(
    (previousValues) => {
      clearInputErrorOnChange && $errors.clearErrors();
      mode === "uncontrolled" && setFormKey((key2) => key2 + 1);
      Object.keys($watch.subscribers.current).forEach((path) => {
        const value = getPath(path, $values.refValues.current);
        const previousValue = getPath(path, previousValues);
        if (value !== previousValue) {
          $watch.getFieldSubscribers(path).forEach((cb) => cb({ previousValues, updatedValues: $values.refValues.current }));
        }
      });
    },
    [clearInputErrorOnChange]
  );
  const initialize = reactExports.useCallback(
    (values) => {
      const previousValues = $values.refValues.current;
      $values.initialize(values, () => mode === "uncontrolled" && setFormKey((key2) => key2 + 1));
      handleValuesChanges(previousValues);
    },
    [handleValuesChanges]
  );
  const setFieldValue = reactExports.useCallback(
    (path, value, options) => {
      const shouldValidate = shouldValidateOnChange(path, validateInputOnChange);
      const resolvedValue = value instanceof Function ? value(getPath(path, $values.refValues.current)) : value;
      $status.setCalculatedFieldDirty(path, resolvedValue);
      touchTrigger === "change" && $status.setFieldTouched(path, true);
      !shouldValidate && clearInputErrorOnChange && $errors.clearFieldError(path);
      $values.setFieldValue({
        path,
        value,
        updateState: mode === "controlled",
        subscribers: [
          ...$watch.getFieldSubscribers(path),
          shouldValidate ? (payload) => {
            const validationResults = validateFieldValue(path, rules, payload.updatedValues);
            validationResults.hasError ? $errors.setFieldError(path, validationResults.error) : $errors.clearFieldError(path);
          } : null,
          options?.forceUpdate !== false && mode !== "controlled" ? () => setFieldKeys((keys) => ({
            ...keys,
            [path]: (keys[path] || 0) + 1
          })) : null
        ]
      });
    },
    [onValuesChange, rules]
  );
  const setValues = reactExports.useCallback(
    (values) => {
      const previousValues = $values.refValues.current;
      $values.setValues({ values, updateState: mode === "controlled" });
      handleValuesChanges(previousValues);
    },
    [onValuesChange, handleValuesChanges]
  );
  const validate = reactExports.useCallback(() => {
    const results = validateValues(rules, $values.refValues.current);
    $errors.setErrors(results.errors);
    return results;
  }, [rules]);
  const validateField = reactExports.useCallback(
    (path) => {
      const results = validateFieldValue(path, rules, $values.refValues.current);
      results.hasError ? $errors.setFieldError(path, results.error) : $errors.clearFieldError(path);
      return results;
    },
    [rules]
  );
  const getInputProps = (path, { type = "input", withError = true, withFocus = true, ...otherOptions } = {}) => {
    const onChange = getInputOnChange(
      (value) => setFieldValue(path, value, { forceUpdate: false })
    );
    const payload = { onChange, "data-path": getDataPath(name, path) };
    if (withError) {
      payload.error = $errors.errorsState[path];
    }
    if (type === "checkbox") {
      payload[mode === "controlled" ? "checked" : "defaultChecked"] = getPath(
        path,
        $values.refValues.current
      );
    } else {
      payload[mode === "controlled" ? "value" : "defaultValue"] = getPath(
        path,
        $values.refValues.current
      );
    }
    if (withFocus) {
      payload.onFocus = () => $status.setFieldTouched(path, true);
      payload.onBlur = () => {
        if (shouldValidateOnChange(path, validateInputOnBlur)) {
          const validationResults = validateFieldValue(path, rules, $values.refValues.current);
          validationResults.hasError ? $errors.setFieldError(path, validationResults.error) : $errors.clearFieldError(path);
        }
      };
    }
    return Object.assign(
      payload,
      enhanceGetInputProps?.({
        inputProps: payload,
        field: path,
        options: { type, withError, withFocus, ...otherOptions },
        form
      })
    );
  };
  const onSubmit = (handleSubmit, handleValidationFailure) => (event) => {
    if (onSubmitPreventDefault === "always") {
      event?.preventDefault();
    }
    const results = validate();
    if (results.hasErrors) {
      if (onSubmitPreventDefault === "validation-failed") {
        event?.preventDefault();
      }
      handleValidationFailure?.(results.errors, $values.refValues.current, event);
    } else {
      const submitResult = handleSubmit?.(
        transformValues($values.refValues.current),
        event
      );
      if (submitResult instanceof Promise) {
        setSubmitting(true);
        submitResult.finally(() => setSubmitting(false));
      }
    }
  };
  const getTransformedValues = (input) => transformValues(input || $values.refValues.current);
  const onReset = reactExports.useCallback((event) => {
    event.preventDefault();
    reset();
  }, []);
  const isValid = reactExports.useCallback(
    (path) => path ? !validateFieldValue(path, rules, $values.refValues.current).hasError : !validateValues(rules, $values.refValues.current).hasErrors,
    [rules]
  );
  const key = (path) => `${formKey}-${String(path)}-${fieldKeys[String(path)] || 0}`;
  const getInputNode = reactExports.useCallback(
    (path) => document.querySelector(`[data-path="${getDataPath(name, path)}"]`),
    []
  );
  const resetField = reactExports.useCallback(
    (path) => {
      $values.resetField(path, [
        mode !== "controlled" ? () => setFieldKeys((keys) => ({
          ...keys,
          [path]: (keys[path] || 0) + 1
        })) : null
      ]);
    },
    [$values.resetField, mode, setFieldKeys]
  );
  const form = {
    watch: $watch.watch,
    initialized: $values.initialized.current,
    values: mode === "uncontrolled" ? $values.refValues.current : $values.stateValues,
    getValues: $values.getValues,
    getInitialValues: $values.getValuesSnapshot,
    setInitialValues: $values.setValuesSnapshot,
    resetField,
    initialize,
    setValues,
    setFieldValue,
    submitting,
    setSubmitting,
    errors: $errors.errorsState,
    setErrors: $errors.setErrors,
    setFieldError: $errors.setFieldError,
    clearFieldError: $errors.clearFieldError,
    clearErrors: $errors.clearErrors,
    resetDirty: $status.resetDirty,
    setTouched: $status.setTouched,
    setDirty: $status.setDirty,
    isTouched: $status.isTouched,
    resetTouched: $status.resetTouched,
    isDirty: $status.isDirty,
    getTouched: $status.getTouched,
    getDirty: $status.getDirty,
    reorderListItem: $list.reorderListItem,
    insertListItem: $list.insertListItem,
    removeListItem: $list.removeListItem,
    replaceListItem: $list.replaceListItem,
    reset,
    validate,
    validateField,
    getInputProps,
    onSubmit,
    onReset,
    isValid,
    getTransformedValues,
    key,
    getInputNode
  };
  useFormActions(name, form);
  return form;
}
export {
  useForm as u
};
