import React, { useState, useEffect } from 'react';
import './USAddressForm.css';

function USAddressForm() {
  // Dữ liệu mẫu cho các bang, county, và local areas
  const usData = {
    // California
    'CA': {
      name: 'California',
      counties: [
        { 
          id: 'LA', 
          name: 'Los Angeles County', 
          locals: ['Los Angeles', 'Beverly Hills', 'Santa Monica', 'Long Beach', 'Pasadena'] 
        },
        { 
          id: 'SF', 
          name: 'San Francisco County', 
          locals: ['San Francisco', 'Daly City', 'South San Francisco'] 
        },
        { 
          id: 'SD', 
          name: 'San Diego County', 
          locals: ['San Diego', 'Chula Vista', 'Carlsbad', 'Oceanside'] 
        },
        { 
          id: 'OC', 
          name: 'Orange County', 
          locals: ['Anaheim', 'Santa Ana', 'Irvine', 'Huntington Beach'] 
        }
      ]
    },
    // New York
    'NY': {
      name: 'New York',
      counties: [
        { 
          id: 'NYC', 
          name: 'New York County', 
          locals: ['Manhattan', 'Upper East Side', 'Upper West Side', 'Harlem'] 
        },
        { 
          id: 'KIN', 
          name: 'Kings County', 
          locals: ['Brooklyn', 'Williamsburg', 'Park Slope', 'Coney Island'] 
        },
        { 
          id: 'QUE', 
          name: 'Queens County', 
          locals: ['Queens', 'Flushing', 'Astoria', 'Long Island City'] 
        },
        { 
          id: 'BRX', 
          name: 'Bronx County', 
          locals: ['The Bronx', 'Riverdale', 'Fordham', 'Pelham Bay'] 
        }
      ]
    },
    // Texas
    'TX': {
      name: 'Texas',
      counties: [
        { 
          id: 'HAR', 
          name: 'Harris County', 
          locals: ['Houston', 'Pasadena', 'Baytown', 'Spring'] 
        },
        { 
          id: 'DAL', 
          name: 'Dallas County', 
          locals: ['Dallas', 'Garland', 'Irving', 'Mesquite'] 
        },
        { 
          id: 'TRA', 
          name: 'Travis County', 
          locals: ['Austin', 'Pflugerville', 'Bee Cave', 'Manchaca'] 
        },
        { 
          id: 'BEX', 
          name: 'Bexar County', 
          locals: ['San Antonio', 'Alamo Heights', 'Windcrest', 'Hollywood Park'] 
        }
      ]
    },
    // Florida
    'FL': {
      name: 'Florida',
      counties: [
        { 
          id: 'MIA', 
          name: 'Miami-Dade County', 
          locals: ['Miami', 'Miami Beach', 'Coral Gables', 'Hialeah'] 
        },
        { 
          id: 'BRO', 
          name: 'Broward County', 
          locals: ['Fort Lauderdale', 'Hollywood', 'Pembroke Pines', 'Pompano Beach'] 
        },
        { 
          id: 'ORA', 
          name: 'Orange County', 
          locals: ['Orlando', 'Winter Park', 'Maitland', 'Ocoee'] 
        },
        { 
          id: 'PAL', 
          name: 'Palm Beach County', 
          locals: ['West Palm Beach', 'Boca Raton', 'Delray Beach', 'Boynton Beach'] 
        }
      ]
    },
    // Illinois
    'IL': {
      name: 'Illinois',
      counties: [
        { 
          id: 'COO', 
          name: 'Cook County', 
          locals: ['Chicago', 'Evanston', 'Oak Park', 'Skokie'] 
        },
        { 
          id: 'DUP', 
          name: 'DuPage County', 
          locals: ['Naperville', 'Wheaton', 'Downers Grove', 'Lombard'] 
        },
        { 
          id: 'LAK', 
          name: 'Lake County', 
          locals: ['Waukegan', 'North Chicago', 'Zion', 'Gurnee'] 
        }
      ]
    }
  };

  // Danh sách tất cả các bang (cho dropdown)
  const allStates = [
    { code: 'CA', name: 'California' },
    { code: 'NY', name: 'New York' },
    { code: 'TX', name: 'Texas' },
    { code: 'FL', name: 'Florida' },
    { code: 'IL', name: 'Illinois' },
    { code: 'PA', name: 'Pennsylvania' },
    { code: 'OH', name: 'Ohio' },
    { code: 'GA', name: 'Georgia' },
    { code: 'NC', name: 'North Carolina' },
    { code: 'MI', name: 'Michigan' },
    { code: 'NJ', name: 'New Jersey' },
    { code: 'VA', name: 'Virginia' },
    { code: 'WA', name: 'Washington' },
    { code: 'AZ', name: 'Arizona' },
    { code: 'MA', name: 'Massachusetts' },
    { code: 'TN', name: 'Tennessee' },
    { code: 'IN', name: 'Indiana' },
    { code: 'MO', name: 'Missouri' },
    { code: 'MD', name: 'Maryland' },
    { code: 'WI', name: 'Wisconsin' },
    { code: 'CO', name: 'Colorado' },
    { code: 'MN', name: 'Minnesota' },
    { code: 'SC', name: 'South Carolina' },
    { code: 'AL', name: 'Alabama' },
    { code: 'LA', name: 'Louisiana' },
    { code: 'KY', name: 'Kentucky' },
    { code: 'OR', name: 'Oregon' },
    { code: 'OK', name: 'Oklahoma' },
    { code: 'CT', name: 'Connecticut' },
    { code: 'IA', name: 'Iowa' },
    { code: 'UT', name: 'Utah' },
    { code: 'NV', name: 'Nevada' },
    { code: 'AR', name: 'Arkansas' },
    { code: 'MS', name: 'Mississippi' },
    { code: 'KS', name: 'Kansas' },
    { code: 'NM', name: 'New Mexico' },
    { code: 'NE', name: 'Nebraska' },
    { code: 'WV', name: 'West Virginia' },
    { code: 'ID', name: 'Idaho' },
    { code: 'HI', name: 'Hawaii' },
    { code: 'ME', name: 'Maine' },
    { code: 'NH', name: 'New Hampshire' },
    { code: 'RI', name: 'Rhode Island' },
    { code: 'MT', name: 'Montana' },
    { code: 'DE', name: 'Delaware' },
    { code: 'SD', name: 'South Dakota' },
    { code: 'ND', name: 'North Dakota' },
    { code: 'AK', name: 'Alaska' },
    { code: 'VT', name: 'Vermont' },
    { code: 'WY', name: 'Wyoming' },
    { code: 'DC', name: 'District of Columbia' }
  ];

  // State cho form
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    
    addressLine1: '',
    addressLine2: '',
    
    state: '',
    county: '',
    local: '',
    
    zipCode: '',
    isResidential: true,
    specialInstructions: ''
  });

  const [errors, setErrors] = useState({});
  const [availableCounties, setAvailableCounties] = useState([]);
  const [availableLocals, setAvailableLocals] = useState([]);
  const [showAllStates, setShowAllStates] = useState(false);

  // Khi chọn bang
  const handleStateChange = (stateCode) => {
    setFormData(prev => ({
      ...prev,
      state: stateCode,
      county: '',
      local: ''
    }));
    
    // Load counties cho bang đó
    const selectedState = usData[stateCode];
    if (selectedState) {
      setAvailableCounties(selectedState.counties);
    } else {
      setAvailableCounties([]);
    }
    setAvailableLocals([]);
  };

  // Khi chọn county
  const handleCountyChange = (countyId) => {
    setFormData(prev => ({
      ...prev,
      county: countyId,
      local: ''
    }));
    
    // Load locals cho county đó
    const selectedState = usData[formData.state];
    if (selectedState) {
      const selectedCounty = selectedState.counties.find(c => c.id === countyId);
      if (selectedCounty) {
        setAvailableLocals(selectedCounty.locals);
      }
    }
  };

  // Khi chọn local
  const handleLocalChange = (localName) => {
    setFormData(prev => ({
      ...prev,
      local: localName
    }));
  };

  // Xử lý input change
  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    
    // Clear error
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  // Validation
  const validateForm = () => {
    const newErrors = {};
    
    // Basic info
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
    
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    else if (!/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/.test(formData.phone)) {
      newErrors.phone = 'Invalid phone number (format: 123-456-7890)';
    }
    
    // Address
    if (!formData.addressLine1.trim()) newErrors.addressLine1 = 'Address line 1 is required';
    
    // 3-level selection
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.county) newErrors.county = 'County is required';
    if (!formData.local) newErrors.local = 'City/Local area is required';
    
    // ZIP code
    if (!formData.zipCode.trim()) newErrors.zipCode = 'ZIP code is required';
    else if (!/^\d{5}(-\d{4})?$/.test(formData.zipCode)) {
      newErrors.zipCode = 'Invalid ZIP code (format: 12345 or 12345-6789)';
    }
    
    return newErrors;
  };

  // Xử lý submit
  const handleSubmit = (e) => {
    e.preventDefault();
    
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    
    // Hiển thị thông tin đơn hàng
    const selectedState = allStates.find(s => s.code === formData.state);
    const selectedCounty = availableCounties.find(c => c.id === formData.county);
    
    const addressSummary = `
      ${formData.firstName} ${formData.lastName}
      ${formData.addressLine1}
      ${formData.addressLine2 ? formData.addressLine2 + '\n' : ''}
      ${formData.local}, ${selectedCounty?.name}, ${selectedState?.name} ${formData.zipCode}
      ${formData.isResidential ? 'Residential Address' : 'Commercial/Business Address'}
      ${formData.specialInstructions ? '\nSpecial Instructions: ' + formData.specialInstructions : ''}
    `;
    
    alert(`Shipping Address Submitted!\n\n${addressSummary}`);
    
    // Gửi data lên server
    console.log('Shipping data:', formData);
    
    // Reset form (tùy chọn)
    // setFormData({
    //   firstName: '',
    //   lastName: '',
    //   email: '',
    //   phone: '',
    //   addressLine1: '',
    //   addressLine2: '',
    //   state: '',
    //   county: '',
    //   local: '',
    //   zipCode: '',
    //   isResidential: true,
    //   specialInstructions: ''
    // });
  };

  // Lấy tên hiển thị từ code
  const getDisplayName = (code, type) => {
    if (type === 'state') {
      const state = allStates.find(s => s.code === code);
      return state ? state.name : '';
    }
    if (type === 'county') {
      const county = availableCounties.find(c => c.id === code);
      return county ? county.name : '';
    }
    return '';
  };

  return (
    <div className="us-address-form">
      <div className="form-header">
        <h1>🇺🇸 US Shipping Address</h1>
        <p className="subtitle">Please enter your complete shipping address in the United States</p>
      </div>

      <form onSubmit={handleSubmit} className="address-form">
        {/* Contact Information */}
        <div className="form-section">
          <h2>Contact Information</h2>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="firstName">First Name *</label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className={errors.firstName ? 'error' : ''}
                placeholder="John"
              />
              {errors.firstName && <span className="error-message">{errors.firstName}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="lastName">Last Name *</label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className={errors.lastName ? 'error' : ''}
                placeholder="Doe"
              />
              {errors.lastName && <span className="error-message">{errors.lastName}</span>}
            </div>
          </div>
          
          <div className="form-row">
            <div className="form-group">
              <label htmlFor="email">Email Address *</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                className={errors.email ? 'error' : ''}
                placeholder="john.doe@example.com"
              />
              {errors.email && <span className="error-message">{errors.email}</span>}
            </div>
            
            <div className="form-group">
              <label htmlFor="phone">Phone Number *</label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                className={errors.phone ? 'error' : ''}
                placeholder="123-456-7890"
              />
              {errors.phone && <span className="error-message">{errors.phone}</span>}
            </div>
          </div>
        </div>

        {/* Address Details */}
        <div className="form-section">
          <h2>Address Details</h2>
          
          <div className="form-group">
            <label htmlFor="addressLine1">Street Address (Line 1) *</label>
            <input
              type="text"
              id="addressLine1"
              name="addressLine1"
              value={formData.addressLine1}
              onChange={handleInputChange}
              className={errors.addressLine1 ? 'error' : ''}
              placeholder="123 Main Street"
            />
            {errors.addressLine1 && <span className="error-message">{errors.addressLine1}</span>}
          </div>
          
          <div className="form-group">
            <label htmlFor="addressLine2">Street Address (Line 2)</label>
            <input
              type="text"
              id="addressLine2"
              name="addressLine2"
              value={formData.addressLine2}
              onChange={handleInputChange}
              placeholder="Apartment, Suite, Unit, Building, Floor, etc."
            />
          </div>
        </div>

        {/* 3-Level Selection */}
        <div className="form-section">
          <h2>Location</h2>
          
          {/* State Selection */}
          <div className="form-group">
            <label htmlFor="state">State *</label>
            <div className="dropdown-container">
              <select
                id="state"
                name="state"
                value={formData.state}
                onChange={(e) => handleStateChange(e.target.value)}
                className={errors.state ? 'error' : ''}
              >
                <option value="">Select a state</option>
                {(showAllStates ? allStates : allStates.slice(0, 10)).map(state => (
                  <option key={state.code} value={state.code}>
                    {state.name}
                  </option>
                ))}
              </select>
              {!showAllStates && allStates.length > 10 && (
                <button 
                  type="button" 
                  className="show-all-btn"
                  onClick={() => setShowAllStates(true)}
                >
                  Show all {allStates.length} states
                </button>
              )}
            </div>
            {errors.state && <span className="error-message">{errors.state}</span>}
          </div>
          
          {/* County Selection */}
          <div className="form-group">
            <label htmlFor="county">County *</label>
            <select
              id="county"
              name="county"
              value={formData.county}
              onChange={(e) => handleCountyChange(e.target.value)}
              disabled={!formData.state}
              className={errors.county ? 'error' : ''}
            >
              <option value="">
                {formData.state ? 'Select a county' : 'Select state first'}
              </option>
              {availableCounties.map(county => (
                <option key={county.id} value={county.id}>
                  {county.name}
                </option>
              ))}
            </select>
            {errors.county && <span className="error-message">{errors.county}</span>}
            {formData.state && availableCounties.length === 0 && (
              <div className="info-message">
                No county data available for this state. Please select your city below.
              </div>
            )}
          </div>
          
          {/* Local/City Selection */}
          <div className="form-group">
            <label htmlFor="local">City / Local Area *</label>
            <select
              id="local"
              name="local"
              value={formData.local}
              onChange={(e) => handleLocalChange(e.target.value)}
              disabled={!formData.county || availableLocals.length === 0}
              className={errors.local ? 'error' : ''}
            >
              <option value="">
                {!formData.county ? 'Select county first' : 
                 availableLocals.length === 0 ? 'Type city name below' : 
                 'Select a city'}
              </option>
              {availableLocals.map(local => (
                <option key={local} value={local}>
                  {local}
                </option>
              ))}
            </select>
            {availableLocals.length === 0 && formData.county && (
              <input
                type="text"
                id="localInput"
                name="local"
                value={formData.local}
                onChange={handleInputChange}
                className={`local-input ${errors.local ? 'error' : ''}`}
                placeholder="Enter your city name"
              />
            )}
            {errors.local && <span className="error-message">{errors.local}</span>}
          </div>
          
          {/* ZIP Code */}
          <div className="form-group">
            <label htmlFor="zipCode">ZIP Code *</label>
            <input
              type="text"
              id="zipCode"
              name="zipCode"
              value={formData.zipCode}
              onChange={handleInputChange}
              className={errors.zipCode ? 'error' : ''}
              placeholder="12345"
            />
            {errors.zipCode && <span className="error-message">{errors.zipCode}</span>}
          </div>
          
          {/* Address Type */}
          <div className="form-group checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="isResidential"
                checked={formData.isResidential}
                onChange={handleInputChange}
              />
              <span>This is a residential address</span>
            </label>
            <small className="hint">
              Uncheck if this is a commercial/business address
            </small>
          </div>
        </div>

        {/* Special Instructions */}
        <div className="form-section">
          <h2>Special Instructions (Optional)</h2>
          <div className="form-group">
            <textarea
              id="specialInstructions"
              name="specialInstructions"
              value={formData.specialInstructions}
              onChange={handleInputChange}
              placeholder="Delivery instructions, gate codes, delivery time preferences, etc."
              rows="4"
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="form-actions">
          <button type="submit" className="submit-btn">
            Save Shipping Address
          </button>
        </div>
      </form>

      {/* Preview */}
      {(formData.state || formData.county || formData.local) && (
        <div className="address-preview">
          <h3>Address Preview</h3>
          <div className="preview-content">
            <p><strong>{formData.firstName} {formData.lastName}</strong></p>
            <p>{formData.addressLine1}</p>
            {formData.addressLine2 && <p>{formData.addressLine2}</p>}
            <p>
              {formData.local && `${formData.local}, `}
              {getDisplayName(formData.county, 'county') && `${getDisplayName(formData.county, 'county')}, `}
              {getDisplayName(formData.state, 'state')} {formData.zipCode}
            </p>
            <p>{formData.isResidential ? '🏠 Residential' : '🏢 Commercial'}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default USAddressForm;