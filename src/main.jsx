import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

import TodoDetailPage from './pages/TodoDetailPage'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './context/ThemeContext'
import TodoPage from './pages/TodoPage'
import CreateTopicPage from './pages/CreateTopicPage'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Public Routes */}
                        <Route path="/" element={<HomePage />} />

                        <Route path="/app/login" element={<LoginPage />} />
                        <Route path="/app/register" element={<RegisterPage />} />
                        <Route path="/app/home" element={<HomePage />} />
                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/app" element={<App />} />
                            <Route path="/app/topics" element={<App />} />
                            <Route path="/app/topics/create" element={<CreateTopicPage />} />
                            <Route path="/app/topics/:topicId" element={<TodoPage />} />
                            <Route path="/app/todos/:todoId" element={<TodoDetailPage />} />
                        </Route>

                        {/* Error Routes */}
                        <Route path="/app/error/:message" element={<ErrorPage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    </QueryClientProvider>
)
