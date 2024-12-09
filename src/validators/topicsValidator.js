import * as Yup from 'yup'

export const todoSchema = Yup.object().shape({
    title: Yup.string().required('Todo description is required').max(100, 'Title must be less than 100 characters'),
    description: Yup.string().required('Description is required').max(500, 'Description must be less than 500 characters'),
    category: Yup.string()
        .required('Category is required')
        .oneOf(['INTERPERSONAL', 'LEARNING', 'REVIEW', 'CHORES', 'SPORTS', 'WORK', 'SOCIAL DUTIES'], 'Invalid category'),
    status: Yup.string().required('Status is required').oneOf(['ACTIVE', 'DELAYED', 'ARCHIVED'], 'Invalid status value'),
})
