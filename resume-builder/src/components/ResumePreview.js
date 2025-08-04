import React, { forwardRef } from 'react';

const ResumePreview = forwardRef(({ data }, ref) => {
  const { personalInfo, skills, education, experience, projects } = data;

  // Format date for display
  const formatDate = (dateStr) => {
    if (!dateStr) return '';
    if (dateStr === 'Present') return 'Present';
    
    try {
      const date = new Date(dateStr + '-01'); // Add day for proper parsing
      return date.toLocaleDateString('en-US', { 
        year: 'numeric', 
        month: 'short' 
      });
    } catch {
      return dateStr;
    }
  };

  // Format date range
  const formatDateRange = (startDate, endDate) => {
    const start = formatDate(startDate);
    const end = formatDate(endDate);
    
    if (!start && !end) return '';
    if (!start) return end;
    if (!end) return start;
    
    return `${start} - ${end}`;
  };

  return (
    <div 
      ref={ref} 
      className="bg-white p-8 min-h-[11in] w-full max-w-[8.5in] mx-auto shadow-sm"
      style={{ 
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: '14px',
        lineHeight: '1.4'
      }}
    >
      {/* Header Section */}
      <header className="text-center mb-8 border-b-2 border-gray-200 pb-6">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          {personalInfo.fullName || 'Your Name'}
        </h1>
        <h2 className="text-xl text-gray-600 mb-4">
          {personalInfo.role || 'Your Professional Title'}
        </h2>
        <div className="flex justify-center items-center space-x-6 text-sm text-gray-700">
          {personalInfo.email && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <span>{personalInfo.email}</span>
            </div>
          )}
          {personalInfo.phone && (
            <div className="flex items-center space-x-1">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
              </svg>
              <span>{personalInfo.phone}</span>
            </div>
          )}
        </div>
      </header>

      {/* Skills Section */}
      {skills.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            SKILLS
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill, index) => (
              <span 
                key={index}
                className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm font-medium"
              >
                {skill}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Experience Section */}
      {experience.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            WORK EXPERIENCE
          </h3>
          <div className="space-y-4">
            {experience.map((exp) => (
              <div key={exp.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div>
                    <h4 className="font-semibold text-gray-900">{exp.role}</h4>
                    <p className="text-gray-700 font-medium">{exp.company}</p>
                  </div>
                  <div className="text-sm text-gray-600 text-right">
                    {formatDateRange(exp.startDate, exp.endDate)}
                  </div>
                </div>
                {exp.description && (
                  <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                    {exp.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Projects Section */}
      {projects.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            PROJECTS
          </h3>
          <div className="space-y-4">
            {projects.map((project) => (
              <div key={project.id} className="mb-4">
                <div className="flex justify-between items-start mb-1">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-semibold text-gray-900">{project.name}</h4>
                      {project.githubLink && (
                        <a 
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:text-blue-800"
                        >
                          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                          </svg>
                        </a>
                      )}
                    </div>
                    {project.techStack && (
                      <p className="text-sm text-gray-600 italic">{project.techStack}</p>
                    )}
                  </div>
                </div>
                {project.description && (
                  <p className="text-gray-700 text-sm mt-2 leading-relaxed">
                    {project.description}
                  </p>
                )}
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Education Section */}
      {education.length > 0 && (
        <section className="mb-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3 border-b border-gray-300 pb-1">
            EDUCATION
          </h3>
          <div className="space-y-3">
            {education.map((edu) => (
              <div key={edu.id} className="flex justify-between items-start">
                <div>
                  <h4 className="font-semibold text-gray-900">
                    {edu.degree}
                    {edu.field && ` in ${edu.field}`}
                  </h4>
                  <p className="text-gray-700">{edu.school}</p>
                </div>
                <div className="text-sm text-gray-600">
                  {formatDateRange(edu.startYear, edu.endYear)}
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Empty state */}
      {!personalInfo.fullName && !personalInfo.role && skills.length === 0 && 
       education.length === 0 && experience.length === 0 && projects.length === 0 && (
        <div className="text-center py-12 text-gray-500">
          <svg className="w-16 h-16 mx-auto mb-4 text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <h3 className="text-lg font-medium text-gray-900 mb-2">Your Resume Preview</h3>
          <p className="text-gray-600">
            Start filling out the forms on the left to see your resume come to life!
          </p>
        </div>
      )}
    </div>
  );
});

ResumePreview.displayName = 'ResumePreview';

export default ResumePreview;