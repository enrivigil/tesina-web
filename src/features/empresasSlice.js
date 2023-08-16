import { createSlice } from '@reduxjs/toolkit'

export const empresasSlice = createSlice({
    name: 'empresas',
    initialState: {
        data: []
    },
    reducers: {
        listarEmpresas: (state, action) => {
            state.data = action.payload
        },
        registrarEmpresa: (state, action) => {
            state.data.push(action.payload)
        },
        editarEmpresa: (state, action) => {
            const index = state.data.findIndex(i => i.id == action.payload.id)
            state.data[index] = {
                ...state.data[index],
                ...action.payload
            }
        },
        eliminarEmpresa: (state, action) => {
            state.data = state.data.filter(i => i.id != action.payload)
        }
    },
})

export const { listarEmpresas, registrarEmpresa, editarEmpresa, eliminarEmpresa } = empresasSlice.actions

export default empresasSlice.reducer
