import React, { useState } from 'react';

const ProjectsForm = ({ data, onChange }) => {
  const [isAdding, setIsAdding] = useState(false);
  const [newProject, setNewProject] = useState({
    name: '',
    techStack: '',
    description: '',
    githubLink: ''
  });

  // Add new project entry
  const addProject = () => {
    if (newProject.name.trim() && newProject.description.trim()) {
      onChange([...data, { ...newProject, id: Date.now() }]);
      setNewProject({
        name: '',
        techStack: '',
        description: '',
        githubLink: ''
      });
      setIsAdding(false);
    }
  };

  // Remove project entry
  const removeProject = (id) => {
    onChange(data.filter(project => project.id !== id));
  };

  // Update project entry
  const updateProject = (id, field, value) => {
    onChange(data.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    ));
  };

  // Handle new project input changes
  const handleNewProjectChange = (field, value) => {
    setNewProject(prev => ({ ...prev, [field]: value }));
  };

  // Cancel adding new project
  const cancelAdd = () => {
    setNewProject({
      name: '',
      techStack: '',
      description: '',
      githubLink: ''
    });
    setIsAdding(false);
  };

  // Validate URL format
  const isValidUrl = (url) => {
    if (!url) return true; // Empty is valid (optional field)
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  return (
    <div className="space-y-4">
      {/* Existing project entries */}
      {data.map((project) => (
        <div key={project.id} className="bg-gray-50 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-start">
            <h4 className="font-medium text-gray-900">Project</h4>
            <button
              onClick={() => removeProject(project.id)}
              className="text-red-600 hover:text-red-800 focus:outline-none"
              title="Remove project"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label className="form-label">Project Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., E-commerce Website"
                value={project.name}
                onChange={(e) => updateProject(project.id, 'name', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Tech Stack</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., React, Node.js, MongoDB"
                value={project.techStack}
                onChange={(e) => updateProject(project.id, 'techStack', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Project Description *</label>
            <textarea
              className="form-input h-20 resize-none"
              placeholder="Describe what the project does, key features, and your role..."
              value={project.description}
              onChange={(e) => updateProject(project.id, 'description', e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">GitHub Link</label>
            <div className="relative">
              <input
                type="url"
                className={`form-input ${project.githubLink && !isValidUrl(project.githubLink) ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="https://github.com/username/project-name"
                value={project.githubLink}
                onChange={(e) => updateProject(project.id, 'githubLink', e.target.value)}
              />
              {project.githubLink && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {isValidUrl(project.githubLink) ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              )}
            </div>
            {project.githubLink && !isValidUrl(project.githubLink) && (
              <p className="text-xs text-red-600 mt-1">Please enter a valid URL</p>
            )}
          </div>
        </div>
      ))}

      {/* Add new project form */}
      {isAdding && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 space-y-3">
          <div className="flex justify-between items-center">
            <h4 className="font-medium text-blue-900">Add New Project</h4>
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
              <label className="form-label">Project Name *</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., E-commerce Website"
                value={newProject.name}
                onChange={(e) => handleNewProjectChange('name', e.target.value)}
              />
            </div>
            <div>
              <label className="form-label">Tech Stack</label>
              <input
                type="text"
                className="form-input"
                placeholder="e.g., React, Node.js, MongoDB"
                value={newProject.techStack}
                onChange={(e) => handleNewProjectChange('techStack', e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="form-label">Project Description *</label>
            <textarea
              className="form-input h-20 resize-none"
              placeholder="Describe what the project does, key features, and your role..."
              value={newProject.description}
              onChange={(e) => handleNewProjectChange('description', e.target.value)}
            />
          </div>

          <div>
            <label className="form-label">GitHub Link</label>
            <div className="relative">
              <input
                type="url"
                className={`form-input ${newProject.githubLink && !isValidUrl(newProject.githubLink) ? 'border-red-300 focus:border-red-500 focus:ring-red-500' : ''}`}
                placeholder="https://github.com/username/project-name"
                value={newProject.githubLink}
                onChange={(e) => handleNewProjectChange('githubLink', e.target.value)}
              />
              {newProject.githubLink && (
                <div className="absolute inset-y-0 right-0 flex items-center pr-3">
                  {isValidUrl(newProject.githubLink) ? (
                    <svg className="w-4 h-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  )}
                </div>
              )}
            </div>
            {newProject.githubLink && !isValidUrl(newProject.githubLink) && (
              <p className="text-xs text-red-600 mt-1">Please enter a valid URL</p>
            )}
          </div>

          <div className="flex justify-end space-x-2 pt-2">
            <button
              onClick={cancelAdd}
              className="btn-secondary text-sm"
            >
              Cancel
            </button>
            <button
              onClick={addProject}
              disabled={!newProject.name.trim() || !newProject.description.trim() || (newProject.githubLink && !isValidUrl(newProject.githubLink))}
              className="btn-primary text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Project
            </button>
          </div>
        </div>
      )}

      {/* Add project button */}
      {!isAdding && (
        <button
          onClick={() => setIsAdding(true)}
          className="w-full border-2 border-dashed border-gray-300 hover:border-primary-500 text-gray-600 hover:text-primary-600 py-4 px-4 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
        >
          <div className="flex items-center justify-center space-x-2">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            <span>Add Project</span>
          </div>
        </button>
      )}

      {/* Helper text */}
      <div className="text-xs text-gray-500">
        Showcase your personal projects, open-source contributions, and side projects.
      </div>
    </div>
  );
};

export default ProjectsForm;