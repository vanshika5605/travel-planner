import React, { useState } from "react";
import { Button, Form, Modal } from "react-bootstrap";

// Component to add a new item to the list
const NewItemModal = ({
  showAddItemModal,
  setShowAddItemModal,
  packingList,
  setPackingList,
}) => {
  const [newItem, setNewItem] = useState({
    name: "",
    quantity: 1,
    categoryType: "existing", // 'existing' or 'new'
    existingCategory: "",
    newCategory: "",
  });

  const addNewItem = () => {
    if (!newItem.name) return;

    // Determine the category
    const category =
      newItem.categoryType === "existing"
        ? newItem.existingCategory
        : newItem.newCategory.toLowerCase();

    // Validate category
    if (!category) {
      alert("Please select or enter a category");
      return;
    }

    setPackingList((current) => {
      const updatedList = { ...current };

      // Create category if it doesn't exist
      if (!updatedList[category]) {
        updatedList[category] = [];
      }

      // Add new item
      updatedList[category].push({
        id: `new-${Date.now()}`,
        name: newItem.name,
        quantity: newItem.quantity,
        packed: false,
      });

      return updatedList;
    });

    // Reset and close modal
    setNewItem({
      name: "",
      quantity: 1,
      categoryType: "existing",
      existingCategory: "",
      newCategory: "",
    });
    setShowAddItemModal(false);
  };

  return (
    <>
      <Modal show={showAddItemModal} onHide={() => setShowAddItemModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New Item</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              name="categoryType"
              id="existingCategory"
              label="Use Existing Category"
              checked={newItem.categoryType === "existing"}
              onChange={() =>
                setNewItem((prev) => ({
                  ...prev,
                  categoryType: "existing",
                  newCategory: "",
                }))
              }
            />
            {newItem.categoryType === "existing" && (
              <Form.Select
                className="mt-2"
                value={newItem.existingCategory}
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    existingCategory: e.target.value,
                  }))
                }
              >
                <option value="">Select Category</option>
                {Object.keys(packingList).map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </Form.Select>
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Check
              type="radio"
              name="categoryType"
              id="newCategory"
              label="Create New Category"
              checked={newItem.categoryType === "new"}
              onChange={() =>
                setNewItem((prev) => ({
                  ...prev,
                  categoryType: "new",
                  existingCategory: "",
                }))
              }
            />
            {newItem.categoryType === "new" && (
              <Form.Control
                className="mt-2"
                type="text"
                placeholder="Enter new category name"
                value={newItem.newCategory}
                onChange={(e) =>
                  setNewItem((prev) => ({
                    ...prev,
                    newCategory: e.target.value,
                  }))
                }
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter item name"
              value={newItem.name}
              onChange={(e) =>
                setNewItem((prev) => ({
                  ...prev,
                  name: e.target.value,
                }))
              }
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control
              data-testid="quantity-input"
              type="number"
              value={newItem.quantity}
              onChange={(e) =>
                setNewItem((prev) => ({
                  ...prev,
                  quantity: parseInt(e.target.value) || 1,
                }))
              }
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setShowAddItemModal(false)}
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={addNewItem}
            disabled={
              !newItem.name ||
              (newItem.categoryType === "existing" &&
                !newItem.existingCategory) ||
              (newItem.categoryType === "new" && !newItem.newCategory)
            }
          >
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default NewItemModal;
