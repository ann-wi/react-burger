import { useState } from "react";

export const useForm = (data: any, submitCh: () => void) => {
  const [formData, setFormData] = useState(data);

  const onChange = (e: React.BaseSyntheticEvent) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e: React.BaseSyntheticEvent) => {
    e.preventDefault();
    submitCh();
  };

  return { formData, setFormData, onChange, onSubmit };
};
