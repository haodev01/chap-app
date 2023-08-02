import axiosClients from "./axiosClients.js";


const roomApi = {
  getAll: async  () => {
    return axiosClients.get('/room/all')
  },
  get: async (roomId) => {
    return axiosClients.get(`/room/${roomId}?page=0&limit=100`)
  },
  add: async (payload) => {
    return axiosClients.post('/room/initate', payload)
  }
}

export default  roomApi