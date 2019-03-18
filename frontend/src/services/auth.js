export const TOKEN_KEY = "node-bike"
export const isAuthenticated = () => sessionStorage.getItem(TOKEN_KEY) !== null

export const getToken = () => sessionStorage.getItem(TOKEN_KEY)
export const login = token => {
  sessionStorage.setItem(TOKEN_KEY, token)
}
export const logout = () => {
  sessionStorage.removeItem(TOKEN_KEY)
}
export const getUserId = () => {
  const token = sessionStorage.getItem(TOKEN_KEY)
  if (token !== null) {
    try {
      const payload = (JSON.parse(atob(token.split('.')[1])))
      return payload.id
    } catch (e) {
      return false
    }
  }
  return false
}