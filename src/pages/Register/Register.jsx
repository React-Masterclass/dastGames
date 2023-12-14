import { Link, useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import { FaGoogle } from "react-icons/fa";
import style from "../../pages/Register/Register.module.css";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import AppFooter from "../../components/AppFooter";
import supabase from "../../supabase/client";

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Nome troppo corto")
    .max(50, "Nome troppo lungo!")
    .required("Campo Obbligatorio"),
  last_name: Yup.string()
    .min(2, "Cognome troppo corto")
    .max(50, "Cognome troppo lungo!")
    .required("Campo Obbligatorio"),
  email: Yup.string().email("email non valide").required("Campo Obbligatorio"),
  username: Yup.string()
    .min(2, "Username Troppo Corto")
    .max(35, "Username Troppo Lungo")
    .required("Campo Obbligatorio"),
  password: Yup.string()
    .min(6, "minimo 6 caratteri")
    .required("Campo obbligatorio"),
});

const handleLoginGooogle = async () => {
  try {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        queryParams: {
          access_type: "offline",
          prompt: "consent",
        },
      },
    });
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.error_description || error.message);
    }
  } catch (error) {
    console.log(error);
  }
};

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useAuth();
  const handleRegisterFormik = async (values) => {
    try {
      const { error } = await signUp({
        email: values.email,
        password: values.password,
        options: {
          data: {
            username: values.username,
            first_name : values.first_name,
            last_name : values.last_name
          },
        },
      });
      if (error) {
        // eslint-disable-next-line no-alert
        alert(error.error_description || error.message);
      } else {
        navigate("/account/settings");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <AppNavbar />
        <div className="container flex-grow-1">
          <div className="row justify-content-center">
            <div className="col-12 col-lg-6">
              <Formik
                initialValues={{
                  first_name: "",
                  last_name: "",
                  email: "",
                  username: "",
                  password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  handleRegisterFormik(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    {/* Titolo */}
                    <div className="row justify-content-center  my-4">
                      <h4 className="title tx-secondary text-center">
                        Registrati!
                      </h4>
                    </div>

                    {/* first name and last name */}
                    <div className="row justify-content-center ">
                      {/* First name */}
                      <div className="col-11 col-md-6">
                        <Field
                          className={`${style.field} w-100`}
                          placeholder="Nome"
                          name="first_name"
                          type="text"
                        />
                        {errors.first_name && touched.first_name ? (
                          <div style={{ color: "red" }}>{errors.first_name}</div>
                        ) : null}
                      </div>
                      {/* Last name */}
                      <div className="col-11 col-md-6 mt-4 mt-md-0">
                        <Field
                          className={`${style.field} w-100`}
                          placeholder="Cognome"
                          name="last_name"
                          type="text"
                        />
                        {errors.last_name && touched.last_name ? (
                          <div style={{ color: "red" }}>{errors.last_name}</div>
                        ) : null}
                      </div>
                    </div>

                    {/* username and email */}
                    <div className="row justify-content-center my-4">
                      {/* username */}
                      <div className="col-11 col-md-6">
                        <Field
                          className={`${style.field} w-100`}
                          placeholder="Username"
                          name="username"
                          type="text"
                        />
                        {errors.username && touched.username ? (
                          <div style={{ color: "red" }}>{errors.username}</div>
                        ) : null}
                      </div>
                      {/* Email */}
                      <div className="col-11 col-md-6 mt-4 mt-md-0">
                        <Field
                          className={`${style.field} w-100`}
                          placeholder="Email"
                          name="email"
                          type="email"
                        />
                        {errors.email && touched.email ? (
                          <div style={{ color: "red" }}>{errors.email}</div>
                        ) : null}
                      </div>
                    </div>

                    {/* password */}
                    <div className="row justify-content-center">
                      <div className="col-11 col-md-6">
                        <Field
                          className={`${style.field} w-100`}
                          placeholder="Password"
                          name="password"
                          type="password"
                        />
                        {errors.password && touched.password ? (
                          <div style={{ color: "red" }}>{errors.password}</div>
                        ) : null}
                      </div>
                    </div>
                    <hr className="tx-secondary" />
                    {/* continue with google */}
                    <div className="row justify-content-center my-4">
                      <div className="col-11 col-md-6">
                        <div
                          onClick={handleLoginGooogle}
                          className={`text-decoration-none text-black ${style.googleLogin} d-flex justify-content-center btn`}
                        >
                          <FaGoogle className="me-4 align-self-center" />
                          continua con google
                        </div>
                      </div>
                    </div>
                          {/* register button */}
                    <div className="row justify-content-center">
                      <div className="col-11">
                      <button className="btn btn-success w-100" type="submit">
                        Registrati
                      </button>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <Link to={"/login"} className="text-center mt-3">
                        <a  href="">Hai gia un account? log in</a>
                      </Link>
                    </div>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      <AppFooter />
    </div>
  );
}
