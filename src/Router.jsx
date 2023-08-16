import { Routes as Switch, Route } from 'react-router-dom'

import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import Application from './layout/Application'

import Dashboard from './pages/Dashboard'

import ListaEmpresas from './pages/empresas/List'
import RegistrarEmpresa from './pages/empresas/Add'
import DetallesEmpresa from './pages/empresas/Details'
import EditarEmpresa from './pages/empresas/Edit'

import ListaSucursales from './pages/sucursales/List'
import RegistrarSucursal from './pages/sucursales/Add'
import DetallesSucursal from './pages/sucursales/Details'
import EditarSucursal from './pages/sucursales/Edit'

import ListaClientes from './pages/clientes/List'
import RegistrarCliente from './pages/clientes/Add'
import DetallesCliente from './pages/clientes/Details'
import EditarCliente from './pages/clientes/Edit'

import ListaSolicitudes from './pages/solicitudes/List'
import RegistrarSolicitud from './pages/solicitudes/Add'
import DetallesSolicitud from './pages/solicitudes/Details'

import NotFound from './pages/NotFound'

const Router = () => {
    return <>
        <Switch>
            {/* public routes */}
            <Route path='/' element={<Login />} />
            <Route path='/registrarse' element={<Register />} />

            {/* private routes */}
            <Route path='/app' element={<Application />}>
                <Route index element={<Dashboard />} />

                <Route path='empresas' element={<ListaEmpresas />} />
                <Route path='empresas/registrar' element={<RegistrarEmpresa />} />
                <Route path='empresas/detalles/:id' element={<DetallesEmpresa />} />
                <Route path='empresas/editar/:id' element={<EditarEmpresa />} />

                <Route path='sucursales' element={<ListaSucursales />} />
                <Route path='sucursales/registrar' element={<RegistrarSucursal />} />
                <Route path='sucursales/detalles/:id' element={<DetallesSucursal />} />
                <Route path='sucursales/editar/:id' element={<EditarSucursal />} />

                <Route path='clientes' element={<ListaClientes />} />
                <Route path='clientes/registrar' element={<RegistrarCliente />} />
                <Route path='clientes/detalles/:id' element={<DetallesCliente />} />
                <Route path='clientes/editar/:id' element={<EditarCliente />} />

                <Route path='solicitudes' element={<ListaSolicitudes />} />
                <Route path='solicitudes/registrar' element={<RegistrarSolicitud />} />
                <Route path='solicitudes/detalles/:id' element={<DetallesSolicitud />} />
            </Route>

            {/* 404 error */}
            <Route path='*' element={<NotFound />} />
        </Switch>
    </>
}

export default Router
