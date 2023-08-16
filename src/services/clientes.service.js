import http from './http'
import { getUserLogged } from './auth.service'

export const listarClientesAsync = async () => {
    try {

        const userLogged = getUserLogged()

        const res = await http.get('/destinatarios', {
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

export const registarClienteAsync = async (data) => {
    try {

        const userLogged = getUserLogged()

        data = {
            ...data,
            cliente_id: userLogged.id,
        }

        const res = await http.post(`/destinatarios`, data, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`
            }
        })

        const { destinatario } = res.data

        return {
            success: true,
            msg: 'Registrado exitosamente',
            datos: destinatario,
        }

    } catch (err) {
        return {
            success: false,
            msg: 'Algo ha fallado',
        }
    }
}

export const editarClienteAsync = async (data) => {
    try {

        const userLogged = getUserLogged()

        const res = await http.put(`/destinatarios/${data.id}`, data, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            }
        })

        console.log(res);

        const { destinatario } = res.data

        return {
            success: true,
            msg: res.data.msg,
            datos: destinatario,
        }

    } catch (err) {
        return {
            success: false,
            msg: err.response.data.msg
        }
    }
}

export const eliminarClienteAsync = async (id) => {
    try {

        const userLogged = getUserLogged()

        const res = await http.delete(`/destinatarios/${id}`, {
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
            msg: 'Algo ha fallado'
        }
    }
}