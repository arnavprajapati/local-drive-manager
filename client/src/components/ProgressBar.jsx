const ProgressBar = ({ progress }) => {
    if (progress <= 0) return null;
    
    return (
        <div className="mb-6">
            <div className="h-3 bg-cyan-200 rounded-full overflow-hidden relative">
                <div
                    className="h-full bg-cyan-500 rounded-full transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                />
                <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-cyan-800">
                    {progress % 1 === 0 ? progress : progress.toFixed(1)}%
                </span>
            </div>
        </div>
    );
};

export default ProgressBar;
