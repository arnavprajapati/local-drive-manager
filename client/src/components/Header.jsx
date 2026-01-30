const Header = ({ storage }) => {
    return (
        <div className="flex items-center justify-between mb-8">
            <h1 className="text-3xl text-gray-800">My Storage</h1>
            <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">
                    Storage: {storage.usedFormatted} of {storage.totalFormatted}
                </span>
                <div className="w-8 h-8 rounded-full bg-cyan-500 flex items-center justify-center text-white text-sm">
                    S
                </div>
            </div>
        </div>
    );
};

export default Header;
