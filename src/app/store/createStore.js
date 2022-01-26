import professionReducer from "./professions";
import qualitiesReducer from "./qualities";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
