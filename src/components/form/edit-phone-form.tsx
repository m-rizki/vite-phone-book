import { FormEvent, useRef } from "react";
import {
  buttonStyle,
  formControlEditPhone,
  inputPhoneStyle,
} from "./form-style";
import { useMutation } from "@apollo/client";
import { EDIT_PHONE_NUMBER } from "../../graphql/mutations/phone-mutations";

interface EditFormPhoneProps {
  contactId?: string;
  phone: Phone;
  refetchDetail: () => void;
}

export default function EditFormPhone({
  contactId,
  phone,
  refetchDetail,
}: EditFormPhoneProps) {
  const phoneRef = useRef<HTMLInputElement>(null);

  const [editPhone, { loading }] = useMutation(EDIT_PHONE_NUMBER);

  const onSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await editPhone({
      variables: {
        pk_columns: {
          number: phone.number,
          contact_id: Number(contactId),
        },
        new_phone_number: phoneRef.current?.value,
      },
    });
    alert("Succeed Edit Phone");
    refetchDetail();
  };

  return (
    <form onSubmit={onSubmit}>
      <div css={formControlEditPhone}>
        <input
          css={inputPhoneStyle}
          type="text"
          ref={phoneRef}
          defaultValue={phone.number}
          disabled={loading}
          pattern="^[0-9+]+$"
          title="Phone number can only contain numbers and the plus symbol (+)"
          required
        />
        <button type="submit" css={buttonStyle} disabled={loading}>
          {loading ? "UPDATING..." : "UPDATE"}
        </button>
      </div>
    </form>
  );
}
