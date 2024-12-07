import * as Yup from 'yup'

export const todoSchema = Yup.object().shape({
    text: Yup.string().required('Todo description is required'),
    status: Yup.string()
        .optional('status is optiona')
        .oneOf(['DONE', 'IN PROGRESS', 'STANDBY', 'REPORTED'], 'Status must be one of the following: DONE, IN PROGRESS, STANDBY, REPORTED')
        .default('IN PROGRESS'),
    priority: Yup.string()
        .string()
        .oneOf(['CRUCIAL', 'IMPORTANT', 'NORMAL', 'LOW'], 'priority must be one of the following: CRUCIAL, IMPORTANT,NORMAL, LOW')
        .default('NORMAL'),
})
