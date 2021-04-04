import React,{useEffect, useState} from 'react';
import {Link} from 'react-router-dom';
import Box from '@material-ui/core/Box';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../../_actions/userActions';
import {GoogleLogin} from 'react-google-login'
import {Row, Col, Typography, Form, Input,Button} from 'antd'

function Copyright() {
  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        xpresscloud.com
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

const {Title,Text} = Typography

export default function SignUp(props) {
  const[name,setName] = useState('')
  const[email,setEmail] = useState('')
  const[avatar,setAvatar] = useState('')
  const[password,setPassword] = useState('')
  const userRegister = useSelector(state=>state.userRegister)
  const{loading,userInfo,error} = userRegister;
  const dispatch = useDispatch()

  useEffect(() => {
    if(userInfo)
    return () => {
      props.history.push('/')
    }
  }, [userInfo])

  const submitHandler = (e) =>{
    e.preventDefault();
    dispatch(register(name,email,password, avatar))

    setTimeout(()=>{
      props.history.push('/')

    },1000)
  }

  const responseGoogle = (response) =>{
    console.log(response)
    setName(response.profileObj.name)
    setEmail(response.profileObj.email)
    setAvatar(response.profileObj.imageUrl)
  
    setPassword("JoramWells18.")
    // props.history.push('/')


  }

  return (
    <Row justify="space-around"
    align="middle"
    style={{marginTop:"40px"}}
    >
      <Col span={10}>

        <Title level={3} style={{textAlign:"center"}}>
          Sign up
        </Title>
        <Form 
        layout="vertical"
        name="basic"
        onSubmit={submitHandler}>
              <Form.Item
                required
                id="firstName"
                label="First Name"
                value={name}
                rules={[{ message:"Enter name", value:{name}}]}
                onChange={(e) => setName(e.target.value)}
              >
                <Input />
                </Form.Item>
              <Form.Item
                name="avatar"
                label="image"
                value={avatar}
                rules={[{ message:"Enter image"}]}
                onChange={(e) => setAvatar(e.target.value)}
              >
                <Input />
                </Form.Item>
              <Form.Item
                id="email"
                label="Email Address"
                name="email"
                value={email}
                rules={[{message:"Enter email"}]}
                onChange={(e)=>setEmail(e.target.value)}
              >
                <Input />
                </Form.Item>

              <Form.Item
                name="password"
                label="Password"
                id="password"
                rules={[{ message:"Enter password"}]}
                onChange={(e)=>setPassword(e.target.value)}
              >
                <Input.Password />
                </Form.Item>
                <Form.Item>

                <Button
            htmlType="submit"
            type="primary"
            onClick={submitHandler}
          >
            Sign Up
          </Button>

                </Form.Item>

          <Row>
            <Col span={12}>
              <Link to="/login" variant="body2" style={{color:"#3b3c36"}}>
                Already have an account? Sign in
              </Link>
            </Col>
            <Col span={12}>
            <GoogleLogin
              clientId="266388441735-5a4sfpj0lpk8nvjkf52ppoqqul0139st.apps.googleusercontent.com"
              buttonText="Login"
              onSuccess={responseGoogle}
              onFailure={responseGoogle}
              isSignedIn={false}


               />
            </Col>
          </Row>
        </Form>
      <Box mt={5}>
        <Copyright />
      </Box>
      </Col>
      
    </Row>
  );
}
