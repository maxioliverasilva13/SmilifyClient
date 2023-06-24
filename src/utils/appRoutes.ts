const appRoutes = {
  login: () => "/pages/login",
  register: () => "/pages/register",
  agenda: () => "/agenda",
  index: () => "/",
  pacientePage: (id: any) => "/pacientes/" + id,
  pacientes: () => "/pacientes",
  addArancelPublico: () => "/Arancel/AddArancel/AddArancelPublico",
  addArancelCooperativa: () => "/Arancel/AddArancel/AddArancelCooperativa",
  addConsulta: () => "/addConsulta"
};

export default appRoutes;
