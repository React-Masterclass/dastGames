/* eslint-disable react/prop-types */
import { useState, useEffect, useRef } from "react";
import supabase from "../../supabase/client";
import moment from "moment";
import style from "../Messages/Messages.module.css";
import { Scrollbar } from "react-scrollbars-custom";

function Messages({ game }) {
  const [chat, setChat] = useState([]);
  const chatRef = useRef(null);

  const getMessages = async () => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*, profile: profiles(username)")
        .eq("game_id", game.id);

      if (error) {
        throw new Error(error.message);
      }

      setChat(data);
      scrollToBottom();
    } catch (error) {
      console.error("Error fetching messages:", error.message);
    }
  };

  useEffect(() => {
    getMessages();

    const subscription = supabase
      .channel('messages')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
        },
        () => getMessages()
      )
      .subscribe();

    return () => {
      subscription.unsubscribe();
    };
  }, [game.id]); // Ensure that useEffect runs when game.id changes
  useEffect(() => {
    scrollToBottom();
  }, [chat]);

  const scrollToBottom = () => {
    if (chatRef.current) {
      chatRef.current.scrollToBottom();
    }
  };


  return (
    <div className="border border-black rounded-4 p-3">

    <Scrollbar style={{ height: 250 }} ref={chatRef}>
      {chat && chat.length > 0 ? (
        chat.map((message) => (
          <article key={message.id} className={`${style.messageContainer} row m-0 my-2`}>
            <div className="col-6">
              <p className={`${style.createdAtP} text-truncate tx-primary mt-2 ms-1`}>{message.profile.username || message.profile.first_name || "Anonimo"}</p>
            </div>
            <div className="col-6 text-end">
              <p className={` ${style.messageContent} tx-primary mt-1 me-1 mb-0`}> {message.content}</p>
              <p className={style.createdAtP}>
                {moment(`${message.created_at}`).format("DD/MM/YYYY HH:mm:ss")}
              </p>
            </div>
          </article>
        ))
      ):
      <p>Ancora nessun messaggio</p>
      }
    </Scrollbar>
    </div>
  );
}

export default Messages;
