import FormPageLayout from '../templates/FormPageLayout.js';
import UserRegistrationForm from '../UI/organisms/UserRegistrationForm.js';

const UserRegistration = (props) => {
	return (
		<FormPageLayout>
			<UserRegistrationForm />
		</FormPageLayout>
		);
}
export default UserRegistration;