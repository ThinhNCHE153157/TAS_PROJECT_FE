export const BASE_URL = 'http://localhost:3000';
export const ROUTES = {
    homepage: '/',
    common: {
        login: '/login',
        register: '/register',
    },
    admin: {
        dashboard: '/admin/dashboard',
        users: '/admin/users',
        user: '/admin/user/:id',
        adduser: '/admin/adduser',
        edituser: '/admin/edituser/:id',
    },
    user: {
        dashboard: '/user/dashboard',
        profile: '/user/profile',
        editprofile: '/user/editprofile',
    },
    teacher: {},
    student: {},
    enterprise: {},
};
