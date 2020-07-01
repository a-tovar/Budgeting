export const MENU_TOGGLE = "pageState/MENU_TOGGLE";
export const THEME_TOGGLE = "pageState/THEME_TOGGLE";

const initialState = {
  menuOpen: true,
  darkMode: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case MENU_TOGGLE:
      return {
        ...state,
        menuOpen: !state.menuOpen,
      };
    case THEME_TOGGLE:
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    default:
      return state;
  }
};

export const toggleMenu = () => {
  return async (dispatch) => {
    dispatch({
      type: MENU_TOGGLE,
    });
  };
};

export const toggleTheme = () => {
  return async (dispatch) => {
    dispatch({
      type: THEME_TOGGLE,
    });
  };
};
