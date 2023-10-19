import { useQuery } from "@apollo/client";
import { GET_CONTACT_LIST } from "../graphql/queries/contact-queries";
import { useState } from "react";
import Contacts from "../components/contacts/contacts";

const PAGE_SIZE = 10;

const Home = () => {
  const [page, setPage] = useState(0);

  const { loading, error, data } = useQuery(GET_CONTACT_LIST, {
    variables: {
      limit: PAGE_SIZE,
      offset: page * PAGE_SIZE,
    },
  });

  if (loading) return <p>Loading...</p>;

  if (error) return <p>Error: {error.message}</p>;

  const contacts: Contact[] = data.contact;

  return (
    <section>
      <h1>Contacts</h1>
      <hr />
      <Contacts items={contacts} />
      <div>
        <button onClick={() => setPage(page - 1)} disabled={page === 0}>
          Previous
        </button>
        <button
          onClick={() => setPage(page + 1)}
          disabled={contacts.length < PAGE_SIZE}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Home;
