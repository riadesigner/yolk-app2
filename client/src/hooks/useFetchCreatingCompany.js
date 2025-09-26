import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api.jsx';
import useGallery from './useGallery.js';

export default function useFetchCreatingCompany({ setErrorMessage }) {
  const [_, setUser] = useState(null);
  const [companyId, setCompanyId] = useState(null);
  const [company, setCompany] = useState(null);
  const [companyName, setCompanyName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [description, setDescription] = useState('');
  const [city, setCity] = useState('');

  const navigate = useNavigate();

  const { gallery, setGallery, addImage, removeImage, handleGalleryChange } =
    useGallery([]);

  const hdlSaveAll = async () => {
    setErrorMessage(null);

    const userInput = {
      name: companyName,
      gallery,
      description,
      city,
      specialization,
    };

    try {
      if (company && companyId) {
        const companyData = {
          ...company,
          ...userInput,
        };
        // console.log(`будем обновлять компанию ${companyId}`);
        await api.patch(`/companies/${company.id}`, {
          companyData,
        });
        // console.log('Компания успешно обновлена:', response.data);
      } else {
        const companyData = {
          ...userInput,
        };
        // console.log('неизвестная компания!');
        await api.put(`/companies/me`, { companyData });
        // console.log('Компания успешно создана:', response.data);
      }

      navigate('/cp/company/info');
    } catch (error) {
      console.error('Ошибка:', error.response?.data || error.message);
      setErrorMessage('Не удалось сохранить');
      throw error; // Можно обработать ошибку в компоненте
    }
  };

  useEffect(() => {
    const fetchCompanyByUser = async () => {
      try {
        const response = await api.get('/users/me');

        if (response.data.success) {
          const user = response.data.user;
          setUser(user);
          const userCompany = user.userCompany;

          if (userCompany) {
            setCompany(userCompany);
            setCompanyId(userCompany.id);
            setCompanyName(userCompany.name || '');
            setSpecialization(userCompany.specialization || '');
            setDescription(userCompany.description || '');
            setCity(userCompany.city || '');
            setGallery(userCompany.gallery || '');
          }
        }
      } catch (err) {
        console.error('Ошибка загрузки данных', err);
        navigate('/');
      }
    };
    void fetchCompanyByUser();
  }, [navigate, setGallery]);

  return {
    company,
    companyId,
    companyName,
    setCompanyName,
    specialization,
    setSpecialization,
    description,
    setDescription,
    city,
    setCity,
    gallery,
    setGallery,
    addImage,
    removeImage,
    handleGalleryChange,
    hdlSaveAll,
  };
}
