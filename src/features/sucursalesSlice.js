import { createSlice } from '@reduxjs/toolkit'

export const sucursalesSlice = createSlice({
    name: 'sucursales',
    initialState: {
        data: [],
    },
    reducers: {
        listarSucursales: (state, action) => {
            state.data = action.payload
        },
        registrarSucursal: (state, action) => {
            state.data.push(action.payload)
        },
        editarSucursal: (state, action) => {
            const index = state.data.findIndex(i => i.id == action.payload.id)
            state.data[index] = {
                ...state.data[index],
                ...action.payload,
            }
        },
        eliminarSucursal: (state, action) => {
            state.data = state.data.filter(i => i.id != action.payload)
        }
    },
})

export const { listarSucursales, registrarSucursal, editarSucursal, eliminarSucursal } = sucursalesSlice.actions

export default sucursalesSlice.reducer
