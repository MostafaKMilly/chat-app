import React from "react";
import { InferType } from "yup";
import {
  GenericDialog,
  GenericDialogProps,
} from "../../../../../shared/components";
import { useSocket } from "../../../../../shared/hooks/useSocket";
import UsersSelect from "./UsersSelect";

function AddChatDialog(props: Omit<GenericDialogProps, "dialog">) {
  const [user, setUser] = React.useState<number>();
  const { socket } = useSocket();

  return (
    <GenericDialog
      maxWidth="sm"
      onSubmit={() => {
        socket.emit("createChat", { recipientId: user });
        props.onClose();
        setUser(undefined);
      }}
      dialog={{
        title: "Add Chat",
        closeButton: {
          label: "Close",
          color: "secondary",
        },
        submitButton: {
          label: "Submit",
        },
      }}
      {...props}
    >
      <UsersSelect value={user} onChange={(value) => setUser(value)} />
    </GenericDialog>
  );
}

export default AddChatDialog;
