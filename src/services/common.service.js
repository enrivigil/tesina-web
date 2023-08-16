import http from './http'
import { getUserLogged } from './auth.service'

export const listarDepartamentosAsync = async () => {
    try {

        const userLogged = getUserLogged()

        const res = await http.get('/departamentos', {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            }
        })

        const { departamentos } = res.data

        return departamentos

    } catch (err) {
        throw err
    }
}

export const listarMunicipiosAsync = async () => {
    try {

        const userLogged = getUserLogged()

        const res = await http.get('/municipios', {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            }
        })

        const { municipios } = res.data

        return municipios

    } catch (err) {
        throw err
    }
}

export const listarRutasAsync = async () => {
    try {

        const userLogged = getUserLogged()

        const res = await http.get('/rutas', {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`
            }
        })

        const { rutas } = res.data

        return rutas

    } catch (err) {
        throw err
    }
}

export const listarDepartamentosPorRutaAsync = async (ruta_id) => {
    try {

        const userLogged = getUserLogged()

        const res = await http.get(`/departamentos-por-ruta/${ruta_id}`, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            }
        })

        const { departamentos } = res.data

        return departamentos

    } catch (err) {
        throw err
    }
}

export const listarMunicipiosPorDepartamentoYRutaAsync = async (ruta_id, dep_id) => {
    try {

        const userLogged = getUserLogged()

        const res = await http.get(`/municipios-por-ruta-departamento/${ruta_id}/${dep_id}`, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            }
        })

        const { municipios } = res.data

        return municipios

    } catch (err) {
        throw err
    }
}
