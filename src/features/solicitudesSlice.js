import { createSlice } from '@reduxjs/toolkit'

export const solicitudesSlic = createSlice({
    name: 'solicitudes',
    initialState: {
        data: []
    },
    reducers: {
        listarSolicitudes: (state, action) => {
            state.data = action.payload
        },
        registrarSolicitud: (state, action) => {
            state.data.push(action.payload)
        },
        eliminarSolicitud: (state, action) => {
            state.data = state.data.filter(i => i.id != action.payload)
        }
    }
})

export const { listarSolicitudes, registrarSolicitud, eliminarSolicitud } = solicitudesSlic.actions

export default solicitudesSlic.reducer
