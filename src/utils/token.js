export const setToken = (token) => {
  //字符串不需要JSON.Stringify
  localStorage.setItem('TOKEN', token)
}

export const getToken = () => {
  return localStorage.getItem('TOKEN')
}

export const removeToken = () => {
  localStorage.removeItem('TOKEN')
}