const axios = require('axios');

const fetchUsers = () => {
    return axios.get('/api/users');
}

const fetchPhones = () => {
    return axios.get('/api/phones');
}

module.exports = {
    fetchUsers, fetchPhones
}