import http from './http'

export const login = async (data) => {
    try {

        const res = await http.post('/auth/login', data)

        const { usuario } = res.data

        sessionStorage.setItem('usuario', JSON.stringify({...usuario}))

        return {
            success: true,
            msg: 'Autenticado exitosamente',
        }

    } catch (err) {
        return {
            success: false,
            msg: err.response.data.msg || err.response.data.message,
        }
    }
}

export const register = async (data) => {
    try {

        const res = await http.post('/auth/registrarse', data)

        return {
            success: true,
            msg: 'Registrado exitosamente',
        }

    } catch (err) {
        return {
            success: false,
            msg: err.response.data.msg || err.response.data.message,
        }
    }
}

export const logout = () => {
    sessionStorage.clear()
}

export const getUserLogged = () => {
    const user = JSON.parse(sessionStorage.getItem('usuario'))
    return user
}
