import React from 'react';
import './CreationForm.css'
import { Formik } from 'formik';

function CreationForm() {
    return (

        <Formik initialValues={{ email: '', password: '', password_confirmation: '' }}
            validate={values => {
                const errors = {};
                if (!values.email) {
                    errors.email = 'Email obligatoire';
                } else if (
                    !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
                ) {
                    errors.email = 'Email non valide';
                }
                if (!values.password) {
                    errors.password = 'Mot de passe obligatoire'
                }
                else if (values.password.length < 8) {
                    errors.password = 'Mot de passe inférieur à 8 caractères'
                }
                if (values.password !== values.password_confirmation) {
                    errors.password_confirmation = 'Le mot de passe n\'est pas identique';
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
            }) => (
                    <form className="creation-form" onSubmit={handleSubmit}>
                        <div>
                            <label>Email*: </label>
                            <input
                                type="email"
                                name="email"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.email}
                            />
                            {errors.email && touched.email && errors.email}
                        </div>
                        <div>
                            <label>Mot de passe*: </label>
                            <input
                                type="password"
                                name="password"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password}
                            />
                            {errors.password && touched.password && errors.password}
                        </div>
                        <div>
                            <label>Mot de passe confirmation*: </label>
                            <input
                                type="password"
                                name="password_confirmation"
                                onChange={handleChange}
                                onBlur={handleBlur}
                                value={values.password_confirmation}
                            />
                            {errors.password_confirmation && touched.password_confirmation && errors.password_confirmation}
                        </div>
                        <button type="submit" disabled={isSubmitting}>
                            Envoyer
    </button>
                    </form>
                )}
        </Formik>
    )
}
export default CreationForm;