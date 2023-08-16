import http from './http'
import { getUserLogged } from './auth.service'

export const listarSolicitudesAsync = async () => {
    try {

        const userLogged = getUserLogged()

        const res = await http.get('/solicitudes', {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            },
            params: {
                cid: userLogged.id,
            }
        })

        console.log(res);

        return res.data

    } catch (err) {
        throw err
    }
}

export const registrarSolicitudAsync = async (data) => {
    try {

        const userLogged = getUserLogged()

        const res = await http.post('/solicitudes', data, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            }
        })

        const { solicitud } = res.data

        return {
            success: true,
            msg: 'Registrado exitosamente',
            datos: solicitud
        }

    } catch (err) {
        return {
            success: false,
            msg: err.response.data.msg
        }
    }
}

export const detallesSolicitudAsync = async (id) => {
    try {

        const userLogged = getUserLogged()

        const res = await http.get(`/solicitudes/${id}`, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`
            }
        })

        return res.data

    } catch (err) {
        throw err
    }
}
