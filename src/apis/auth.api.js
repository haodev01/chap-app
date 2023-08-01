import axiosClients from "./axiosClients.js";


const authApi = {
  login: async (payload) => {
    return axiosClients.post('/auth/login', payload)
  }
}

export default authApi