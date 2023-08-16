import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { useSelector } from 'react-redux'

const Details = () => {

    const [sucursal, setSucursal] = useState({})

    const sucursales = useSelector((state) => state.sucursales.data)
    const params = useParams()

    useEffect(() => {
        document.title = `Sucursal #${params.id}`
    }, [params])

    useEffect(() => {

        const item = sucursales.filter(i => i.id == params.id)[0]
        setSucursal(item)

    }, [params, sucursal, setSucursal])

    return <>
        <div className='row mb-3'>
            <div className='col-sm-12 col-md-6'>
                <Link
                    to='/app/sucursales'
                    className='text-decoration-none d-inline-flex align-items-center'
                >
                    <ChevronLeft />
                    <span className='ms-1'>Lista de sucursales</span>
                </Link>
                <h4 className='fw-semibold'>Sucursal #{params.id}</h4>
            </div>
        </div>

        <div>

            <div className='mb-3'>
                <p className='text-muted m-0'># sucursal</p>
                <h6 className='fw-semibold'>{sucursal.id}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Nombre de sucursal</p>
                <h6 className='fw-semibold'>{sucursal.nombre}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Telefono</p>
                <h6 className='fw-semibold'>{sucursal.telefono}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Direccion</p>
                <h6 className='fw-semibold'>{`${sucursal.direccion}, ${sucursal.muni}, ${sucursal.depa}`}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Telefono</p>
                <h6 className='fw-semibold'>{sucursal.telefono}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Estado</p>
                <h6 className='fw-semibold'>{sucursal.activo ? 'Activo' : 'Inactivo'}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Empresa</p>
                <h6 className='fw-semibold'>{sucursal.razon_social}</h6>
            </div>

        </div>
    </>
}

export default Details
