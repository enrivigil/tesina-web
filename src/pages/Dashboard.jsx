import { useEffect } from 'react'

const Dashboard = () => {

    useEffect(() => {
        document.title = 'Dashboard'
    }, [])

    return <>
        Hello from dashboard
    </>
}

export default Dashboard
