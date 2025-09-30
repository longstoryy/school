'use client';

import { useState } from 'react';
import { X, User, Save, AlertCircle, ChevronLeft, ChevronRight, Users, GraduationCap } from 'lucide-react';

interface AddStudentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (studentData: any) => void;
  darkMode: boolean;
}

export default function AddStudentModal({ isOpen, onClose, onSave, darkMode }: AddStudentModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;
  
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    first_name: '',
    last_name: '',
    email: '',
    phone_number: '',
    date_of_birth: '',
    gender: '',
    
    // Step 2: Parent/Guardian Info
    guardian_type: 'parents',
    father_name: '',
    mother_name: '',
    guardian_name: '',
    parent_phone: '',
    parent_email: '',
    
    // Step 3: Academic Info
    current_class: '',
    admission_number: '',
    admission_date: '',
    previous_school: '',
    current_address: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [loading, setLoading] = useState(false);

  const steps = [
    { id: 1, title: 'Personal Info', icon: User },
    { id: 2, title: 'Parent/Guardian', icon: Users },
    { id: 3, title: 'Academic Info', icon: GraduationCap }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    if (errors[name]) {
      setErrors((prev: any) => ({ ...prev, [name]: '' }));
    }
  };

  const validateCurrentStep = () => {
    const newErrors: any = {};
    
    switch (currentStep) {
      case 1: // Personal Info
        if (!formData.first_name.trim()) newErrors.first_name = 'First name is required';
        if (!formData.last_name.trim()) newErrors.last_name = 'Last name is required';
        if (!formData.email.trim()) newErrors.email = 'Email is required';
        if (!formData.phone_number.trim()) newErrors.phone_number = 'Phone number is required';
        if (!formData.gender) newErrors.gender = 'Gender is required';
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (formData.email && !emailRegex.test(formData.email)) {
          newErrors.email = 'Invalid email format';
        }
        break;
        
      case 2: // Parent/Guardian
        if (formData.guardian_type === 'parents') {
          if (!formData.father_name.trim()) newErrors.father_name = 'Father name is required';
          if (!formData.mother_name.trim()) newErrors.mother_name = 'Mother name is required';
        } else {
          if (!formData.guardian_name.trim()) newErrors.guardian_name = 'Guardian name is required';
        }
        if (!formData.parent_phone.trim()) newErrors.parent_phone = 'Parent/Guardian phone is required';
        break;
        
      case 3: // Academic Info
        if (!formData.current_class.trim()) newErrors.current_class = 'Class is required';
        if (!formData.admission_number.trim()) newErrors.admission_number = 'Admission number is required';
        if (!formData.current_address.trim()) newErrors.current_address = 'Address is required';
        break;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateCurrentStep()) {
      setCurrentStep(prev => Math.min(prev + 1, totalSteps));
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;
    
    setLoading(true);
    try {
      await onSave(formData);
      onClose();
      // Reset form
      setFormData({
        first_name: '', last_name: '', email: '', phone_number: '', date_of_birth: '', gender: '',
        guardian_type: 'parents', father_name: '', mother_name: '', guardian_name: '', parent_phone: '', parent_email: '',
        current_class: '', admission_number: '', admission_date: '', previous_school: '', current_address: ''
      });
      setCurrentStep(1);
    } catch (error) {
      console.error('Error saving student:', error);
    } finally {
      setLoading(false);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  First Name *
                </label>
                <input
                  type="text"
                  name="first_name"
                  value={formData.first_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.first_name ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.first_name && <p className="text-red-500 text-sm mt-1">{errors.first_name}</p>}
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
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.last_name ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.last_name && <p className="text-red-500 text-sm mt-1">{errors.last_name}</p>}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Email *
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.email ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="phone_number"
                  value={formData.phone_number}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.phone_number ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.phone_number && <p className="text-red-500 text-sm mt-1">{errors.phone_number}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Gender *
                </label>
                <select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.gender ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </select>
                {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
              </div>
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Date of Birth
              </label>
              <input
                type="date"
                name="date_of_birth"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Guardian Type
              </label>
              <select
                name="guardian_type"
                value={formData.guardian_type}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              >
                <option value="parents">Both Parents</option>
                <option value="guardian">Guardian</option>
              </select>
            </div>

            {formData.guardian_type === 'parents' ? (
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Father's Name *
                  </label>
                  <input
                    type="text"
                    name="father_name"
                    value={formData.father_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.father_name ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.father_name && <p className="text-red-500 text-sm mt-1">{errors.father_name}</p>}
                </div>

                <div>
                  <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                    Mother's Name *
                  </label>
                  <input
                    type="text"
                    name="mother_name"
                    value={formData.mother_name}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      errors.mother_name ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                    } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                  />
                  {errors.mother_name && <p className="text-red-500 text-sm mt-1">{errors.mother_name}</p>}
                </div>
              </div>
            ) : (
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Guardian's Name *
                </label>
                <input
                  type="text"
                  name="guardian_name"
                  value={formData.guardian_name}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.guardian_name ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.guardian_name && <p className="text-red-500 text-sm mt-1">{errors.guardian_name}</p>}
              </div>
            )}

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Parent/Guardian Phone *
                </label>
                <input
                  type="tel"
                  name="parent_phone"
                  value={formData.parent_phone}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.parent_phone ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.parent_phone && <p className="text-red-500 text-sm mt-1">{errors.parent_phone}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Parent/Guardian Email
                </label>
                <input
                  type="email"
                  name="parent_email"
                  value={formData.parent_email}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Class *
                </label>
                <select
                  name="current_class"
                  value={formData.current_class}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.current_class ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                >
                  <option value="">Select Class</option>
                  <option value="nursery">Nursery</option>
                  <option value="lkg">LKG</option>
                  <option value="ukg">UKG</option>
                  <option value="1">Class 1</option>
                  <option value="2">Class 2</option>
                  <option value="3">Class 3</option>
                  <option value="4">Class 4</option>
                  <option value="5">Class 5</option>
                  <option value="6">Class 6</option>
                  <option value="7">Class 7</option>
                  <option value="8">Class 8</option>
                  <option value="9">Class 9</option>
                  <option value="10">Class 10</option>
                  <option value="11">Class 11</option>
                  <option value="12">Class 12</option>
                </select>
                {errors.current_class && <p className="text-red-500 text-sm mt-1">{errors.current_class}</p>}
              </div>

              <div>
                <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                  Admission Number *
                </label>
                <input
                  type="text"
                  name="admission_number"
                  value={formData.admission_number}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 rounded-lg border ${
                    errors.admission_number ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                  } focus:outline-none focus:ring-2 focus:ring-blue-500`}
                />
                {errors.admission_number && <p className="text-red-500 text-sm mt-1">{errors.admission_number}</p>}
              </div>
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
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Previous School
              </label>
              <input
                type="text"
                name="previous_school"
                value={formData.previous_school}
                onChange={handleInputChange}
                className={`w-full px-3 py-2 rounded-lg border ${
                  darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
            </div>

            <div>
              <label className={`block text-sm font-medium mb-2 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                Current Address *
              </label>
              <textarea
                name="current_address"
                value={formData.current_address}
                onChange={handleInputChange}
                rows={3}
                className={`w-full px-3 py-2 rounded-lg border ${
                  errors.current_address ? 'border-red-500' : darkMode ? 'border-gray-600 bg-gray-800 text-white' : 'border-gray-300'
                } focus:outline-none focus:ring-2 focus:ring-blue-500`}
              />
              {errors.current_address && <p className="text-red-500 text-sm mt-1">{errors.current_address}</p>}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className={`w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-2xl shadow-2xl ${
        darkMode ? 'bg-gray-900 border border-gray-700' : 'bg-white border border-gray-200'
      }`}>
        {/* Header */}
        <div className={`sticky top-0 flex items-center justify-between p-6 border-b ${
          darkMode ? 'border-gray-700 bg-gray-900' : 'border-gray-200 bg-white'
        }`}>
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <h2 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-900'}`}>
                Add New Student
              </h2>
              <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Step {currentStep} of {totalSteps}: {steps[currentStep - 1]?.title}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className={`p-2 rounded-lg transition-colors ${
              darkMode ? 'hover:bg-gray-800 text-gray-400' : 'hover:bg-gray-100 text-gray-600'
            }`}
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Progress Steps */}
        <div className={`px-6 py-4 border-b ${darkMode ? 'border-gray-700' : 'border-gray-200'}`}>
          <div className="flex items-center justify-between">
            {steps.map((step, index) => {
              const Icon = step.icon;
              const isActive = currentStep === step.id;
              const isCompleted = currentStep > step.id;
              
              return (
                <div key={step.id} className="flex items-center">
                  <div
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all ${
                      isCompleted
                        ? 'bg-green-500 border-green-500 text-white'
                        : isActive
                          ? 'bg-blue-500 border-blue-500 text-white'
                          : darkMode
                            ? 'border-gray-600 text-gray-400'
                            : 'border-gray-300 text-gray-400'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                  </div>
                  <span className={`ml-2 text-sm font-medium ${
                    isActive ? (darkMode ? 'text-white' : 'text-gray-900') : (darkMode ? 'text-gray-400' : 'text-gray-500')
                  }`}>
                    {step.title}
                  </span>
                  {index < steps.length - 1 && (
                    <div className={`w-12 h-0.5 mx-4 ${
                      isCompleted ? 'bg-green-500' : darkMode ? 'bg-gray-600' : 'bg-gray-300'
                    }`} />
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Form Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6">
            {renderStepContent()}
          </div>

          {/* Footer */}
          <div className={`flex items-center justify-between p-6 border-t ${
            darkMode ? 'border-gray-700' : 'border-gray-200'
          }`}>
            <button
              type="button"
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center space-x-2 ${
                currentStep === 1
                  ? 'opacity-50 cursor-not-allowed'
                  : darkMode
                    ? 'bg-gray-700 hover:bg-gray-600 text-white'
                    : 'bg-gray-200 hover:bg-gray-300 text-gray-700'
              }`}
            >
              <ChevronLeft className="w-4 h-4" />
              <span>Previous</span>
            </button>

            {currentStep === totalSteps ? (
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center space-x-2 disabled:opacity-50"
              >
                <Save className="w-4 h-4" />
                <span>{loading ? 'Saving...' : 'Save Student'}</span>
              </button>
            ) : (
              <button
                type="button"
                onClick={nextStep}
                className="px-6 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center space-x-2"
              >
                <span>Next</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
