import { BrowserRouter } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'

import Router from './Router'

const App = () => {
    return <>
        <BrowserRouter>
            <Router />
            <Toaster position='top-right' />
        </BrowserRouter>
    </>
}

export default App
