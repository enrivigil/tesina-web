import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import RequiredLabel from '../../components/RequiredLable'
import LoaderButton from '../../components/LoaderButton'

import { registarClienteAsync } from '../../services/clientes.service'
import { registarCliente } from '../../features/clientesSlice'

const Add = () => {

    const [loading, setLoading] = useState(false)
    const [cliente, setCliente] = useState({
        nombre: '',
        apellido: '',
        dui: '',
        telefono: '',
        email: '',
    })

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Registrar cliente'
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target
        setCliente({
            ...cliente,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const res = await registarClienteAsync(cliente)

        if (!res.success) {
            setLoading(false)
            toast.error(res.msg)
            return
        }

        dispatch(registarCliente(res.datos))

        setLoading(false)
        toast.success(res.msg)
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
                <h4 className='fw-semibold'>Registrar cliente</h4>
            </div>
        </div>

        <div className='row'>
            <div className='col-sm-12 col-md-6'>

                <Form onSubmit={handleSubmit}>

                    <div className='row'>
                        <div className='col-sm-12 col-md-6'>
                            <Form.Group className='mb-3'>
                                <RequiredLabel text='Nombre' />
                                <Form.Control
                                    type='text'
                                    placeholder='Nombre'
                                    className='rounded-1'
                                    name='nombre'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                        <div className='col-sm-12 col-md-6'>
                            <Form.Group className='mb-3'>
                                <RequiredLabel text='Apellido' />
                                <Form.Control
                                    type='text'
                                    placeholder='Apellido'
                                    className='rounded-1'
                                    name='apellido'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                        </div>
                    </div>

                    <Form.Group className='mb-3'>
                        <RequiredLabel text='DUI' />
                        <Form.Control
                            type='text'
                            placeholder='DUI'
                            className='rounded-1'
                            name='dui'
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
                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Email' />
                        <Form.Control
                            type='text'
                            placeholder='Email'
                            className='rounded-1'
                            name='email'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div>
                        <LoaderButton loading={loading} text='Guardar' />
                        <Link to='/app/clientes' className='btn btn-link text-decoration-none text-muted rounded-1 ms-1'>Cancelar</Link>
                    </div>
                </Form>

            </div>
        </div>
    </>
}

export default Add
