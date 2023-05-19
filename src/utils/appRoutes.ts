const appRoutes = {
  login: () => "/pages/login",
  register: () => "/pages/register",
  index: () => "/",
  pacientePage: (id: any) => "/pacientes/" + id,
  pacientes: () => "/pacientes",
};

export default appRoutes;
