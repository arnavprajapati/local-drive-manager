const ProgressBar = ({ progress }) => {
    if (progress <= 0) return null;
    
    return (
        <div className="mb-6">
            <div className="h-6 bg-cyan-200 rounded-full overflow-hidden">
                <div
                    className="h-full bg-cyan-500 rounded-full flex items-center justify-center text-white text-sm"
                    style={{ width: `${progress}%` }}
                >
                    {progress}%
                </div>
            </div>
        </div>
    );
};

export default ProgressBar;
