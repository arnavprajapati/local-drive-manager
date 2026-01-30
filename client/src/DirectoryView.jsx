import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Header from "./components/Header";
import ControlBar from "./components/ControlBar";
import Breadcrumb from "./components/Breadcrumb";
import FileTable from "./components/FileTable";
import ProgressBar from "./components/ProgressBar";
import DropOverlay from "./components/DropOverlay";

const BASE_URL = 'http://localhost:3000/';

const DirectoryView = () => {
    const [directoryItems, setDirectoryItems] = useState([]);
    const [progress, setProgress] = useState(0);
    const [newFolderName, setNewFolderName] = useState('');
    const [renameTarget, setRenameTarget] = useState(null);
    const [renameValue, setRenameValue] = useState('');
    const [loading, setLoading] = useState(true);
    const [storage, setStorage] = useState({ usedFormatted: '0 B', totalFormatted: '10 GB', percentage: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [filter, setFilter] = useState('');

    const { '*': dirPath } = useParams();

    async function fetchStorage() {
        try {
            const res = await fetch(`${BASE_URL}storage/stats`);
            const data = await res.json();
            if (data && data.usedFormatted) {
                setStorage(prev => ({
                    ...prev,
                    usedFormatted: data.usedFormatted || prev.usedFormatted,
                    totalFormatted: data.totalFormatted || prev.totalFormatted,
                    percentage: data.percentage || prev.percentage
                }));
            }
        } catch (err) {
            console.error('Failed to fetch storage:', err);
        }
    }

    async function getDirectory() {
        setLoading(true);
        try {
            const response = await fetch(`${BASE_URL}directory/${dirPath || ''}`);
            const data = await response.json();
            if (Array.isArray(data)) {
                setDirectoryItems(data);
            } else {
                console.error('Directory data is not an array:', data);
                setDirectoryItems([]);
            }
        } catch (err) {
            console.error('Failed to fetch directory:', err);
        }
        setLoading(false);
    }

    useEffect(() => {
        getDirectory();
        fetchStorage();
    }, [dirPath]);

    async function uploadFile(file) {
        if (!file) return;
        const xhr = new XMLHttpRequest();
        const path = dirPath ? `${dirPath}/${file.name}` : file.name;
        xhr.open("POST", `${BASE_URL}files/${path}`, true);
        xhr.addEventListener("load", () => {
            getDirectory();
            fetchStorage();
            setTimeout(() => setProgress(0), 2000);
        });
        xhr.upload.addEventListener('progress', (ev) => {
            const percent = (ev.loaded / ev.total) * 100;
            setProgress(percent);
        });
        xhr.send(file);
    }

    function handleFileUpload(e) {
        const file = e.target.files[0];
        if (file) {
            uploadFile(file);
            e.target.value = '';
        }
    }

    function handleDragOver(e) {
        e.preventDefault();
        setIsDragging(true);
    }

    function handleDragLeave(e) {
        e.preventDefault();
        setIsDragging(false);
    }

    function handleDrop(e) {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files[0];
        if (file) uploadFile(file);
    }

    async function handleCreateFolder() {
        if (!newFolderName.trim()) return;
        const path = dirPath ? `${dirPath}/${newFolderName}` : newFolderName;
        try {
            await fetch(`${BASE_URL}directory/${path}`, { method: 'POST' });
            setNewFolderName('');
            getDirectory();
        } catch (err) {
            console.error('Create folder failed:', err);
        }
    }

    async function handleDelete(fileName) {
        if (!confirm(`Delete "${fileName}"?`)) return;
        const path = dirPath ? `${dirPath}/${fileName}` : fileName;
        try {
            await fetch(`${BASE_URL}files/${path}`, { method: 'DELETE' });
            getDirectory();
            fetchStorage();
        } catch (err) {
            console.error('Delete failed:', err);
        }
    }

    async function handleRename(oldName, newName) {
        if (!newName || !newName.trim() || newName === oldName) {
            setRenameTarget(null);
            return;
        }
        const oldPath = dirPath ? `${dirPath}/${oldName}` : oldName;
        const newPath = dirPath ? `${dirPath}/${newName}` : newName;
        try {
            await fetch(`${BASE_URL}files/${oldPath}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ newFileName: newPath })
            });
            setRenameTarget(null);
            getDirectory();
        } catch (err) {
            console.error('Rename failed:', err);
        }
    }

    function handleOpen(fileName) {
        const path = dirPath ? `${dirPath}/${fileName}` : fileName;
        window.open(`${BASE_URL}files/${path}?action=open`, '_blank');
    }

    function handleDownload(fileName) {
        const path = dirPath ? `${dirPath}/${fileName}` : fileName;
        window.open(`${BASE_URL}files/${path}?action=download`, '_blank');
    }

    function getFileExt(name) {
        return name.split('.').pop().toUpperCase();
    }

    function formatSize(bytes) {
        if (!bytes || bytes === 0) return '-';
        const k = 1024;
        const sizes = ['B', 'KB', 'MB', 'GB'];
        const i = Math.floor(Math.log(bytes) / Math.log(k));
        return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
    }

    return (
        <div 
            className={`min-h-screen bg-gradient-to-br from-cyan-100 to-teal-100 p-8 font-semibold ${isDragging ? 'ring-4 ring-inset ring-cyan-500' : ''}`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
        >
            <DropOverlay isDragging={isDragging} />

            <div className="max-w-6xl mx-auto">
                <Header storage={storage} />
                
                <ControlBar
                    filter={filter}
                    setFilter={setFilter}
                    newFolderName={newFolderName}
                    setNewFolderName={setNewFolderName}
                    onCreateFolder={handleCreateFolder}
                    onFileUpload={handleFileUpload}
                />

                <ProgressBar progress={progress} />
                
                <Breadcrumb dirPath={dirPath} />

                <FileTable
                    loading={loading}
                    items={directoryItems}
                    filter={filter}
                    dirPath={dirPath}
                    renameTarget={renameTarget}
                    renameValue={renameValue}
                    setRenameTarget={setRenameTarget}
                    setRenameValue={setRenameValue}
                    onRename={handleRename}
                    onDelete={handleDelete}
                    onOpen={handleOpen}
                    onDownload={handleDownload}
                    formatSize={formatSize}
                    getFileExt={getFileExt}
                />
            </div>
        </div>
    );
};

export default DirectoryView;