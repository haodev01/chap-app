import axiosClients from "./axiosClients.js";


const roomApi = {
  getAll: async  () => {
    return axiosClients.get('/room/all')
  }
}

export default  roomApi