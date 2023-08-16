import { FormControl } from 'react-bootstrap'
import { Search } from 'react-feather'

const SearchForm = ({ handleChange }) => {
    return <>
        <div className='search-form'>
            <div className='search-form-icon'>
                <Search width={18} color='#6c757d' />
            </div>
            <FormControl
                type='text'
                className='rounded-1 search-form-input' placeholder='Buscar'
                onChange={handleChange}
            />
        </div>
    </>
}

export default SearchForm
