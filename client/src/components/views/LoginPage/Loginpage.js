
import React, {useState} from 'react'
import {useDispatch} from 'react-redux';
import {loginUser} from '../../../_action/user_action.'
import {withRouter} from 'react-router-dom'

function Loginpage(props) {

    const [Email, setEmail ] = useState("")
    const [Password, setPassword ] = useState("")
    const dispatch = useDispatch();

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();  // 리프레시 예방

        let body = {
            email : Email,
            password : Password
        }
        
        dispatch(loginUser(body))
            .then(response => {
                if(response.payload.loginSuccess){
                    props.history.push('/')  //로그인 성공시 root페이지로 이동
                    console.log(response)
                } else{
                    alert('Error')
                }
            })

    }


    return (
        <div style={{
            display:'flex', justifyContent:"center", alignItems:'center',
            width:'100%', height:'100vh'
        }}>
            
            <form style={{display : 'flex', flexDirection: "column"}}
            onSubmit={onSubmitHandler}>
                <label>Email</label>
                <input type="email" value={Email} onChange={onEmailHandler}/>

                <label>Password</label>
                <input type="password" value={Password} onChange={onPasswordHandler}/>
                <br/>

                <button type="submit">
                    Login
                </button>

            </form>
        </div>
    )
}

export default withRouter(Loginpage)
