import { useState } from "react";
import PropTypes from "prop-types";

export const useForm = (data, submitCh) => {
  const [formData, setFormData] = useState(data);

  const onChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    submitCh();
  };

  return { formData, setFormData, onChange, onSubmit };
};

useForm.propTypes = {
  data: PropTypes.object,
  submitCh: PropTypes.func,
};
