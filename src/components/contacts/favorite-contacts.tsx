import styled from "@emotion/styled";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { css } from "@emotion/react";
import { useMutation } from "@apollo/client";

import { DELETE_CONTACT } from "../../graphql/mutations/contact-mutations";
import { GET_CONTACT_LIST } from "../../graphql/queries/contact-queries";

import Card from "../ui/card";
import { buttonStyle, errorButtonStyle } from "../form/form-style";

interface FavoriteContactsProps {
  items?: Contact[];
  refetchContacts: () => void;
}

const ContactsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(1, minmax(0, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
`;

const contactContentStyled = css`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const contactFavstyled = css`
  align-self: end;
  cursor: pointer;
`;

const contactActstyled = css`
  display: flex;
  gap: 1rem;
`;

export default function FavoriteContacts({ items, refetchContacts }: FavoriteContactsProps) {
  const navigate = useNavigate();

  const [deleteContact, { loading, error }] = useMutation(DELETE_CONTACT);

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this contact?"
    );

    if (confirmed) {
      await deleteContact({
        variables: { id: id },
        refetchQueries: [GET_CONTACT_LIST, "GetContactList"],
      });
      alert("Succeed!");
    }
  };

  const getFavoriteContacts = (): number[] => {
    const storedFavoriteContactsJSON =
      localStorage.getItem("favorite_contacts");
    if (storedFavoriteContactsJSON) {
      return JSON.parse(storedFavoriteContactsJSON);
    } else {
      return [];
    }
  };

  const addToFavoriteContacts = (contactId: number) => {
    const favoriteContacts = getFavoriteContacts();

    if (!favoriteContacts.includes(contactId)) {
      favoriteContacts.push(contactId);
      localStorage.setItem(
        "favorite_contacts",
        JSON.stringify(favoriteContacts)
      );
      refetchContacts();
    }
  };

  useEffect(() => {
    if (error) {
      alert(`Error when deleting contact : ${error.message}`);
    }
  }, [error]);

  return (
    <ContactsContainer>
      {items?.map((contact) => (
        <Card key={contact.id}>
          <div css={contactContentStyled}>
            <img
              title="add to favorite"
              css={contactFavstyled}
              src="/icons/love.svg"
              alt="love"
              onClick={() => addToFavoriteContacts(contact.id)}
            />
            <p>
              {contact.first_name} {contact.last_name}
            </p>
            <p>{contact.phones[0]?.number}</p>
            <div css={contactActstyled}>
              <button
                css={buttonStyle}
                title="edit"
                disabled={loading}
                onClick={() => navigate(`contact/${contact.id}/edit`)}
              >
                <img src="/icons/edit.svg" alt="edit" width={15} />
              </button>
              <button
                css={errorButtonStyle}
                title="delete"
                onClick={handleDelete.bind(null, contact.id)}
                disabled={loading}
              >
                <img src="/icons/delete.svg" alt="delete" width={15} />
              </button>
            </div>
          </div>
        </Card>
      ))}
    </ContactsContainer>
  );
}
