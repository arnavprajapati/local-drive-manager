import { Upload } from "lucide-react";

const DropOverlay = ({ isDragging }) => {
    if (!isDragging) return null;
    
    return (
        <div className="fixed inset-0 bg-cyan-500/20 flex items-center justify-center z-50 pointer-events-none">
            <div className="bg-white rounded-2xl p-8 shadow-xl text-center">
                <Upload className="w-12 h-12 mx-auto mb-4 text-cyan-500" />
                <p className="text-lg text-gray-700">Drop file to upload</p>
            </div>
        </div>
    );
};

export default DropOverlay;
