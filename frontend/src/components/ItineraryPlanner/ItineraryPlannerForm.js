import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMapMarkerAlt,
  faCalendar,
  faDollarSign,
  faUsers,
  faSmile,
  faCompass
} from '@fortawesome/free-solid-svg-icons';
import { Container, Form, Row, Col, Button, InputGroup } from 'react-bootstrap';
import './ItineraryPlannerForm.css';

const ItineraryPlannerForm = ({ formType, getItinerary, formData, setFormData }) => {
  const [peopleCount, setPeopleCount] = useState(1);

  const vacationTypes = [
    { value: 'relaxed', label: 'Relaxed' },
    { value: 'tourist', label: 'Tourist' },
    { value: 'workation', label: 'Workation' }
  ];

  const groupTypes = [
    { value: 'solo', label: 'Solo' },
    { value: 'couple', label: 'Couple' },
    { value: 'family', label: 'Family' },
    { value: 'friends', label: 'Friends' },
    { value: 'business', label: 'Business' }
  ];

  const moodOptions = [
    { value: 'adventure', label: 'Adventure' },
    { value: 'relaxation', label: 'Relaxation' },
    { value: 'cultural', label: 'Cultural' },
    { value: 'party', label: 'Party' },
    { value: 'nature', label: 'Nature' }
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePeopleCountChange = (action) => {
    setPeopleCount((prev) => (action === 'increment' ? Math.min(prev + 1, 10) : Math.max(prev - 1, 1)));
  };

  const renderInputField = (label, icon, type, name, value, placeholder) => (
    <Form.Group className="mb-3">
      <Form.Label className="d-flex align-items-center">
        <FontAwesomeIcon icon={icon} className="me-2 text-primary" />
        {label}
      </Form.Label>
      <Form.Control
        type={type}
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
      />
    </Form.Group>
  );

  const renderSelectField = (label, icon, name, options, placeholder = '') => (
    <Form.Group className="mb-3">
      <Form.Label className="d-flex align-items-center">
        <FontAwesomeIcon icon={icon} className="me-2 text-primary" />
        {label}
      </Form.Label>
      <Form.Select name={name} value={formData[name]} onChange={handleInputChange}>
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );

  const renderDateField = (label, name) => renderInputField(label, faCalendar, 'date', name, formData[name]);

  const renderPeopleCounter = () => (
    <Form.Group className="mb-3">
      <Form.Label className="d-flex align-items-center">
        <FontAwesomeIcon icon={faUsers} className="me-2 text-primary" />
        Number of People
      </Form.Label>
      <InputGroup>
        <Button
          variant="outline-secondary"
          onClick={() => handlePeopleCountChange('decrement')}
        >
          -
        </Button>
        <Form.Control type="text" value={peopleCount} readOnly className="text-center" />
        <Button
          variant="outline-secondary"
          onClick={() => handlePeopleCountChange('increment')}
        >
          +
        </Button>
      </InputGroup>
    </Form.Group>
  );

  const renderTextareaField = (label, icon, name, value, placeholder, rows = 3) => (
    <Form.Group className="mb-3">
      <Form.Label className="d-flex align-items-center">
        <FontAwesomeIcon icon={icon} className="me-2 text-primary" />
        {label}
      </Form.Label>
      <Form.Control
        as="textarea"
        name={name}
        value={value}
        onChange={handleInputChange}
        placeholder={placeholder}
        rows={rows}
      />
    </Form.Group>
  );

  return (
    <Container className="itinerary-container py-4">
      <h2 className="text-center mb-4">
        {formType === 'known' ? 'Plan Your Specific Trip' : 'Let Us Help You Plan'}
      </h2>
      <Form>
        {formType === 'unknown' &&
          renderTextareaField('Share Your Thoughts', faSmile, 'customDetails', formData.mindInput || '', 'Tell us about your ideas for this trip...', 5)}

        {formType === 'known' && (
          <>
            {renderInputField('Destination', faMapMarkerAlt, 'text', 'destination', formData.destination, 'Where are you going?')}
            <Row>
              <Col>{renderDateField('Start Date', 'startDate')}</Col>
              <Col>{renderDateField('End Date', 'endDate')}</Col>
            </Row>
            {renderInputField('Budget', faDollarSign, 'number', 'budget', formData.budget, 'Your total trip budget')}
            {renderSelectField('Vacation Type', faCompass, 'vacationType', vacationTypes)}
            {renderSelectField('Group Type', faUsers, 'groupType', groupTypes)}
            {renderPeopleCounter()}
            {renderTextareaField('Additional Details', faSmile, 'customDetails', formData.customDetails, 'Share any special requirements or preferences...', 3)}
          </>
        )}

        <Button
          variant="primary"
          type="submit"
          className="w-100"
          onClick={getItinerary}
        >
          {formType === 'known' ? 'Plan My Trip' : 'Get Trip Recommendations'}
        </Button>
      </Form>
    </Container>
  );
};

export default ItineraryPlannerForm;
