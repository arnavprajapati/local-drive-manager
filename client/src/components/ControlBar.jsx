import { Upload, FolderPlus } from "lucide-react";

const ControlBar = ({ 
    filter, 
    setFilter, 
    newFolderName, 
    setNewFolderName, 
    onCreateFolder, 
    onFileUpload 
}) => {
    return (
        <div className="flex items-center justify-between mb-6">
            <label className="flex items-center gap-2 bg-cyan-500 text-white px-5 py-2.5 rounded-lg cursor-pointer hover:bg-cyan-600 text-sm">
                <Upload className="w-4 h-4" />
                Upload File
                <input type="file" className="hidden" onChange={onFileUpload} />
            </label>
            <input
                type="text"
                placeholder="Filter files and folders..."
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="flex-1 mx-6 px-4 py-2.5 bg-white text-gray-700 placeholder-gray-400 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-cyan-500 shadow-sm"
            />
            <div className="flex items-center gap-2">
                <input
                    type="text"
                    placeholder="Folder name"
                    value={newFolderName}
                    onChange={(e) => setNewFolderName(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && onCreateFolder()}
                    className="px-4 py-2.5 bg-white text-gray-700 placeholder-gray-400 text-sm rounded-lg border border-gray-200 focus:outline-none focus:border-cyan-500 w-48 shadow-sm"
                />
                <button
                    onClick={onCreateFolder}
                    className="flex items-center gap-2 bg-cyan-500 text-white px-5 py-2.5 rounded-lg hover:bg-cyan-600 cursor-pointer text-sm"
                >
                    <FolderPlus className="w-4 h-4" />
                    New Folder
                </button>
            </div>
        </div>
    );
};

export default ControlBar;
