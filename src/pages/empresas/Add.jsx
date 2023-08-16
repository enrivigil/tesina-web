import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'

import RequiredLabel from '../../components/RequiredLable'
import LoaderButton from '../../components/LoaderButton'

import { registrarEmpresaAsync } from '../../services/empresas.service'
import { registrarEmpresa } from '../../features/empresasSlice'

const Add = () => {

    const [loading, setLoading] = useState(false)
    const [empresa, setEmpresa] = useState({
        razon_social: '',
        nrc: '',
    })

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Registrar empresa'
    }, [])

    const handleChange = (e) => {
        const { name, value } = e.target

        setEmpresa({
            ...empresa,
            [name]: value,
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setLoading(true)

        const res = await registrarEmpresaAsync(empresa)

        if (!res.success) {
            setLoading(false)
            toast.error(res.msg)
            return
        }

        dispatch(registrarEmpresa(res.datos))

        setLoading(false)
        toast.success(res.msg)
    }

    return <>
        <div className='row mb-3'>
            <div className='col-sm-12 col-md-6'>
                <Link
                    to='/app/empresas'
                    className='text-decoration-none d-inline-flex align-items-center'
                >
                    <ChevronLeft />
                    <span className='ms-1'>Lista de empresas</span>
                </Link>
                <h4 className='fw-semibold'>Registrar empresa</h4>
            </div>
        </div>

        <div className='row'>
            <div className='col-sm-12 col-md-6'>

                <Form onSubmit={handleSubmit}>
                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Razon social' />
                        <Form.Control
                            type='text'
                            placeholder='Razon social'
                            className='rounded-1'
                            name='razon_social'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <RequiredLabel text='NRC' />
                        <Form.Control
                            type='text'
                            placeholder='NRC'
                            className='rounded-1'
                            name='nrc'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <div>
                        <LoaderButton loading={loading} text='Guardar' />
                        <Link to='/app/empresas' className='btn btn-link text-decoration-none text-muted rounded-1 ms-1'>Cancelar</Link>
                    </div>
                </Form>

            </div>
        </div>
    </>
}

export default Add
