import {
  faCalendar,
  faDollarSign,
  faMapMarkerAlt,
  faSmile,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useMemo } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import "./ItineraryPlannerForm.css";

// Itinerary planner form component to take inputs from the user
const ItineraryPlannerForm = ({
  formType,
  getItinerary,
  formData,
  setFormData,
}) => {
  const groupTypes = [
    { value: "solo", label: "Solo" },
    { value: "couple", label: "Couple" },
    { value: "family", label: "Family" },
    { value: "friends", label: "Friends" },
    { value: "business", label: "Business" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Memoized validation for submission button
  const isSubmitDisabled = useMemo(() => {
    if (formType === "unknown") {
      // For unknown form type, check if custom details are present
      return !formData.message || formData.message.trim() === "";
    }

    // For known form type, check if destination, start date, end date, and budget are filled
    return (
      !formData.destination ||
      formData.destination.trim() === "" ||
      !formData.startDate ||
      !formData.endDate ||
      !formData.budget ||
      formData.budget === ""
    );
  }, [formType, formData]);

  const renderInputField = (label, icon, type, name, value, placeholder) => (
    <Form.Group className="mb-3">
      <Form.Label className="d-flex align-items-center">
        <FontAwesomeIcon icon={icon} className="me-2" />
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

  const renderSelectField = (label, icon, name, options, placeholder = "") => (
    <Form.Group className="mb-3">
      <Form.Label className="d-flex align-items-center">
        <FontAwesomeIcon icon={icon} className="me-2" />
        {label}
      </Form.Label>
      <Form.Select
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
      >
        {placeholder && <option value="">{placeholder}</option>}
        {options.map(({ value, label }) => (
          <option key={value} value={value}>
            {label}
          </option>
        ))}
      </Form.Select>
    </Form.Group>
  );

  const renderDateField = (label, name) =>
    renderInputField(label, faCalendar, "date", name, formData[name]);

  const renderTextareaField = (
    label,
    icon,
    name,
    value,
    placeholder,
    rows = 3
  ) => (
    <Form.Group className="mb-3">
      <Form.Label className="d-flex align-items-center">
        <FontAwesomeIcon icon={icon} className="me-2" />
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
    <>
      <h2 className="text-center mb-4">
        {formType === "known"
          ? "Plan Your Specific Trip"
          : "Let Us Help You Plan"}
      </h2>
      <Form>
        {formType === "unknown" &&
          renderTextareaField(
            "Share Your Thoughts",
            faSmile,
            "message",
            formData.message || "",
            "Tell us about your ideas for this trip...",
            5
          )}

        {formType === "known" && (
          <>
            {renderInputField(
              "Destination",
              faMapMarkerAlt,
              "text",
              "destination",
              formData.destination,
              "Where are you going?"
            )}
            <Row>
              <Col>{renderDateField("Start Date", "startDate")}</Col>
              <Col>{renderDateField("End Date", "endDate")}</Col>
            </Row>
            {renderInputField(
              "Budget",
              faDollarSign,
              "number",
              "budget",
              formData.budget,
              "Your total trip budget"
            )}
            {renderSelectField("Group Type", faUsers, "groupType", groupTypes)}
            {renderTextareaField(
              "Additional Details",
              faSmile,
              "message",
              formData.message,
              "Share any special requirements or preferences...",
              3
            )}
          </>
        )}

        <Button
          type="submit"
          className="w-100"
          onClick={getItinerary}
          disabled={isSubmitDisabled}
        >
          {formType === "known" ? "Plan My Trip" : "Get Trip Recommendations"}
        </Button>
      </Form>
    </>
  );
};

export default ItineraryPlannerForm;
