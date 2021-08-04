import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_action/user_action.';
import { Form, Input, Button, Checkbox, Typography } from 'antd';
import Icon from '@ant-design/icons';
import { withRouter } from 'react-router-dom';

const { Title } = Typography;

function LoginPage(props) {
    const dispatch = useDispatch();
    const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [rememberMe, setRememberMe] = useState(rememberMeChecked)
    
    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const handleRememberMe = () => {
        setRememberMe(!rememberMe)
      };
    

    const onSubmitHandler = (event) => {
        event.preventDefault();

        let body = {
            email: Email,
            password: Password
        }

        dispatch(loginUser(body))
            .then(response => {
                if (response.payload.loginSuccess) {
                    window.localStorage.setItem('userId', response.payload.userId);
                    props.history.push('/')
                    if (rememberMe === true) {
                        window.localStorage.setItem('rememberMe', body.id);
                    } else {
                        localStorage.removeItem('rememberMe');
                    } 
                    
                    props.history.push("/");
                } else {
                        alert('아이디 혹은 비밀번호를 확인하세요')
                }
            })
        }
     
            

    return (
        <div className="app">
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'
        }}>
            <form style={{ display: 'flex', flexDirection: 'column',color: 'rgba(0,0,0,.25)'  }}
                onSubmit={onSubmitHandler}
            >
                <Title level={2}>Log In</Title>
                <form style={{ width: '350px' }}></form>
                <Form.Item required>
                <Input
                  id="email"
                  prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your email"
                  type="email"
                  value={Email} 
                  onChange={onEmailHandler}
                />
                </Form.Item>

              <Form.Item required>
                <Input
                  id="password"
                  prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                  placeholder="Enter your password"
                  type="password"
                  value={Password}
                  onChange={onPasswordHandler}
                />
              </Form.Item>
            <Form.Item>
                <Checkbox id="rememberMe" onChange={handleRememberMe} checked={rememberMe} >Remember me</Checkbox>
                <a className="login-form-forgot" href="/reset_user" style={{ float: 'right' }}>
                  forgot password
                  </a>
                <div>
                  <Button type="primary" htmlType="submit" className="login-form-button" style={{ minWidth: '100%' }} >
                    Log in
                </Button>
                </div>
                Or <a href="/register">register now!</a>
              </Form.Item>
            </form>
        </div>
        </div>
    )
}

export default withRouter(LoginPage)