import React, {useReducer, useMemo, createContext} from 'react';
import produce from 'immer';
import UserList from './UserList';
import CreateUser from "./CreateUser";

function countActiveUser(users){
    return users.filter(user => user.active).length;
}

const initialState = {
    users : [
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
    ]
}
function reducer(state, action) {
    switch (action.type) {
        case 'CREATE_USER':
            return produce(state, draft => {
                draft.users.push(action.user);
            });
            // return{
            //     inputs : initialState,
            //     users : state.users.concat(action.user)
            // };
        case 'TOGGLE_USER':
            return produce(state, draft => {
                const user = draft.users.find(user => user.id === action.id);
                user.active = !user.active;
            });
            // return{
            //     ...state,
            //     users : state.users.map(user => user.id === action.id ? {...user, active : !user.active} : user)
            // };
        case 'REMOVE_USER':
            return produce(state, draft =>{
                const index = draft.users.findIndex(user => user.id ===action.id);
                draft.users.splice(index, 1);
            });
            // return{
            //     ...state,
            //     users : state.users.filter(user => user.id !== action.id)
            // };
        default:
            throw new Error('Unhandeled action');

    }
}

export const UserDispatch = createContext(null);

function App() {
    const style = {
        margin : "0 auto"
        , padding : "50px"
    };

    const [state, dispatch] = useReducer(reducer, initialState);
    const {users} = state;

    const count = useMemo(() => countActiveUser(users), [users]);
    return (
        <UserDispatch.Provider value={dispatch}>
            <div style={style}>
                <CreateUser/>
                <UserList users={users}/>
                <br/>
                <div>활성 사용자 수 : {count}</div>
            </div>
        </UserDispatch.Provider>
    );
}

export default App;
