import React from 'react';

const PersonalInfoForm = ({ data, onChange }) => {
  // Handle input changes and update parent component
  const handleChange = (field, value) => {
    onChange({
      ...data,
      [field]: value
    });
  };

  return (
    <div className="space-y-4">
      {/* Full Name */}
      <div>
        <label htmlFor="fullName" className="form-label">
          Full Name *
        </label>
        <input
          type="text"
          id="fullName"
          className="form-input"
          placeholder="Enter your full name"
          value={data.fullName}
          onChange={(e) => handleChange('fullName', e.target.value)}
        />
      </div>

      {/* Role/Title */}
      <div>
        <label htmlFor="role" className="form-label">
          Professional Title *
        </label>
        <input
          type="text"
          id="role"
          className="form-input"
          placeholder="e.g., Software Developer, Product Manager"
          value={data.role}
          onChange={(e) => handleChange('role', e.target.value)}
        />
      </div>

      {/* Contact Information Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Phone */}
        <div>
          <label htmlFor="phone" className="form-label">
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            className="form-input"
            placeholder="(555) 123-4567"
            value={data.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
          />
        </div>

        {/* Email */}
        <div>
          <label htmlFor="email" className="form-label">
            Email Address *
          </label>
          <input
            type="email"
            id="email"
            className="form-input"
            placeholder="your.email@example.com"
            value={data.email}
            onChange={(e) => handleChange('email', e.target.value)}
          />
        </div>
      </div>

      {/* Helper text */}
      <div className="text-xs text-gray-500 mt-2">
        * Required fields. This information will appear at the top of your resume.
      </div>
    </div>
  );
};

export default PersonalInfoForm;