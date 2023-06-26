const appRoutes = {
  login: () => "/pages/login",
  register: () => "/pages/register",
  agenda: () => "/agenda",
  index: () => "/",
  pacientePage: (id: any) => "/pacientes/" + id,
  pacientes: () => "/pacientes",
  agregarPaciente: () => "/pacientes/agregar", 
  addArancelPublico: () => "/Arancel/AddArancel/AddArancelPublico",
  addArancelCooperativa: () => "/Arancel/AddArancel/AddArancelCooperativa",
  addArancelLaboratorio: () => "/Arancel/AddArancel/AddArancelLaboratorio",
  addConsulta: () => "/addConsulta"
};

export default appRoutes;
