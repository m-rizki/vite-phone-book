import { FormEvent, useRef } from "react";
import {
  buttonStyle,
  formControlEditPhone,
  inputPhoneStyle,
} from "./form-style";
import { useMutation } from "@apollo/client";
import { ADD_NUMBER_TO_CONTACT } from "../../graphql/mutations/phone-mutations";
import { useNavigate } from "react-router-dom";

interface AddFormPhoneProps {
  contactId?: string;
  refetchDetail: () => void;
}

export default function AddFormPhone({
  contactId,
  refetchDetail,
}: AddFormPhoneProps) {
  const navigate = useNavigate();

  const phoneRef = useRef<HTMLInputElement>(null);

  const [addPhone, { loading }] = useMutation(ADD_NUMBER_TO_CONTACT);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await addPhone({
      variables: {
        contact_id: Number(contactId),
        phone_number: phoneRef?.current?.value,
      },
    });
    alert("Add Phone successfully");
    if (phoneRef.current) {
      phoneRef.current.value = "";
    }
    refetchDetail();
    navigate(0);
  };

  return (
    <form onSubmit={onSubmit}>
      <div css={formControlEditPhone}>
        <input
          css={inputPhoneStyle}
          type="text"
          ref={phoneRef}
          disabled={loading}
          pattern="^[0-9+]+$"
          title="Phone number can only contain numbers and the plus symbol (+)"
          required
        />
        <button type="submit" css={buttonStyle} disabled={loading}>
          Add
        </button>
      </div>
    </form>
  );
}
