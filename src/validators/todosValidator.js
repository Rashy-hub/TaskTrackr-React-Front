import * as Yup from 'yup'

export const todoSchema = Yup.object().shape({
    todo: Yup.string().required('Todo description is required'),
    status: Yup.boolean()
        .required('status is required')
        .oneOf(
            ['DONE', 'IN PROGRESS', 'STANDBY', 'REPORTED'],
            'Status must be one of the following: DONE, IN PROGRESS, STANDBY, REPORTED'
        ),
})
