
import React, {useState} from 'react'
import moment from "moment";
import {useDispatch} from 'react-redux';
import {registerUser} from '../../../_action/user_action.'
import {withRouter} from 'react-router-dom'
import {Form,Input,Button} from 'antd';

const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 8 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 16 },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };
  
  

function RegisterPage( props) {

    const dispatch = useDispatch();

    const [Email, setEmail ] = useState("")
    const [Password, setPassword ] = useState("")
    const [Name, setName ] = useState("")
    const [ConfirmPassword, setConfirmPassword ] = useState("")

    

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }

    const onPasswordHandler = (event) => {
        setPassword(event.currentTarget.value)
    }

    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }

    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    
    const onSubmitHandler = (event) => {
        event.preventDefault();  // 리프레시 예방

        if(Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호 확인은 같아야 합니다.')
        }

        let body = {
            email : Email,
            password : Password,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`,
            name: Name
        }
        
        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    props.history.push("/login")  //로그인 성공시 root페이지로 이동
                } else{
                    alert('회원가입에 실패하였습니다.')
                }
            })

    }

    return (
        <div style={{
            display:'flex', justifyContent:"center", alignItems:'center',
            width:'100%', height:'100vh'
        }}>
            <div className="app">
            <h2>Sign up</h2>
            <Form style={{ minWidth: '375px' }} {...formItemLayout}  ></Form>
            
            <form style={{display : 'flex', flexDirection: "column"}}
            onSubmit={onSubmitHandler}>

                <Form.Item required label="Email">
                <Input
                  id="email"
                  placeholder="Enter your Email"
                  type="email"
                  value={Email}
                  onChange={onEmailHandler}
                />
                </Form.Item>
              
                <Form.Item required label="Name">
                <Input
                  id="name"
                  placeholder="Enter your name"
                  type="text"
                  value={Name}
                  onChange={onNameHandler}
                />
                </Form.Item>

                <Form.Item required label="Password" >
                <Input
                  id="password"
                  placeholder="Enter your password"
                  type="password"
                  value={Password}
                  onChange={onPasswordHandler}
                 />
               </Form.Item>
               
               <Form.Item required label="ConfirmPassword" >
                <Input
                  id="confirmPassword"
                  placeholder="Enter your confirmPassword"
                  type="password"
                  value={ConfirmPassword}
                  onChange={onConfirmPasswordHandler}
                  />
                </Form.Item>

                
                <Form.Item {...tailFormItemLayout}>
                <Button type="primary" onClick={onSubmitHandler}>
                  Submit
                </Button>
              </Form.Item>

            </form>
        </div>
        </div>
    )
    
}

export default withRouter(RegisterPage) 
