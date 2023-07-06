import { Button, Input } from "@mantine/core";
import { FormEvent, useState } from "react";

const ChatSender = ({
  handleSendMessage,
  disabled,
}: {
  handleSendMessage: (event: FormEvent<HTMLFormElement>) => void;
  disabled: boolean;
}) => {
  const [message, setMessage] = useState<string>("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    setMessage("");
    handleSendMessage(event);
  };

  return (
    <form className="flex flex-1" action="submit" onSubmit={handleSubmit}>
      <Input
        type="text"
        name="message"
        value={message}
        onChange={(event) => setMessage(event.target.value)}
        placeholder="Message"
        className="flex-1"
        disabled={disabled}
      />
      <Button className="ml-2" type="submit" disabled={disabled}>
        Send
      </Button>
    </form>
  );
};

export default ChatSender;
