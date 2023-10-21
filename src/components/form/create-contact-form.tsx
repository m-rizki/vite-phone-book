import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import { ADD_CONTACT_WITH_PHONES } from "../../graphql/mutations/contact-mutations";

import {
  errorFlag,
  formControl,
  inputStyle,
  labelStyle,
  submitButtonStyle,
} from "./form-style";
import PhonesInput from "./phones-input";
import { GET_CONTACT_LIST } from "../../graphql/queries/contact-queries";

export default function CreateContact() {
  const navigate = useNavigate();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [phones, setPhones] = useState<Phone[]>([{ number: "" }]);
  const [resetPhones, setResetPhones] = useState(false);

  const handlePhoneChange = (phones: Phone[]) => {
    setPhones(phones);
  };

  const [createContact, { loading, error }] = useMutation(
    ADD_CONTACT_WITH_PHONES
  );

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await createContact({
      variables: { first_name: firstName, last_name: lastName, phones: phones },
      refetchQueries: [GET_CONTACT_LIST, "GetContactList"],
    });

    setFirstName("");
    setLastName("");
    setResetPhones(true);
    setTimeout(() => {
      setResetPhones(false);
    }, 500);
    navigate("/");
  };

  return (
    <form onSubmit={onSubmit}>
      {error && <p css={errorFlag}>{`Submission error! ${error.message}`}</p>}

      <div css={formControl}>
        <label css={labelStyle}>First Name</label>
        <input
          css={inputStyle}
          type="text"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          disabled={loading}
          pattern="^[a-zA-Z0-9]+$"
          title="First Name can only contain letters and / or numbers"
          required
        />
      </div>
      <div css={formControl}>
        <label css={labelStyle}>Last Name</label>
        <input
          css={inputStyle}
          type="text"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          disabled={loading}
          pattern="^[a-zA-Z0-9]+$"
          title="Last Name can only contain letters and / or numbers"
          required
        />
      </div>
      <div css={formControl}>
        <label css={labelStyle}>Phones</label>
        <PhonesInput
          value={phones}
          onPhoneChange={handlePhoneChange}
          disabled={loading}
          reset={resetPhones}
        />
      </div>

      <button css={submitButtonStyle} type="submit" disabled={loading}>
        {loading ? "SUBMITTING..." : "SUBMIT"}
      </button>
    </form>
  );
}
