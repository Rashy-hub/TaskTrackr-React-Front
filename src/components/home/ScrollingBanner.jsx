import PropTypes from 'prop-types'

const ScrollingBanner = ({ keywords }) => {
    const content = keywords.join(' - ')

    return (
        <div className="relative overflow-hidden w-full bg-gray-800 text-white">
            <div className="whitespace-nowrap flex animate-scroll">
                <span className="pr-8">{content}</span>
                <span className="pr-8">{content}</span>
            </div>
        </div>
    )
}

ScrollingBanner.propTypes = {
    keywords: PropTypes.arrayOf(PropTypes.string).isRequired,
}

export default ScrollingBanner
