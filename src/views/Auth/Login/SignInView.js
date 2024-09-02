import React, { useState } from 'react';
import { withTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';

import { AuthService } from 'services/AuthService';
import useRequest from 'hooks/useRequest';
/* Function to detect if the user is on a mobile device */
import { isMobile } from 'helpers/Mobile';

import LoginHeader from 'components/atoms/LoginHeader';
import InputText from 'components/atoms/InputText';
/* import InputCheckbox from 'components/atoms/InputCheckbox'; */
import ActionButton from 'components/atoms/ActionButton';


import './styles.scss';

const SignInView = (props) => {
    const history = useHistory();

    const {
        submitted, success, message, errors,
        beforeSubmit, afterSubmit, showError,
        dealWithError
    } = useRequest();

    /* States to store values */
    const [email, setEmail] = useState("");
    const [clave, setClave] = useState("");
    const [showPass, setshowPass] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        beforeSubmit();
        AuthService.login(email, clave)
            .then(data => {
                AuthService.loadUser().then(data => {
                    afterSubmit();
                    // The event in App.js push to /home
                    history.push('/home');
                    console.log('login');
                }).catch(error => {
                    showError('El usuario no existe');
                });
            }).catch((error) => {
                console.log(error.status);
                dealWithError(error, '');
                console.log(errors);
            });
    }

    /* Placeholder functions that could be implemented to handle navigation to registration or password recovery */

    const Register = (e) => {
        e.preventDefault();
    }

    const requestPassword = (e) => {
        e.preventDefault();
    }

    /* Component rendering */

    return (
        <div className="signin-container">
            {/* It is displayed only if the user is not on a mobile device */}
            {!isMobile && <LoginHeader></LoginHeader>}

            <div className="signin-content">
                <form className="signin-form" onSubmit={handleSubmit}>
                    <h1 className="signin-title">Iniciar Sesión</h1>
                    <div className="signin-input-group">
                        <div className="signin-input-icon-container">
                        </div>
                        <div className="signin-input-container">
                            <InputText id="email" label="" type="text" placeholder="Enter your email"
                                handleChange={(event) => { setEmail(event.target.value) }} error={errors.email} />
                        </div>
                    </div>
                    <div className="signin-input-group">
                        <div className="signin-input-icon-container">
                        </div>
                        <div className="signin-input-container">
                            <InputText id="password" label="" placeholder="Enter your password"
                                handleChange={(event) => { setClave(event.target.value) }}
                                type={showPass ? 'text' : 'password'} error={errors.password} />
                            <div className={showPass ? 'register-eye show' : 'register-eye hide'} onClick={() => { setshowPass(false) }}>
                                Mostrar
                            </div>
                            <div className={showPass ? 'register-eye-closed hide' : 'register-eye show'} onClick={() => { setshowPass(true) }}>
                                Ocultar
                            </div>
                        </div>
                    </div>
                    {(success === false && message) &&
                        <p className="error-messages">{message}</p>
                    }
                    <div className="signin-button">
                        <ActionButton legend={'LOG IN'} disabled={submitted}
                            handleClick={handleSubmit} type={'submit'} />
                    </div>
                    <div className="signin-olvide">
                        <button
                            type="button"
                            className="signin-link"
                            onClick={requestPassword}
                        >
                            I forgot my password
                        </button>
                    </div>
                    <div className="signin-bottom-content">
                        <p className="signin-bottom-legend">¿Todavía no te registraste?</p>
                        <div className="signin-bottom-button">
                            <ActionButton legend="Register" handleClick={Register} />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default withTranslation()(SignInView);