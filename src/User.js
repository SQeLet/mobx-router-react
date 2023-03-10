import React from "react";

import UserCard from './Card';
import { myStore } from './Employees';

function User(){
    return(
        <>
            <UserCard
                name={myStore.initialList[0].name}
                birthday={myStore.initialList[0].birthday}
                phone={myStore.initialList[0].phone}
                email={myStore.initialList[0].email}
                days={myStore.initialList[0].days}
                wage={myStore.initialList[0].wage}
            />
        </>
    );
}

export default User;