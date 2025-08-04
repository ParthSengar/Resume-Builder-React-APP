# Resume Builder

A clean and modern Resume Builder web application built with React.js, JavaScript, and TailwindCSS. Create professional resumes with real-time preview and PDF download functionality.

## 🚀 Features

### Core Functionality
- **Split Screen Interface**: Forms on the left, live preview on the right
- **Real-time Updates**: See changes instantly as you type
- **Professional Templates**: Clean, modern resume formatting
- **Responsive Design**: Works on desktop, tablet, and mobile devices

### Resume Sections
1. **Personal Information**: Name, professional title, contact details
2. **Skills**: Add/remove skills with suggestions and visual tags
3. **Education**: Multiple education entries with date ranges
4. **Work Experience**: Professional experience with descriptions and dates
5. **Projects**: Showcase projects with tech stack and GitHub links

### Advanced Features
- **PDF Download**: Export resume as PDF using html2canvas and jsPDF
- **Auto-save**: Data persists in browser localStorage
- **Form Validation**: Input validation with visual feedback
- **Empty State**: Helpful guidance when starting fresh
- **Clear All**: Reset all data with confirmation

## 🛠️ Tech Stack

- **Frontend**: React.js (Hooks, functional components)
- **Styling**: TailwindCSS with custom components
- **State Management**: React useState hooks
- **PDF Generation**: html2canvas + jsPDF
- **Storage**: Browser localStorage
- **Icons**: Heroicons (SVG)

## 📦 Installation

1. **Clone the repository**:
   ```bash
   git clone <repository-url>
   cd resume-builder
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm start
   ```

4. **Open your browser** and navigate to `http://localhost:3000`

## 🏗️ Project Structure

```
src/
├── components/
│   ├── ResumeBuilder.js          # Main application component
│   ├── ResumePreview.js          # Resume preview with PDF formatting
│   └── forms/
│       ├── PersonalInfoForm.js   # Personal information form
│       ├── SkillsForm.js         # Skills management form
│       ├── EducationForm.js      # Education entries form
│       ├── ExperienceForm.js     # Work experience form
│       └── ProjectsForm.js       # Projects form
├── App.js                        # App entry point
├── index.css                     # Tailwind CSS imports and custom styles
└── index.js                      # React DOM rendering
```

## 🎨 Component Architecture

### State Management
- **Centralized State**: All resume data managed in `ResumeBuilder` component
- **Props Down**: Data passed down to child components
- **Callbacks Up**: Update functions passed to forms for state changes
- **Persistent Storage**: Auto-save to localStorage on every change

### Form Components
Each form component follows a consistent pattern:
- Controlled inputs with local state for new entries
- Add/edit/remove functionality
- Input validation and error handling
- Consistent styling with Tailwind classes

### Resume Preview
- **Professional Layout**: Clean, ATS-friendly design
- **Real-time Updates**: Reflects form changes immediately
- **PDF Ready**: Optimized for PDF generation
- **Responsive**: Adapts to different screen sizes

## 🔧 Key Features Explained

### PDF Generation
```javascript
// Uses html2canvas to capture the resume preview
const canvas = await html2canvas(resumeRef.current, {
  scale: 2,
  useCORS: true,
  allowTaint: true,
  backgroundColor: '#ffffff'
});

// Converts to PDF with jsPDF
const pdf = new jsPDF('p', 'mm', 'a4');
pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
```

### LocalStorage Persistence
```javascript
// Auto-save on every state change
useEffect(() => {
  localStorage.setItem('resumeBuilderData', JSON.stringify(resumeData));
}, [resumeData]);

// Load saved data on component mount
useEffect(() => {
  const savedData = localStorage.getItem('resumeBuilderData');
  if (savedData) {
    setResumeData(JSON.parse(savedData));
  }
}, []);
```

### Dynamic Form Management
- Add/remove entries for education, experience, and projects
- Form validation with visual feedback
- Consistent UX patterns across all forms

## 🎯 Usage Guide

1. **Personal Info**: Start by entering your name and contact details
2. **Skills**: Add relevant technical and soft skills
3. **Experience**: Add your work history with descriptions
4. **Projects**: Showcase your best projects with GitHub links
5. **Education**: Include your educational background
6. **Download**: Click "Download PDF" to export your resume

## 🔒 Data Privacy

- **No Backend**: All data stays in your browser
- **Local Storage**: Data persists between sessions locally
- **No Tracking**: No analytics or data collection
- **Secure**: No data transmitted to external servers

## 🚀 Deployment

### Build for Production
```bash
npm run build
```

### Deploy to Static Hosting
The built files in the `build/` directory can be deployed to:
- Netlify
- Vercel
- GitHub Pages
- AWS S3
- Any static hosting service

## 🤝 Contributing

This project is designed for educational purposes and interview demonstrations. The code is clean, well-commented, and follows React best practices.

### Code Quality Features
- **Clean Architecture**: Separated concerns and reusable components
- **Consistent Styling**: Tailwind utility classes with custom components
- **Error Handling**: Graceful error handling for edge cases
- **Accessibility**: Semantic HTML and keyboard navigation
- **Performance**: Optimized re-renders and efficient state updates

## 📱 Browser Support

- Chrome (recommended)
- Firefox
- Safari
- Edge

## 🐛 Known Limitations

- PDF generation requires modern browser features
- Large amounts of content may affect PDF formatting
- Mobile PDF download may vary by device

## 📝 License

This project is open source and available under the MIT License.

---

Built with ❤️ using React.js and TailwindCSS
