import { Link } from "react-router-dom";
import { useContext } from "react";
import AppContext from "../../contexts/Appcontext";
import { useNavigate } from "react-router-dom";
import { Formik, Form, Field } from "formik";
import supabase from "../../supabase/client";
import style from "../../pages/Login/login.module.css";
import { FaGoogle } from "react-icons/fa";
import AppNavbar from "../../components/AppNavbar/AppNavbar";
import AppFooter from "../../components/AppFooter";
import * as Yup from "yup";

const SignupSchema = Yup.object().shape({
  email: Yup.string().email("email non valide").required("Campo Obbligatorio"),
  password: Yup.string().required("Campo obbligatorio"),
});

export default function Login() {
  const navigate = useNavigate();
  const { signIn } = useContext(AppContext);

  // gestisco il login
  const handleLoginFormik = async (values) => {
    try {
      let { error } = await signIn({
        email: values.email,
        password: values.password,
      });
      if (error) {
        alert(error.error_description || error.message);
      } else {
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleLoginGooogle = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          queryParams: {
            access_type: "online",
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

  return (
    <div className='d-flex flex-column min-vh-100'>
      <AppNavbar  />
      <div className="container flex-grow-1">
        <div className="row">
          <div className="col-12 col-md-5 ">
            <div className="mx-auto mt-5">
              <Formik
                initialValues={{
                  email: "",
                  password: "",
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  handleLoginFormik(values);
                }}
              >
                {({ errors, touched }) => (
                  <Form>
                    <div className="row justify-content-center  my-4">
                      <h4 className="title tx-secondary text-center">
                        Log in!
                      </h4>
                    </div>
                    {/* email */}
                    <div className="row justify-content-center">
                      <div className="col-10 col-lg-6">
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
                    <div className="row justify-content-center my-4">
                      <div className="col-10 col-lg-6">
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
                    <div className="row justify-content-center">
                      <div className="col-10 col-lg-6">
                        <div
                          onClick={handleLoginGooogle}
                          className={`text-decoration-none text-black ${style.googleLogin} d-flex justify-content-center btn`}
                        >
                          <FaGoogle className="me-4 align-self-center" />
                          login con google
                        </div>
                      </div>
                    </div>
                    <div className="row justify-content-center">
                      <div className="col-10 col-lg-6">
                        <button
                          className="btn btn-success mt-4 w-100"
                          type="submit"
                        >
                          Log in
                        </button>
                      </div>
                    </div>
                    <Link
                      to={"/register"}
                      className="d-flex justify-content-center"
                    >
                      <a className="mt-3" href="">
                        Non hai un account? Registrati
                      </a>
                    </Link>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
          <div className={`${style.body} col-12 col-md-7`}></div>
        </div>
      </div>
      <AppFooter />
    </div>
  );
}
