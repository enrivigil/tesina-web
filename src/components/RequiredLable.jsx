import { FormLabel } from 'react-bootstrap'

const RequiredLable = ({ text }) => {
    return <>
        <FormLabel className='fw-semibold'>{text} <span className='text-danger'>*</span></FormLabel>
    </>
}

export default RequiredLable
