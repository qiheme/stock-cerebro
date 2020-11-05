import {combineReducers} from "redux";
import dataReducer from "./data";
import pageReducer from "./page";

export default combineReducers({data: dataReducer, page: pageReducer});
