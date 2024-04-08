// use this to decode a token and get the user's information out of it
import decode from 'jwt-decode';




class AuthService {
  // get user data
  getProfile() {
    return decode(this.getToken());
  }

  // check if user's logged in
  async loggedIn() {
    try {
      const { data } = await client.query({
        query: gql`
          query CheckAuth {
            checkAuth {
              isAuthenticated
            }
          }
        `,
      });

      return data.checkAuth.isAuthenticated;
    } catch (error) {
      console.error('Error checking authentication status:', error);
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem('id_token');
  }

  async login(email, password) {
    try {
      const { data } = await client.mutate({
        mutation: gql`
          mutation LoginUser($email: String!, $password: String!) {
            login(email: $email, password: $password) {
              token
            }
          }
        `,
        variables: { email, password },
      });

      const token = data.login.token;
      localStorage.setItem('id_token', token);
      window.location.assign('/');
    } catch (error) {
      console.error('Login failed:', error);
    }
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem('id_token');
    // this will reload the page and reset the state of the application
    window.location.assign('/');
  }
}

export default new AuthService();
