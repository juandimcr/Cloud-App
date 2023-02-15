const url = 'http://localhost:3000/api/v1'

export async function getContent(path) {
    if (path === undefined) {
        path = '';
    }
    const data = await fetch(`${url}/${path}`);
    const content = await data.json();
    return content;
}

export async function downloadFile(filePath, path) {
    let pathDownload = path + '-' + filePath;
    if (path === '') pathDownload = filePath;

    const data = await fetch(`${url}/files/download/${pathDownload}`);
    const blob = await data.blob();
    const fileURL = window.URL.createObjectURL(blob);
    // Setting various property values
    let alink = document.createElement('a');
    alink.href = fileURL;
    alink.download = filePath;
    alink.click();
}

export async function updateDirOrFileName(path, dirName, newDirName) {
    let pathFile = path + '-' + dirName;
    if (path === '') pathFile = dirName;

    const data = await fetch(`${url}/${pathFile}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            name: newDirName,
        }),
    });
    console.log(data)
}

export async function deleteFileOrDir(path, fileName) {
    let pathFile = path + '-' + fileName;
    if (path === '') pathFile = fileName;

    const data = await fetch(`${url}/${pathFile}`, {
        method: 'DELETE',
    });
}

export async function createDir(path, dirName) {
    let pathDir = path + '-' + dirName;
    if (path === '') pathDir = dirName;

    const data = await fetch(`${url}/${pathDir}`, {
        method: 'POST',
    });
}

export async function insertFilesFromClient(filePath, path) {
    
}