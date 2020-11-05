import React, {createContext, useContext, useReducer} from "react";

const AppContext = createContext();
const {Provider} = AppContext;

const reducer = (state, action) => {
  switch (action.type) {
    case "LOADING_BEGIN":
      return {...state, page: {status: {loading: true}}};
    case "LOADING_COMPLETE":
      return {...state, page: {status: {loading: false}}};
    case "FETCH_NEWS_SUCCESS":
      return {
        ...state,
        ...{
          data: {
            news: {
              status: true,
              response: action.payload,
            },
          },
        },
      };
    case "FETCH_NEWS_FAILED":
      return {
        ...state,
        ...{
          data: {
            news: {
              status: false,
              response: [],
            },
          },
        },
      };
    default:
      throw new Error(`Invalid action type: ${action.type}`);
  }
};
const initialState = {
  page: {
    status: {
      loading: true,
      error: false,
    },
  },
  data: {
    news: {
      status: false,
      response: [],
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
