import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft, CheckCircle } from 'react-feather'
import { useSelector } from 'react-redux'

import { detallesSolicitudAsync } from '../../services/solicitudes.service'

const Details = () => {

    const [solicitud, setSolicitud] = useState({})
    const [historial, setHistorial] = useState([])

    const params = useParams()

    useEffect(() => {
        document.title = `Solicitud #${params.id}`
    }, [params])

    useEffect(() => {

        const fetchDetalles = async () => {
            const res = await detallesSolicitudAsync(params.id)

            setSolicitud(res.solicitud)
            setHistorial(res.historial)
        }

        fetchDetalles()

    }, [params, detallesSolicitudAsync, setSolicitud, setHistorial])

    return <>
        <div className='row mb-3'>
            <div className='col-sm-12 col-md-6'>
                <Link
                    to='/app/solicitudes'
                    className='text-decoration-none d-inline-flex align-items-center'
                >
                    <ChevronLeft />
                    <span className='ms-1'>Lista de solicitudes</span>
                </Link>
                <h4 className='fw-semibold'>Solicitud #{params.id}</h4>
            </div>
        </div>

        <div className='row'>
            <div className='col-sm-12 col-md-6'>
                <div className='mb-3'>
                    <p className='text-muted m-0'># solicitud</p>
                    <h6 className='fw-semibold'>{solicitud.id}</h6>
                </div>
                <div className='mb-3'>
                    <p className='text-muted m-0'>Descripcion</p>
                    <h6 className='fw-semibold'>{solicitud.paquete}</h6>
                </div>
                <div className='mb-3'>
                    <p className='text-muted m-0'>Empresa</p>
                    <h6 className='fw-semibold'>{solicitud.empresa}</h6>
                </div>
                <div className='mb-3'>
                    <p className='text-muted m-0'>Cliente</p>
                    <h6 className='fw-semibold'>{`${solicitud.cliente} - ${solicitud.dui}`}</h6>
                </div>
                <div className='mb-3'>
                    <p className='text-muted m-0'>Direccion</p>
                    <h6 className='fw-semibold'>{solicitud.direccion}</h6>
                </div>
                <div className='mb-3'>
                    <p className='text-muted m-0'>Telefono</p>
                    <h6 className='fw-semibold'>{solicitud.telefono}</h6>
                </div>
            </div>
            <div className='col-sm-12 col-md-4'>
                <h5 className='fw-semibold mb-3'>Historial de movimientos</h5>
                <ul className='list-unstyled'>
                    {historial.map((i, j) => <li key={j} className='mb-3 d-flex align-items-center'>
                        <CheckCircle width={20} color='#36B37E' />
                        <div className='ms-2'>
                            <p className='text-muted m-0'>{i.fecha}</p>
                            <h6 className='fw-semibold'>{i.estado}</h6>
                        </div>
                    </li>)}
                </ul>
            </div>

        </div>
    </>
}

export default Details
