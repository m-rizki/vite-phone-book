import styled from "@emotion/styled";
import Card from "../ui/card";

interface ContactsProps {
  items?: Contact[];
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

export default function Contacts({ items }: ContactsProps) {
  return (
    <ContactsContainer>
      {items?.map((contact) => (
        <Card key={contact.id}>
          <p>
            {contact.first_name} {contact.last_name}
          </p>
          <p>{contact.phones[0]?.number}</p>
        </Card>
      ))}
    </ContactsContainer>
  );
}
