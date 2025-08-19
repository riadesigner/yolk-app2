import React, { useState, useRef } from 'react';
import axios from 'axios';
import api from '../utils/api'

const ImageUploader = ({ companyId, setGallery, image = null }) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState(image);  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Проверка типа файла
        if (!file.type.match('image.*')) {
        setError('Пожалуйста, выберите файл изображения');
        return;
        }

        setSelectedFile(file);
        setError('');

        // Создание превью
        const reader = new FileReader();
        reader.onload = () => {
            setPreviewUrl(reader.result);
            setUploadedImage(null)
        };
        reader.readAsDataURL(file);
    };

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Программно вызываем клик по скрытому input
    };

  const handleUpload = async () => {
    if (!selectedFile) {
      setError('Пожалуйста, выберите файл');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const formData = new FormData();

      const newFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}${selectedFile.name.substring(selectedFile.name.lastIndexOf('.'))}`;

        // Создаем новый File объект с измененным именем
        const renamedFile = new File([selectedFile], newFileName, {
            type: selectedFile.type,
            lastModified: selectedFile.lastModified
        });

      formData.append('image', renamedFile);
      formData.append('companyId', companyId);      

      const response = await api.post('/company/upload-image', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      console.log('response', response);

      const uploaded_image = response.data.uploaded_image;
      const gallery = response.data.gallery;
      setUploadedImage(uploaded_image);
      setSelectedFile(null);
      setPreviewUrl('');

      setTimeout(()=>{
        setGallery(gallery);
      },1000);      

    } catch (err) {
      console.error('Upload error:', err);
      let showMessage = 'Ошибка при загрузке файла';
      const errMessage= err.response?.data?.error.details;
        if (errMessage.toLowerCase().includes('too large')) {
            showMessage += '. Слишком большой файл. Ограничение - 5 мб.'
        }
      setError(showMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {

    if (!uploadedImage?.key) return;

    setIsLoading(true);

    try {
      
        const response = await api.delete('/company/delete-image', {
        data: {
            imageKey: uploadedImage.key,
            companyId: companyId,
            }
        });

        console.log('response after deleting', response)
        
        setUploadedImage(null);

        setTimeout(()=>{
            setGallery(response.data.gallery);
        },500);        

    } catch (err) {
      console.error('Delete error:', err);
      setError('Ошибка при удалении файла');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={{maxWidth:'600px'}}>

        {
            !image && (
                <>
                <h2 className="title">Загрузка <br />изображения</h2>      
                <div style={{ marginBottom: '20px' }}>
                    <input type="file" onChange={handleFileChange} accept="image/*" ref={fileInputRef} style={{display:'none'}}/>
                    <button onClick={handleButtonClick} className="button is-link" > Выберите файл </button>        
                </div>
                </>
            )
        }

      {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}

      {previewUrl && (
        <div style={{ marginBottom: '20px' }}>
          <h4>Предпросмотр:</h4>
            <img src={previewUrl} alt="preview" style={{
                maxWidth:'100%',
                height:'160px',
                objectFit:'cover',
                borderRadius:'10px',
            }}/>
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
            <img src={uploadedImage.url}  alt="uploaded" style={{
                maxWidth:'100%',
                height:'160px',
                objectFit:'cover',
                borderRadius:'10px',
            }}/>
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
};

export default ImageUploader;