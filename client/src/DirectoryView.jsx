import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

function DirectoryView() {
    const BASE_URL = "http://192.168.21.114:5700"
    const [directoryItems, setDirectoryItems] = useState([]);
    const [progress, setProgress] = useState(0)
    const [newFileName, setNewFileName] = useState("")

    const {"*": dirPath} = useParams()
    console.log(dirPath);

    async function getDirectoryItems() {
        const response = await fetch(`${BASE_URL}/directory/${dirPath}`);
        const data = await response.json();
        setDirectoryItems(data);
    }

    async function uploadFiles(e) {
        const file = e.target.files[0];

        const xhr = new XMLHttpRequest()
        xhr.open("POST", `${BASE_URL}/files/${file.name}`, true)
        xhr.setRequestHeader("filename", file.name)
        xhr.addEventListener("load", () => {
            // console.log(xhr.response);
            getDirectoryItems()
        })
        xhr.upload.addEventListener("progress", (e) => {
            const totalProgress = (e.loaded / e.total) * 100
            // console.log((`${totalProgress.toFixed(2)} % Uploaded`));
            setProgress(`${totalProgress.toFixed(2)} % Uploaded`)
        })
        xhr.send(file)
    }

    async function handleDelete(fileName) {
        const response = await fetch(`${BASE_URL}/files/${fileName}`, {
            method: "DELETE",
        })
        const data = await response.text()
        // console.log(data);
        getDirectoryItems()
    }

    async function renameFile(oldFileName) {
        // console.log({ oldFileName, newFileName });
        setNewFileName(oldFileName)
    }

    async function saveFile(oldFileName) {

        setNewFileName(oldFileName)
        // console.log({ oldFileName, newFileName });

        const response = await fetch(`${BASE_URL}/files/${oldFileName}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ newFileName })
        })
        const data = await response.text()
        // console.log(data);
        setNewFileName("")
        getDirectoryItems()

    }

    useEffect(() => {
        getDirectoryItems();
    }, [dirPath]);
    return (
        <>
            <h1>My Files</h1>
            <input type="file" onChange={uploadFiles} />
            <input type="text" onChange={(e) =>
                setNewFileName(e.target.value)
            } value={newFileName} />
            <p>Progress: {progress}%</p>
            {directoryItems.map(({ name, isDirectory }, i) => (
                <div key={i}>
                    {name}    {isDirectory && <Link to={`./${name}`}>Open</Link>} 
                    {!isDirectory && <a href={`${BASE_URL}/files/${dirPath}/${name}?action=open`}>Open</a>}{" "}
                    {!isDirectory &&
                        <a href={`${BASE_URL}/files/${dirPath}/${name}?action=download`}>Download</a>
                    }
                    <button onClick={() => {
                        renameFile(name)
                    }}>Rename</button>
                    <button onClick={() => {
                        saveFile(name)
                    }}>Save</button>
                    <button onClick={() => {
                        handleDelete(name)
                    }}>Delete</button>
                    <br />
                </div>
            ))}
        </>
    );
}

export default DirectoryView;