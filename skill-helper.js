// Quick fix script - Add creatorSkill to all mockIOUs
// Run this in browser console to update the data

const skills = [
  'Web Development', 'Graphic Design', 'Content Writing', 'Video Editing',
  'Social Media Management', 'Data Analysis', 'Photography', 'Translation',
  'Tutoring', 'Consulting', 'Marketing', 'Accounting'
];

// This will be added to each IOU based on category
const skillMap = {
  'Basic': ['Cleaning', 'Data Entry', 'Admin Support', 'Customer Service'],
  'Skilled': ['Graphic Design', 'Content Writing', 'Social Media Management', 'Photography'],
  'Technical': ['Web Development', 'Data Analysis', 'Video Editing', 'Software Testing'],
  'Expert': ['Consulting', 'Legal Advice', 'Architecture', 'Financial Planning']
};

// For demo: Just add to CreateIOU form
console.log('Add creatorSkill field to CreateIOU form');
