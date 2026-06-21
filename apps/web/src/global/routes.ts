export const APP_ROUTES = {
  catalog: '/catalog',
  work: {
    index: (id: string) => `/work/${id}`,
    viewer: (id: string) => `/work/${id}/viewer`,
  },
  library: {
    index: '/library',
    libraryBranch: (id: string) => `/library/${id}`
  },
  profile: {
    index: '/profile',
    favorite: '/profile/favorite',
    reservations: '/profile/reservations',
    works: '/profile/works',
  },
  auth: {
    login: '/login',
    register: '/register',
  },
};
