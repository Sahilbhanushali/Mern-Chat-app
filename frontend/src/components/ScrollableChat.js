import React from "react";
import { Tooltip, Avatar } from "@chakra-ui/react";
import { isLastMessage, isSameSender } from "../config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  console.log("Messages for Scrollable Chats", messages);

  const { user } = ChatState();

  return (
    <div
      style={{
        overflowY: "scroll",
        height: "calc(100% - 50px)",
        padding: "10px",
      }}
    >
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex", marginBottom: "10px" }} key={m._id}>
            {isSameSender(messages, m, i, user._id) ||
              (isLastMessage(messages, i, user._id) && (
                <Tooltip
                  label={m.sender.name}
                  placement="bottom-start"
                  hasArrow
                >
                  <Avatar
                    mt="7px"
                    mr={1}
                    size="sm"
                    cursor="pointer"
                    name={m.sender.name}
                    src={m.sender.pic}
                  />
                </Tooltip>
              ))}
            <div style={{ marginLeft: "10px" }}>{m.content}</div>
          </div>
        ))}
    </div>
  );
};

export default ScrollableChat;
