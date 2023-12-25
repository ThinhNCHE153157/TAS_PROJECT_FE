export const BASE_URL = 'http://103.179.173.136:5000/api/';
export const ROLE = {
    Admin: 'Admin',
    Teacher: 'Teacher',
    Student: 'Student',
    Enterprise: 'Enterprise',
};

export const ROUTES = {
    homepage: '/',
    common: {
        login: '/login',
        register: '/register',
        unauthorized: '/unauthorized',
        forgotpassword: '/forgotpassword',
        resetpassword: '/resetpassword',
        changepassword: '/changepassword',
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
