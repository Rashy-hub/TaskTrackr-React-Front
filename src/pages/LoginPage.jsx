import { useNavigate } from 'react-router-dom'
import Header from '../layouts/Header'
import Main from '../layouts/Main'
import { FormProvider, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { authLoginSchema } from '../validators/authValidator'
import FormInput from '../components/TodoInput'
import { useAuth } from '../context/AuthContext'
import { useEffect } from 'react'
import { useTheme } from '../context/ThemeContext'

const LoginPage = () => {
    const navigate = useNavigate()
    const { darkMode } = useTheme()

    const methods = useForm({ resolver: yupResolver(authLoginSchema) })
    const { loginAsync, loginerror, isAuthenticated } = useAuth()

    const {
        handleSubmit,
        formState: { errors },
        setError,
    } = methods

    useEffect(() => {
        if (isAuthenticated) navigate('/todos')
    }, [isAuthenticated, navigate])

    const onSubmit = async (formData) => {
        try {
            await loginAsync(formData) // Attends la fin de la mutation
            navigate('/todos') // Navigue uniquement après le succès
        } catch (error) {
            // Exemple d'erreur venant du serveur : error.response.data.error

            let parsedError = JSON.parse(error.message)
            setError('email', {
                type: 'server',
                message: parsedError.error || "Une erreur s'est produite, veuillez réessayer.",
            })
        }
    }

    if (loginerror) {
        navigate(`/error/${loginerror.message}`)
    }

    return (
        <>
            <div className={`body-bg`} data-theme={darkMode ? 'dark' : 'light'}>
                {' '}
                <Header title="TaskTrackr | Login" />
                <Main>
                    <FormProvider {...methods}>
                        <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-md">
                            <h2 className="text-2xl font-bold mb-4  text-neutral-900">Login</h2>

                            <FormInput label="E-mail" name="email" register={methods.register} errors={errors} placeholder="Enter your email" />
                            <FormInput
                                label="Password"
                                name="password"
                                register={methods.register}
                                errors={errors}
                                placeholder="Enter your password"
                            />

                            <button type="submit" className="w-full bg-blue-500 text-neutral-100 py-2 rounded hover:bg-blue-600 transition">
                                Login
                            </button>
                        </form>
                    </FormProvider>
                </Main>
            </div>
        </>
    )
}

export default LoginPage
