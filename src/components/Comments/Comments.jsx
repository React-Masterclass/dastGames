import { useRef, useState, useEffect } from "react";
import supabase from "../../supabase/client";
import { Scrollbar } from "react-scrollbars-custom";
import style from "../Comments/Comments.module.css";
import moment from "moment";

export default function Comments({ game }) {
  const commentRef = useRef();
  const [comments, setComments] = useState([]);

  const getComments = async () => {
    try {
      const { data, error } = await supabase
        .from("comments")
        .select("*, profile: profiles(username)")
        .eq("game_id", game.id);

      if (error) {
        throw new Error(error.message);
      } else {
        setComments(data);
      }
    } catch (error) {
      console.error("Error fetching comments:", error.message);
    }
  };

  useEffect(() => {
    getComments();
    scrollToBottom();
  }, [game.id]);

  const scrollToBottom = () => {
    if (commentRef.current) {
      commentRef.current.scrollToBottom();
    }
  };

  return (
    <div className="border border-black rounded-3 p-3">
      <Scrollbar style={{ height: 210 }} ref={commentRef}>
        {comments && comments.length === 0 ? (
          <p>Ancora nessun commento</p>
        ) : (
          comments.map((comment) => (
            <article key={comment.id} className={style.commentContainer}>
              <div className="row m-0">
                <h4 className="tx-primary text-center text-truncate">
                  {" "}
                  {comment.comment_title}
                </h4>
              </div>
              <div className="row m-0 my-3">
                <p className={`${style.commentContent} text-left tx-primary`}>
                  {" "}
                  {comment.comment_content}
                </p>
              </div>
              <div className="row m-0 ms-auto">
                <p className={` ${style.publishedBy} text-truncate m-0`}>
                  pubblicato da: {comment.profile?.username || "Anonimo"} il{" "}
                  {moment(`${comment.created_at}`).format(
                    "DD/MM/YYYY HH:mm:ss"
                  )}
                </p>
              </div>
            </article>
          ))
        )}
      </Scrollbar>
    </div>
  );
}
