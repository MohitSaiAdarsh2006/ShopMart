import React from 'react';
import './AiImageModal.css';
import ImageUpload from './ImageUpload_qwer';

const AiImageModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;
  return (
    <div className="ai-image-modal-overlay" onClick={onClose}>
      <div className="ai-image-modal-window" onClick={e => e.stopPropagation()}>
        <button className="ai-image-modal-close" onClick={onClose}>&times;</button>
        <h2 className="ai-image-modal-title">AI Image Search</h2>
        <ImageUpload />
      </div>
    </div>
  );
};

export default AiImageModal;
