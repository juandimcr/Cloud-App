import { useEffect, useState } from "react";
import { useParams } from 'react-router-dom';
import Header from './Header';
import SearchDir from './SearchDir';
import ButtonAddDir from './ButtonAddDir';
import UpDir from "./UpDir";
import FileInput from './FileInput';
import { GoFileDirectory, GoFile, GoTriangleRight } from 'react-icons/go';
import { AiFillEdit, AiFillDelete, AiOutlineDownload } from 'react-icons/ai';
import EditBtn from "./EditBtn";
import { Link } from "react-router-dom";
import * as API from './../service/api';

function MainPage() {
    let { path } = useParams();
    const [content, setContent] = useState([]);
    if (path === undefined) path = ''

    useEffect(() => {
        API.getContent(path).then(setContent);
    }, [path]);

    const downloadClick = (filePath) => {
        API.downloadFile(filePath, path);
    }

    const deleteClick = (pathFile) => {
        API.deleteFileOrDir(path, pathFile).then(() => {
            window.location.reload();
        })
    }

    return (
        <>
            <Header />
            <section className='flex flex-col items-center justify-center my-5'>
                <SearchDir />
                <ButtonAddDir path={path} />
                <FileInput path={path} />

                {path === '' ? (
                    <>
                    </>
                ) : (
                    <UpDir path={path} />
                )}

                <div>
                    {content.length === 0 ? (
                        <h1>Loading</h1>
                    ) : (
                        <>
                            {content.directories.map(dir => (
                                <div key={dir} className="flex items-center justify-between w-50vw bg-slate-900 m-4 rounded-xl">
                                    <div className="flex items-center justify-center p-2">
                                        <GoFileDirectory color="blue" className="m-2" />
                                        <p className="text-white" >{dir}</p>
                                    </div>
                                    <div className="buttons m-3">
                                        <EditBtn path={path} dir={dir} />
                                        <button onClick={e => deleteClick(dir)} className="p-4 bg-red-900 text-white rounded-xl m-1 hover:bg-red-700"><AiFillDelete /></button>
                                        <Link to={path === '' ? `/${dir}` : `/${path}-${dir}`} key={dir}>
                                            <button className="p-4 bg-yellow-900 text-white rounded-xl m-1 hover:bg-yellow-700"><GoTriangleRight /></button>
                                        </Link>
                                    </div>
                                </div>
                            ))}

                            {content.files.map(file => (

                                <div className="flex items-center justify-between w-50vw bg-slate-900 m-4 rounded-xl" key={file} >
                                    <div className="flex items-center justify-center p-2">
                                        <GoFile color="blue" className="m-2" />
                                        <p className="text-white" >{file}</p>
                                    </div>
                                    <div className="buttons m-3">
                                        <EditBtn path={path} dir={file} />
                                        <button onClick={e => deleteClick(file)} className="p-4 bg-red-900 text-white rounded-xl m-1 hover:bg-red-700"><AiFillDelete /></button>
                                        <button onClick={e => downloadClick(file)} className="p-4 bg-blue-900 text-white rounded-xl m-1 hover:bg-blue-700"><AiOutlineDownload /></button>
                                    </div>
                                </div>

                            ))}
                        </>
                    )}
                </div>

            </section>
        </>
    )
}

export default MainPage;
