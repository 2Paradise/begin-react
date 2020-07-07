import React, {useRef, useState} from 'react';
import UserList from './UserList';
import CreateUser from "./CreateUser";


function App() {
    const style = {
        margin : "0 auto"
        , padding : "50px"
    };

    const [inputs, setInputs] = useState({
        username : '',
        email : ''
    });

    const onChange = e => {
      const {name, value}  = e.target;
      setInputs({
          ...inputs,
          [name] : value
      });
    };

    const {username, email} = inputs;

    const [users, setUsers] = useState([
        {
            id : 1
            ,username : 'velopert'
            , email : 'public.velopert@gmail.com'
            , active : true
        },
        {
            id : 2
            , username : 'robin'
            , email : 'robinnw@gmail.com'
            , active : false
        },
        {
            id : 3
            , username : 'dong'
            , email : 'dong@gmail.cm'
            , active : false
        }
    ]);

    const nextId = useRef(4);

    const onCreate = () => {
        const user = {
            id : nextId.current,
            ...inputs
        }
        // setUsers([...users, user]);
        setUsers(users.concat(user));

        setInputs({
            username : '',
            email : ''
        });

        nextId.current += 1;
    };

    const onReove = id => {
      setUsers(users.filter(user => user.id !== id));
    };

    const onToggle = id => {
        setUsers(users.map(user => user.id === id ? {...user, active : !user.active} : user));
    }

    return (
        <>
            <div style={style}>
                <CreateUser username={username} email={email} onChange={onChange} onCreate={onCreate}/>
                <UserList users={users} onRemove={onReove} onToggle={onToggle}/>
            </div>
        </>
    );
}

export default App;
