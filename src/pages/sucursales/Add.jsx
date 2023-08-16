import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import RequiredLabel from '../../components/RequiredLable'
import LoaderButton from '../../components/LoaderButton'

import { listarEmpresasAsync } from '../../services/empresas.service'
import { listarDepartamentosAsync, listarMunicipiosAsync } from '../../services/common.service'

import { registrarSucursalAsync } from '../../services/sucursales.service'
import { registrarSucursal } from '../../features/sucursalesSlice'

const Add = () => {

    const [loading, setLoading] = useState(false)
    const [sucursal, setSucursal] = useState({
        nombre: '',
        telefono: '',
        direccion: '',
        municipio_id: 0,
        empresa_id: 0,
    })
    const [departamentos, setDepartamentos] = useState([])
    const [municipios, setMunicipios] = useState([])
    const [empresas, setEmpresas] = useState([])
    const [depid, setDepid] = useState(0)

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Registrar empresa'
    }, [])

    useEffect(() => {

        const commonAsync = async () => {
            const deps = await listarDepartamentosAsync()
            const muns = await listarMunicipiosAsync()
            const emps = await listarEmpresasAsync()

            setDepartamentos(deps)
            setMunicipios(muns)
            setEmpresas(emps)
        }

        commonAsync()

    }, [
        listarDepartamentosAsync,
        listarMunicipiosAsync,
        listarEmpresasAsync,
        setDepartamentos,
        setMunicipios,
        setEmpresas,
    ])

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

        const res = await registrarSucursalAsync(sucursal)

        if (!res.success) {
            setLoading(false)
            toast.error(res.msg)
            return
        }

        dispatch(registrarSucursal(res.datos))

        setLoading(false)
        toast.success(res.msg)
    }

    const filtrarMunicipiosPorDepartamento = (data) => {
        return data.filter(i => i.departamento_id == depid)
    }

    return <>
        <div className='row mb-3'>
            <div className='col-sm-12 col-md-6'>
                <Link
                    to='/app/empresas'
                    className='text-decoration-none d-inline-flex align-items-center'
                >
                    <ChevronLeft />
                    <span className='ms-1'>Lista de sucursales</span>
                </Link>
                <h4 className='fw-semibold'>Registrar sucursal</h4>
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
                        />
                    </Form.Group>

                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <Form.Group className='mb-3'>
                                <RequiredLabel text='Departamento' />
                                <Form.Select
                                    className='rounded-1'
                                    onChange={handleChangeDepartamento}
                                >
                                    <option value="">Elegir departamento</option>
                                    {departamentos.map((i, j) => <option key={j} value={i.id}>
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
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Empresa' />
                        <Form.Select
                            className='rounded-1'
                            name='empresa_id'
                            onChange={handleChange}
                        >
                            <option value="">Elegir empresa</option>
                            {empresas.map((i, j) => <option key={j} value={i.id}>
                                {i.razon_social}
                            </option>)}
                        </Form.Select>
                    </Form.Group>
                    <div>
                        <LoaderButton loading={loading} text='Guardar' />
                        <Link to='/app/sucursales' className='btn btn-link text-decoration-none text-muted rounded-1 ms-1'>Cancelar</Link>
                    </div>
                </Form>

            </div>
        </div>
    </>
}

export default Add
