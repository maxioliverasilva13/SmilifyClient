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
        if(data?.type === "Laboratorio"){
          return {
            url: apiRoutes.postArancelCooperativo(),
            method: "POST",
            body: { nombre: data?.nombre, categoriaId: data?.idCategoria, precio: data?.precio, type: data?.type},
          };
        }else{
          return {
            url: apiRoutes.postArancelCooperativo(),
            method: "POST",
            body: { nombre: data?.nombre, categoriaId: data?.idCategoria, cantOrdenes: data?.precio, type: data?.type},
          };
        }
      },
      transformResponse(value) {
        const response = value;
        return response;
      },
      invalidatesTags: ["ArancelCooperativo"]
    }),
  }),
});

export const {usePostArancelCooperativoMutation} = ArancelCooperativoService;
