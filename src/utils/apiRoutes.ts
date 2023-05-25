const apiRoutes = {
    signIn: () => "/authentication/login",
    currentUser: () => "/authentication/current_user",
    getPacientes: () => "/entities.paciente",
    getCategorias: () => "/entities.categoriaarancel",
    postArancelPublico: () => "/entities.arancel/create",
    postArancelCooperativo: () => "/entities.arancel/create",
    getReservas: () => "/entities.reserva",
    uploadFile: () => "/entities.archivo/createArchivo",
    getArchivosByPacienteId: () => "/entities.archivo/getArchivosByPacienteId/",
}

export default apiRoutes;