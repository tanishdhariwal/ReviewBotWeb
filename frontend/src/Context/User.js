/**
 * Class representing a user.
 */
class User {
  /**
   * Create a user.
   * @param {string} username - The username of the user.
   * @param {string} email - The email of the user.
   */
  constructor(username, email) {
    this.username = username;
    this.email = email;
  }
}

/**
 * Class representing the authentication context type.
 */
class AuthContextType {
  /**
   * Create an authentication context type.
   * @param {User|null} user - The user object.
   * @param {boolean} isLoggedIn - The login status.
   * @param {Function} login - The login function.
   * @param {Function} logout - The logout function.
   */
  constructor(
    user = null,
    isLoggedIn = false,
    login = async () => {},
    logout = async () => {}
  ) {
    this.user = user;
    this.isLoggedIn = isLoggedIn;
    this.login = login;
    this.logout = logout;
  }
}

export { User, AuthContextType };
