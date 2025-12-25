import { useState, useCallback } from "react";
import { Modal, TextField } from "@shopify/polaris";

function CreateTodoModal({ active, onClose, onAdd }) {
  const [value, setValue] = useState("");

  const handleSubmit = useCallback(() => {
    if (!value) return;
    onAdd(value);
    setValue(""); // Reset form
    onClose(); // Đóng modal
  }, [value, onAdd, onClose]);

  return (
    <Modal
      open={active}
      onClose={onClose}
      title="Create new todo"
      primaryAction={{
        content: "Add",
        onAction: handleSubmit,
      }}
      secondaryActions={[
        {
          content: "Cancel",
          onAction: onClose,
        },
      ]}
    >
      <Modal.Section>
        <TextField
          label="Title"
          value={value}
          onChange={setValue}
          autoComplete="off"
          placeholder="What needs to be done?"
          autoFocus // Tự động focus vào ô input khi mở modal
        />
      </Modal.Section>
    </Modal>
  );
}

export default CreateTodoModal;
