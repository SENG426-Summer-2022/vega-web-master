import SimplePageLayout from "../templates/SimplePageLayout";
//import {useContext, useEffect, useState} from "@types/react";
import {UserContext} from "../../auth/UserProvider";
import {changeAccountRole, enableAccount, fetchuser} from "../../service/AdminPanel/AdminPanel";
import {Form, Table, Button} from "react-bootstrap";

const AdminUserManagement = (props) => {

    const { context } = props;
    // of {this.props.location.state.usernamedata}
    return(
        <SimplePageLayout>

            <h3> User Management </h3>
            <div className={"section1"}>
                <p>Delete this User </p>
                <Button variant={"danger"}>Delete User</Button>
            </div>
            <div className={"section2"}>
                <p>Change User Name </p>
                <Button variant={"primary"}>Change User Name</Button>
            </div>
            <div className={"section3"}>
                <p>Change User Email</p>
                <Button variant={"primary"}> Change Email</Button>
            </div>
            <div className={"section3"}>
            <p>Add new User</p>
            <Button variant={"primary"} href={"../signup"}> Add User</Button>
        </div>
        </SimplePageLayout>
    )
}

export default AdminUserManagement;
