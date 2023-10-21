import { useParams } from "react-router-dom";

import { titleContainerStyle } from "../components/globalStyle";
import Divider from "../components/ui/divider";
import EditContactForm from "../components/form/edit-contact-form";

const EditContact = () => {
  const { contactId } = useParams();

  return (
    <section>
      <div css={titleContainerStyle}>
        <h1>Edit Contact</h1>
      </div>
      <Divider />
      <EditContactForm contactId={contactId} />
    </section>
  );
};

export default EditContact;
