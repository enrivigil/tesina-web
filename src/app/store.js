import { configureStore } from '@reduxjs/toolkit'
import empresasReducer from '../features/empresasSlice'
import sucursalesReducer from '../features/sucursalesSlice'
import clientesReducer from '../features/clientesSlice'
import solicitudesReducer from '../features/solicitudesSlice'

export const store = configureStore({
    reducer: {
        empresas: empresasReducer,
        sucursales: sucursalesReducer,
        clientes: clientesReducer,
        solicitudes: solicitudesReducer,
    }
})
