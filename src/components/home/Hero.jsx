import MovieContainer from './MovieContainer'
import CTA from './CTA'
import ScrollingBanner from './ScrollingBanner'

const Hero = () => {
    const bannerKeyWords = ['FOCUS', 'ACHIEVE', 'REPEAT']
    return (
        <section className="relative w-full h-[400px]">
            <MovieContainer />

            <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                {/* Centered CTA */}
                <CTA />
            </div>

            {/* Additional components can be added above the MovieContainer */}
            <div className="absolute top-4 left-[50%] translate-x-[-50%] z-20 text-center mt-4">
                <h1 className="text-white md:text-4xl font-bold font-special text-center neon-text sm:text-2xl ">
                    {' '}
                    TaskTrackr : Your Goals, Simplified
                </h1>
            </div>
            <ScrollingBanner keywords={bannerKeyWords} />
        </section>
    )
}

export default Hero
