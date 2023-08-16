import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { useSelector } from 'react-redux'

const Details = () => {

    const [empresa, setEmpresa] = useState({})

    const empresas = useSelector((state) => state.empresas.data)
    const params = useParams()

    useEffect(() => {
        document.title = `Empresa #${params.id}`
    }, [params])

    useEffect(() => {

        const item = empresas.filter(i => i.id == params.id)[0]
        setEmpresa(item)

    }, [params, empresas, setEmpresa])

    return <>
        <div className='row mb-3'>
            <div className='col-sm-12 col-md-6'>
                <Link
                    to='/app/empresas'
                    className='text-decoration-none d-inline-flex align-items-center'
                >
                    <ChevronLeft />
                    <span className='ms-1'>Lista de empresas</span>
                </Link>
                <h4 className='fw-semibold'>Empresa #{params.id}</h4>
            </div>
        </div>

        <div>

            <div className='mb-3'>
                <p className='text-muted m-0'># empresa</p>
                <h6 className='fw-semibold'>{empresa.id}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Empresa</p>
                <h6 className='fw-semibold'>{empresa.razon_social}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>NRC</p>
                <h6 className='fw-semibold'>{empresa.nrc}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Estado</p>
                <h6 className='fw-semibold'>{empresa.activo ? 'Activo' : 'Inactivo'}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Propietario</p>
                <h6 className='fw-semibold'>{`${empresa.nombre} ${empresa.apellido}`}</h6>
            </div>

        </div>
    </>
}

export default Details
