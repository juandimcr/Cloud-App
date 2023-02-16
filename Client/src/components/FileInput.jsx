import { useState } from "react";
import * as API from './../service/api';

const FileInput = (props) => {
    const [files, setFiles] = useState([]);

    const handleChange = (event) => {
        setFiles(event.target.files);
    }

    const handleClick = () => {
        API.insertFilesFromClient(props.path, files).then(() => {
            window.location.reload();
        });
    }

    return (
        <div className='w-50vw m-5 flex justify-center items-center'>
            <input onChange={e => handleChange(e)} className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400" type="file" multiple />
            <button onClick={e => handleClick()} className="p-2 bg-blue-800 text-white rounded-xl ml-2">Send</button>
        </div>
    )
}

export default FileInput;