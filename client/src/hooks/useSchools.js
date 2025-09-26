import { useState } from 'react';

export default function useSchools(initialSchools = []) {
  const [schools, setSchools] = useState(initialSchools);

  const addSchool = () => {
    const newId =
      schools.length > 0 ? Math.max(...schools.map((s) => s.id)) + 1 : 1;
    setSchools([
      ...schools,
      {
        id: newId,
        title: '',
        year: '',
        speciality: '',
        city: '',
      },
    ]);
  };

  const removeSchool = (id) => {
    setSchools(schools.filter((s) => s.id !== id));
  };

  const handleSchoolChange = (id, fieldName, value) => {
    setSchools(
      schools.map((school) =>
        school.id === id ? { ...school, [fieldName]: value } : school
      )
    );
  };

  return {
    schools,
    setSchools,
    addSchool,
    removeSchool,
    handleSchoolChange,
  };
}
