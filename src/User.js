import React from "react";
import { useParams } from 'react-router-dom';

import UserCard from './Card';
import { myStore } from './Employees';

function User(){
    const {userId} = useParams();
    //document.write(userId);
    return(
        <>
            <UserCard
                name={myStore.initialList[{userId}].name}
                birthday={myStore.initialList[userId].birthday}
                phone={myStore.initialList[userId].phone}
                email={myStore.initialList[userId].email}
                days={myStore.initialList[userId].days}
                wage={myStore.initialList[userId].wage}
            />
        </>
    );
}

export default User;