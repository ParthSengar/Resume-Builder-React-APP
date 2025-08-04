import React, { useState } from 'react';

const ExperienceForm = ({ data, onChange }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newExperience, setNewExperience] = useState({
    company: '',
    role: '',
    description: '',
    startDate: '',
    endDate: '',
    isCurrentJob: false
  });

  // Add new experience entry
  const addExperience = () => {
    if (newExperience.company.trim() && newExperience.role.trim()) {
      const experienceToAdd = {
        ...newExperience,
        id: Date.now(),
        endDate: newExperience.isCurrentJob ? 'Present' : newExperience.endDate
      };
      onChange([...data, experienceToAdd]);
      setNewExperience({
        company: '',
        role: '',
        description: '',
        startDate: '',
        endDate: '',
        isCurrentJob: false
      });
      setIsAdding(false);
    }
  };

  // Remove experience entry
  const removeExperience = (id) => {
    onChange(data.filter(exp => exp.id !== id));
  };

  // Update experience entry
  const updateExperience = (id, field, value) => {
    onChange(data.map(exp => {
      if (exp.id === id) {
        if (field === 'isCurrentJob') {
          return { 
            ...exp, 
            [field]: value,
            endDate: value ? 'Present' : ''
          };
        }
        return { ...exp, [field]: value };
      }
      return exp;
    }));
  };

  // Handle new experience input changes
  const handleNewExperienceChange = (field, value) => {
    if (field === 'isCurrentJob') {
      setNewExperience(prev => ({ 
        ...prev, 
        [field]: value,
        endDate: value ? 'Present' : ''
      }));
    } else {
      setNewExperience(prev => ({ ...prev, [field]: value }));
    }
  };

  // Cancel adding new experience
  const cancelAdd = () => {
    setNewExperience({
      company: '',
      role: '',
      description: '',
      startDate: '',
      endDate: '',
      isCurrentJob: false
    });
    setIsAdding(false);
  };

  return (
    <div className="space-y-4">
      {/* Existing experience entries */}
      {data.map((experience) => (
        <div key={experience.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">Work Experience</h4>
            <button
              onClick={() => removeExperience(experience.id)}
              className="text-red-600 hover:text-red-800 focus:outline-none"
              title="Remove experience"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="form-label">Company *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Google, Microsoft"
                value={experience.company}
                onChange={(e) => updateExperience(experience.id, 'company', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Job Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Software Engineer"
                value={experience.role}
                onChange={(e) => updateExperience(experience.id, 'role', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Job Description</label>
            <textarea
              className="form-input h-24 resize-none"
              placeholder="Describe your responsibilities, achievements, and key contributions..."
              value={experience.description}
              onChange={(e) => updateExperience(experience.id, 'description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="form-label">Start Date</label>
              <input
                type="month"
                className="form-input"
                value={experience.startDate}
                onChange={(e) => updateExperience(experience.id, 'startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">End Date</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`current-${experience.id}`}
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={experience.isCurrentJob || experience.endDate === 'Present'}
                    onChange={(e) => updateExperience(experience.id, 'isCurrentJob', e.target.checked)}
                  />
                  <label htmlFor={`current-${experience.id}`} className="text-sm text-gray-700">
                    Current position
                  </label>
                </div>
                {!experience.isCurrentJob && experience.endDate !== 'Present' && (
                  <input
                    type="month"
                    className="form-input"
                    value={experience.endDate}
                    onChange={(e) => updateExperience(experience.id, 'endDate', e.target.value)}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Add new experience form */}
      {isAdding && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-blue-900">Add New Experience</h4>
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
              <label className="form-label">Company *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Google, Microsoft"
                value={newExperience.company}
                onChange={(e) => handleNewExperienceChange('company', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Job Title *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., Software Engineer"
                value={newExperience.role}
                onChange={(e) => handleNewExperienceChange('role', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Job Description</label>
            <textarea
              className="form-input h-24 resize-none"
              placeholder="Describe your responsibilities, achievements, and key contributions..."
              value={newExperience.description}
              onChange={(e) => handleNewExperienceChange('description', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="form-label">Start Date</label>
              <input
                type="month"
                className="form-input"
                value={newExperience.startDate}
                onChange={(e) => handleNewExperienceChange('startDate', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">End Date</label>
              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="current-new"
                    className="rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    checked={newExperience.isCurrentJob}
                    onChange={(e) => handleNewExperienceChange('isCurrentJob', e.target.checked)}
                  />
                  <label htmlFor="current-new" className="text-sm text-gray-700">
                    Current position
                  </label>
                </div>
                {!newExperience.isCurrentJob && (
                  <input
                    type="month"
                    className="form-input"
                    value={newExperience.endDate}
                    onChange={(e) => handleNewExperienceChange('endDate', e.target.value)}
                  />
                )}
              </div>
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
              onClick={addExperience}
              disabled={!newExperience.company.trim() || !newExperience.role.trim()}
              className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Experience
            </button>
          </div>
        </div>
      )}

      {/* Add experience button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full border-2 border-dashed border-gray-300 hover:border-primary-500 text-gray-600 hover:text-primary-600 py-4 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Work Experience</span>
          </div>
        </button>
      )}

      {/* Helper text */}
      <div className="text-xs text-gray-500">
        Add your work experience, internships, and relevant professional positions.
      </div>
    </div>
  );
};

export default ExperienceForm;