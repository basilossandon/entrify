import api from './index';

export function loginEmailAndPassword(email: string, password: string): Promise<any> {
    return api.post('/auth/login', {email, password});
};