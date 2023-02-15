import { Link } from "react-router-dom";

const UpDir = (props) => {

    const prevPath = props.path.substring(0, props.path.lastIndexOf("-"));

    return( 
        <Link to={`/${prevPath}`}>
            <button className='p-4 bg-green-800 rounded-lg w-50vw uppercase text-white hover:bg-green-900'>go to previous directory</button>
        </Link>
    )
}

export default UpDir;