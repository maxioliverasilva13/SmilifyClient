const apiRoutes = {
    signIn: () => "/authentication/login",
    currentUser: () => "/authentication/current_user",
    getPacientes: () => "/entities.paciente",
    getPacientesById: (data: any) => `/entities.paciente/${data}`,
    getCategorias: () => "/entities.categoriaarancel",
    postArancelPublico: () => "/entities.arancel/create",
    postArancelCooperativo: () => "/entities.arancel/create",
    getReservas: () => "/entities.reserva",
    uploadFile: () => "/entities.archivo/createArchivo",
    getArchivosByPacienteId: () => "/entities.archivo/getArchivosByPacienteId/",
    getInfoDiente: () => "/entities.dienteinfo/getInfoDiente",
    createDienteInfo: () => "/entities.dienteinfo",
    postPaciente: () => "/entities.paciente",
    postReserva: () => "/entities.reserva",
    getReservasByUserCedula: (dataCedula: any) => `/entities.reserva/validate/${dataCedula}`,
    getReservasByFecha: (data: any) => `/entities.reserva/obtenerFechasByFechas?fecha=${data}`,
}

export default apiRoutes;