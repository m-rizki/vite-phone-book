import CreateContact from "../components/form/create-contact";
import { titleContainerStyle } from "../components/globalStyle";
import Divider from "../components/ui/divider";

const ContactForm = () => {
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

export default ContactForm;
