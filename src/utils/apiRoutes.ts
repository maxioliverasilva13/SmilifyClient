const apiRoutes = {
    signIn: () => "/authentication/login",
    currentUser: () => "/authentication/current_user",
    getPacientes: () => "/entities.paciente",
    getCategorias: () => "/entities.categoriaarancel",
    postArancelPublico: () => "/entities.arancel/create",
    postArancelCooperativo: () => "/entities.arancel/create"
}

export default apiRoutes;