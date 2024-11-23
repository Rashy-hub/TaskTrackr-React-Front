import * as Yup from 'yup'
const pwdRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W]).+$/
const pwdRegexMsg = 'Your password is too weak :o'

export const authLoginSchema = Yup.object().shape({
    email: Yup.string().trim().required().email(),
    password: Yup.string().required(),
})

export const authRegisterSchema = Yup.object().shape({
    username: Yup.string().trim().required().min(3).max(50),
    email: Yup.string().trim().lowercase().required().email().max(255),
    password: Yup.string().required().min(8).max(64).matches(pwdRegex, pwdRegexMsg),
    confirmpass: Yup.string()
        .required()
        .oneOf([Yup.ref('password'), null], 'Passwords must match')
        .min(8)
        .max(64),
})
