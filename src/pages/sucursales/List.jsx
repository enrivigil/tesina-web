import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import toast from 'react-hot-toast'

import SearchForm from '../../components/SearchForm'

import { listarSucursalesAsync, eliminarSucursalAsync } from '../../services/sucursales.service'
import { listarSucursales, eliminarSucursal } from '../../features/sucursalesSlice'

const List = () => {

    const [query, setQuery] = useState('')
    const [estado, setEstado] = useState('all')

    const dispatch = useDispatch()
    const sucursales = useSelector((state) => state.sucursales.data)

    useEffect(() => {
        document.title = 'Lista de sucursales'
    }, [])

    useEffect(() => {

        const fetchSucursales = async () => {
            const res = await listarSucursalesAsync()

            dispatch(listarSucursales(res))
        }

        fetchSucursales()

    }, [listarSucursalesAsync, dispatch, listarSucursales])

    const handleEliminarSucursal = async (id) => {
        if (!confirm('Deseas eliminar este registro?')) return

        const res = await eliminarSucursalAsync(id)
        
        if (!res.success) {
            toast.error(res.msg)
            return
        }
        
        dispatch(eliminarSucursal(id))
        toast.success(res.msg)
    }

    const handleChange = (e) => {
        const { value } = e.target

        setQuery(value)
    }

    const handleChangeEstado = (e) => {
        const { value } = e.target
        setEstado(value)
    }

    const filteredData = (data) => {

        const filterBy = ['id', 'nombre',]

        return data
            .filter(i => {
                if (estado == 'all') return i
                else return i.activo == parseInt(estado)
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
                <h4 className='fw-semibold'>Lista de sucursales</h4>
            </div>
            <div className='col-sm-12 col-md-6 text-md-end'>
                <Link to='/app/sucursales/registrar' className='btn btn-primary rounded-1 fw-semibold'>Registrar sucursal</Link>
            </div>
        </div>

        <div className='row'>
            <div className='col-sm-12 col-md-5 mb-3'>
                <SearchForm handleChange={handleChange} />
            </div>
            <div className='col-sm-12 col-md-2 mb-3'>
                <select className='form-select rounded-1' onChange={handleChangeEstado}>
                    <option value="all">Todos</option>
                    <option value="1">Activo</option>
                    <option value="0">Inactivo</option>
                </select>
            </div>
        </div>

        <div className='table-responsive'>
            <table className='table table-borderless'>
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Nombre sucursal</th>
                        <th>Telefono</th>
                        <th>Direccion</th>
                        <th>Estado</th>
                        <th>Empresa</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {filteredData(sucursales).map((i, j) => <tr key={j}>
                        <td>{i.id}</td>
                        <td>{i.nombre}</td>
                        <td>{i.telefono}</td>
                        <td>{`${i.direccion}, ${i.muni}, ${i.depa}`}</td>
                        <td>{i.activo ? 'Activo' : 'Inactivo'}</td>
                        <td>{i.razon_social}</td>
                        <td style={{ width: 180, }}>
                            <Link className='btn btn-link m-0 p-0 text-decoration-none' to={`/app/sucursales/detalles/${i.id}`}>Detalles</Link> |{' '}
                            <Link className='btn btn-link m-0 p-0 text-decoration-none' to={`/app/sucursales/editar/${i.id}`}>Editar</Link> |{' '}
                            <Button
                                variant='link'
                                className='m-0 p-0 text-decoration-none'
                                onClick={(e) => handleEliminarSucursal(i.id)}
                            >
                                Eliminar
                            </Button>
                        </td>
                    </tr>)}
                </tbody>
            </table>
        </div>
    </>
}

export default List
