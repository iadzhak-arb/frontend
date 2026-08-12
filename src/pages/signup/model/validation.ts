import {useState} from "react";

export function useValidation() {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');
    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');
    const [password2Error, setPassword2Error] = useState(false);
    const [password2ErrorMessage, setPassword2ErrorMessage] = useState('');
    const [rule, setRule] = useState(false);
    const [ruleErrorMessage, setRuleErrorMessage] = useState('');
    const [error, setError] = useState('');

    const handleCheckedRule = () => setRule(!rule);

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;
        const password2 = document.getElementById('password2') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Неккоректный формат email.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 8) {
            setPasswordError(true);
            setPasswordErrorMessage('Минимальная длина пароля 8 знаков.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (password.value != password2.value) {
            setPassword2Error(true);
            setPassword2ErrorMessage('Пароли не совпадают.');
            isValid = false;
        } else {
            setPassword2Error(false);
            setPassword2ErrorMessage('');
        }

        if (!rule) {
            setRuleErrorMessage('Необходимо дать свое согласие.');
            isValid = false;
        } else {
            setRuleErrorMessage('');
        }

        return isValid;
    };

    return {
        emailError,
        emailErrorMessage,
        passwordError,
        passwordErrorMessage,
        password2Error,
        password2ErrorMessage,
        rule,
        ruleErrorMessage,
        error,
        setError,
        setEmailError,
        setEmailErrorMessage,
        setPasswordError,
        setPasswordErrorMessage,
        validateInputs,
        handleCheckedRule,
    }
}