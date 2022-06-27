import VenusListGroup from '../atoms/VenusListGroup.js';
import {Row, Col} from 'react-bootstrap';
const FooterNavBar = (props) => {
	const [headOne, ...listOne] = ['PLATFORMS', 'Deep Packet Inspection (DPI)', 'Intrusion Detection and Prevention System (IDS/IPS)'];
	const [headTwo, ...listTwo] = ['WHY VEGA?', 'Why Vega?', 'Industry Validation', 'Our Customers'];
	const [headThree, ...listThree] = ['News', 'IG Design Group Selects Vega NextGen for Cybersecurity', 'Industry Validation', 'Our Customers'];
	const linksOne = ["/", "/"];
	const linksTwo = ["/aboutus", "/", "/"];
	const linksThree = ["/news", "/news", "/"];
	return (
			<Row>
				<Col>
					<VenusListGroup header={headOne} list={listOne} links={linksOne}/>
				</Col>
				<Col>
					<VenusListGroup header={headTwo} list={listTwo} links={linksTwo}/>
				</Col>
				<Col>
					<VenusListGroup header={headThree} list={listThree} links={linksThree}/>
				</Col>
			</Row>
		);
}
export default FooterNavBar;