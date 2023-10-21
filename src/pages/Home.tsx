import { css } from "@emotion/react";
import { useState } from "react";
import { useQuery } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { GET_CONTACT_LIST } from "../graphql/queries/contact-queries";

import Contacts from "../components/contacts/contacts";

import { buttonStyle } from "../components/form/form-style";
import Divider from "../components/ui/divider";
import { titleContainerStyle } from "../components/globalStyle";

const paginationStyle = css`
  margin: 1rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
`;

const PAGE_SIZE = 10;

const Home = () => {
  const navigate = useNavigate()

  const [page, setPage] = useState(0);

  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
      order_by: [{ created_at: "desc" }],
    },
  });

  const contacts: Contact[] = data?.contact || [];

  return (
    <section>
      <div css={titleContainerStyle}>
        <h1>Contacts</h1>
        <button css={buttonStyle} onClick={() => navigate("/contact")}>+</button>
      </div>
      <Divider />
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error.message}</p>}

      <Contacts items={contacts} />

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
