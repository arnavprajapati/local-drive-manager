import FileRow from "./FileRow";

const FileTable = ({ 
    loading, 
    items, 
    filter,
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
    const filteredItems = items.filter(item => 
        item.name.toLowerCase().includes(filter.toLowerCase())
    );

    return (
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                        <th className="text-left py-4 px-6 text-sm text-gray-600 w-2/5">File name</th>
                        <th className="text-center py-4 px-4 text-sm text-gray-600 w-1/6">Type</th>
                        <th className="text-center py-4 px-4 text-sm text-gray-600 w-1/6">Size</th>
                        <th className="text-center py-4 px-4 text-sm text-gray-600 w-1/5">Actions</th>
                        <th className="text-center py-4 px-4 text-sm text-gray-600 w-1/6">Options</th>
                    </tr>
                </thead>
                <tbody>
                    {loading ? (
                        <tr>
                            <td colSpan="5" className="text-center py-12 text-gray-400">Loading...</td>
                        </tr>
                    ) : items.length === 0 ? (
                        <tr>
                            <td colSpan="5" className="text-center py-12 text-gray-400">
                                No files yet. Drag & drop or click Upload to get started!
                            </td>
                        </tr>
                    ) : (
                        filteredItems.map((item) => (
                            <FileRow
                                key={item.name}
                                item={item}
                                dirPath={dirPath}
                                renameTarget={renameTarget}
                                renameValue={renameValue}
                                setRenameTarget={setRenameTarget}
                                setRenameValue={setRenameValue}
                                onRename={onRename}
                                onDelete={onDelete}
                                onOpen={onOpen}
                                onDownload={onDownload}
                                formatSize={formatSize}
                                getFileExt={getFileExt}
                            />
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default FileTable;
