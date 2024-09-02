import { BehaviorSubject } from 'rxjs';
/* CurrentUserSubject stores the current user, which is obtained from sessionStorage when initialized. */
const currentUserSubject = new BehaviorSubject(JSON.parse(sessionStorage.getItem('currentUser')));

export const AuthService = {
    expirationTime: 60 * 5,  // Seconds
    idleInterval: null,
    idleTime: 0,
    /* Receive updates about the current user */
    currentUser: currentUserSubject.asObservable(),
    /* Get the current value of the user from currentUserSubject */
    currentUserValue: () => {
        return currentUserSubject.value;
    },

    login: (email, password) => {
        /* Define test credentials */
        const validEmail = 'useragustin';
        const validPassword = 'passagustin';

        if (email === validEmail && password === validPassword) {
            const mockData = {
                access_token: 'mock_access_token',
                expires_in: 'mock_refresh_token'
            };
            /* Store an access token and a user object in sessionStorage, and update currentUserSubject with the user */
            sessionStorage.setItem('access', mockData.access_token);
            sessionStorage.setItem('refresh', mockData.expires_in);
            const user = { email }; // Simulate a user object
            sessionStorage.setItem('currentUser', JSON.stringify(user));
            currentUserSubject.next(user);
            return Promise.resolve(mockData);
        }
        return Promise.reject('Invalid credentials');
    },

    logout: () => {
        /* Remove the user data from sessionStorage and reset currentUserSubject to null */
        sessionStorage.removeItem('currentUser');
        sessionStorage.removeItem('access');
        sessionStorage.removeItem('refresh');
        currentUserSubject.next(null);
        AuthService.removeListeners();
    },

    loadUser: async () => {
        /* Attempt to load the user from sessionStorage and update currentUserSubject */
        const access = sessionStorage.getItem('access');
        if (!access) {
            throw new Error("No Access");
        }
        const user = JSON.parse(sessionStorage.getItem('currentUser'));
        if (!user) {
            throw new Error("No User Data");
        }
        currentUserSubject.next(user);
        return user;
    },

    getToken() {
        /* Return the current user's access token as a Bearer header */
        return `Bearer ${sessionStorage.getItem('access')}`;
    },

    /* Inactivity management methods (resetIdle, timerIncrement, removeListeners, startListeners) */

    resetIdle: function() {
        const pendingDelta = AuthService.expirationTime - AuthService.idleTime;
        if (pendingDelta < 60) {
            AuthService.idleTime = 0;
            AuthService.refresh();          
        }
    },

    timerIncrement: function() {
        AuthService.idleTime = AuthService.idleTime + 1;
    },

    removeListeners: () => {
        document.removeEventListener('keypress', AuthService.resetIdle, false);
        if (AuthService.idleInterval) clearInterval(AuthService.idleInterval);
    },

    startListeners: () => {
        AuthService.idleInterval = setInterval(AuthService.timerIncrement, 1000);
        document.addEventListener('mousemove', AuthService.resetIdle, false);
        document.addEventListener('keypress', AuthService.resetIdle, false);
    },
};
