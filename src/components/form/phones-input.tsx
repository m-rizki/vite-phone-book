import { ChangeEvent, useEffect, useState } from "react";
import { buttonStyle, errorButtonStyle, formControlPhone, inputPhoneStyle } from "./form-style";

interface PhonesInputProps {
  value: Phone[];
  onPhoneChange: (phones: Phone[]) => void;
  disabled: boolean;
  reset: boolean; // New prop to control the reset
}

export default function PhonesInput({
  value,
  onPhoneChange,
  disabled,
  reset,
}: PhonesInputProps) {
  const [phones, setPhones] = useState<Phone[]>(value);

  useEffect(() => {
    if (reset) {
      setPhones([{ number: "" }]);
    }
  }, [reset]);

  const handlePhonesChange = (
    index: number,
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const data = [...phones];
    data[index].number = event.target.value;
    setPhones(data);
  };

  const addPhone = () => {
    const newPhone = { number: "" };
    setPhones((prev) => [...prev, newPhone]);
  };

  const removePhone = (index: number) => {
    const data = [...phones];
    data.splice(index, 1);
    setPhones(data);
  };

  useEffect(() => {
    onPhoneChange(phones);
  }, [phones, onPhoneChange]);

  return (
    <div>
      {phones.map((phone, index) => (
        <div css={formControlPhone} key={index}>
          <input
            css={inputPhoneStyle}
            name={`phone_${index}`}
            type="text"
            value={phone.number}
            onChange={(event) => handlePhonesChange(index, event)}
            disabled={disabled}
            required
          />
          <button
            css={errorButtonStyle}
            type="button"
            onClick={() => removePhone(index)}
            disabled={disabled}
          >
            -
          </button>
        </div>
      ))}
      <button
        css={buttonStyle}
        type="button"
        onClick={addPhone}
        disabled={disabled}
      >
        +
      </button>
    </div>
  );
}
