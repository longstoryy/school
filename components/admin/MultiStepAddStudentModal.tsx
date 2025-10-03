'use client';

import { useState, useEffect } from 'react';
import { X, ChevronLeft, ChevronRight, Check, User, MapPin, GraduationCap, Users, Heart, Eye, Save } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useToast } from '@/hooks/useToast';
import { parseApiError, generateErrorMessage } from '@/lib/errorHandler';
import ToastContainer from '@/components/ui/ToastContainer';

interface MultiStepAddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentData: any) => void;
}

// Complete form data structure matching Django model
const initialFormData = {
  // Personal Information
  student_id: '',
  first_name: '',
  middle_name: '',
  last_name: '',
  date_of_birth: '',
  gender: '',
  blood_group: '',
  nationality: 'British',
  religion: '',
  
  // Contact Information
  email: '',
  phone_number: '',
  emergency_contact_name: '',
  emergency_contact_phone: '',
  emergency_contact_relationship: '',
  
  // Address Information
  address_line_1: '',
  address_line_2: '',
  city: '',
  county: '',
  postal_code: '',
  country: 'United Kingdom',
  
  // Academic Information
  admission_date: new Date().toISOString().split('T')[0],
  current_class: '',
  academic_year: `${new Date().getFullYear()}-${new Date().getFullYear() + 1}`,
  roll_number: '',
  section: '',
  status: 'active',
  
  // Parent/Guardian Information
  father_name: '',
  father_phone: '',
  father_email: '',
  father_occupation: '',
  mother_name: '',
  mother_phone: '',
  mother_email: '',
  mother_occupation: '',
  guardian_name: '',
  guardian_phone: '',
  guardian_email: '',
  guardian_relationship: '',
  
  // Medical Information
  medical_conditions: '',
  medications: '',
  doctor_name: '',
  doctor_phone: '',
  notes: ''
};

const steps = [
  { id: 1, title: 'Personal Info', icon: User, description: 'Basic personal details' },
  { id: 2, title: 'Contact & Address', icon: MapPin, description: 'Contact and location' },
  { id: 3, title: 'Academic Info', icon: GraduationCap, description: 'School information' },
  { id: 4, title: 'Parents/Guardian', icon: Users, description: 'Family contacts' },
  { id: 5, title: 'Medical & Emergency', icon: Heart, description: 'Health information' },
  { id: 6, title: 'Review', icon: Eye, description: 'Confirm details' }
];

export default function MultiStepAddStudentModal({ isOpen, onClose, onSave }: MultiStepAddStudentModalProps) {
  const { darkMode } = useTheme();
  const toast = useToast();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  // Auto-generate student ID
  useEffect(() => {
    if (isOpen && !formData.student_id) {
      const year = new Date().getFullYear();
      const randomNum = Math.floor(Math.random() * 1000).toString().padStart(3, '0');
      setFormData(prev => ({ ...prev, student_id: `STU${year}${randomNum}` }));
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateStep = (step: number): boolean => {
    const newErrors: {[key: string]: string} = {};
    
    switch (step) {
      case 1: // Personal Info
        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
        if (!formData.date_of_birth) newErrors.date_of_birth = 'Date of birth is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        break;
      case 2: // Contact & Address
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.address_line_1.trim()) newErrors.address_line_1 = 'Address is required';
        if (!formData.city.trim()) newErrors.city = 'City is required';
        if (!formData.county.trim()) newErrors.county = 'County is required';
        if (!formData.postal_code.trim()) newErrors.postal_code = 'Postal code is required';
        break;
      case 3: // Academic Info
        if (!formData.current_class.trim()) newErrors.current_class = 'Current class is required';
        if (!formData.academic_year.trim()) newErrors.academic_year = 'Academic year is required';
        break;
      case 5: // Medical & Emergency
        if (!formData.emergency_contact_name.trim()) newErrors.emergency_contact_name = 'Emergency contact name is required';
        if (!formData.emergency_contact_phone.trim()) newErrors.emergency_contact_phone = 'Emergency contact phone is required';
        if (!formData.emergency_contact_relationship.trim()) newErrors.emergency_contact_relationship = 'Emergency contact relationship is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCompletedSteps(prev => [...new Set([...prev, currentStep])]);
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
    } else {
      toast.error('Please fix the errors before continuing');
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(5)) {
      toast.error('Please complete all required fields');
      return;
    }
    
    setIsSubmitting(true);
    try {
      await onSave(formData);
      toast.success('Student added successfully!', 'Success');
      onClose();
      setFormData(initialFormData);
      setCurrentStep(1);
      setCompletedSteps([]);
      setErrors({});
    } catch (error) {
      const parsedError = parseApiError(error);
      toast.error(parsedError.message, 'Error Adding Student');
      
      const newFieldErrors: {[key: string]: string} = {};
      parsedError.fieldErrors.forEach(fieldError => {
        newFieldErrors[fieldError.field] = generateErrorMessage(fieldError.field, fieldError.message);
      });
      setErrors(prev => ({ ...prev, ...newFieldErrors }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-4xl h-[85vh] flex flex-col rounded-2xl shadow-2xl ${
        darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        {/* Header with Progress */}
        <div className={`p-6 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Add New Student
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Step {currentStep} of {steps.length}: {steps[currentStep - 1].description}
              </p>
            </div>
            <button
              onClick={onClose}
              className={`p-2 rounded-lg transition-colors ${
                darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
              }`}
            >
              <X className="w-6 h-6" />
            </button>
          </div>
          
          {/* Progress Steps */}
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const isActive = currentStep === step.id;
              const isCompleted = completedSteps.includes(step.id);
              const IconComponent = step.icon;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                    isCompleted 
                      ? 'bg-green-500 border-green-500 text-white' 
                      : isActive 
                        ? 'border-blue-500 bg-blue-500 text-white' 
                        : darkMode 
                          ? 'border-gray-600 text-gray-400' 
                          : 'border-gray-300 text-gray-400'
                  }`}>
                    {isCompleted ? <Check className="w-5 h-5" /> : <IconComponent className="w-5 h-5" />}
                  </div>
                  <div className="ml-3 hidden sm:block">
                    <p className={`text-sm font-medium ${
                      isActive ? (darkMode ? 'text-white' : 'text-gray-900') : (darkMode ? 'text-gray-400' : 'text-gray-500')
                    }`}>
                      {step.title}
                    </p>
                  </div>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      completedSteps.includes(step.id) ? 'bg-green-500' : darkMode ? 'bg-gray-700' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <div className="flex-1 p-6 overflow-y-auto">
          {/* Step 1: Personal Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Student ID *
                  </label>
                  <input
                    type="text"
                    name="student_id"
                    value={formData.student_id}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.student_id 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Auto-generated"
                  />
                  {errors.student_id && <p className="text-red-500 text-sm mt-1">{errors.student_id}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    First Name *
                  </label>
                  <input
                    type="text"
                    name="first_name"
                    value={formData.first_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.first_name 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter first name"
                  />
                  {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Middle Name
                  </label>
                  <input
                    type="text"
                    name="middle_name"
                    value={formData.middle_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter middle name (optional)"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Last Name *
                  </label>
                  <input
                    type="text"
                    name="last_name"
                    value={formData.last_name}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.last_name 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter last name"
                  />
                  {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="date_of_birth"
                    value={formData.date_of_birth}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.date_of_birth 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                  {errors.date_of_birth && <p className="text-red-500 text-sm mt-1">{errors.date_of_birth}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.gender 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="">Select Gender</option>
                    <option value="M">Male</option>
                    <option value="F">Female</option>
                    <option value="O">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Blood Group
                  </label>
                  <select
                    name="blood_group"
                    value={formData.blood_group}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="">Select Blood Group</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Nationality
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter nationality"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Religion
                  </label>
                  <input
                    type="text"
                    name="religion"
                    value={formData.religion}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter religion (optional)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Contact & Address */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.email 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="student@example.com"
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phone_number"
                    value={formData.phone_number}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="+44 123 456 7890"
                  />
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Address Line 1 *
                  </label>
                  <input
                    type="text"
                    name="address_line_1"
                    value={formData.address_line_1}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.address_line_1 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Street address, building number"
                  />
                  {errors.address_line_1 && <p className="text-red-500 text-sm mt-1">{errors.address_line_1}</p>}
                </div>

                <div className="md:col-span-2">
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Address Line 2
                  </label>
                  <input
                    type="text"
                    name="address_line_2"
                    value={formData.address_line_2}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Apartment, suite, unit (optional)"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    City *
                  </label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.city 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter city"
                  />
                  {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    County *
                  </label>
                  <input
                    type="text"
                    name="county"
                    value={formData.county}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.county 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter county"
                  />
                  {errors.county && <p className="text-red-500 text-sm mt-1">{errors.county}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Postal Code *
                  </label>
                  <input
                    type="text"
                    name="postal_code"
                    value={formData.postal_code}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.postal_code 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="SW1A 1AA"
                  />
                  {errors.postal_code && <p className="text-red-500 text-sm mt-1">{errors.postal_code}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Country
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="United Kingdom"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Academic Information */}
          {currentStep === 3 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Current Class *
                  </label>
                  <input
                    type="text"
                    name="current_class"
                    value={formData.current_class}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.current_class 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="e.g., Year 10, Grade 9"
                  />
                  {errors.current_class && <p className="text-red-500 text-sm mt-1">{errors.current_class}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Academic Year *
                  </label>
                  <input
                    type="text"
                    name="academic_year"
                    value={formData.academic_year}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      errors.academic_year 
                        ? 'border-red-500 focus:border-red-500' 
                        : darkMode 
                          ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="2024-2025"
                  />
                  {errors.academic_year && <p className="text-red-500 text-sm mt-1">{errors.academic_year}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Admission Date
                  </label>
                  <input
                    type="date"
                    name="admission_date"
                    value={formData.admission_date}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Roll Number
                  </label>
                  <input
                    type="text"
                    name="roll_number"
                    value={formData.roll_number}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                    placeholder="Enter roll number"
                  />
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Section
                  </label>
                  <select
                    name="section"
                    value={formData.section}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="">Select Section</option>
                    <option value="A">Section A</option>
                    <option value="B">Section B</option>
                    <option value="C">Section C</option>
                    <option value="D">Section D</option>
                  </select>
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Status
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleInputChange}
                    className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                      darkMode 
                        ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                        : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                  >
                    <option value="active">Active</option>
                    <option value="inactive">Inactive</option>
                    <option value="graduated">Graduated</option>
                    <option value="transferred">Transferred</option>
                    <option value="suspended">Suspended</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Parent/Guardian Information */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="space-y-8">
                {/* Father Information */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Father Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Father's Name
                      </label>
                      <input
                        type="text"
                        name="father_name"
                        value={formData.father_name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter father's name"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Father's Phone
                      </label>
                      <input
                        type="tel"
                        name="father_phone"
                        value={formData.father_phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="+44 123 456 7890"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Father's Email
                      </label>
                      <input
                        type="email"
                        name="father_email"
                        value={formData.father_email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="father@example.com"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Father's Occupation
                      </label>
                      <input
                        type="text"
                        name="father_occupation"
                        value={formData.father_occupation}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter occupation"
                      />
                    </div>
                  </div>
                </div>

                {/* Mother Information */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Mother Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Mother's Name
                      </label>
                      <input
                        type="text"
                        name="mother_name"
                        value={formData.mother_name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter mother's name"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Mother's Phone
                      </label>
                      <input
                        type="tel"
                        name="mother_phone"
                        value={formData.mother_phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="+44 123 456 7890"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Mother's Email
                      </label>
                      <input
                        type="email"
                        name="mother_email"
                        value={formData.mother_email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="mother@example.com"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Mother's Occupation
                      </label>
                      <input
                        type="text"
                        name="mother_occupation"
                        value={formData.mother_occupation}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter occupation"
                      />
                    </div>
                  </div>
                </div>

                {/* Guardian Information */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Guardian Information (if different from parents)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Guardian's Name
                      </label>
                      <input
                        type="text"
                        name="guardian_name"
                        value={formData.guardian_name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter guardian's name"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Guardian's Phone
                      </label>
                      <input
                        type="tel"
                        name="guardian_phone"
                        value={formData.guardian_phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="+44 123 456 7890"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Guardian's Email
                      </label>
                      <input
                        type="email"
                        name="guardian_email"
                        value={formData.guardian_email}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="guardian@example.com"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Relationship to Student
                      </label>
                      <input
                        type="text"
                        name="guardian_relationship"
                        value={formData.guardian_relationship}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="e.g., Uncle, Aunt, Grandparent"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 5: Medical & Emergency */}
          {currentStep === 5 && (
            <div className="space-y-6">
              <div className="space-y-8">
                {/* Emergency Contact */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Emergency Contact *
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Emergency Contact Name *
                      </label>
                      <input
                        type="text"
                        name="emergency_contact_name"
                        value={formData.emergency_contact_name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.emergency_contact_name 
                            ? 'border-red-500 focus:border-red-500' 
                            : darkMode 
                              ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                              : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter emergency contact name"
                      />
                      {errors.emergency_contact_name && <p className="text-red-500 text-sm mt-1">{errors.emergency_contact_name}</p>}
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Emergency Contact Phone *
                      </label>
                      <input
                        type="tel"
                        name="emergency_contact_phone"
                        value={formData.emergency_contact_phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.emergency_contact_phone 
                            ? 'border-red-500 focus:border-red-500' 
                            : darkMode 
                              ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                              : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="+44 123 456 7890"
                      />
                      {errors.emergency_contact_phone && <p className="text-red-500 text-sm mt-1">{errors.emergency_contact_phone}</p>}
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Relationship to Student *
                      </label>
                      <select
                        name="emergency_contact_relationship"
                        value={formData.emergency_contact_relationship}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          errors.emergency_contact_relationship 
                            ? 'border-red-500 focus:border-red-500' 
                            : darkMode 
                              ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                              : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                      >
                        <option value="">Select Relationship</option>
                        <option value="parent">Parent</option>
                        <option value="guardian">Guardian</option>
                        <option value="sibling">Sibling</option>
                        <option value="grandparent">Grandparent</option>
                        <option value="uncle">Uncle</option>
                        <option value="aunt">Aunt</option>
                        <option value="family_friend">Family Friend</option>
                        <option value="other">Other</option>
                      </select>
                      {errors.emergency_contact_relationship && <p className="text-red-500 text-sm mt-1">{errors.emergency_contact_relationship}</p>}
                    </div>
                  </div>
                </div>

                {/* Medical Information */}
                <div>
                  <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                    Medical Information
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Doctor's Name
                      </label>
                      <input
                        type="text"
                        name="doctor_name"
                        value={formData.doctor_name}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Enter doctor's name"
                      />
                    </div>

                    <div>
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Doctor's Phone
                      </label>
                      <input
                        type="tel"
                        name="doctor_phone"
                        value={formData.doctor_phone}
                        onChange={handleInputChange}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="+44 123 456 7890"
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Medical Conditions & Allergies
                      </label>
                      <textarea
                        name="medical_conditions"
                        value={formData.medical_conditions}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="List any medical conditions, allergies, or special needs..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Current Medications
                      </label>
                      <textarea
                        name="medications"
                        value={formData.medications}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="List any current medications and dosages..."
                      />
                    </div>

                    <div className="md:col-span-2">
                      <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        Additional Notes
                      </label>
                      <textarea
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        rows={3}
                        className={`w-full px-4 py-3 rounded-lg border transition-colors ${
                          darkMode 
                            ? 'border-gray-600 bg-gray-800 text-white focus:border-blue-500' 
                            : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500'
                        } focus:outline-none focus:ring-2 focus:ring-blue-500/20`}
                        placeholder="Any additional information about the student..."
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Review */}
          {currentStep === 6 && (
            <div className="space-y-6">
              <div className={`p-6 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-gray-50'}`}>
                <h3 className={`text-lg font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                  Review Student Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm">
                  <div>
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Personal Information</h4>
                    <p><strong>Name:</strong> {formData.first_name} {formData.middle_name} {formData.last_name}</p>
                    <p><strong>Student ID:</strong> {formData.student_id}</p>
                    <p><strong>Date of Birth:</strong> {formData.date_of_birth}</p>
                    <p><strong>Gender:</strong> {formData.gender === 'M' ? 'Male' : formData.gender === 'F' ? 'Female' : 'Other'}</p>
                    <p><strong>Blood Group:</strong> {formData.blood_group || 'Not specified'}</p>
                    <p><strong>Nationality:</strong> {formData.nationality}</p>
                  </div>
                  
                  <div>
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Contact & Address</h4>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Phone:</strong> {formData.phone_number || 'Not provided'}</p>
                    <p><strong>Address:</strong> {formData.address_line_1}</p>
                    <p><strong>City:</strong> {formData.city}, {formData.county}</p>
                    <p><strong>Postal Code:</strong> {formData.postal_code}</p>
                  </div>
                  
                  <div>
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Academic Information</h4>
                    <p><strong>Class:</strong> {formData.current_class}</p>
                    <p><strong>Academic Year:</strong> {formData.academic_year}</p>
                    <p><strong>Section:</strong> {formData.section || 'Not assigned'}</p>
                    <p><strong>Status:</strong> {formData.status}</p>
                  </div>
                  
                  <div>
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>Emergency Contact</h4>
                    <p><strong>Name:</strong> {formData.emergency_contact_name}</p>
                    <p><strong>Phone:</strong> {formData.emergency_contact_phone}</p>
                    <p><strong>Relationship:</strong> {formData.emergency_contact_relationship}</p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer with Navigation */}
        <div className={`flex-shrink-0 p-6 border-t flex justify-between ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <button
            onClick={prevStep}
            disabled={currentStep === 1}
            className={`flex items-center px-8 py-4 rounded-lg font-medium transition-all shadow-lg ${
              currentStep === 1
                ? 'opacity-50 cursor-not-allowed bg-gray-300 text-gray-500'
                : darkMode
                  ? 'bg-gray-700 hover:bg-gray-600 text-white hover:shadow-xl'
                  : 'bg-gray-200 hover:bg-gray-300 text-gray-800 hover:shadow-xl'
            }`}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Previous
          </button>

          {currentStep < steps.length ? (
            <button
              onClick={nextStep}
              className="flex items-center px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white rounded-lg font-medium transition-all shadow-lg hover:shadow-xl"
            >
              Next
              <ChevronRight className="w-4 h-4 ml-2" />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className={`flex items-center px-8 py-4 rounded-lg font-medium transition-all shadow-lg ${
                isSubmitting
                  ? 'bg-gray-400 cursor-not-allowed'
                  : 'bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 hover:shadow-xl'
              } text-white`}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSubmitting ? 'Saving...' : 'Save Student'}
            </button>
          )}
        </div>
      </div>
      
      <ToastContainer toasts={toast.toasts} onRemove={toast.removeToast} />
    </div>
  );
}
