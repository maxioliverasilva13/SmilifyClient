import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import apiRoutes from "../../utils/apiRoutes";
import { prepareHeaders } from "../../utils/prepareHeaders";
import { Paciente } from "src/types/paciente";

const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:8080/Smilify-1.0/resources",
  prepareHeaders,
});

export const ArancelPublicoService = createApi({
  reducerPath: "ArancelPublicoService",
  baseQuery: baseQuery,
  tagTypes: ["ArancelPublico"],
  endpoints: (builder) => ({
    postArancelPublico: builder.mutation({
      query: data => {
        return {
          url: apiRoutes.postArancelPublico(),
          method: "POST",
          body: { nombre: data?.nombre, categoriaId: data?.idCategoria, precio: data?.precio, type: "Privado" },
        };
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
    }),
  }),
});

export const {usePostArancelPublicoMutation} = ArancelPublicoService;
