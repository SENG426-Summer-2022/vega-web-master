import FormPageLayout from "../templates/FormPageLayout.js";
import ContactUsForm from "../UI/organisms/ContactUsForm.js";
import CenteredHeader from "../UI/atoms/CenteredHeader.js";

const ContactUs = () => {
  return (
    <FormPageLayout>
      <CenteredHeader text="Contact Us" />
      <ContactUsForm />
    </FormPageLayout>
  );
};
export default ContactUs;
