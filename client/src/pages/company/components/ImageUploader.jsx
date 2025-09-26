import React from 'react';
import PropTypes from 'prop-types';
import useImageUploaderForCompany from '../../../hooks/useImageUploaderForCompany.js';

export default function ImageUploader({ companyId, setGallery, image = null }) {
  const {
    selectedFile,
    previewUrl,
    uploadedImage,
    isLoading,
    error,
    fileInputRef,
    handleButtonClick,
    handleFileChange,
    handleUpload,
    handleDelete,
  } = useImageUploaderForCompany(setGallery, companyId, image);

  return (
    <div style={{ maxWidth: '600px' }}>
      {!image && (
        <>
          <h2 className="title">
            Загрузка <br />
            изображения
          </h2>
          <div style={{ marginBottom: '20px' }}>
            <input
              type="file"
              onChange={handleFileChange}
              accept="image/*"
              ref={fileInputRef}
              style={{ display: 'none' }}
            />
            <button onClick={handleButtonClick} className="button is-link">
              {' '}
              Выберите файл{' '}
            </button>
          </div>
        </>
      )}

      {error && (
        <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>
      )}

      {previewUrl && (
        <div style={{ marginBottom: '20px' }}>
          <h4>Предпросмотр:</h4>
          <img
            src={previewUrl}
            alt="preview"
            style={{
              maxWidth: '100%',
              height: '160px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
        </div>
      )}

      {selectedFile && (
        <button
          onClick={handleUpload}
          disabled={isLoading}
          className="button is-primary"
        >
          {isLoading ? 'Загрузка...' : 'Загрузить фото'}
        </button>
      )}

      {uploadedImage && (
        <div style={{ marginTop: '30px' }}>
          <img
            src={uploadedImage.url}
            alt="uploaded"
            style={{
              maxWidth: '100%',
              height: '160px',
              objectFit: 'cover',
              borderRadius: '10px',
            }}
          />
          <div className="mt-4">
            <button
              onClick={handleDelete}
              disabled={isLoading}
              className="button is-danger is-small"
            >
              {isLoading ? 'Удаление...' : 'Удалить'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

ImageUploader.propTypes = {
  companyId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  setGallery: PropTypes.func,
  image: PropTypes.shape({
    url: PropTypes.string,
    key: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  }),
};
