import { useState } from "react";

export default function useHardSkills(initialHardSkills = []) {

  const [hardSkills, setHardSkills] = useState(initialHardSkills);

  const addHardSkill = () => {
    const newId = hardSkills.length > 0 ? Math.max(...hardSkills.map((s) => s.id)) + 1 : 1;
    setHardSkills([
      ...hardSkills,
      {
        id: newId,
        title: "",
        percent: "",
      },
    ]);
  };

  const removeHardSkill = (id) => {
    setHardSkills(hardSkills.filter((s) => s.id !== id));
  };

  const handleHardSkillChange = (id, fieldName, value) => {
    setHardSkills(
      hardSkills.map((s) =>
        s.id === id ? { ...s, [fieldName]: value } : s
      )
    );
  };

  return {
    hardSkills,
    setHardSkills,
    addHardSkill,
    removeHardSkill,
    handleHardSkillChange,
  };
}