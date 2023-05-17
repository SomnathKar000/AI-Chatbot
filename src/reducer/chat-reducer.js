const reducer = (state, action) => {
  if (action.type === "START_LOADING") {
    return { ...state, loading: true };
  }
  if (action.type === "END_LOADING") {
    return { ...state, loading: false };
  }
  if (action.type === "OPEN_ALERT") {
    const alert = {
      open: true,
      message: action.payload.message,
      type: action.payload.type,
    };
    return { ...state, alert };
  }
  if (action.type === "CLOSE_ALERT") {
    return { ...state, alert: { ...state.alert, open: false } };
  }
  if (action.type === "CHANGE_MODE") {
    let mode = "dark";
    if (state.mode === "dark") {
      mode = "light";
    }
    return { ...state, mode };
  }

  return { ...state };
};

export default reducer;
