import http from './http'
import { getUserLogged } from './auth.service'

export const listarSucursalesAsync = async () => {
    try {

        const userLogged = getUserLogged()

        const res = await http.get(`/sucursales`, {
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

export const registrarSucursalAsync = async (data) => {
    try {

        const userLogged = getUserLogged()

        data = {
            ...data,
            cliente_id: userLogged.id,
        }

        const res = await http.post('/sucursales', data, {
            headers: {
                'Authorization': `Bearer: ${userLogged.jwt}`,
            }
        })

        const { sucursal } = res.data

        return {
            success: true,
            msg: res.data.msg,
            datos: sucursal,
        }

    } catch (err) {
        return {
            success: false,
            msg: err.response.data.msg
        }
    }
}

export const editarSucursalAsync = async (data) => {
    try {

        const userLogged = getUserLogged()

        data = {
            ...data,
            cliente_id: userLogged.id,
        }

        const res = await http.put(`/sucursales/${data.id}`, data, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            }
        })

        const { sucursal } = res.data

        return {
            success: true,
            msg: res.data.msg,
            datos: sucursal,
        }

    } catch (err) {
        return {
            success: false,
            msg: err.response.data.msg
        }
    }
}

export const eliminarSucursalAsync = async (id) => {
    try {

        const userLogged = getUserLogged()

        const res = await http.delete(`/sucursales/${id}`, {
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
            msg: err.response.data.msg || 'Algo ha fallado'
        }
    }
}