import { FormEvent, useState } from "react";
import { useMutation, useQuery } from "@apollo/client";

import { GET_CONTACT_DETAIL } from "../../graphql/queries/contact-queries";
import { EDIT_CONTACT_BY_ID } from "../../graphql/mutations/contact-mutations";

import {
  errorFlag,
  formControl,
  inputStyle,
  labelStyle,
  submitButtonStyle,
} from "./form-style";
import { titleContainerStyle } from "../globalStyle";
import EditFormPhone from "./edit-phone-form";
import Divider from "../ui/divider";
import AddFormPhone from "./add-phone-form";

interface EditContactProps {
  contactId?: string;
}

export default function EditContactForm({ contactId }: EditContactProps) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  const [phones, setPhones] = useState<Phone[]>([]);

  const { loading, error, refetch } = useQuery(GET_CONTACT_DETAIL, {
    variables: {
      id: Number(contactId) || null,
    },
    fetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
    onCompleted: async (queryData) => {
      console.log(queryData)
      const data: Contact = queryData.contact_by_pk;

      setFirstName(data.first_name);
      setLastName(data.last_name);
      const phones = data.phones;
      setPhones(phones);
    },
  });

  const [editContact, { loading: loadingEdit, error: errorEdit }] =
    useMutation(EDIT_CONTACT_BY_ID);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();

    await editContact({
      variables: {
        id: Number(contactId),
        _set: {
          first_name: firstName,
          last_name: lastName,
        },
      },
    });
    alert("Succeed!");
    refetch();
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p css={errorFlag}>Error: {error.message}</p>;
  }

  return (
    <>
      <form onSubmit={onSubmit}>
        {errorEdit && (
          <p css={errorFlag}>{`Submission error! ${errorEdit?.message}`}</p>
        )}

        <div css={formControl}>
          <label css={labelStyle}>First Name</label>
          <input
            css={inputStyle}
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            disabled={loadingEdit}
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
            disabled={loadingEdit}
            pattern="^[a-zA-Z0-9]+$"
            title="Last Name can only contain letters and / or numbers"
            required
          />
        </div>
        <button css={submitButtonStyle} type="submit" disabled={loadingEdit}>
          {loadingEdit ? "SUBMITTING..." : "SUBMIT"}
        </button>
      </form>
      <br />
      <br />
      <div css={titleContainerStyle}>
        <h1>Edit Phone</h1>
      </div>
      <Divider />

      {phones.map((phone) => {
        return (
          <EditFormPhone
            key={phone.number}
            phone={phone}
            contactId={contactId}
            refetchDetail={() => refetch()}
          />
        );
      })}

      <br />
      <br />
      <div css={titleContainerStyle}>
        <h1>Add Phone</h1>
      </div>
      <Divider />
      <AddFormPhone contactId={contactId} refetchDetail={() => refetch()} />
    </>
  );
}
