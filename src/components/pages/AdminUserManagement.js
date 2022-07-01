import SimplePageLayout from "../templates/SimplePageLayout";
//import {useContext, useEffect, useState} from "@types/react";
import {UserContext} from "../../auth/UserProvider";
import {changeAccountRole, enableAccount, fetchuser} from "../../service/AdminPanel/AdminPanel";
import {Form, Table, Button} from "react-bootstrap";

const AdminUserManagement = (props) => { 

    const DeleteUser = () => {
        console.log(" About to delete User!")

    }

    // Tried this but didn't work: 
    // <h3>User Management for {this.props.location.state.usernamedata} </h3>
    return(
        <SimplePageLayout>
            <h3> User Management for simonl@venus.com </h3>
            <div className={"section1"}>
                <p></p>
                <p>Delete this User </p>
                <Button variant={"danger"} onClick={() => DeleteUser}> Delete User </Button>
                <p></p>
            </div>
            <div className={"section2"}>
                <p></p>
                <p>Change User Name </p>
                <Button variant={"primary"}>Change User Name </Button>
                <p></p>
            </div>
            <div className={"section3"}>
                <p></p>
                <p>Change User Email </p>
                <Button variant={"primary"}> Change Email </Button>
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
