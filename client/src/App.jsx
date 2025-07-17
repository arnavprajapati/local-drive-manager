import { use, useEffect, useState } from "react";

function App() {
  const [directoryItems, setDirectoryItems] = useState([]);
  const [progress, setProgress] = useState(0) 
  const [newFileName, setNewFileName] = useState("")

  async function getDirectoryItems() {
    const response = await fetch("http://192.168.21.114:5700/");
    const data = await response.json();
    setDirectoryItems(data);
  }

  async function uploadFiles(e) {
    const file = e.target.files[0];

    const xhr = new XMLHttpRequest()
    xhr.open("POST", "http://192.168.21.114:5700", true)
    xhr.setRequestHeader("filename", file.name)
    xhr.addEventListener("load", () => {
      console.log(xhr.response);
      getDirectoryItems()
    })
    xhr.upload.addEventListener("progress", (e) => {
      const totalProgress = (e.loaded / e.total) * 100
      console.log((`${totalProgress.toFixed(2)} % Uploaded`));
      setProgress(`${totalProgress.toFixed(2)} % Uploaded`)
    })
    xhr.send(file)
  }

  async function handleDelete(fileName) {
    const response = await fetch(`http://192.168.21.114:5700/${fileName}`, {
      method: "DELETE",
    })
    const data = await response.text()
    console.log(data);
    getDirectoryItems()
  }

  async function renameFile(oldFileName) {
    console.log({oldFileName, newFileName});
    setNewFileName(oldFileName)
  }

  async function saveFile(oldFileName) {

    setNewFileName(oldFileName)
    console.log({oldFileName, newFileName});

    const response = await fetch('http://192.168.21.114:5700/', {
      method: "PATCH",
      body: JSON.stringify({oldFileName, newFileName})
    })
    const data = await response.text()
    console.log(data);
    getDirectoryItems()
    setNewFileName("")
    
  }

  useEffect(() => {
    getDirectoryItems();
  }, []);
  return (
    <>
      <h1>My Files</h1>
      <input type="file" onChange={uploadFiles} />
      <input type="text" onChange={(e) =>
        setNewFileName(e.target.value)
      } value={newFileName} />
      <p>Progress: {progress}%</p>
      {directoryItems.map((item, i) => (
        <div key={i}>
          {item} <a href={`http://192.168.21.114:5700/${item}?action=open`}>Open</a>{" "}
          <a href={`http://192.168.21.114:5700/${item}?action=download`}>Download</a>
          <button onClick={() => {
            renameFile(item)
          }}>Rename</button>
          <button onClick={() => {
            saveFile(item)
          }}>Save</button>
          <button onClick={() => {
            handleDelete(item)
          }}>Delete</button>
          <br />
        </div>
      ))}
    </>
  );
}

export default App;