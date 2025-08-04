import React, { useState } from 'react';

const SkillsForm = ({ data, onChange }) => {
  const [newSkill, setNewSkill] = useState('');

  // Add a new skill
  const addSkill = () => {
    if (newSkill.trim() && !data.includes(newSkill.trim())) {
      onChange([...data, newSkill.trim()]);
      setNewSkill('');
    }
  };

  // Remove a skill
  const removeSkill = (skillToRemove) => {
    onChange(data.filter(skill => skill !== skillToRemove));
  };

  // Handle Enter key press
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addSkill();
    }
  };

  return (
    <div className="space-y-4">
      {/* Add new skill */}
      <div className="flex space-x-2">
        <div className="flex-1">
          <input
            type="text"
            className="form-input"
            placeholder="Enter a skill (e.g., JavaScript, React, Python)"
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={handleKeyPress}
          />
        </div>
        <button
          type="button"
          onClick={addSkill}
          disabled={!newSkill.trim()}
          className="btn-primary px-4 py-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Add
        </button>
      </div>

      {/* Skills list */}
      {data.length > 0 && (
        <div>
          <label className="form-label">Your Skills</label>
          <div className="flex flex-wrap gap-2 mt-2">
            {data.map((skill, index) => (
              <div
                key={index}
                className="inline-flex items-center bg-primary-100 text-primary-800 px-3 py-1 rounded-full text-sm"
              >
                <span>{skill}</span>
                <button
                  type="button"
                  onClick={() => removeSkill(skill)}
                  className="ml-2 text-primary-600 hover:text-primary-800 focus:outline-none"
                  title="Remove skill"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Helper text */}
      <div className="text-xs text-gray-500">
        Add your technical and professional skills. Press Enter or click Add to include each skill.
      </div>

      {/* Skills suggestions */}
      <div className="bg-gray-50 rounded-lg p-4">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Popular Skills:</h4>
        <div className="flex flex-wrap gap-2">
          {[
            'JavaScript', 'React', 'Node.js', 'Python', 'Java', 'HTML/CSS', 
            'Git', 'SQL', 'AWS', 'Docker', 'TypeScript', 'MongoDB'
          ].map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                if (!data.includes(suggestion)) {
                  onChange([...data, suggestion]);
                }
              }}
              disabled={data.includes(suggestion)}
              className="text-xs bg-white border border-gray-300 hover:border-primary-500 text-gray-700 px-2 py-1 rounded disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SkillsForm;