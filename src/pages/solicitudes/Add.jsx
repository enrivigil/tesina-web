import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import RequiredLabel from '../../components/RequiredLable'
import LoaderButton from '../../components/LoaderButton'

import { listarEmpresasAsync } from '../../services/empresas.service'
import { listarSucursalesAsync } from '../../services/sucursales.service'

import { listarClientesAsync } from '../../services/clientes.service'

import { listarRutasAsync, listarDepartamentosPorRutaAsync, listarMunicipiosPorDepartamentoYRutaAsync } from '../../services/common.service'

import { registrarSolicitudAsync } from '../../services/solicitudes.service'

const Add = () => {

    const [loading, setLoading] = useState(false)
    const [solicitud, setSolicitud] = useState({
        descripcion: '',
        observacion: '',
        sucursal_id: 0,
        direccion_destinatario_id: 0,
        costo: 0,
        nom_ruta: '-',
        dir: '-',
    })

    const [ruta, setRuta] = useState(0)

    const [rutas, setRutas] = useState([])
    const [departamentos, setDepartamentos] = useState([])
    const [municipios, setMunicipios] = useState([])

    const [empresas, setEmpresas] = useState([])
    const [sucursales, setSucursales] = useState([])

    const [clientes, setClientes] = useState([])
    const [direcciones, setDirecciones] = useState([])

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Registrar solicitud'
    }, [])

    useEffect(() => {

        const commonAsync = async () => {
            const rutas = await listarRutasAsync()
            const empresas = await listarEmpresasAsync()
            const clientes = await listarClientesAsync()

            setRutas(rutas)
            setEmpresas(empresas)
            setClientes(clientes)
        }

        commonAsync()

    }, [
        listarRutasAsync, setRutas,
        listarEmpresasAsync, setEmpresas,
        listarClientesAsync, setClientes
    ])

    const handleChangeRuta = async (e) => {
        const { value } = e.target

        const deps = await listarDepartamentosPorRutaAsync(value)
        setDepartamentos(deps)
        setRuta(value)

        const rut = rutas.filter(i => i.id == value)[0]
        setSolicitud({
            ...solicitud,
            nom_ruta: rut.nombre
        })
    }

    const handleChangeDepartamento = async (e) => {
        const { value } = e.target

        const munis = await listarMunicipiosPorDepartamentoYRutaAsync(ruta, value)
        setMunicipios(munis)
        setSolicitud({
            ...solicitud,
            costo: 0,
        })
    }

    const handleChangeMunicipio = (e) => {
        const { value } = e.target

        const mun = municipios.filter(i => i.id == value)[0]
        setSolicitud({
            ...solicitud,
            costo: mun.costo
        })
    }

    const handleChangeEmpresa = async (e) => {
        const { value } = e.target

        const res = await listarSucursalesAsync()
        const datos = res.filter(i => i.empresa_id == value)

        setSucursales(datos)
    }

    const handleChangeCliente = async (e) => {
        const { value } = e.target

        const cliente = clientes.filter(i => i.id == parseInt(value))[0]
        setDirecciones(cliente.direcciones)
    }

    const handleChange = (e) => {
        const { name, value } = e.target

        setSolicitud({
            ...solicitud,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const res = await registrarSolicitudAsync(solicitud)

        if (!res.success) {
            setLoading(false)
            toast.error(res.msg)
            return
        }

        setLoading(false)
        toast.success('Registrado exitosamente')
    }

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
                <h4 className='fw-semibold'>Registrar solicitud</h4>
            </div>
        </div>

        <div className='row'>
            <div className='col-sm-12 col-md-8'>

                <Form onSubmit={handleSubmit}>

                    <div className='row'>
                        <div className='col-sm-12 col-md-3'>

                            <Form.Group className='mb-3'>
                                <Form.Label className='fw-semibold'>Ruta</Form.Label>
                                <Form.Select className='rounded-1' onChange={handleChangeRuta}>
                                    <option value="">Elegir ruta</option>
                                    {rutas.map((i, j) => <option key={j} value={i.id}>
                                        {i.nombre}
                                    </option>)}
                                </Form.Select>
                            </Form.Group>

                        </div>
                        <div className='col-sm-12 col-md-3'>

                            <Form.Group className='mb-3'>
                                <Form.Label className='fw-semibold'>Departamento</Form.Label>
                                <Form.Select className='rounded-1' onChange={handleChangeDepartamento}>
                                    <option value="">Elegir departamento</option>
                                    {departamentos.map((i, j) => <option key={j} value={i.id}>
                                        {i.nombre}
                                    </option>)}
                                </Form.Select>
                            </Form.Group>

                        </div>
                        <div className='col-sm-12 col-md-3'>

                            <Form.Group className='mb-3'>
                                <RequiredLabel text='Municipio' />
                                <Form.Select className='rounded-1' onChange={handleChangeMunicipio}>
                                    <option value="">Elegir municipio</option>
                                    {municipios.map((i, j) => <option key={j} value={i.id}>
                                        {i.nombre}
                                    </option>)}
                                </Form.Select>
                            </Form.Group>

                        </div>
                        <div className='col-sm-12 col-md-3'>
                            <label className='form-label'>Costo $</label>
                            <input type="text" readOnly className='form-control rounded-1' value={solicitud.costo} />
                        </div>
                    </div>

                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Descripcion' />
                        <Form.Control
                            type='text'
                            placeholder='Descripcion'
                            className='rounded-1'
                            name='descripcion'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Observacion' />
                        <Form.Control
                            type='text'
                            placeholder='Observacion'
                            className='rounded-1'
                            name='observacion'
                            onChange={handleChange}
                        />
                    </Form.Group>

                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <Form.Group className='mb-3'>
                                <Form.Label className='fw-semibold'>Empresa</Form.Label>
                                <Form.Select
                                    className='rounded-1'
                                    onChange={handleChangeEmpresa}
                                >
                                    <option value="">Elegir empresa</option>
                                    {empresas.map((i, j) => <option key={j} value={i.id}>
                                        {i.razon_social}
                                    </option>)}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <Form.Group className='mb-3'>
                                <RequiredLabel text='Sucursal' />
                                <Form.Select
                                    className='rounded-1'
                                    name='sucursal_id'
                                    onChange={handleChange}
                                >
                                    <option value="">Elegir sucursal</option>
                                    {sucursales.map((i, j) => <option key={j} value={i.id}>
                                        {i.nombre}
                                    </option>)}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <Form.Group className='mb-3'>
                                <Form.Label className='fw-semibold'>Cliente</Form.Label>
                                <Form.Select
                                    className='rounded-1'
                                    onChange={handleChangeCliente}
                                >
                                    <option value="">Elegir cliente</option>
                                    {clientes.map((i, j) => <option key={j} value={i.id}>
                                        {`${i.nombre} ${i.apellido} - ${i.dui}`}
                                    </option>)}
                                </Form.Select>
                            </Form.Group>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <Form.Group className='mb-3'>
                                <RequiredLabel text='Direccion del cliente' />
                                <Form.Select
                                    className='rounded-1'
                                    name='direccion_destinatario_id'
                                    onChange={handleChange}
                                >
                                    <option value="">Elegir direccion</option>
                                    {direcciones.map((i, j) => <option key={j} value={i.id}>
                                        {`${i.nombre} - ${i.direccion}, ${i.municipio.nombre}, ${i.municipio.departamento.nombre}`}
                                    </option>)}
                                </Form.Select>
                            </Form.Group>
                        </div>
                    </div>
                    <div>
                        <LoaderButton loading={loading} text='Guardar' />
                        <Link to='/app/solicitudes' className='btn btn-link text-decoration-none text-muted rounded-1 ms-1'>Cancelar</Link>
                    </div>
                </Form>

            </div>
        </div>
    </>
}

export default Add
