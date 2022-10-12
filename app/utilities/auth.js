import { getToken } from './token'

export const checkAuth = async () => {
    const authToken = await getToken('auth_token');

    if (authToken) {
      await authUser();
    }
    
    return;
}