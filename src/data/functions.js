
import axios from 'axios'

export default function getRefreshToken(url) {
    let endpoint = url + 'usuarios/refresh/'
    axios.post(endpoint, {}, {
        withCredentials: true
    }).then((response) => {
        console.log(response.data);
        return true
    }).catch((error) => {
        console.error('Erro: ' + error)
        window.location.href = window.location.origin + '/adm'
        return false
    })
}