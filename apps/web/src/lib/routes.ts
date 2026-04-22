export const APP_ROUTES = {
    catalog: '/catalog/',
    book: (id: string) => `/book/${id}/`,
    libraryBranch: (id: string) => `/library/${id}`,
    profile: '/profile/',
    auth: {
        login: '/login/',
        register: '/register/',
    },
}