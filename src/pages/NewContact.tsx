import { FormEvent, useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";

import PhonesInput from "../components/form/phones-input";
import { ADD_CONTACT_WITH_PHONES } from "../graphql/mutations/contact-mutations";

const NewContact = () => {
  const navigate = useNavigate();

  const [phones, setPhones] = useState<Phone[]>([{ number: "" }]);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const handlePhoneChange = (phones: Phone[]) => {
    setPhones(phones);
  };

  const [createContact, { loading, error }] = useMutation(
    ADD_CONTACT_WITH_PHONES
  );

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    createContact({
      variables: { first_name: firstName, last_name: lastName, phones: phones },
    });
    setFirstName("");
    setLastName("");
    setPhones([{ number: "" }]);
    navigate("/");
  };

  if (loading) return <p>Submitting...</p>;
  if (error) return <p>{`Submission error! ${error.message}`}</p>;

  return (
    <section>
      <form onSubmit={onSubmit}>
        <div>
          <label htmlFor="first_name">First Name</label>
          <input
            name="first_name"
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="last_name">Last Name</label>
          <input
            name="last_name"
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <PhonesInput value={phones} onPhoneChange={handlePhoneChange} />
        <button type="submit">Submit</button>
      </form>
    </section>
  );
};

export default NewContact;
