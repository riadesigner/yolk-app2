import { useState } from "react";

export default function useSoftSkills(initialSoftSkills = []) {

  const [softSkills, setSoftSkills] = useState(initialSoftSkills);

  const addSoftSkill = () => {
    const newId = softSkills.length > 0 ? Math.max(...softSkills.map((s) => s.id)) + 1 : 1;
    setSoftSkills([
      ...softSkills,
      {
        id: newId,
        title: "",
        percent: "",
      },
    ]);
  };

  const removeSoftSkill = (id) => {
    setSoftSkills(softSkills.filter((s) => s.id !== id));
  };

  const handleSoftSkillChange = (id, fieldName, value) => {
    setSoftSkills(
      softSkills.map((s) =>
        s.id === id ? { ...s, [fieldName]: value } : s
      )
    );
  };

  return {
    softSkills,
    setSoftSkills,
    addSoftSkill,
    removeSoftSkill,
    handleSoftSkillChange,
  };
}