import { createSlice } from '@reduxjs/toolkit'

export const clientesSlice = createSlice({
    name: 'clientes',
    initialState: {
        data: [],
    },
    reducers: {
        listarClientes: (state, action) => {
            state.data = action.payload
        },
        registarCliente: (state, action) => {
            state.data.push(action.payload)
        },
        editarCliente: (state, action) => {
            const index = state.data.findIndex(i => i.id == action.payload.id)
            state.data[index] = {
                ...state.data[index],
                ...action.payload
            }
        },
        eliminarCliente: (state, action) => {
            state.data = state.data.filter(i => i.id != action.payload)
        }
    }
})

export const { listarClientes, registarCliente, editarCliente, eliminarCliente } = clientesSlice.actions

export default clientesSlice.reducer
