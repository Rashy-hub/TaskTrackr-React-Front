import Modal from 'react-modal'
import PropTypes from 'prop-types'
import { useState, useEffect } from 'react'

const PomodoroModal = ({ modalIsOpen, closeModal, task }) => {
    const [timeLeft, setTimeLeft] = useState(25 * 60) // 25 minutes in seconds
    const [isRunning, setIsRunning] = useState(false)

    useEffect(() => {
        let timer
        if (isRunning) {
            timer = setInterval(() => {
                setTimeLeft((prevTime) => Math.max(prevTime - 1, 0))
            }, 1000)
        }
        return () => clearInterval(timer)
    }, [isRunning])

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60)
        const secs = seconds % 60
        return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
    }

    const handleStartPause = () => {
        setIsRunning((prev) => !prev)
    }

    const handleReset = () => {
        setIsRunning(false)
        setTimeLeft(25 * 60)
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={closeModal}
            contentLabel="Pomodoro Timer"
            style={{
                overlay: {
                    backgroundColor: 'rgba(0, 0, 0, 0.75)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                },
                content: {
                    inset: 'auto',
                    border: 'none',
                    background: 'none',
                    padding: 0,
                },
            }}
            ariaHideApp={false}
        >
            <div className="bg-white rounded-lg shadow-lg w-[620px] p-6 relative">
                <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
                    <span className="text-indigo-600">{task.text}</span>
                </h2>
                <div className="flex justify-center items-center mb-6">
                    <p className="text-6xl font-mono text-gray-900">{formatTime(timeLeft)}</p>
                </div>
                <div className="flex justify-center gap-4 mb-4">
                    <button
                        onClick={handleStartPause}
                        className={`px-6 py-2 text-lg font-semibold text-white rounded-md ${
                            isRunning ? 'bg-red-500 hover:bg-red-600' : 'bg-green-500 hover:bg-green-600'
                        }`}
                    >
                        {isRunning ? 'Pause' : 'Start'}
                    </button>
                    <button onClick={handleReset} className="px-6 py-2 text-lg font-semibold bg-blue-500 text-white rounded-md hover:bg-blue-600">
                        Reset
                    </button>
                </div>
                <button onClick={closeModal} className="absolute top-4 right-4 text-gray-400 hover:text-gray-800 transition">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
        </Modal>
    )
}

PomodoroModal.propTypes = {
    modalIsOpen: PropTypes.bool.isRequired,
    closeModal: PropTypes.func.isRequired,
    task: PropTypes.object.isRequired,
}

export default PomodoroModal
