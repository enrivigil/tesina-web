import { useEffect, useState } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import { ChevronLeft } from 'react-feather'
import { Form } from 'react-bootstrap'
import toast from 'react-hot-toast'
import { useSelector, useDispatch } from 'react-redux'

import RequiredLabel from '../../components/RequiredLable'
import LoaderButton from '../../components/LoaderButton'

import { editarEmpresaAsync } from '../../services/empresas.service'
import { editarEmpresa } from '../../features/empresasSlice'

const Edit = () => {

    const [loading, setLoading] = useState(false)
    const [empresa, setEmpresa] = useState({
        id: 0,
        razon_social: '',
        nrc: '',
        activo: 0,
    })

    const params = useParams()
    const navigate = useNavigate()

    const empresas = useSelector((state) => state.empresas.data)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = 'Registrar empresa'
    }, [])

    useEffect(() => {

        const item = empresas.filter(i => i.id == params.id)[0]
        setEmpresa(item)

    }, [params, empresas, setEmpresa])

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

        const res = await editarEmpresaAsync(empresa)

        if (!res.success) {
            setLoading(false)
            toast.error(res.msg)
            return
        }

        dispatch(editarEmpresa(res.datos))

        setLoading(false)
        toast.success(res.msg)
        navigate('/app/empresas')
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
                <h4 className='fw-semibold'>Editar empresa</h4>
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
                            value={empresa.razon_social}
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
                            value={empresa.nrc}
                            name='nrc'
                            onChange={handleChange}
                        />
                    </Form.Group>
                    <Form.Group className='mb-3'>
                        <RequiredLabel text='Estado' />
                        <Form.Select
                            className='rounded-1'
                            name='activo'
                            value={empresa.activo}
                            onChange={handleChange}
                        >
                            <option value="">Elegir opcion</option>
                            {
                                [0, 1].map((i, j) => <option
                                    key={j}
                                    value={i}
                                >
                                    {i==1 ? 'Activo' : 'Inactivo'}
                                </option>)
                            }
                        </Form.Select>
                    </Form.Group>
                    <div>
                        <LoaderButton loading={loading} text='Editar' />
                        <Link to='/app/empresas' className='btn btn-link text-decoration-none text-muted rounded-1 ms-1'>Cancelar</Link>
                    </div>
                </Form>

            </div>
        </div>
    </>
}

export default Edit
