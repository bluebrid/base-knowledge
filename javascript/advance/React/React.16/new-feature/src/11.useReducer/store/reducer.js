function reducer(state, action) {
  switch (action.type) {
  case 'click_async':
  case 'click_sync':
    return { ...state, value: action.payload };
  case 'loading_start':
    return { ...state, loading: true };
  case 'loading_end':
    return { ...state, loading: false };
  default:
    throw new Error();
  }
}
export default reducer;