import { v4 as uuid } from "uuid";

export const REQUEST_ADD_CATEGORY = "idealBudget/REQUEST_ADD_CATEGORY";
export const REQUEST_ADD_CATEGORY_FINISHED =
  "idealBudget/REQUEST_ADD_CATEGORY_FINISHED";
export const REQUEST_EDIT_CATEGORY = "idealBudget/REQUEST_EDIT_CATEGORY";
export const REQUEST_EDIT_CATEGORY_FINISHED =
  "idealBudget/REQUEST_EDIT_CATEGORY_FINISHED";
export const REQUEST_DELETE_CATEGORY = "idealBudget/REQUEST_DELETE_CATEGORY";
export const REQUEST_DELETE_CATEGORY_FINISHED =
  "idealBudget/REQUEST_DELETE_CATEGORY_FINISHED";

const initialState = {
  categories: [
    {
      id: uuid(),
      category: "",
      amount: 0,
      color: "",
    },
  ],
  error: null,
  editingCategory: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case REQUEST_ADD_CATEGORY:
      return {
        ...state,
        editingCategory: true,
      };
    case REQUEST_ADD_CATEGORY_FINISHED:
      return {
        ...state,
        categories: action.payload,
        editingCategory: false,
      };
    case REQUEST_EDIT_CATEGORY:
      return {
        ...state,
        editingCategory: true,
      };
    case REQUEST_EDIT_CATEGORY_FINISHED:
      return {
        ...state,
        categories: action.payload,
        editingCategory: false,
      };
    case REQUEST_DELETE_CATEGORY:
      return {
        ...state,
        editingCategory: true,
      };
    case REQUEST_DELETE_CATEGORY_FINISHED:
      return {
        ...state,
        categories: action.payload,
        editingCategory: false,
      };
    default:
      return state;
  }
};

export const addCategory = () => {
  return async (dispatch, getState) => {
    dispatch({
      type: REQUEST_ADD_CATEGORY,
    });
    let categories = getState().idealBudget.categories;
    const emptyCat = {
      id: uuid(),
      category: "",
      amount: 0,
      color: "",
    };
    categories.push(emptyCat);
    dispatch({
      type: REQUEST_ADD_CATEGORY_FINISHED,
      payload: categories,
    });
  };
};

export const editCategory = (category) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REQUEST_EDIT_CATEGORY,
    });
    let categories = getState().idealBudget.categories;
    let updateIndex = categories.findIndex((cat) => cat.id === category.id);
    categories[updateIndex] = category;
    dispatch({
      type: REQUEST_EDIT_CATEGORY_FINISHED,
      payload: categories,
    });
  };
};

export const deleteCategory = (id) => {
  return async (dispatch, getState) => {
    dispatch({
      type: REQUEST_DELETE_CATEGORY,
    });
    let categories = getState().idealBudget.categories.filter(
      (category) => category.id !== id
    );
    dispatch({
      type: REQUEST_DELETE_CATEGORY_FINISHED,
      payload: categories,
    });
  };
};
