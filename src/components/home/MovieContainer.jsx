const MovieContainer = () => {
    return (
        <div className="w-full h-full">
            <video src="/background.mp4" autoPlay loop muted className="w-full h-full object-cover" />
            {/* Blurred overlay */}
            <div className="absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm" />
        </div>
    )
}

export default MovieContainer
