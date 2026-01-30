import { Link } from "react-router-dom";

const Breadcrumb = ({ dirPath }) => {
    if (!dirPath) return null;
    
    return (
        <div className="mb-4 text-sm">
            <Link to="/" className="text-cyan-600 hover:underline">Home</Link>
            {dirPath.split('/').map((part, i, arr) => (
                <span key={i}>
                    <span className="mx-2 text-gray-400">/</span>
                    {i === arr.length - 1 ? (
                        <span className="text-gray-700">{part}</span>
                    ) : (
                        <Link to={`/${arr.slice(0, i + 1).join('/')}`} className="text-cyan-600 hover:underline">
                            {part}
                        </Link>
                    )}
                </span>
            ))}
        </div>
    );
};

export default Breadcrumb;
