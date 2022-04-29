import axios from 'axios'

const server = axios.create({
    baseURL:'http://47.112.210.28:3333',
    timeout:3000
})

export const getApiList = ()=>server.get('/api/list').then(res=>res.data.data)

