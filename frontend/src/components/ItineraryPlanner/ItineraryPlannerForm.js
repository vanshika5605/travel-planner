import React, { useState } from 'react';
import { 
  FontAwesomeIcon 
} from '@fortawesome/react-fontawesome';
import { 
  faMapMarkerAlt, 
  faCalendar, 
  faDollarSign, 
  faUsers, 
  faSmile, 
  faCompass 
} from '@fortawesome/free-solid-svg-icons';
import { 
  Container, 
  Form, 
  Row, 
  Col, 
  Button, 
  InputGroup 
} from 'react-bootstrap';

const ItineraryPlannerForm = ({ formType}) => {
  const [peopleCount, setPeopleCount] = useState(1);
  const [formData, setFormData] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    vacationType: 'relaxed',
    groupType: 'solo',
    customDetails: '',
    mood: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePeopleCountChange = (action) => {
    setPeopleCount(prev => 
      action === 'increment' 
        ? Math.min(prev + 1, 10) 
        : Math.max(prev - 1, 1)
    );
  };

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

  return (
    <Container className="py-4">
      <h2 className="text-center mb-4">
        {formType === 'known' 
          ? 'Plan Your Specific Trip' 
          : 'Let Us Help You Plan'}
      </h2>
      
      <Form>
        {formType === 'known' && (
          <Form.Group className="mb-3">
            <Form.Label className="d-flex align-items-center">
              <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2 text-primary" />
              Destination
            </Form.Label>
            <Form.Control
              type="text"
              name="destination"
              value={formData.destination}
              onChange={handleInputChange}
              placeholder="Where are you going?"
            />
          </Form.Group>
        )}

        {formType === 'unknown' && (
          <Form.Group className="mb-3">
            <Form.Label className="d-flex align-items-center">
              <FontAwesomeIcon icon={faSmile} className="me-2 text-primary" />
              Trip Mood
            </Form.Label>
            <Form.Select
              name="mood"
              value={formData.mood}
              onChange={handleInputChange}
            >
              <option value="">Select Your Trip Mood</option>
              {moodOptions.map(mood => (
                <option key={mood.value} value={mood.value}>
                  {mood.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex align-items-center">
                <FontAwesomeIcon icon={faCalendar} className="me-2 text-primary" />
                Start Date
              </Form.Label>
              <Form.Control
                type="date"
                name="startDate"
                value={formData.startDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label className="d-flex align-items-center">
                <FontAwesomeIcon icon={faCalendar} className="me-2 text-primary" />
                End Date
              </Form.Label>
              <Form.Control
                type="date"
                name="endDate"
                value={formData.endDate}
                onChange={handleInputChange}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <FontAwesomeIcon icon={faDollarSign} className="me-2 text-primary" />
            Budget
          </Form.Label>
          <Form.Control
            type="number"
            name="budget"
            value={formData.budget}
            onChange={handleInputChange}
            placeholder="Your total trip budget"
          />
        </Form.Group>

        {formType === 'known' && (
          <Form.Group className="mb-3">
            <Form.Label className="d-flex align-items-center">
              <FontAwesomeIcon icon={faCompass} className="me-2 text-primary" />
              Vacation Type
            </Form.Label>
            <Form.Select
              name="vacationType"
              value={formData.vacationType}
              onChange={handleInputChange}
            >
              {vacationTypes.map(type => (
                <option key={type.value} value={type.value}>
                  {type.label}
                </option>
              ))}
            </Form.Select>
          </Form.Group>
        )}

        <Form.Group className="mb-3">
          <Form.Label className="d-flex align-items-center">
            <FontAwesomeIcon icon={faUsers} className="me-2 text-primary" />
            Group Type
          </Form.Label>
          <Form.Select
            name="groupType"
            value={formData.groupType}
            onChange={handleInputChange}
          >
            {groupTypes.map(type => (
              <option key={type.value} value={type.value}>
                {type.label}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

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
              <FontAwesomeIcon icon={faUsers} />
            </Button>
            <Form.Control
              type="text"
              value={peopleCount}
              readOnly
              className="text-center"
            />
            <Button 
              variant="outline-secondary" 
              onClick={() => handlePeopleCountChange('increment')}
            >
              <FontAwesomeIcon icon={faUsers} />
            </Button>
          </InputGroup>
        </Form.Group>

        {formType === 'known' && (
          <Form.Group className="mb-3">
            <Form.Label>Additional Details</Form.Label>
            <Form.Control
              as="textarea"
              name="customDetails"
              value={formData.customDetails}
              onChange={handleInputChange}
              placeholder="Share any special requirements or preferences..."
              rows={3}
            />
          </Form.Group>
        )}

        <Button 
          variant="primary" 
          type="submit" 
          className="w-100"
        >
          {formType === 'known' ? 'Plan My Trip' : 'Get Trip Recommendations'}
        </Button>
      </Form>
    </Container>
  );
};

export default ItineraryPlannerForm;