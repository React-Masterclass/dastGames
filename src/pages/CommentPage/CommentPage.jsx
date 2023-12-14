import { Formik, Form, Field } from "formik";
import * as Yup from "yup";
import supabase from "../../supabase/client";
import { useLocation } from "react-router-dom";
import { useState } from "react";
import style from "../CommentPage/CommentPage.module.css";
import useProfile from "../../hooks/useProfile";

export default function CommentPage() {
  const [success, setSuccess] = useState(false);
  let { state } = useLocation();
  const {profile} = useProfile();

  const SignupSchema = Yup.object().shape({
    comment_title: Yup.string().required(),
    comment_content: Yup.string().required(),
  });
  const handleCommentSubmit = async (values, { resetForm }) => {
    const { error } = await supabase
      .from("comments")
      .insert([
        {
          profile_id: profile.id,
          game_id: state.id,
          game_name: state.name,
          comment_title: values.comment_title,
          comment_content: values.comment_content,
        },
      ])
      .select();
    if (error) {
      // eslint-disable-next-line no-alert
      alert(error.message);
    } else {
      resetForm();
      setSuccess(true);
    }
  };

  return (
    <div className="container">
      <div className="row">
        <h1 className="text-center tx-secondary my-5">
          Inserisci un commento a {state.name}
        </h1>
      </div>
      <div className="row">
        <Formik
          initialValues={{
            comment_title: "",
            comment_content: "",
          }}
          validationSchema={SignupSchema}
          onSubmit={handleCommentSubmit}
        >
          {({ errors, touched }) => (
            <Form className="row w-50 mx-auto">
              <div className="row my-4">
                <label htmlFor="commentTitle">
                  <h4 className="tx-secondary">Titolo</h4>
                </label>
                <Field
                  id="commentTitle"
                  type="text"
                  className={style.field}
                  name="comment_title"
                />
                {errors.comment_title && touched.comment_title ? (
                  <div style={{ color: "red" }}>{errors.comment_title}</div>
                ) : null}
              </div>

              <div className="row mb-4">
                <h4 className="tx-secondary">Commento</h4>
                <Field
                  type="text"
                  name="comment_content"
                  className={style.field}
                  as="textarea"
                  rows="5"
                />
                {errors.comment_content && touched.comment_content ? (
                  <div style={{ color: "red" }}>{errors.comment_content}</div>
                ) : null}
              </div>

              <button type="submit" className={style.sendButton}>
                {success ? "inviato con successo" : "invia "}
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
