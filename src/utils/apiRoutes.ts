const apiRoutes = {
    signIn: () => "/authentication/login",
    currentUser: () => "/authentication/current_user",
    getPacientes: () => "/entities.paciente",
    getPacienteInfo: (id: any) => `/entities.paciente/getPacienteInfo/${id}`,
    cambiarEstado: () => `/entities.paciente/cambiarEstado`,
    getPacientesById: (data: any) => `/entities.paciente/${data}`,
    getCategorias: () => "/entities.categoriaarancel",
    postArancelPublico: () => "/entities.arancel/create",
    postArancelCooperativo: () => "/entities.arancel/create",
    getReservas: () => "/entities.reserva",
    getReservasHoy: () => "/entities.reserva/listarHoy",
    uploadFile: () => "/entities.archivo/createArchivo",
    getArchivosByPacienteId: () => "/entities.archivo/getArchivosByPacienteId/",
    getInfoDiente: () => "/entities.dienteinfo/getInfoDiente",
    createDienteInfo: () => "/entities.dienteinfo",
    getAranceles: () => "/entities.arancel",
    postPaciente: () => "/entities.paciente",
    postReserva: () => "/entities.reserva",
    getReservasByUserCedula: (dataCedula: any) => `/entities.reserva/validate/${dataCedula}`,
    getReservasByFecha: (data: any) => `/entities.reserva/obtenerFechasByFechas?fecha=${data}`,
}

export default apiRoutes;