import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import SearchForm from '../../components/SearchForm'

import { listarSolicitudesAsync } from '../../services/solicitudes.service'
import { listarSolicitudes, eliminarSolicitud } from '../../features/solicitudesSlice'

const List = () => {

    const [query, setQuery] = useState('')
    const [estado, setEstado] = useState('all')

    const dispatch = useDispatch()
    const solicitudes = useSelector((state) => state.solicitudes.data)

    useEffect(() => {
        document.title = 'Lista de solicitudes'
    }, [])

    useEffect(() => {

        const fetchSolicitudes = async () => {
            const res = await listarSolicitudesAsync()

            dispatch(listarSolicitudes(res))
        }

        fetchSolicitudes()

    }, [listarSolicitudesAsync, dispatch, listarSolicitudes])

    const handleChange = (e) => {
        const { value } = e.target

        setQuery(value)
    }

    const handleChangeEstado = (e) => {
        const { value } = e.target
        setEstado(value)
    }

    const filteredData = (data) => {

        const filterBy = ['id', 'dest_nombre', 'dest_apellido', 'num_codigo']

        return data
            .filter(i => {
                if (estado == 'all') return i
                else return i.estado == estado
            })
            .filter(i => filterBy.some(j =>
                i[j]
                    .toString()
                    .toLowerCase()
                    .includes(query)
            ))
    }

    return <>

        <div className='row mb-3'>
            <div className='col-sm-12 col-md-6'>
                <Link
                    to='/app'
                    className='text-decoration-none d-inline-flex align-items-center'
                >
                    <ChevronLeft />
                    <span className='ms-1'>Dashboard</span>
                </Link>
                <h4 className='fw-semibold'>Lista de solicitudes</h4>
            </div>
            <div className='col-sm-12 col-md-6 text-md-end'>
                <Link to='/app/solicitudes/registrar' className='btn btn-primary rounded-1 fw-semibold'>Registrar solicitud</Link>
            </div>
        </div>

        <div className='row'>
            <div className='col-sm-12 col-md-5 mb-3'>
                <SearchForm handleChange={handleChange} />
            </div>
            <div className='col-sm-12 col-md-2 mb-3'>
                <select className='form-select rounded-1' onChange={handleChangeEstado}>
                    <option value="all">Todos</option>
                    <option value="Notificado">Notificado</option>
                    <option value="Recolecatdo">Recolecatdo</option>
                    <option value="Enviado">Enviado</option>
                    <option value="Entregado">Entregado</option>
                </select>
            </div>
        </div>

        <div className='table-responsive'>
            <table className='table table-borderless'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Codigo</th>
                        <th>Descripcion</th>
                        <th>Cliente</th>
                        <th>Direccion</th>
                        <th>Estado</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData(solicitudes).map((i, j) => <tr key={j}>
                        <td>{i.id}</td>
                        <td>{`${i.prefijo_codigo}${i.num_codigo}${i.sufijo_codigo}`}</td>
                        <td>{i.descripcion}</td>
                        <td>{`${i.dest_nombre} ${i.dest_apellido}`}</td>
                        <td>{`${i.direccion}, ${i.mun}, ${i.dep}`}</td>
                        <td>{i.estado}</td>
                        <td style={{ width: 140, }} className='text-end'>
                            <Link className='btn btn-link m-0 p-0 text-decoration-none' to={`/app/solicitudes/detalles/${i.id}`}>Detalles</Link>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>
}

export default List
