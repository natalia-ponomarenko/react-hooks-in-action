export default function reducer(state, action) {
  let count;
  switch (action.type) {
    case 'SET_GROUP':
      return {
        ...state,
        group: action.payload,
        bookableIndex: 0,
      };
    case 'SET_BOOKABLE':
      return {
        ...state,
        bookableIndex: action.payload,
      };
    case 'TOGGLE_HAS_DETAILS':
      return {
        ...state,
        hasDetails: !state.hasDetails,
      };
    case 'NEXT_BOOKABLE':
      count = state.bookables.filter(
        (bookable) => bookable.group === state.group
      ).length;
      return {
        ...state,
        bookableIndex: (state.bookableIndex + 1) % count,
      };
    default:
      return state;
  }
}
