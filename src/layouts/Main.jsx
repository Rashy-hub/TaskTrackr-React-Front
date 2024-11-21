import PropTypes from 'prop-types'
const Main = (props) => {
    return (
        <main className="container mt-20 m-auto flex justify-center items-center flex-col gap-4 ">
            {props.children}
        </main>
    )
}

Main.propTypes = {
    children: PropTypes.node.isRequired,
}
export default Main
