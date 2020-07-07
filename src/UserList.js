import React, {useEffect} from "react";

function User({user, onRemove, onToggle}){

    const {username, email, id, active} = user;

useEffect(() => {
    console.log(user);
    console.log('deps 바뀐 배열 값');
    return () => {
        console.log(user);
        console.log('deps 바뀌기 전 배열 값');
    }
}, [user]);

    return(
        <div>
            <b onClick={() => onToggle(id)} style={{
                color : active ? 'green' : 'black',
                cursor : 'pointer'
            }}>{username}</b>
            &nbsp;<span>({email})</span>
            <button onClick={() => onRemove(id)}>삭제</button>
        </div>
    );
}

function UserList({users, onRemove, onToggle}) {
    return (
        <div>
            {
                users.map(user => (<User user={user} key={user.id} onRemove={onRemove} onToggle={onToggle}/>))
            }
        </div>
    );
}

export default UserList;