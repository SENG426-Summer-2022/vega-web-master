import SimplePageLayout from "../templates/SimplePageLayout";
import {useContext, useEffect, useState} from "react";
import {UserContext} from "../../auth/UserProvider";
import {changeAccountRole, enableAccount, fetchuser, deleteAccount, updateAccountEmail, updateAccountusername} from "../../service/AdminPanel/AdminPanel";
import {Form, Table, Button} from "react-bootstrap";

const AdminUserManagement = (props) => {     
	const {user} = useContext(UserContext);

    const DeleteUser = (username) => {
        console.log("About to delete User " + username)
        console.log(user.jwt)
        deleteAccount(username, user.jwt)

    }

    const ChangeUserName = (username) => {
        console.log(" About to change User's Name")
        console.log(user.jwt)
        //Get new Username
        var newUserFirstname = prompt("enter new Firstname")
        var newUserLastname = prompt("enter new Lastname")
        updateAccountusername(username, newUserFirstname, newUserLastname, user.jwt)

    }

    const ChangeUserEmail = (username) => {
        console.log(" About to change User's email")
        console.log(user.jwt)
        //Get new Email
        var newEmail = prompt("enter new email")
        updateAccountEmail(username, newEmail, user.jwt)
    }

    // Tried this but didn't work: 
    // <h3>User Management for {this.props.location.state.usernamedata} </h3>

    var username = "francisp@venus.com" // Temporary, remove after getting a input method
    
    return(
        <SimplePageLayout>
            <h3> User Management for simonl@venus.com </h3>
            <div className={"section1"}>
                <p></p>
                <p>Delete this User </p>
                <Button variant={"danger"} onClick={() => DeleteUser(username)}> Delete User </Button>
                <p></p>
            </div>
            <div className={"section2"}>
                <p></p>
                <p>Change User's Name </p>
                <Button variant={"primary"} onClick={() => ChangeUserName(username)}>Change User's Name </Button>
                <p></p>
            </div>
            <div className={"section3"}>
                <p></p>
                <p>Change User Email </p>
                <Button variant={"primary"} onClick={() => ChangeUserEmail(username)}> Change Email </Button>
                <p></p>
            </div>
            <div className={"section3"}>
                <p></p>
                <p>Add new User </p>
                <Button variant={"primary"} href={"../signup"}> Add User </Button>
                <p></p>
        </div>
        </SimplePageLayout>
    )
}

export default AdminUserManagement;
