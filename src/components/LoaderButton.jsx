import { Button, Spinner } from 'react-bootstrap'

const LoaderButton = ({ loading, text, className }) => {
    return <>
        <Button
            type='submit'
            variant='primary'
            className={`rounded-1 fw-semibold ` + className}
        >
            {loading ? <>
                <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true" /> Cargando
            </> : text}
        </Button>
    </>
}

export default LoaderButton
