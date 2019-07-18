import React from "react";
import { withFormik, Form, Field } from 'formik';
import * as Yup from "yup";
import axios from 'axios';

import './LoginForm.css';

function LoginForm({ values, errors, touched, isSubmitting }) {
    return (
        <Form className="form">
            {touched.name && errors.name && <p>{errors.name}</p>}
            <Field className="field" placeholder="Name:" type="text" name="name" />
            {touched.email && errors.email && <p>{errors.email}</p>}
            {/* if there is an error, this shows you the errors message. */}
            <Field className="field" placeholder="Email:" type="email" name="email" />
            {touched.password && errors.password && <p>{errors.password}</p>}
            <Field className="field" placeholder="Password:" type="password" name="password" />
            <label>
                <Field className="field" type="checkbox" name="tos" checked={values.tos} />Terms of Service
            </label>
            <button type="submit" disabled={isSubmitting}>Submit!</button>
        </Form>
    );
}

const FormikLoginForm = withFormik({
    mapPropsToValues({ name, email, password, tos }) {
        return {
            name: name || "",
            email: email || "",
            password: password || "",
            tos: tos || false
        };
    },

    validationSchema: Yup.object().shape({
        name: Yup.string()
            .min(2, "Name not valid")
            .required("Name is required"),
        email: Yup.string()
            .email("Email not valid")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be 6 characters or longer")
            .required("Password is required"),
        tos: Yup.boolean()
            .oneOf([true], "You Must Click")
            .required("You Must Agree to the Terms")
    }),

    handleSubmit(values, { resetForm, setErrors, setSubmitting }) {
        if (values.email === "alreadytaken@atb.dev") {
          setErrors({ email: "That email is already taken" });
        } else {
          axios
            .post("https://reqres.in/api/users", values)
            .then(res => {
              window.alert(res.data.name);
              console.log(res) // Data was created successfully and logs to console
              resetForm();
              setSubmitting(false);
            })
            .catch(err => {
              console.log(err); // There was an error creating the data and logs to console
              setSubmitting(false);
            });
        } 
    }  
})(LoginForm);

export default FormikLoginForm;