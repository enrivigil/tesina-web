import http from './http'
import { getUserLogged } from './auth.service'

export const listarEmpresasAsync = async () => {
    try {

        const userLogged = getUserLogged()

        const res = await http.get(`/empresas`, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            },
            params: {
                cid: userLogged.id,
            }
        })

        const { datos } = res.data

        return datos

    } catch (err) {
        throw err
    }
}

export const registrarEmpresaAsync = async (data) => {
    try {

        const userLogged = getUserLogged()

        data = {
            ...data,
            cliente_id: userLogged.id,
        }

        const res = await http.post('/empresas', data, {
            headers: {
                'Authorization': `Bearer: ${userLogged.jwt}`,
            }
        })

        const { empresa } = res.data

        return {
            success: true,
            msg: res.data.msg,
            datos: empresa,
        }

    } catch (err) {
        return {
            success: false,
            msg: err.response.data.msg
        }
    }
}

export const editarEmpresaAsync = async (data) => {
    try {

        const userLogged = getUserLogged()

        data = {
            ...data,
            cliente_id: userLogged.id,
        }

        const res = await http.put(`/empresas/${data.id}`, data, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            }
        })

        const { empresa } = res.data

        return {
            success: true,
            msg: res.data.msg,
            datos: empresa,
        }

    } catch (err) {
        return {
            success: false,
            msg: err.response.data.msg
        }
    }
}

export const eliminarEmpresaAsync = async (id) => {
    try {

        const userLogged = getUserLogged()

        const res = await http.delete(`/empresas/${id}`, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`
            }
        })

        return {
            success: true,
            msg: 'Eliminado exitosamente',
        }

    } catch (err) {
        return {
            success: false,
            msg: err.response.data.msg
        }
    }
}