import PropTypes from 'prop-types'
const HomeMain = (props) => {
    return <main className="w-screen  m-auto flex justify-center items-center flex-col gap-4 ">{props.children}</main>
}

HomeMain.propTypes = {
    children: PropTypes.node.isRequired,
}
export default HomeMain
