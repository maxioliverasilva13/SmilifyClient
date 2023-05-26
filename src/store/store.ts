import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";

import GlobalSlice from "./slices/GlobalSlice";

import { UserService } from "./services/UserService";
import { PacienteService } from "./services/PacienteService";
import { CategoriaService } from "./services/CategoriaService";
import { ArancelPublicoService } from "./services/ArancelPublicoService";
import { ArancelCooperativoService } from "./services/ArancelCooperativoService";
import { ReservaService } from "./services/ReservaService";
import { FileService } from "./services/FileService";
import { DienteService } from "./services/DienteService";

const store = configureStore({
  reducer: {
    GlobalSlice,
   [UserService.reducerPath]: UserService.reducer,
   [PacienteService.reducerPath]: PacienteService.reducer,
   [CategoriaService.reducerPath]: CategoriaService.reducer,
   [ArancelPublicoService.reducerPath]: ArancelPublicoService.reducer,
   [ArancelCooperativoService.reducerPath]: ArancelCooperativoService.reducer,
   [ReservaService.reducerPath]: ReservaService.reducer,
   [FileService.reducerPath]: FileService.reducer,
   [DienteService.reducerPath]: DienteService.reducer,
   
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(
        UserService.middleware,
        PacienteService.middleware,
        CategoriaService.middleware,
        ArancelPublicoService.middleware,
        ArancelCooperativoService.middleware,
        ReservaService.middleware,
        FileService.middleware,
        DienteService.middleware,
    ),
});

setupListeners(store.dispatch);

export default store;
