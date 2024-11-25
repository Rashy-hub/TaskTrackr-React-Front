import PropTypes from 'prop-types'

const ScrollingBanner = ({ keywords }) => {
    const content = keywords.join(' - ')

    return (
        <div className="relative overflow-hidden w-full bg-gray-800 text-white h-12">
            {/* Conteneur animé */}
            <div className="whitespace-nowrap flex justify-center items-center h-full animate-scroll">
                <span className="pr-8 font-special">{content}</span>
            </div>
        </div>
    )
}

ScrollingBanner.propTypes = {
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ScrollingBanner
