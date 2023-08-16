import http from './http'
import { getUserLogged } from './auth.service'

export const registrarDireccionAsync = async (data) => {
    try {

        const userLogged = getUserLogged()

        const res = await http.post('/direcciones', data, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`
            }
        })

        const { direccion } = res.data

        return {
            success: true,
            msg: 'Registrado exitosamente',
            datos: direccion
        }

    } catch (err) {
        return {
            success: false,
            msg: 'Algo ha fallado'
        }
    }
}

export const eliminarDireccionAsync = async (id) => {
    try {

        const userLogged = getUserLogged()

        const res = await http.delete(`/direcciones/${id}`, {
            headers: {
                'Authorization': `Bearer ${userLogged.jwt}`,
            }
        })

        return {
            success: true,
            msg: 'Eliminado exitosamente',
        }

    } catch (err) {
        return {
            success: false,
            msg: 'Algo ha fallado',
        }
    }
}
