import { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { Link } from 'react-router-dom'

import Error from '../assets/error.png'

const NotFound = () => {

    useEffect(() => {
        document.title = 'Recurso no encontrado'
    }, [])

    return <>
        <Container className='my-4'>

            <img
                src={Error}
                alt='Error'
                className='d-block mx-auto mb-3'
                width={128}
            />

            <h1 className='fw-bold text-center mb-3'>Oops!</h1>
            <p className='text-center mb-3'>Recurso no encontrado</p>

            <div className='text-center'>
                <Link to='/' className='btn btn-primary rounded-1 fw-semibold'>Ir al inicio</Link>
            </div>

        </Container>
    </>
}

export default NotFound
