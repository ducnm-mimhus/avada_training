import { ResourceItem, Text, Badge } from "@shopify/polaris";

function TodoItem({ item, toggleComplete, removeTodo }) {
  const { id, text, isCompleted } = item;

  // Cấu hình nút bấm nhanh (Hover vào mới hiện)
  const shortcutActions = [
    {
      content: isCompleted ? "Undo" : "Complete",
      onAction: () => toggleComplete(id),
    },
    {
      content: "Delete",
      destructive: true, // Màu đỏ cảnh báo
      onAction: () => removeTodo(id),
    },
  ];

  return (
    <ResourceItem
      id={id}
      accessibilityLabel={`View details for ${text}`}
      shortcutActions={shortcutActions}
      persistActions // Luôn hiện nút bấm trên Mobile
    >
      <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {text}
        </Text>
        <Badge tone={isCompleted ? "success" : "attention"}>
          {isCompleted ? "Complete" : "Incomplete"}
        </Badge>
      </div>
    </ResourceItem>
  );
}

export default TodoItem;
