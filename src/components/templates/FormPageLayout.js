import Header from '../UI/organisms/Header.js';
import Footer from '../UI/organisms/Footer.js';
import Content from '../UI/organisms/Content.js';
import {Container} from 'react-bootstrap';

const FormPageLayout = ({children}) => {
	return (
		<Container className="d-flex flex-column min-vh-100 justify-content-between">
			<Header />
			<Content>
				{children}
			</Content>
			<Footer className="mt-auto"/>
		</Container>
		);
}
export default FormPageLayout;