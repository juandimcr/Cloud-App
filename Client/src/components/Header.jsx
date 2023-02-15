// Imports
import { Link } from 'react-router-dom';
import logoApp from './../images/logo.svg';


// Header.jsx
const Header = () => {
    return (
        <>
            <header>
                <nav className='dark:bg-slate-900'>
                    <Link to={`/`} className='flex items-center justify-center py-3' >
                        <img src={logoApp} alt="Logo" className='h-8vh w-8vw' />
                        <h1 className='dark:text-white'>Cloud App</h1>
                    </Link>
                </nav>
            </header>
        </>
    )
}

// Export
export default Header;