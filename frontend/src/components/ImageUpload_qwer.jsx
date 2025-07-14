// Integrated from qwer/frontend/src/components/ImageUpload.jsx
// Original file preserved as ImageUpload_qwer.jsx

import React from 'react';
import { useRef, useState } from 'react';

const ImageUpload = ({ onUpload, loading }) => {
  const inputRef = useRef();
  const [selectedFile, setSelectedFile] = useState(null);
  const [localLoading, setLocalLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = async (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
      setLocalLoading(true);
      setResult(null);
      setError(null);
      try {
        const formData = new FormData();
        formData.append('image', e.target.files[0]);
        const response = await fetch('/api/similarity_qwer', {
          method: 'POST',
          body: formData,
        });
        let data = null;
        try {
          data = await response.json();
        } catch (jsonErr) {
          throw new Error('No valid product found.');
        }
        if (response.status === 404 && data && data.error === 'No results found') {
          setResult(null);
          setError('No results found');
          return;
        }
        if (!response.ok || !data || !data.product) throw new Error(data && data.error ? data.error : 'No valid product found.');
        setResult(data.product);
      } catch (err) {
        setError(err.message);
      } finally {
        setLocalLoading(false);
        if (onUpload) onUpload(e.target.files[0]);
        inputRef.current.value = '';
      }
    }
  };


  return (
    <div className="ai-upload-card">
      <label
        className={`ai-upload-dropzone${localLoading || loading ? ' ai-upload-disabled' : ''}`}
        htmlFor="ai-upload-input"
        tabIndex={0}
      >
        <div className="ai-upload-icon">
          <svg width="48" height="48" fill="none" stroke="#2563eb" strokeWidth="2"><rect x="8" y="16" width="32" height="24" rx="4" fill="#eff6ff"/><path d="M16 24l8 8 8-8" stroke="#2563eb" strokeWidth="2"/><path d="M24 32V16" stroke="#2563eb" strokeWidth="2"/></svg>
        </div>
        <div className="ai-upload-text">
          {selectedFile ? `Selected: ${selectedFile.name}` : 'Click or drag image here to upload'}
        </div>
        <input
          id="ai-upload-input"
          type="file"
          accept="image/*"
          onChange={handleChange}
          ref={inputRef}
          disabled={loading || localLoading}
          className="ai-upload-input"
        />
      </label>
      <button
        className="ai-upload-btn"
        onClick={() => inputRef.current && inputRef.current.click()}
        disabled={loading || localLoading}
        type="button"
      >
        {loading || localLoading ? 'Searching...' : 'Upload Image'}
      </button>
    {localLoading && <div style={{ marginTop: '1rem', color: '#2563eb' }}>Uploading...</div>}
    {error && <div style={{ marginTop: '1rem', color: 'red' }}>Error: {error}</div>}
    {result && (
      <div className="ai-product-card" style={{marginTop: '1.5rem', padding: '1.25rem', background: '#fff', borderRadius: '12px', boxShadow: '0 2px 12px #e3e8f0', display: 'flex', alignItems: 'flex-start', gap: '1.5rem', maxWidth: '410px'}}>
        <img src={result.imageUrl} alt={result.name} style={{width: '100px', height: '100px', objectFit: 'cover', borderRadius: '10px', background: '#f1f5f9', flexShrink: 0}} />
        <div style={{flex: 1}}>
          {result.name && <div style={{fontWeight: 700, fontSize: '1.18rem', marginBottom: '0.25rem', color: '#1e293b'}}>{result.name}</div>}
          {result.brand && <div style={{fontWeight: 500, fontSize: '1rem', color: '#64748b', marginBottom: '0.35rem'}}>{result.brand}</div>}
          {typeof result.price !== 'undefined' && <div style={{fontWeight: 700, color: '#2563eb', fontSize: '1.12rem', marginBottom: '0.3rem'}}>₹{result.price}</div>}
          {result.description && <div style={{fontSize: '0.97rem', color: '#334155', marginBottom: '0.35rem'}}>{result.description}</div>}
          {result.category && result.subcategory && <div style={{fontSize: '0.94rem', color: '#64748b', marginBottom: '0.2rem'}}>Category: {result.category} &gt; {result.subcategory}</div>}
          {typeof result.inStock !== 'undefined' && <div style={{fontSize: '0.92rem', color: result.inStock ? '#16a34a' : '#dc2626', fontWeight: 600}}>{result.inStock ? 'In Stock' : 'Out of Stock'}</div>}
          {typeof result.rating !== 'undefined' && <div style={{fontSize: '0.92rem', color: '#f59e42', fontWeight: 600, marginTop: '0.15rem'}}>Rating: {result.rating}</div>}
        </div>
      </div>
    )}
  </div>
  );
};

export default ImageUpload;
