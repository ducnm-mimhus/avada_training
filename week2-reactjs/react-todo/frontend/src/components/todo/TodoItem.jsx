import {
  ResourceItem,
  Text,
  Badge,
  Button,
  InlineStack,
} from "@shopify/polaris";

function TodoItem({ item, toggleComplete, requestDelete }) {
  const { id, text, isCompleted } = item;

  return (
    <ResourceItem id={id}>
      <InlineStack align="space-between" blockAlign="center" gap="300">
        <Text variant="bodyMd" fontWeight="bold" as="h3">
          {text}
        </Text>

        <InlineStack gap="200" blockAlign="center">
          <Badge tone={isCompleted ? "success" : "attention"}>
            {isCompleted ? "Complete" : "Incomplete"}
          </Badge>

          <Button size="slim" onClick={() => toggleComplete(id)}>
            {isCompleted ? "Undo" : "Complete"}
          </Button>

          <Button size="slim" tone="critical" onClick={() => requestDelete(id)}>
            Delete
          </Button>
        </InlineStack>
      </InlineStack>
    </ResourceItem>
  );
}

export default TodoItem;
