import { useParams } from "react-router-dom";

const EditContact = () => {
  const param = useParams();

  return <div>Edit Contact {param.contactId}</div>;
};

export default EditContact;
