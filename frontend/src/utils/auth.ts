export class Auth {
  static storageKey = "session_fast_gpt";

  static getToken() {
    return localStorage.getItem(this.storageKey);
  }

  static setToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  static removeToken() {
    localStorage.removeItem(this.storageKey);
  }

  static isLoggedIn() {
    return this.getToken() !== null;
  }
}
