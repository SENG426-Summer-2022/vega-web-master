import FormPageLayout from "../templates/FormPageLayout.js";
import ContactUsForm from "../UI/organisms/ContactUsForm.js";

const onSubmit = async (name, email, message) => {
  // post to server at localhost:8000/api/contact
  // send name, email, and message
  const response = await fetch("http://localhost:8000/api/contact", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      name: name,
      email: email,
      message: message,
    }),
  });
  const result = await response.json();
  return result;
};

const ContactUs = () => {
  return (
    <FormPageLayout>
      <ContactUsForm onSubmit={onSubmit} />
    </FormPageLayout>
  );
};
export default ContactUs;
