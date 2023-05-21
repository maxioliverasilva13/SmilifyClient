import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import GlobalSlice from "./slices/GlobalSlice";

import { UserService } from "./services/UserService";
import { PacienteService } from "./services/PacienteService";
import { ReservaService } from "./services/ReservaService";
import { FileService } from "./services/FileService";

const store = configureStore({
  reducer: {
    GlobalSlice,
   [UserService.reducerPath]: UserService.reducer,
   [PacienteService.reducerPath]: PacienteService.reducer,
   [ReservaService.reducerPath]: ReservaService.reducer,
   [FileService.reducerPath]: FileService.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
        UserService.middleware,
        PacienteService.middleware,
        ReservaService.middleware,
        FileService.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
