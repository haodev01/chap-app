import axiosClients from "./axiosClients.js";


const authApi = {
  login: async (payload) => {
    return axiosClients.post('/auth/login', payload)
  },
  register: async (payload) => {
    return axiosClients.post('/auth/register', payload)
  },
  getUser: async () => {
    return axiosClients.get('/user/all')
  }
}

export default authApi