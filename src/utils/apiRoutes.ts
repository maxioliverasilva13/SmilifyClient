const apiRoutes = {
    signIn: () => "/authentication/login",
    currentUser: () => "/authentication/current_user",
    getPacientes: () => "/entities.paciente",
    getPacienteInfo: (id: any) => `/entities.paciente/getPacienteInfo/${id}`,
    cambiarEstado: () => `/entities.paciente/cambiarEstado`,
    getCategorias: () => "/entities.categoriaarancel",
    postArancelPublico: () => "/entities.arancel/create",
    postArancelCooperativo: () => "/entities.arancel/create",
    getReservas: () => "/entities.reserva",
    uploadFile: () => "/entities.archivo/createArchivo",
    getArchivosByPacienteId: () => "/entities.archivo/getArchivosByPacienteId/",
    getInfoDiente: () => "/entities.dienteinfo/getInfoDiente",
    createDienteInfo: () => "/entities.dienteinfo",
    getAranceles: () => "/entities.arancel",
}

export default apiRoutes;