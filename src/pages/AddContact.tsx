import CreateContact from "../components/form/create-contact-form";
import { titleContainerStyle } from "../components/globalStyle";
import Divider from "../components/ui/divider";

const AddContact = () => {
  return (
    <section>
      <div css={titleContainerStyle}>
        <h1>Add Contact</h1>
      </div>
      <Divider />
      <CreateContact />
    </section>
  );
};

export default AddContact;
