import { ChangeEvent, useCallback, useState } from "react";

interface InputType {
  [key: string]: string;
}

const useInput = (initialState: any) => {
  const [input, setInput] = useState(initialState);

  const changeInputHandler = useCallback(
    (
      e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
      const { name, value } = e.target;
      setInput((prev: any) => ({
        ...prev,
        [name]: value,
      }));
    },
    [input]
  );
  return { changeInputHandler, input, setInput };
};

export default useInput;
