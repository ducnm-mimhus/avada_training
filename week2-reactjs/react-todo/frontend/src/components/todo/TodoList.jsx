import React, { useState, useCallback } from "react";
import {
  Page,
  Layout,
  LegacyCard,
  ResourceList,
  Toast,
  Text,
  Button,
} from "@shopify/polaris";
import { useTodos } from "../../hooks/TodoHook";
import TodoItem from "./TodoItem";
import CreateTodoModal from "./TodoForm";

function TodoList() {
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

  const toggleModal = useCallback(
    () => setActiveModal((active) => !active),
    []
  );

  // --- Logic Bulk Actions ---
  const handleBulkComplete = async () => {
    await toggleCompleteMany(selectedItems, true);
    setSelectedItems([]);
    setToastContent("Marked as complete");
  };

  const handleBulkIncomplete = async () => {
    await toggleCompleteMany(selectedItems, false);
    setSelectedItems([]);
    setToastContent("Marked as incomplete");
  };

  const bulkActions = [
    { content: "Complete", onAction: handleBulkComplete },
    { content: "Incomplete", onAction: handleBulkIncomplete },
  ];

  // --- Logic Render ---
  return (
    <Page
      title="Todoes Management"
      subtitle="Toi la minh duc"
      primaryAction={{ content: "Create Todo", onAction: toggleModal }}
    >
      <Layout>
        <Layout.Section>
          <LegacyCard>
            <ResourceList
              resourceName={{ singular: "todo", plural: "todos" }}
              items={todos}
              renderItem={(item) => (
                <TodoItem
                  item={item}
                  toggleComplete={toggleComplete}
                  removeTodo={removeTodo}
                />
              )}
              selectedItems={selectedItems}
              onSelectionChange={setSelectedItems}
              bulkActions={bulkActions}
              loading={loading}
              emptyState={
                !loading && (
                  <div style={{ padding: "20px", textAlign: "center" }}>
                    <Text variant="headingMd" as="h2">
                      Chưa có công việc nào
                    </Text>
                    <Button onClick={toggleModal}>Tạo ngay</Button>
                  </div>
                )
              }
            />
          </LegacyCard>
        </Layout.Section>
      </Layout>

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
