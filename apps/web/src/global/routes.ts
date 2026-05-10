export const APP_ROUTES = {
  catalog: '/catalog',
  work: (id: string) => `/work/${id}`,
  libraries: '/libraries',
  libraryBranch: (id: string) => `/library/${id}`,
  profile: '/profile',
  favorite: '/profile/favorite',
  reservations: '/profile/reservations',
  auth: {
    login: '/login',
    register: '/register',
  },
};
