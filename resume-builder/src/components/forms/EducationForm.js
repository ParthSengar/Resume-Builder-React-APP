import React, { useState } from 'react';

const EducationForm = ({ data, onChange }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newEducation, setNewEducation] = useState({
    school: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: ''
  });

  // Add new education entry
  const addEducation = () => {
    if (newEducation.school.trim() && newEducation.degree.trim()) {
      onChange([...data, { ...newEducation, id: Date.now() }]);
      setNewEducation({
        school: '',
        degree: '',
        field: '',
        startYear: '',
        endYear: ''
      });
      setIsAdding(false);
    }
  };

  // Remove education entry
  const removeEducation = (id) => {
    onChange(data.filter(edu => edu.id !== id));
  };

  // Update education entry
  const updateEducation = (id, field, value) => {
    onChange(data.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    ));
  };

  // Handle new education input changes
  const handleNewEducationChange = (field, value) => {
    setNewEducation(prev => ({ ...prev, [field]: value }));
  };

  // Cancel adding new education
  const cancelAdd = () => {
    setNewEducation({
      school: '',
      degree: '',
      field: '',
      startYear: '',
      endYear: ''
    });
    setIsAdding(false);
  };

  // Generate year options
  const currentYear = new Date().getFullYear();
  const years = [];
  for (let year = currentYear + 5; year >= 1970; year--) {
    years.push(year);
  }

  return (
    <div className="space-y-4">
      {/* Existing education entries */}
      {data.map((education) => (
        <div key={education.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">Education Entry</h4>
            <button
              onClick={() => removeEducation(education.id)}
              className="text-red-600 hover:text-red-800 focus:outline-none"
              title="Remove education"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="form-label">School/University *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., University of California"
                value={education.school}
                onChange={(e) => updateEducation(education.id, 'school', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Degree *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Bachelor of Science"
                value={education.degree}
                onChange={(e) => updateEducation(education.id, 'degree', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Field of Study</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Computer Science"
              value={education.field}
              onChange={(e) => updateEducation(education.id, 'field', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="form-label">Start Year</label>
              <select
                className="form-input"
                value={education.startYear}
                onChange={(e) => updateEducation(education.id, 'startYear', e.target.value)}
              >
                <option value="">Select year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">End Year</label>
              <select
                className="form-input"
                value={education.endYear}
                onChange={(e) => updateEducation(education.id, 'endYear', e.target.value)}
              >
                <option value="">Select year</option>
                <option value="Present">Present</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      ))}

      {/* Add new education form */}
      {isAdding && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-blue-900">Add New Education</h4>
            <button
              onClick={cancelAdd}
              className="text-blue-600 hover:text-blue-800 focus:outline-none"
              title="Cancel"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="form-label">School/University *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., University of California"
                value={newEducation.school}
                onChange={(e) => handleNewEducationChange('school', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Degree *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Bachelor of Science"
                value={newEducation.degree}
                onChange={(e) => handleNewEducationChange('degree', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Field of Study</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g., Computer Science"
              value={newEducation.field}
              onChange={(e) => handleNewEducationChange('field', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="form-label">Start Year</label>
              <select
                className="form-input"
                value={newEducation.startYear}
                onChange={(e) => handleNewEducationChange('startYear', e.target.value)}
              >
                <option value="">Select year</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="form-label">End Year</label>
              <select
                className="form-input"
                value={newEducation.endYear}
                onChange={(e) => handleNewEducationChange('endYear', e.target.value)}
              >
                <option value="">Select year</option>
                <option value="Present">Present</option>
                {years.map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={cancelAdd}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
            <button
              onClick={addEducation}
              disabled={!newEducation.school.trim() || !newEducation.degree.trim()}
              className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Education
            </button>
          </div>
        </div>
      )}

      {/* Add education button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full border-2 border-dashed border-gray-300 hover:border-primary-500 text-gray-600 hover:text-primary-600 py-4 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Education</span>
          </div>
        </button>
      )}

      {/* Helper text */}
      <div className="text-xs text-gray-500">
        Add your educational background, including degrees, certifications, and relevant courses.
      </div>
    </div>
  );
};

export default EducationForm;