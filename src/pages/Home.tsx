import { css } from "@emotion/react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_CONTACT_LIST } from "../graphql/queries/contact-queries";

import Contacts from "../components/contacts/contacts";

import {
  buttonStyle,
  errorFlag,
  inputStyle,
} from "../components/form/form-style";
import Divider from "../components/ui/divider";
import { titleContainerStyle } from "../components/globalStyle";
import { useDebounce } from "../hooks/useDebounce";

const paginationStyle = css`
  margin: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const PAGE_SIZE = 10;

const Home = () => {
  const navigate = useNavigate();

  const [page, setPage] = useState(0);
  const [contacts, setContacts] = useState<Contact[] | []>([]);
  const [filteredContacts, setFilteredContacts] = useState<Contact[] | []>([]);
  const [favContacts, setfavContacts] = useState<Contact[] | []>([]);
  const [searchValue, setSearchValue] = useState("");

  const debouncedSearchValue = useDebounce<string>(searchValue, 500);

  const getFavoriteContacts = (): Contact[] | [] => {
    const storedFavoriteContactsJSON =
      localStorage.getItem("favorite_contacts");
    if (storedFavoriteContactsJSON) {
      return JSON.parse(storedFavoriteContactsJSON);
    } else {
      return [];
    }
  };

  const { loading, error, refetch } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      order_by: [{ first_name: "asc" }],
      where: {
        first_name: {
          _like: `%${debouncedSearchValue}%`,
        },
      },
    },
    fetchPolicy: "network-only",
    notifyOnNetworkStatusChange: true,
    onCompleted: (queryData) => {
      const contactsQuery: Contact[] = queryData?.contact || [];
      const favContact = getFavoriteContacts();

      setfavContacts(favContact);

      // Filter out contacts that are also in favContact
      const filteredContacts = contactsQuery.filter((contact) => {
        return !favContact.some((fav) => fav.id === contact.id);
      });

      // Store the original query result separately for pagination
      setContacts(contactsQuery);
      // Set filtered contacts for rendering
      setFilteredContacts(filteredContacts);
    },
  });

  return (
    <section>
      <br />
      <br />
      <div css={titleContainerStyle}>
        <span></span>
        <input
          css={inputStyle}
          type="text"
          onChange={(e) => setSearchValue(e.target.value)}
          value={searchValue}
          placeholder="Search First Name..."
        />
      </div>
      <div css={titleContainerStyle}>
        <h1>Favorite</h1>
      </div>
      <Divider />
      <Contacts
        items={favContacts}
        refetchContacts={() => refetch()}
        isFavorite={true}
      />

      <div css={titleContainerStyle}>
        <h1>Contacts</h1>
        <button
          title="Add Contact"
          css={buttonStyle}
          onClick={() => navigate("/contact/add")}
        >
          +
        </button>
      </div>
      <Divider />

      {loading && <p>Loading...</p>}
      {error && <p css={errorFlag}>Error: {error.message}</p>}

      <Contacts
        items={filteredContacts}
        refetchContacts={() => refetch()}
        isFavorite={false}
      />

      <div css={paginationStyle}>
        <button
          css={buttonStyle}
          onClick={() => setPage(page - 1)}
          disabled={page === 0}
        >
          &lt;
        </button>
        <span>{page + 1}</span>
        <button
          css={buttonStyle}
          onClick={() => setPage(page + 1)}
          disabled={contacts.length < PAGE_SIZE}
        >
          &gt;
        </button>
      </div>
    </section>
  );
};

export default Home;
