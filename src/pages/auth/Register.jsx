import { useEffect, useState } from 'react'
import { Container, Card, Form } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import toast from 'react-hot-toast'

import Logo from '../../assets/logo.png'

import RequiredLable from '../../components/RequiredLable'
import LoaderButton from '../../components/LoaderButton'

import { register } from '../../services/auth.service'

const Register = () => {

    const [loading, setLoading] = useState(false)
    const [user, setUser] = useState({
        nombre: '',
        apellido: '',
        dui: '',
        email: '',
        password: '',
    })

    useEffect(() => {
        document.title = 'Registrarse'
    }, [])

    const handleChange = async (e) => {
        const { name, value } = e.target

        setUser({
            ...user,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const res = await register(user)

        if (!res.success) {
            setLoading(false)
            toast.error(res.msg)
            return
        }

        setLoading(false)
        toast.success(res.msg)
    }

    return <>
        <Container className='my-4'>

            <img
                src={Logo}
                alt='Logo'
                className='d-block mx-auto mb-3'
                width={128}
            />

            <h1 className='fw-bold text-center mb-3'>Registrarse</h1>

            <div
                style={{ maxWidth: 400, }}
                className='mx-auto mb-3'
            >
                <Card className='rounded-1'>
                    <Card.Body className='p-5'>

                        <Form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-sm-12 col-md-6">
                                    <Form.Group className='mb-3'>
                                        <RequiredLable text='Nombre' />
                                        <Form.Control
                                            type='text'
                                            placeholder='Nombre'
                                            className='rounded-1'
                                            name='nombre'
                                            onChange={handleChange}
                                        />
                                    </Form.Group>
                                </div>
                                <div className="col-sm-12 col-md-6">
                                    <Form.Group className='mb-3'>
                                        <RequiredLable text='Apellido' />
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
                                <RequiredLable text='DUI' />
                                <Form.Control
                                    type='text'
                                    placeholder='DUI'
                                    className='rounded-1'
                                    name='dui'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <RequiredLable text='Email' />
                                <Form.Control
                                    type='email'
                                    placeholder='Email'
                                    className='rounded-1'
                                    name='email'
                                    onChange={handleChange}
                                />
                            </Form.Group>
                            <Form.Group className='mb-3'>
                                <RequiredLable text='Contraseña' />
                                <Form.Control
                                    type='password'
                                    placeholder='Contraseña'
                                    className='rounded-1'
                                    name='password'
                                    onChange={handleChange}
                                />
                            </Form.Group>

                            <LoaderButton loading={loading} text='Registrarse' className='w-100' />
                        </Form>

                    </Card.Body>
                </Card>
            </div>

            <div className='text-center'>
                Ya tienes una cuenta? <Link to='/' className='text-decoration-none'>Login</Link>
            </div>

        </Container>
    </>
}

export default Register
