import { useState, FormEvent, ChangeEvent, useCallback } from "react";

interface InitialStateType {
  [key: string]: string;
}

type SubmitType = (formData: InitialStateType) => Promise<void>;

const useForm = (
  initialState: InitialStateType,
  onSubmit: SubmitType,
  isCheck?: boolean
) => {
  const [formState, setFormState] = useState<InitialStateType>(initialState);

  const [error, setError] = useState<InitialStateType>({});
  const inputChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({
      ...prev,
      [name]: value,
    }));
  }, []);

  const validateForm = () => {
    const newErrors: InitialStateType = {};

    if (isCheck) {
      if (!formState.name) {
        newErrors.name = "Name is required";
      } else if (formState.name.length < 3) {
        newErrors.name = "Name must be at least 3 characters";
      }
    }

    if (!formState.email) {
      newErrors.email = "Email is required";
    } else if (!isValidEmail(formState.email)) {
      newErrors.email = "Invalid email format";
    }

    if (!formState.password) {
      newErrors.password = "Password is required";
    } else if (formState.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    if (isCheck) {
      if (!formState.password_confirmation) {
        newErrors.password_confirmation = "Password Confirm is required";
      } else if (formState.password !== formState.password_confirmation) {
        newErrors.password_confirmation = "Password Confirm does not match";
      }
    }

    setError(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();

      if (validateForm()) {
        try {
          console.log(formState, "insied custom");
          await onSubmit(formState);
        } catch (error) {
          if (error instanceof Error) {
            setError({ form: error.message });
          } else {
            setError({ form: "An unknown error occurred." });
          }
        }
      }
    },
    [formState, onSubmit]
  );

  const isValidEmail = (email: string) => {
    return /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email);
  };

  return { isCheck, error, handleSubmit, inputChangeHandler, formState };
};

export default useForm;
