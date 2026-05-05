export const APP_ROUTES = {
  catalog: '/catalog',
  work: (id: string) => `/work/${id}`,
  libraries: '/libraries',
  libraryBranch: (id: string) => `/library/${id}`,
  profile: '/profile',
  auth: {
    login: '/login',
    register: '/register',
  },
};
