import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from "react";

import api from '../../utils/api'

export default function useFetchLogoLoader(companyId){
            
    const [nowLoading, setNowLoading] = useState(true);    
    const [previewUrl, setPreviewUrl] = useState('');
    const [uploadedImage, setUploadedImage] = useState('/no-image.jpg');      
    const [selectedFile, setSelectedFile] = useState('');
    const [error, setError] = useState('');

    console.log('uploadedImage', uploadedImage);

    const fileInputRef = useRef(null);

    const handleButtonClick = () => {
        fileInputRef.current.click(); // Программно вызываем клик по скрытому input
    };

    // ----------------------
    //      FILE CHANGE
    // ----------------------    
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

    // ----------------------
    //      IMAGE UPLOAD
    // ----------------------    
    const handleUpload = async () => {          
        if (!selectedFile) {
        setError('Пожалуйста, выберите файл');
        return;
        }

        setNowLoading(true);
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

            const response = await api.put(`/companies/${companyId}/logo`, formData, {
                headers: {
                'Content-Type': 'multipart/form-data',
                },
            });

            const uploaded_logo = response.data.uploaded_logo;                        
            console.log('uploaded_logo.url', uploaded_logo.url)
            setUploadedImage(uploaded_logo.url);
            setSelectedFile(null);
            setPreviewUrl('');

        } catch (err) {
            console.error('Upload error:', err);
            let showMessage = 'Ошибка при загрузке файла';
            const errMessage= err.response?.data?.error.details;
                if (errMessage.toLowerCase().includes('too large')) {
                    showMessage += '. Слишком большой файл. Ограничение - 5 мб.'
                }
            setError(showMessage);
        } finally {
            setNowLoading(false);
        }
    };



    useEffect(() => {

        const fetchCompanyLogo = async ()=>{
            setNowLoading(true)
                try{
                    const response = await api.get(`/companies/${companyId}`);
                    setNowLoading(false)
                    if(response && response.data.success){                        
                        const resCompany = response.data.company;
                        if(resCompany.logo!==null){
                            setUploadedImage(resCompany.logo.url);                            
                        }
                    }                    
                }catch(err){            
                    setNowLoading(false)       
                    console.log(err)
                }
        }

       companyId!==null && fetchCompanyLogo();

    },[companyId]);

    return {
        error,
        nowLoading,
        uploadedImage,
        previewUrl,
        handleUpload,
        fileInputRef,
        selectedFile,
        handleFileChange,        
        handleButtonClick,
        }

}