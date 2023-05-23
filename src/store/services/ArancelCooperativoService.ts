import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "../../utils/apiRoutes";
import { prepareHeaders } from "../../utils/prepareHeaders";
import { Paciente } from "src/types/paciente";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/Smilify-1.0/resources",
  prepareHeaders,
});

export const ArancelCooperativoService = createApi({
  reducerPath: "ArancelCooperativoService",
  baseQuery: baseQuery,
  tagTypes: ["ArancelCooperativo"],
  endpoints: (builder) => ({
    postArancelCooperativo: builder.mutation({
      query: data => {
        return {
          url: apiRoutes.postArancelCooperativo(),
          method: "POST",
          body: { nombre: data?.nombre, categoriaId: data?.idCategoria, cantOrdenes: data?.precio, type: "Colectivo" },
        };
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
  }),
});

export const {usePostArancelCooperativoMutation} = ArancelCooperativoService;
