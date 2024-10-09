import { ActionType, FormState } from "../../types/list-post.types";

const formReducer = (state: FormState, action: ActionType): FormState => {
    switch (action.type) {
      case 'SET_FORM':
        return { ...state, ...action.payload };
      case 'RESET_FORM':
        return { title: '', body: '' };
      default:
        return state;
    }
  };

  export {
    formReducer
  }