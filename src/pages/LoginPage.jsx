import { useNavigate } from 'react-router-dom'
import Header from '../layouts/Header'
import Main from '../layouts/Main'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { authLoginSchema } from '../validators/authValidator'

import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'
import FormInput from '../components/ui/FormInput'

const LoginPage = () => {
    const navigate = useNavigate()
    const { darkMode } = useTheme()

    const methods = useForm({ resolver: yupResolver(authLoginSchema) })
    const { loginAsync, loginerror, isAuthenticated, serverIsUp } = useAuth()

    const {
        handleSubmit,

        setError,
    } = methods

    useEffect(() => {
        if (isAuthenticated) navigate('/app')
    }, [isAuthenticated, navigate])

    const onSubmit = async (formData) => {
        try {
            await loginAsync(formData)
            navigate('/app')
        } catch (error) {
            let parsedError = JSON.parse(error.message)
            setError('email', {
                type: 'server',
                message: parsedError.error || "Une erreur s'est produite, veuillez réessayer.",
            })
        }
    }

    if (loginerror) {
        navigate(`/app/error/${loginerror.message}`)
    }

    return (
        <>
            <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
                {' '}
                <Header title="Login" />
                <Main>
                    <div className="flex items-center gap-2 border-[1px] p-2 rounded-lg border-yellow-500">
                        <p className="font-special ">Server Status </p>
                        <div className={`rounded-full w-4 h-4 ${serverIsUp ? 'bg-green-500' : 'bg-red-500'}`}></div>
                        <p className="font-special ">
                            wait <strong>60s</strong>{' '}
                        </p>
                    </div>

                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="form-style">
                            <h2 className="text-2xl font-bold mb-4 ">Login</h2>

                            <FormInput label="E-mail" name="email" placeholder="bobdoe@gmail.com" type="email" defaultValue="bobdoe@gmail.com" />
                            <FormInput label="Password" name="password" placeholder="Test123+" type="password" defaultValue="Test123+" />

                            <button
                                type="submit"
                                className="w-full bg-blue-500 text-neutral-100 py-2 rounded hover:bg-blue-600 transition mt-2 disabled:bg-slate-500 "
                                disabled={!serverIsUp}
                            >
                                Login
                            </button>
                            <p className="mt-4 text-sm text-gray-600">
                                Not registred yet ?{' '}
                                <a href="/app/login" className="text-blue-500 hover:underline">
                                    Sign up
                                </a>
                            </p>
                        </form>
                    </FormProvider>
                </Main>
            </div>
        </>
    )
}

export default LoginPage
