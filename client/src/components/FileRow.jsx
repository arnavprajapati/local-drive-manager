import { Link } from "react-router-dom";
import { Download, Eye, Pencil, Trash2, File, Folder, Check } from "lucide-react";

const FileRow = ({ 
    item, 
    dirPath, 
    renameTarget, 
    renameValue, 
    setRenameTarget, 
    setRenameValue, 
    onRename, 
    onDelete, 
    onOpen, 
    onDownload,
    formatSize,
    getFileExt
}) => {
    const getNameWithoutExt = (name) => {
        if (item.isDirectory) return name;
        const lastDot = name.lastIndexOf('.');
        return lastDot > 0 ? name.substring(0, lastDot) : name;
    };

    const getExtension = (name) => {
        const lastDot = name.lastIndexOf('.');
        return lastDot > 0 ? name.substring(lastDot) : '';
    };

    const handleStartRename = () => {
        setRenameTarget(item.name);
        setRenameValue(getNameWithoutExt(item.name));
    };

    const handleRenameSubmit = () => {
        const newName = item.isDirectory 
            ? renameValue 
            : renameValue + getExtension(item.name);
        onRename(item.name, newName);
    };

    return (
        <tr className="border-b border-gray-50 hover:bg-gray-50">
            <td className="py-4 px-6">
                <div className="flex items-center gap-3">
                    {item.isDirectory ? (
                        <Folder className="w-5 h-5 text-amber-500" />
                    ) : (
                        <File className="w-5 h-5 text-gray-400" />
                    )}
                    {renameTarget === item.name ? (
                        <div className="flex items-center">
                            <input
                                type="text"
                                value={renameValue}
                                onChange={(e) => setRenameValue(e.target.value)}
                                onBlur={handleRenameSubmit}
                                onKeyDown={(e) => e.key === 'Enter' && handleRenameSubmit()}
                                className="px-2 py-1 border rounded focus:outline-none focus:border-cyan-500 text-sm"
                                autoFocus
                            />
                            {!item.isDirectory && (
                                <span className="text-gray-500 text-sm ml-1">{getExtension(item.name)}</span>
                            )}
                        </div>
                    ) : item.isDirectory ? (
                        <Link to={`/${dirPath ? dirPath + '/' : ''}${item.name}`} className="text-gray-700 hover:text-cyan-600 text-sm">
                            {item.name}
                        </Link>
                    ) : (
                        <span className="text-gray-700 text-sm">{item.name}</span>
                    )}
                </div>
            </td>
            <td className="py-4 px-4 text-center text-sm text-gray-500">
                {item.isDirectory ? 'FOLDER' : getFileExt(item.name)}
            </td>
            <td className="py-4 px-4 text-center text-sm text-gray-500">
                {formatSize(item.size)}
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center justify-center gap-2">
                    {!item.isDirectory ? (
                        <>
                            <button
                                onClick={() => onOpen(item.name)}
                                className="flex items-center gap-1 px-3 py-1.5 border border-cyan-500 text-cyan-500 rounded-lg text-xs hover:bg-cyan-50 cursor-pointer"
                            >
                                <Eye className="w-3 h-3" />
                                Open
                            </button>
                            <button
                                onClick={() => onDownload(item.name)}
                                className="flex items-center gap-1 px-3 py-1.5 border border-cyan-500 text-cyan-500 rounded-lg text-xs hover:bg-cyan-50 cursor-pointer"
                            >
                                <Download className="w-3 h-3" />
                                Download
                            </button>
                        </>
                    ) : (
                        <Link
                            to={`/${dirPath ? dirPath + '/' : ''}${item.name}`}
                            className="flex items-center gap-1 px-3 py-1.5 border border-cyan-500 text-cyan-500 rounded-lg text-xs hover:bg-cyan-50"
                        >
                            <Eye className="w-3 h-3" />
                            Open
                        </Link>
                    )}
                </div>
            </td>
            <td className="py-4 px-4">
                <div className="flex items-center justify-center gap-2">
                    <button
                        onClick={handleStartRename}
                        className="w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded hover:bg-cyan-600 cursor-pointer"
                        title="Rename"
                    >
                        <Pencil className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => renameTarget === item.name && handleRenameSubmit()}
                        className="w-8 h-8 flex items-center justify-center bg-cyan-500 text-white rounded hover:bg-cyan-600 cursor-pointer"
                        title="Confirm"
                    >
                        <Check className="w-4 h-4" />
                    </button>
                    <button
                        onClick={() => onDelete(item.name)}
                        className="w-8 h-8 flex items-center justify-center bg-red-500 text-white rounded hover:bg-red-600 cursor-pointer"
                        title="Delete"
                    >
                        <Trash2 className="w-4 h-4" />
                    </button>
                </div>
            </td>
        </tr>
    );
};

export default FileRow;
