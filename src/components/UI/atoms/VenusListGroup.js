import {ListGroup} from 'react-bootstrap';
const VenusListGroup = ({header , list, links}) => {
	const listItems = list.map((l, index) => <ListGroup.Item action href = {links[index]} key={index}>{l}</ListGroup.Item>);
	return (
		<ListGroup variant="flush">
			<ListGroup.Item><b>{header}</b></ListGroup.Item>
			{listItems}
		</ListGroup>
	);

}
export default VenusListGroup;