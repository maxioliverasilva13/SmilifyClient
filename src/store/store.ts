import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import GlobalSlice from "./slices/GlobalSlice";

import { UserService } from "./services/UserService";
import { PacienteService } from "./services/PacienteService";

const store = configureStore({
  reducer: {
    GlobalSlice,
   [UserService.reducerPath]: UserService.reducer,
   [PacienteService.reducerPath]: PacienteService.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
        UserService.middleware,
        PacienteService.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
