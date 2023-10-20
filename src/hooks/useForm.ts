import { useState } from "react";

export function useForm<T extends { [key: string]: string | number }>(
  data: T,
  submitCh: () => void
) {
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
}
