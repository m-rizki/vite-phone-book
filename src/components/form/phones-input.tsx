import { ChangeEvent, useEffect, useState } from "react";

interface PhonesInputProps {
  value: Phone[];
  onPhoneChange: (phones: Phone[]) => void;
}

export default function PhonesInput({
  value,
  onPhoneChange,
}: PhonesInputProps) {
  const [phones, setPhones] = useState<Phone[]>(value);

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
        <div key={index}>
          <input
            name={`phone_${index}`}
            type="text"
            value={phone.number}
            onChange={(event) => handlePhonesChange(index, event)}
            required
          />
          <button type="button" onClick={() => removePhone(index)}>
            remove
          </button>
        </div>
      ))}
      <button type="button" onClick={addPhone}>
        add
      </button>
    </div>
  );
}
