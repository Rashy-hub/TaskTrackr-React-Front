import * as Yup from 'yup'

export const todoSchema = Yup.object().shape({
    text: Yup.string().required('Todo description is required'),
    status: Yup.string()
        .optional('status is optiona')
        .oneOf(['DONE', 'IN PROGRESS', 'STANDBY', 'REPORTED'], 'Status must be one of the following: DONE, IN PROGRESS, STANDBY, REPORTED')
        .default('IN PROGRESS'),
})
