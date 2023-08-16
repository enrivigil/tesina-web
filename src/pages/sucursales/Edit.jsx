import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import RequiredLabel from '../../components/RequiredLable'
import LoaderButton from '../../components/LoaderButton'

import { listarEmpresasAsync } from '../../services/empresas.service'
import { listarDepartamentosAsync, listarMunicipiosAsync } from '../../services/common.service'

import { editarSucursalAsync } from '../../services/sucursales.service'
import { editarSucursal } from '../../features/sucursalesSlice'

const Edit = () => {

    const [loading, setLoading] = useState(false)
    const [sucursal, setSucursal] = useState({
        id: 0,
        nombre: '',
        telefono: '',
        direccion: '',
        municipio_id: 0,
        activo: 0,
        depid: 0,
    })
    const [departamentos, setDepartamentos] = useState([])
    const [municipios, setMunicipios] = useState([])
    // const [empresas, setEmpresas] = useState([])
    const [depid, setDepid] = useState(0)

    const params = useParams()
    const navigate = useNavigate()
    const sucursales = useSelector((state) => state.sucursales.data)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Registrar empresa'
    }, [])

    useEffect(() => {

        const commonAsync = async () => {
            const deps = await listarDepartamentosAsync()
            const muns = await listarMunicipiosAsync()
            // const emps = await listarEmpresasAsync()

            setDepartamentos(deps)
            setMunicipios(muns)
            // setEmpresas(emps)
        }

        commonAsync()

    }, [
        listarDepartamentosAsync,
        listarMunicipiosAsync,
        listarEmpresasAsync,
        setDepartamentos,
        setMunicipios,
        // setEmpresas,
    ])

    useEffect(() => {

        const item = sucursales.filter(i => i.id == params.id)[0]
        setSucursal(item)
        setDepid(item.depid)

    }, [setSucursal, params])

    const handleChangeDepartamento = (e) => {
        const { value } = e.target
        setDepid(value)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setSucursal({
            ...sucursal,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const res = await editarSucursalAsync(sucursal)

        if (!res.success) {
            setLoading(false)
            toast.error(res.msg)
            return
        }

        dispatch(editarSucursal(res.datos))

        setLoading(false)
        toast.success(res.msg)
        navigate('/app/sucursales')
    }

    const filtrarMunicipiosPorDepartamento = (data) => {
        return data.filter(i => i.departamento_id == depid)
    }

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
                <h4 className='fw-semibold'>Editar sucursal</h4>
            </div>
        </div>

        <div className='row'>
            <div className='col-sm-12 col-md-6'>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Nombre de sucursal' />
                        <Form.Control
                            type='text'
                            placeholder='Nombre de sucursal'
                            className='rounded-1'
                            name='nombre'
                            onChange={handleChange}
                            value={sucursal.nombre}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Telefono' />
                        <Form.Control
                            type='text'
                            placeholder='Telefono'
                            className='rounded-1'
                            name='telefono'
                            onChange={handleChange}
                            value={sucursal.telefono}
                        />
                    </Form.Group>

                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <Form.Group className='mb-3'>
                                <RequiredLabel text='Departamento' />
                                <Form.Select
                                    className='rounded-1'
                                    onChange={handleChangeDepartamento}
                                    value={sucursal.depid}
                                >
                                    <option value="">Elegir departamento</option>
                                    {departamentos.map((i, j) => <option
                                        key={j}
                                        value={i.id}
                                    >
                                        {i.nombre}
                                    </option>)}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <Form.Group className='mb-3'>
                                <RequiredLabel text='Municipio' />
                                <Form.Select
                                    className='rounded-1'
                                    name='municipio_id'
                                    onChange={handleChange}
                                    value={sucursal.municipio_id}
                                >
                                    <option value="">Elegir municipio</option>
                                    {
                                        filtrarMunicipiosPorDepartamento(municipios)
                                            .map((i, j) => <option key={j} value={i.id}>
                                                {i.nombre}
                                            </option>)}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Direccion' />
                        <Form.Control
                            type='text'
                            placeholder='Direccion'
                            className='rounded-1'
                            name='direccion'
                            onChange={handleChange}
                            value={sucursal.direccion}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Estado' />
                        <Form.Select
                            className='rounded-1'
                            name='activo'
                            value={sucursal.activo}
                            onChange={handleChange}
                        >
                            <option value="">Elegir opcion</option>
                            {
                                [0, 1].map((i, j) => <option
                                    key={j}
                                    value={i}
                                >
                                    {i == 1 ? 'Activo' : 'Inactivo'}
                                </option>)
                            }
                        </Form.Select>
                    </Form.Group>
                    <div>
                        <LoaderButton loading={loading} text='Editar' />
                        <Link to='/app/sucursales' className='btn btn-link text-decoration-none text-muted rounded-1 ms-1'>Cancelar</Link>
                    </div>
                </Form>

            </div>
        </div>
    </>
}

export default Edit
