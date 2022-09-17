import notFound from './../assets/images/notFound.png'
import { Link } from 'react-router-dom'

export function NotFound() {
    return (
        <div className='container text-center align-items-center pb-2'>
            <div >
                <img src={notFound} alt="Not FOUND Anything" />
            </div>
            <Link to={'/'} className='btn btn-primary'>GO Back to the Main Page</Link>
        </div>
    )
}