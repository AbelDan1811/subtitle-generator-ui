import axios from 'axios'

const baseUrl = 'http://localhost:5000'

export const createRequest = async ({ method, url, data }) => {
    try {
        const {data: resp} = await axios({
            method,
            url: `${baseUrl}${url}`,
            data,
        })

        return resp
    } catch (e) {
        console.log(e)
        return null
    }
}