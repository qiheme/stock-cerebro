import React, {createContext, useReducer, useContext} from "react";

const AppContext = createContext();
const {Provider} = AppContext;

const reducer = (state, action) => {
  switch (action.type) {
    // case "add":
    //   return {count: state.count + 1};
    // case "subtract":
    //   return {count: state.count - 1};
    case "LOADING_BEGIN":
      return {...state, ...{page: {status: {loading: true}}}};
    case "LOADING_COMPLETE":
      return {...state, ...{page: {status: {loading: false}}}};
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};
const initialState = {
  page: {
    route: "/",
    status: {
      loading: true,
      error: false,
    },
  },
};

const AppProvider = ({value = {}, ...props}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <Provider value={[state, dispatch]} {...props} />;
};

const useAppContext = () => {
  return useContext(AppContext);
};

export {AppProvider, useAppContext};
