import { useEffect, useState } from 'react'
import { Link, NavLink, Navigate, Outlet, useNavigate } from 'react-router-dom'
import { Container, Navbar, Nav, Dropdown } from 'react-bootstrap'
import { Menu } from 'react-feather'
import { useDispatch } from 'react-redux'

import { getUserLogged, logout } from '../services/auth.service'
import { listarEmpresas } from '../features/empresasSlice'
import { listarSucursales } from '../features/sucursalesSlice'
import { listarClientes } from '../features/clientesSlice'

const Application = () => {

    const [user, setUser] = useState({})
    const navigate = useNavigate()
    const dispatch = useDispatch()

    useEffect(() => {

        const userLogged = getUserLogged()
        setUser(userLogged)

    }, [getUserLogged])

    const handleLogout = (e) => {
        logout()
        dispatch(listarEmpresas([]))
        dispatch(listarSucursales([]))
        dispatch(listarClientes([]))
        navigate('/')
    }

    if (!user)
        return <Navigate to='/' />

    return <>
        <Navbar variant='light' bg='white' expand='lg' className='border-bottom'>
            <Container>
                <Navbar.Brand to='/app' as={Link}>Logo</Navbar.Brand>
                <Navbar.Toggle>
                    <Menu />
                </Navbar.Toggle>
                <Navbar.Collapse>
                    <Nav className='me-auto'>
                        <Nav.Item>
                            <Nav.Link to='/app' as={NavLink} className='text-dark' end>Dashboard</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link to='/app/empresas' as={NavLink} className='text-dark'>Mis empresas</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link to='/app/sucursales' as={NavLink} className='text-dark'>Mis sucursales</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link to='/app/clientes' as={NavLink} className='text-dark'>Mis clientes</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link to='/app/solicitudes' as={NavLink} className='text-dark'>Mis solicitudes</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className='ms-auto'>
                        <Nav.Item>
                            <Dropdown>
                                <Dropdown.Toggle variant='link' className='text-decoration-none text-dark px-0 mx-0'>{user.nombre}</Dropdown.Toggle>
                                <Dropdown.Menu className='dropdown-menu-end rounded-1'>
                                    <Dropdown.Header>
                                        <h6 className='text-dark fw-semibold m-0 p-0'>{user.nombre}</h6>
                                        <span>{user.email}</span>
                                    </Dropdown.Header>
                                    <Dropdown.Divider />
                                    <Dropdown.Item onClick={handleLogout}>Salir</Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>

        <main className='py-4'>
            <Container>
                <Outlet />
            </Container>
        </main>
    </>
}

export default Application
