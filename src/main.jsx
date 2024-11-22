import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import App from './App'
import './index.css'

import AddTodoPage from './pages/AddTodoPage'
import TodoDetailPage from './pages/TodoDetailPage'
import ErrorPage from './pages/ErrorPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProtectedRoute from './components/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import HomePage from './pages/HomePage'
import { ThemeProvider } from './context/ThemeContext'

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <ThemeProvider>
                <BrowserRouter>
                    <Routes>
                        {/* Protected Routes */}
                        <Route element={<ProtectedRoute />}>
                            <Route path="/" element={<App />} />
                            <Route path="/todos" element={<App />} />
                            <Route path="/todos/:todoId" element={<TodoDetailPage />} />
                            <Route path="/todos/add" element={<AddTodoPage />} />
                        </Route>

                        {/* Public Routes */}
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/register" element={<RegisterPage />} />
                        <Route path="/home" element={<HomePage />} />

                        {/* Error Routes */}
                        <Route path="/error/:message" element={<ErrorPage />} />
                        <Route path="*" element={<ErrorPage />} />
                    </Routes>
                </BrowserRouter>
            </ThemeProvider>
        </AuthProvider>
    </QueryClientProvider>
)
