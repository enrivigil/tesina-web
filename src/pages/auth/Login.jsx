import { useEffect, useState } from 'react'
import { Container, Card, Form } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import toast from 'react-hot-toast'

import Logo from '../../assets/logo.png'

import RequiredLable from '../../components/RequiredLable'
import LoaderButton from '../../components/LoaderButton'

import { login } from '../../services/auth.service'

const Login = () => {

    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        email: '',
        password: ''
    })
    const navigate = useNavigate()

    useEffect(() => {
        document.title = 'Login'
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setCredentials({
            ...credentials,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {

        e.preventDefault()

        setLoading(true)

        const res = await login(credentials)

        if (!res.success) {
            setLoading(false)
            toast.error(res.msg)
            return
        }

        setLoading(false)
        toast.success(res.msg)
        navigate('/app')
    }

    return <>
        <Container className='my-4'>

            <img
                src={Logo}
                alt='Logo'
                className='d-block mx-auto mb-3'
                width={128}
            />

            <h1 className='fw-bold text-center mb-3'>Login</h1>

            <div
                style={{ maxWidth: 400, }}
                className='mx-auto mb-3'
            >
                <Card className='rounded-1'>
                    <Card.Body className='p-5'>

                        <Form onSubmit={handleSubmit}>
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

                            <LoaderButton loading={loading} text='Iniciar sesion' className='w-100' />
                        </Form>

                    </Card.Body>
                </Card>
            </div>

            <div className='text-center'>
                No tienes una cuenta? <Link to='/registrarse' className='text-decoration-none'>Registrarse</Link>
            </div>

        </Container>
    </>
}

export default Login
