const useAuth = () => {
    const user = JSON.parse(localStorage.getItem('user'));
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    return { user, refreshToken, accessToken, isAuthenticated: !!user };
}

export default useAuth