import { useState } from 'react';

export default function useFiles(initialFiles = []) {
  const [files, setFiles] = useState(initialFiles);

  const addFile = () => {
    const newId =
      files.length > 0 ? Math.max(...files.map((f) => f.id)) + 1 : 1;
    setFiles([
      ...files,
      {
        id: newId,
        key: '',
        url: '',
        description: '',
      },
    ]);
  };

  const removeFile = (id) => {
    setFiles(files.filter((f) => f.id !== id));
  };

  const handleFileChange = (id, fieldName, value) => {
    setFiles(
      files.map((file) =>
        file.id === id ? { ...file, [fieldName]: value } : file
      )
    );
  };

  return {
    files,
    setFiles,
    addFile,
    removeFile,
    handleFileChange,
  };
}
