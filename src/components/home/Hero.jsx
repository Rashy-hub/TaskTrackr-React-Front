import MovieContainer from './MovieContainer'
import CTA from './CTA'

const Hero = () => {
    return (
        <section className="relative w-full h-[400px]">
            <MovieContainer />

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                {/* Centered CTA */}
                <CTA />
            </div>

            {/* Additional components can be added above the MovieContainer */}
            <div className="absolute top-4 left-[50%] translate-x-[-50%] z-20 text-center mt-4">
                <h1 className="text-white text-4xl font-bold font-special text-center neon-text">
                    {' '}
                    FOCUS | ACHIEVE | REPEAT : Your Goals, Simplified
                </h1>
            </div>
        </section>
    )
}

export default Hero
