import React, { useState } from 'react';
import { Upload, MapPin, Send, Image as ImageIcon, Loader2 } from 'lucide-react';
import { CATEGORIES, PRIORITIES } from '../../data/mockComplaints';
import { LocationPickerMap } from '../map/LocationPickerMap';
import { Button } from '../common/Button';
import { complaintsApi } from '../../services/api';
import './IssueForm.css';

const SAMPLE_CIVIC_IMAGES = [
  { label: 'Pothole Hazard', url: 'https://images.unsplash.com/photo-1515162816999-a0c47dc192f7?auto=format&fit=crop&w=800&q=80' },
  { label: 'Garbage Spill', url: 'https://images.unsplash.com/photo-1530587191325-3db32d826c18?auto=format&fit=crop&w=800&q=80' },
  { label: 'Unlit Streetlight', url: 'https://images.unsplash.com/photo-1509114397022-ed747cca3f65?auto=format&fit=crop&w=800&q=80' },
  { label: 'Water Leak', url: 'https://images.unsplash.com/photo-1541888946425-d0fbb186a5b7?auto=format&fit=crop&w=800&q=80' }
];

export const IssueForm = ({ onSubmitSuccess }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Potholes');
  const [priority, setPriority] = useState('Medium');
  const [location, setLocation] = useState('Market St & 5th Ave');
  const [coords, setCoords] = useState([37.7749, -122.4194]);
  const [imageUrl, setImageUrl] = useState(SAMPLE_CIVIC_IMAGES[0].url);
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(SAMPLE_CIVIC_IMAGES[0].url);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle local image selection and preview
  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const validate = () => {
    const errs = {};
    if (!title.trim()) errs.title = 'Issue title is required';
    if (!description.trim()) errs.description = 'Please provide a detailed description';
    if (!location.trim()) errs.location = 'Location name/address is required';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    let finalImageUrl = imageUrl;

    // Upload custom image to backend if selected
    if (selectedFile) {
      try {
        const uploadRes = await complaintsApi.uploadImage(selectedFile);
        if (uploadRes && uploadRes.imageUrl) {
          const apiBase = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
          const origin = apiBase.replace('/api', '');
          finalImageUrl = `${origin}${uploadRes.imageUrl}`;
        }
      } catch (err) {
        console.warn('Image upload endpoint error, using preview image:', err);
        finalImageUrl = imagePreview;
      }
    }

    const formData = {
      title,
      description,
      category,
      priority,
      location,
      latitude: coords[0],
      longitude: coords[1],
      image: finalImageUrl
    };

    try {
      if (onSubmitSuccess) {
        await onSubmitSuccess(formData);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form className="issue-form animate-fade-in" onSubmit={handleSubmit}>
      <h2 className="form-heading">Report a Civic Problem</h2>
      <p className="form-subheading">Help your local municipality identify and fix infrastructure issues quickly.</p>

      {/* Title */}
      <div className="form-group">
        <label htmlFor="issue-title" className="form-label">
          Issue Title <span className="required-star">*</span>
        </label>
        <input
          id="issue-title"
          type="text"
          className={`form-input ${errors.title ? 'input-error' : ''}`}
          placeholder="e.g. Deep Pothole outside Central Station"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        {errors.title && <span className="error-text">{errors.title}</span>}
      </div>

      {/* Category & Priority Row */}
      <div className="form-row">
        <div className="form-group">
          <label htmlFor="issue-category" className="form-label">Category</label>
          <select
            id="issue-category"
            className="form-select"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            {CATEGORIES.filter(c => c !== 'All').map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="issue-priority" className="form-label">Priority Level</label>
          <select
            id="issue-priority"
            className="form-select"
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
          >
            {PRIORITIES.filter(p => p !== 'All').map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="form-group">
        <label htmlFor="issue-desc" className="form-label">
          Description <span className="required-star">*</span>
        </label>
        <textarea
          id="issue-desc"
          rows={4}
          className={`form-textarea ${errors.description ? 'input-error' : ''}`}
          placeholder="Describe the problem, hazard details, traffic impact, or how long it has existed..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        {errors.description && <span className="error-text">{errors.description}</span>}
      </div>

      {/* Location Input */}
      <div className="form-group">
        <label htmlFor="issue-location" className="form-label">
          Location / Street Address <span className="required-star">*</span>
        </label>
        <div className="input-with-icon">
          <MapPin size={18} className="input-icon" />
          <input
            id="issue-location"
            type="text"
            className={`form-input ${errors.location ? 'input-error' : ''}`}
            placeholder="e.g. 5th Avenue & Market Street intersection"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>
        {errors.location && <span className="error-text">{errors.location}</span>}
      </div>

      {/* Map Location Picker */}
      <div className="form-group">
        <label className="form-label">Pin Location on Interactive Map</label>
        <LocationPickerMap
          initialPosition={coords}
          onChangeLocation={(newPos) => setCoords(newPos)}
        />
      </div>

      {/* Image Upload UI */}
      <div className="form-group">
        <label className="form-label">Upload Photo / Evidence</label>
        <div className="image-upload-wrapper">
          <div className="upload-box">
            <Upload size={28} className="upload-icon" />
            <span className="upload-text">Drag & drop photo or click to browse</span>
            <input
              type="file"
              accept="image/*"
              className="file-input-hidden"
              onChange={handleImageChange}
            />
          </div>

          {/* Quick preset selector */}
          <div className="image-presets">
            <span className="preset-label">Or choose sample evidence photo:</span>
            <div className="preset-grid">
              {SAMPLE_CIVIC_IMAGES.map((item, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`preset-btn ${imageUrl === item.url && !selectedFile ? 'preset-active' : ''}`}
                  onClick={() => {
                    setSelectedFile(null);
                    setImageUrl(item.url);
                    setImagePreview(item.url);
                  }}
                >
                  <img src={item.url} alt={item.label} />
                  <span>{item.label}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Image Preview */}
          {imagePreview && (
            <div className="upload-preview-card">
              <span className="preview-heading"><ImageIcon size={14} /> Selected Photo Preview</span>
              <img src={imagePreview} alt="Selected Issue" className="preview-image" />
            </div>
          )}
        </div>
      </div>

      {/* Submit Button */}
      <div className="form-actions">
        <Button
          type="submit"
          variant="primary"
          size="lg"
          fullWidth
          icon={isSubmitting ? Loader2 : Send}
          disabled={isSubmitting}
        >
          {isSubmitting ? 'Submitting Report to API...' : 'Submit Issue Complaint'}
        </Button>
      </div>
    </form>
  );
};
