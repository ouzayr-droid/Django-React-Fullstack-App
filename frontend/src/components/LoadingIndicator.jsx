import "../styles/LoadingIndicator.css";

const LoadingIndicator = () => {
    return (
        <div className="loading-container">
            <div className="loader"></div>
            <p>Loading...</p>
        </div>
    );
}

export default LoadingIndicator;