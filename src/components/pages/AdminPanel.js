import SimplePageLayout from '../templates/SimplePageLayout.js';
import { fetchuser, disableAccount, enableAccount, changeAccountRole } from '../../service/AdminPanel/AdminPanel.js';
import {UserContext} from '../../auth/UserProvider.js';
import {useState, useContext, useEffect} from 'react';

import {Form, Table} from 'react-bootstrap';

const AdminPanel = (_props) => {
	const {user} = useContext(UserContext);
	const [listOfUsers, setUsers] = useState([]);
	const updateUsers = () => {
		console.log("Inside useEffect")
		fetchuser(user.jwt)
			.then(resp => {
				setUsers(resp)
			})
	}

	useEffect(() => {
		updateUsers()
	}, [user]);

	const enableUser = (username) => {
		enableAccount(username, user.jwt)
			.then(_resp => {
				console.log("User enabled")
				updateUsers()
			})
	}

	const disableUser = (username) => {
		console.log("Disable User called with", username)
		disableAccount(username, user.jwt)
			.then(_resp => {
				console.log("User disableAccount")
				updateUsers()
			})
	}

	const changeRole = (evt, username) => {
		var role = evt.target.value
		changeAccountRole(username, role, user.jwt)
			.then(_resp => {
				console.log("Changed Roles")
				updateUsers()
			})
	}
	const updateEnabledState = (user) => user.enabled
		? disableUser(user.username)
		: enableUser(user.username);

	// Possible Roles the text to display for it
	const roles = {
		"ROLE_STAFF": "STAFF",
		"ROLE_USER": "USER"
	}
	const listOfUsersHTML = () => {
		console.log(listOfUsers)
		if (!listOfUsers.length) return;
	    return listOfUsers.map((user) => {
			console.log(JSON.stringify(user))
			const auth = user.role.authority ? user.role.authority : "ROLE_USER"
			// HTML elements for the current users role
			const RoleText =
				<option value={auth}>
					{roles[auth]}
				</option>;

			// List of HTML elements that are != to the current users role
			const menuOption = Object.keys(roles)
				.filter((role) => role != auth)
				.map((role) =>
					<option value={role}>
						{roles[role]}
					</option>)

			const EnableText = user.enabled
				? "Disable User"
				: "Enable User";

			return <tr><td>{user.firstName}</td><td>{user.lastName}</td><td>{user.username}</td>
				<td onClick={() => updateEnabledState(user)}>
					<a href="#">{EnableText}</a></td>
				<td>
					<Form.Select aria-label="Floating label select example"
						value={RoleText}
						onChange={(evt) => changeRole(evt, user.username)}>
						{RoleText}
						{menuOption}
					</Form.Select>
				</td></tr>
		})
	}

	return (
		<SimplePageLayout>
			<Table>
				<thead>
					<tr>
						<td>First Name</td>
						<td>Last Name</td>
						<td>Username</td>
						<td></td>
						<td>Role</td>
					</tr>
				</thead>
				<tbody>
					{listOfUsersHTML()}
				</tbody>
			</Table>
		</SimplePageLayout>
	)
}
export default AdminPanel;
