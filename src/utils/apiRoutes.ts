const apiRoutes = {
    signIn: () => "/authentication/login",
    currentUser: () => "/authentication/current_user",
    getPacientes: () => "/entities.paciente",
    getReservas: () => "/entities.reserva",
    uploadFile: () => "/entities.archivo/createArchivo",
    getArchivosByPacienteId: () => "/entities.archivo/getArchivosByPacienteId/",
}

export default apiRoutes;