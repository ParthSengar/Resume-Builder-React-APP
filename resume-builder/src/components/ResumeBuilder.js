import React, { useState, useEffect, useRef } from 'react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import PersonalInfoForm from './forms/PersonalInfoForm';
import SkillsForm from './forms/SkillsForm';
import EducationForm from './forms/EducationForm';
import ExperienceForm from './forms/ExperienceForm';
import ProjectsForm from './forms/ProjectsForm';
import ResumePreview from './ResumePreview';

const ResumeBuilder = () => {
  // State management for all resume data
  const [resumeData, setResumeData] = useState({
    personalInfo: {
      fullName: '',
      role: '',
      phone: '',
      email: ''
    },
    skills: [],
    education: [],
    experience: [],
    projects: []
  });

  const [isDownloading, setIsDownloading] = useState(false);
  const resumeRef = useRef();

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem('resumeBuilderData');
    if (savedData) {
      try {
        setResumeData(JSON.parse(savedData));
      } catch (error) {
        console.error('Error loading saved data:', error);
      }
    }
  }, []);

  // Save data to localStorage whenever resumeData changes
  useEffect(() => {
    localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
  }, [resumeData]);

  // Update functions for each section
  const updatePersonalInfo = (personalInfo) => {
    setResumeData(prev => ({ ...prev, personalInfo }));
  };

  const updateSkills = (skills) => {
    setResumeData(prev => ({ ...prev, skills }));
  };

  const updateEducation = (education) => {
    setResumeData(prev => ({ ...prev, education }));
  };

  const updateExperience = (experience) => {
    setResumeData(prev => ({ ...prev, experience }));
  };

  const updateProjects = (projects) => {
    setResumeData(prev => ({ ...prev, projects }));
  };

  // PDF download functionality
  const downloadAsPDF = async () => {
    if (!resumeRef.current) return;

    setIsDownloading(true);
    
    try {
      // Create canvas from the resume preview
      const canvas = await html2canvas(resumeRef.current, {
        scale: 2,
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff'
      });

      // Create PDF
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      const imgWidth = 210; // A4 width in mm
      const pageHeight = 295; // A4 height in mm
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      // Add image to PDF
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      // Add new pages if content is longer than one page
      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      // Download the PDF
      const fileName = resumeData.personalInfo.fullName 
        ? `${resumeData.personalInfo.fullName.replace(/\s+/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
      
      pdf.save(fileName);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Error generating PDF. Please try again.');
    } finally {
      setIsDownloading(false);
    }
  };

  // Clear all data
  const clearAllData = () => {
    if (window.confirm('Are you sure you want to clear all data? This action cannot be undone.')) {
      const emptyData = {
        personalInfo: { fullName: '', role: '', phone: '', email: '' },
        skills: [],
        education: [],
        experience: [],
        projects: []
      };
      setResumeData(emptyData);
      localStorage.removeItem('resumeBuilderData');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Resume Builder</h1>
              <p className="text-sm text-gray-600">Create your professional resume in real-time</p>
            </div>
            <div className="flex space-x-3">
              <button
                onClick={clearAllData}
                className="btn-secondary text-sm"
                title="Clear all data"
              >
                Clear All
              </button>
              <button
                onClick={downloadAsPDF}
                disabled={isDownloading}
                className="btn-primary text-sm"
                title="Download resume as PDF"
              >
                {isDownloading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating...
                  </span>
                ) : (
                  'Download PDF'
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Side - Forms */}
          <div className="space-y-6">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Personal Information</h2>
              <PersonalInfoForm 
                data={resumeData.personalInfo} 
                onChange={updatePersonalInfo} 
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Skills</h2>
              <SkillsForm 
                data={resumeData.skills} 
                onChange={updateSkills} 
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Education</h2>
              <EducationForm 
                data={resumeData.education} 
                onChange={updateEducation} 
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Work Experience</h2>
              <ExperienceForm 
                data={resumeData.experience} 
                onChange={updateExperience} 
              />
            </div>

            <div className="bg-white rounded-lg shadow-sm border p-6">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Projects</h2>
              <ProjectsForm 
                data={resumeData.projects} 
                onChange={updateProjects} 
              />
            </div>
          </div>

          {/* Right Side - Resume Preview */}
          <div className="lg:sticky lg:top-8 lg:h-fit">
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Live Preview</h2>
                <div className="text-xs text-gray-500">
                  Auto-saved to browser
                </div>
              </div>
              <div className="border rounded-lg overflow-hidden bg-white">
                <ResumePreview 
                  ref={resumeRef}
                  data={resumeData} 
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeBuilder;