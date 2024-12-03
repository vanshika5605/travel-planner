import React, { useState, useMemo } from 'react';
import { Container, Card, Button, Form, Row, Col, Modal, Pagination } from 'react-bootstrap';

const PackingList = () => {
  const [tripDetails, setTripDetails] = useState({
    destination: 'Maldives',
    startDate: '2024-12-15',
    endDate: '2024-12-22',
    travelers: 2,
    tripType: 'Beach Vacation'
  });

  const [packingList, setPackingList] = useState({
    essentials: [
      { id: 'passport', name: 'Passport', quantity: 1, packed: false },
      { id: 'wallet', name: 'Wallet', quantity: 1, packed: false },
      { id: 'phone-charger', name: 'Phone Charger', quantity: 1, packed: false },
    ],
    clothing: [
      { id: 't-shirts', name: 'T-Shirts', quantity: 3, packed: false },
      { id: 'underwear', name: 'Underwear', quantity: 4, packed: false },
      { id: 'socks', name: 'Socks', quantity: 3, packed: false },
      { id: 'pants', name: 'Pants', quantity: 2, packed: false },
    ],
  });

  const [newItem, setNewItem] = useState({
    name: '',
    quantity: 1,
    categoryType: 'existing', // 'existing' or 'new'
    existingCategory: '',
    newCategory: ''
  });

  const [showAddItemModal, setShowAddItemModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 15;

  const toggleItemPacked = (category, itemId) => {
    setPackingList(current => ({
      ...current,
      [category]: current[category].map(item => 
        item.id === itemId 
          ? { ...item, packed: !item.packed } 
          : item
      )
    }));
  };

  const addNewItem = () => {
    if (!newItem.name) return;

    // Determine the category
    const category = newItem.categoryType === 'existing' 
      ? newItem.existingCategory 
      : newItem.newCategory.toLowerCase();

    // Validate category
    if (!category) {
      alert('Please select or enter a category');
      return;
    }

    setPackingList(current => {
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
        packed: false
      });

      return updatedList;
    });

    // Reset and close modal
    setNewItem({
      name: '',
      quantity: 1,
      categoryType: 'existing',
      existingCategory: '',
      newCategory: ''
    });
    setShowAddItemModal(false);
  };

  const handleShare = () => {
    const shareContent = Object.entries(packingList)
      .map(([category, items]) => 
        `${category.toUpperCase()}:\n` + 
        items.map(item => 
          `${item.packed ? '✓' : '☐'} ${item.name} (Qty: ${item.quantity})`
        ).join('\n')
      )
      .join('\n\n');

    if (navigator.share) {
      navigator.share({
        title: `Packing List for ${tripDetails.destination}`,
        text: shareContent
      }).catch(console.error);
    } else {
      alert('Sharing not supported on this browser');
    }
  };

  // Pagination logic
  const paginatedItems = useMemo(() => {
    const allItems = Object.entries(packingList).flatMap(([category, items]) => 
      items.map(item => ({ ...item, category }))
    );
    
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    
    return {
      items: allItems.slice(startIndex, endIndex),
      totalPages: Math.ceil(allItems.length / itemsPerPage)
    };
  }, [packingList, currentPage]);

  const calculatePackedItemsCount = () => {
    let packedCount = 0;
    let totalCount = 0;
    Object.values(packingList).forEach(category => {
      category.forEach(item => {
        totalCount++;
        if (item.packed) packedCount++;
      });
    });
    return { packedCount, totalCount };
  };

  const { packedCount, totalCount } = calculatePackedItemsCount();

  const generatePrintContent = () => {
    return Object.entries(packingList)
      .map(([category, items]) => `
        <div>
          <h3>${category.toUpperCase()}</h3>
          <ul>
            ${items.map(item => `
              <li>
                <input type="checkbox" ${item.packed ? 'checked' : ''}>
                ${item.name} (Qty: ${item.quantity})
              </li>
            `).join('')}
          </ul>
        </div>
      `)
      .join('');
  };

  const handlePrint = () => {
    const printWindow = window.open('', '', 'height=500, width=500');
    printWindow.document.write(`
      <html>
        <head>
          <title>Packing List for ${tripDetails.destination}</title>
          <style>
            body { font-family: Arial, sans-serif; }
            h2 { text-align: center; }
            h3 { margin-bottom: 10px; text-transform: capitalize; }
            ul { list-style-type: none; padding-left: 0; }
            li { margin-bottom: 5px; }
            input[type="checkbox"] { margin-right: 10px; }
          </style>
        </head>
        <body>
          <h2>Packing List for ${tripDetails.destination}</h2>
          <p><strong>Trip Details:</strong> ${tripDetails.startDate} - ${tripDetails.endDate}, ${tripDetails.travelers} travelers, ${tripDetails.tripType}</p>
          ${generatePrintContent()}
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <Container className="mt-4">
      <Row>
        <Col md={4}>
          <Card>
            <Card.Header>Trip Details</Card.Header>
            <Card.Body>
              <p><strong>Destination:</strong> {tripDetails.destination}</p>
              <p><strong>Dates:</strong> {tripDetails.startDate} - {tripDetails.endDate}</p>
              <p><strong>Travelers:</strong> {tripDetails.travelers}</p>
              <p><strong>Trip Type:</strong> {tripDetails.tripType}</p>
            </Card.Body>
          </Card>
        </Col>

        <Col md={8}>
          <Card className="mb-4">
            <Card.Header>
              <div className="d-flex justify-content-between align-items-center">
                <h4>🧳 Packing List for {tripDetails.destination}</h4>
                <div>
                  <Button variant="outline-secondary" className="me-2" onClick={handlePrint}>
                    Print
                  </Button>
                  <Button variant="outline-primary" onClick={handleShare}>
                    Share
                  </Button>
                </div>
              </div>
            </Card.Header>
            <Card.Body>
              {Object.entries(packingList).map(([category, items]) => (
                <Card key={category} className="mb-3">
                  <Card.Header className="text-capitalize">{category}</Card.Header>
                  <Card.Body>
                    {items.slice(
                      (currentPage - 1) * itemsPerPage, 
                      currentPage * itemsPerPage
                    ).map(item => (
                      <div 
                        key={item.id} 
                        className="d-flex align-items-center mb-2"
                      >
                        <Form.Check 
                          type="checkbox"
                          id={item.id}
                          label={`${item.name} (Qty: ${item.quantity})`}
                          checked={item.packed}
                          onChange={() => toggleItemPacked(category, item.id)}
                          className={item.packed ? 'text-muted text-decoration-line-through' : ''}
                        />
                      </div>
                    ))}
                  </Card.Body>
                </Card>
              ))}
              
              <div className="d-flex justify-content-between align-items-center">
                <Button 
                  variant="success" 
                  onClick={() => setShowAddItemModal(true)}
                >
                  + Add New Item
                </Button>
                
                <Pagination>
                  {[...Array(paginatedItems.totalPages)].map((_, index) => (
                    <Pagination.Item 
                      key={index + 1}
                      active={index + 1 === currentPage}
                      onClick={() => setCurrentPage(index + 1)}
                    >
                      {index + 1}
                    </Pagination.Item>
                  ))}
                </Pagination>
              </div>
            </Card.Body>
            <Card.Footer className="d-flex justify-content-between">
              <span>{packedCount} of {totalCount} items packed</span>
              <Button variant="primary">Save Changes</Button>
            </Card.Footer>
          </Card>
        </Col>
      </Row>

      {/* Add Item Modal */}
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
              checked={newItem.categoryType === 'existing'}
              onChange={() => setNewItem(prev => ({ 
                ...prev, 
                categoryType: 'existing',
                newCategory: '' 
              }))}
            />
            {newItem.categoryType === 'existing' && (
              <Form.Select 
                className="mt-2"
                value={newItem.existingCategory}
                onChange={(e) => setNewItem(prev => ({ 
                  ...prev, 
                  existingCategory: e.target.value 
                }))}
              >
                <option value="">Select Category</option>
                {Object.keys(packingList).map(category => (
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
              checked={newItem.categoryType === 'new'}
              onChange={() => setNewItem(prev => ({ 
                ...prev, 
                categoryType: 'new',
                existingCategory: '' 
              }))}
            />
            {newItem.categoryType === 'new' && (
              <Form.Control 
                className="mt-2"
                type="text"
                placeholder="Enter new category name"
                value={newItem.newCategory}
                onChange={(e) => setNewItem(prev => ({ 
                  ...prev, 
                  newCategory: e.target.value 
                }))}
              />
            )}
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Item Name</Form.Label>
            <Form.Control 
              type="text"
              placeholder="Enter item name"
              value={newItem.name}
              onChange={(e) => setNewItem(prev => ({ 
                ...prev, 
                name: e.target.value 
              }))}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Quantity</Form.Label>
            <Form.Control 
              type="number"
              value={newItem.quantity}
              onChange={(e) => setNewItem(prev => ({ 
                ...prev, 
                quantity: parseInt(e.target.value) || 1 
              }))}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddItemModal(false)}>
            Close
          </Button>
          <Button 
            variant="primary" 
            onClick={addNewItem}
            disabled={
              !newItem.name || 
              (newItem.categoryType === 'existing' && !newItem.existingCategory) ||
              (newItem.categoryType === 'new' && !newItem.newCategory)
            }
          >
            Add Item
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default PackingList;