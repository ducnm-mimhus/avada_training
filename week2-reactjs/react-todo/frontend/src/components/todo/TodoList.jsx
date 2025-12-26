import { useState, useCallback, useMemo } from "react";
import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Modal,
  TextContainer,
  Text,
  Badge,
  Button,
  Toast,
} from "@shopify/polaris";
import { useTodos } from "../../hooks/TodoHook";
import TodoItem from "./TodoItem";
import CreateTodoModal from "./TodoForm";

function TodoList({ searchValue }) {
  const {
    todos,
    loading,
    addTodo,
    toggleComplete,
    toggleCompleteMany,
    removeTodo,
    uncompletedCount,
  } = useTodos();

  const [selectedItems, setSelectedItems] = useState([]);
  const [activeModal, setActiveModal] = useState(false);
  const [toastContent, setToastContent] = useState(null);
  const [bulkActionType, setBulkActionType] = useState(null);
  const [idToDelete, setIDToDelete] = useState(null);

  // --- Logic Lọc Search ---
  const filteredTodos = useMemo(() => {
    if (!searchValue) return todos;
    return todos.filter((todo) =>
      todo.text.toLowerCase().includes(searchValue.toLowerCase())
    );
  }, [todos, searchValue]);

  const toggleModal = useCallback(
    () => setActiveModal((active) => !active),
    []
  );

  const openBulkConfirm = (type) => setBulkActionType(type);
  const closeBulkConfirm = () => setBulkActionType(null);

  // Logic confirm delete one Todo
  const requestDelete = (id) => {
    setIDToDelete(id);
  };

  const cancelDelete = () => {
    setIDToDelete(null);
  };

  const confirmDelete = async () => {
    if (idToDelete) {
      await removeTodo(idToDelete);
      setToastContent("Delete successfully!");
      setIDToDelete(null);
    }
  };

  // --- Logic Xử lý Bulk Action ---
  const handleConfirmBulkAction = async () => {
    if (bulkActionType === "delete") {
      for (const id of selectedItems) await removeTodo(id);
      setToastContent("Deleted selected tasks");
    } else if (bulkActionType === "complete") {
      await toggleCompleteMany(selectedItems, true);
      setToastContent("Marked selected as complete");
    } else if (bulkActionType === "incomplete") {
      await toggleCompleteMany(selectedItems, false);
      setToastContent("Marked selected as incomplete");
    }

    setSelectedItems([]);
    closeBulkConfirm();
  };

  // --- ĐỊNH NGHĨA CÁC NÚT HÀNH ĐỘNG HÀNG LOẠT ---
  // Polaris sẽ tự động ẩn cái này đi, chỉ hiện khi có tick chọn
  const bulkActions = [
    {
      content: "Mark as Complete",
      onAction: () => openBulkConfirm("complete"),
    },
    {
      content: "Mark as Incomplete",
      onAction: () => openBulkConfirm("incomplete"),
    },
    {
      content: "Delete",
      destructive: true,
      onAction: () => openBulkConfirm("delete"),
    },
  ];

  const selectedTodosObjects = todos.filter((t) =>
    selectedItems.includes(t.id)
  );

  // --- UI CHÍNH ---
  return (
    <Page
      title="Todoes Management"
      titleMetadata={
        <Badge tone={uncompletedCount > 0 ? "attention" : "success"}>
          {uncompletedCount} tasks left
        </Badge>
      }
      primaryAction={{ content: "Create Todo", onAction: toggleModal }}
    >
      <Layout>
        {/* 1. CHỈ DÙNG 1 SECTION ĐỂ LIST NẰM CHÍNH GIỮA */}
        <Layout.Section>
          <LegacyCard>
            <ResourceList
              resourceName={{ singular: "todo", plural: "todos" }}
              items={filteredTodos}
              renderItem={(item) => (
                <TodoItem
                  item={item}
                  toggleComplete={toggleComplete}
                  requestDelete={requestDelete}
                />
              )}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              // 2. TRUYỀN BULK ACTIONS VÀO ĐÂY
              // Việc này sẽ tự động kích hoạt Checkbox ở mỗi dòng
              bulkActions={bulkActions}
              loading={loading}
              emptyState={
                !loading && (
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    <Text variant="headingMd" as="h2">
                      Nothing here!
                    </Text>
                    <Button onClick={toggleModal}>Add now</Button>
                  </div>
                )
              }
            />
          </LegacyCard>
        </Layout.Section>
      </Layout>

      {/* --- MODAL CONFIRM BULK ACTION --- */}
      <Modal
        open={!!bulkActionType}
        onClose={closeBulkConfirm}
        title={`Confirm ${bulkActionType}?`}
        primaryAction={{
          content: "Confirm",
          destructive: bulkActionType === "delete",
          onAction: handleConfirmBulkAction,
        }}
        secondaryActions={[{ content: "Cancel", onAction: closeBulkConfirm }]}
      >
        <Modal.Section>
          <TextContainer>
            <p>
              Are you sure you want to <b>{bulkActionType}</b>{" "}
              {selectedItems.length} selected tasks?
            </p>
            <ul style={{ maxHeight: "200px", overflowY: "auto" }}>
              {selectedTodosObjects.map((t) => (
                <li key={t.id}>
                  <Text as="span" fontWeight="bold">
                    {t.text}
                  </Text>
                </li>
              ))}
            </ul>
          </TextContainer>
        </Modal.Section>
      </Modal>

      <Modal
        open={!!idToDelete}
        onClose={cancelDelete}
        title="Delete this Todo?"
        primaryAction={{
          content: "Delete",
          destructive: true,
          onAction: confirmDelete,
        }}
        secondaryActions={[
          {
            content: "Cancel",
            onAction: cancelDelete,
          },
        ]}
      >
        <Modal.Section>
          <TextContainer>
            <p>Are you sure to delete this task? This task cannot be undo!</p>
          </TextContainer>
        </Modal.Section>
      </Modal>

      <CreateTodoModal
        active={activeModal}
        onClose={toggleModal}
        onAdd={(text) => {
          addTodo(text);
          setToastContent("Created successfully");
        }}
      />

      {toastContent && (
        <Toast content={toastContent} onDismiss={() => setToastContent(null)} />
      )}
    </Page>
  );
}

export default TodoList;
