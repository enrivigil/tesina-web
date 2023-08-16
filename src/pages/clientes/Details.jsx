import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { Button, Modal, Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch, useSelector } from 'react-redux'

import RequiredLabel from '../../components/RequiredLable'
import LoaderButton from '../../components/LoaderButton'

import { listarDepartamentosAsync, listarMunicipiosAsync } from '../../services/common.service'
import { registrarDireccionAsync, eliminarDireccionAsync, } from '../../services/direcciones.service'

const Details = () => {

    const [loading, setLoading] = useState(false)
    const [cliente, setCliente] = useState({
        id: 0,
        nombre: '',
        apellido: '',
        dui: '',
        telefono: '',
        email: '',
        cliente_id: 0,
        direcciones: [],
    })
    const [direccion, setDireccion] = useState({
        nombre: '',
        telefono: '',
        direccion: '',
        municipio_id: 0,
        destinatario_id: 0,
    })
    const [departamentos, setDepartamentos] = useState([])
    const [municipios, setMunicipios] = useState([])
    const [depid, setDepid] = useState(0)

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const dispatch = useDispatch()
    const clientes = useSelector((state) => state.clientes.data)
    const params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        document.title = `Cliente #${params.id}`
    }, [])

    useEffect(() => {

        let item = clientes.filter(i => i.id == params.id)[0]
        setCliente(item)

        setDireccion({
            ...direccion,
            destinatario_id: params.id,
        })

    }, [params, cliente, setCliente])

    useEffect(() => {

        const commonAsync = async () => {
            const deps = await listarDepartamentosAsync()
            const muns = await listarMunicipiosAsync()

            setDepartamentos(deps)
            setMunicipios(muns)
        }

        commonAsync()

    }, [
        listarDepartamentosAsync,
        listarMunicipiosAsync,
        setDepartamentos,
        setMunicipios,
    ])

    const handleChangeDepartamento = (e) => {
        const { value } = e.target
        setDepid(value)
    }

    const handleChange = (e) => {
        const { name, value } = e.target
        setDireccion({
            ...direccion,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const res = await registrarDireccionAsync(direccion)

        if (!res.success) {
            setLoading(false)
            toast.error(res.msg)
            return
        }

        setLoading(false)
        toast.success(res.msg)
        navigate(`/app/clientes`)
    }

    const filtrarMunicipiosPorDepartamento = (data) => {
        return data.filter(i => i.departamento_id == depid)
    }

    return <>
        <div className='row mb-3'>
            <div className='col-sm-12 col-md-6'>
                <Link
                    to='/app/clientes'
                    className='text-decoration-none d-inline-flex align-items-center'
                >
                    <ChevronLeft />
                    <span className='ms-1'>Lista de clientes</span>
                </Link>
                <h4 className='fw-semibold'>Cliente #{cliente.id}</h4>
            </div>
            <div className='col-sm-12 col-md-6 text-md-end'>
                <Button variant='primary' className='rounded-1 fw-semibold' onClick={handleShow}>Registrar direccion</Button>
            </div>
        </div>

        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='fw-semibold'>Registrar direccion</Modal.Title>
            </Modal.Header>
            <Modal.Body className='p-4'>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Nombre de direccion' />
                        <Form.Control
                            type='text'
                            placeholder='Nombre de direccion'
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
                    <div>
                        <LoaderButton loading={loading} text='Guardar' />
                        <Button variant='link' className='rounded-1 text-muted text-decoration-none' onClick={handleClose}>Cancelar</Button>
                    </div>
                </Form>

            </Modal.Body>
        </Modal>

        <div>

            <div className='mb-3'>
                <p className='text-muted m-0'># cliente</p>
                <h6 className='fw-semibold'>{cliente.id}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Nombre</p>
                <h6 className='fw-semibold'>{`${cliente.nombre} ${cliente.apellido}`}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>DUI</p>
                <h6 className='fw-semibold'>{`${cliente.dui}`}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Telefono</p>
                <h6 className='fw-semibold'>{cliente.telefono}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Email</p>
                <h6 className='fw-semibold'>{cliente.email}</h6>
            </div>
            <div className='mb-3'>
                <p className='text-muted m-0'>Direcciones</p>
                <ul>
                    {cliente.direcciones != undefined ? cliente.direcciones.map((i, j) => <li key={j}>
                        <div>{i.nombre}</div>
                        <div>{i.direccion}</div>
                        <div>{i.telefono}</div>

                    </li>) : <li>No hay datos</li>}
                </ul>
            </div>

        </div>

    </>
}

export default Details
