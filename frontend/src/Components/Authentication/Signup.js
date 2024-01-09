import { Button, FormControl, FormLabel, Input, InputGroup, InputRightElement, VStack, useToast, } from '@chakra-ui/react'
import React, { useState } from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const Signup = () => {
    const [show, setShow] = useState(false);
    const [name, setName] = useState()
    const [email, setEmail] = useState()
    const [password, setPassword] = useState()
    const [confirmPassword, setConfirmPassword] = useState()
    const [phoneNumber, setPhoneNumber] = useState(0)
    const [pic, setPic] = useState()
    const [loading, setLoading] = useState(false);
    const toast = useToast()
    const history = useHistory()

    const handleClick = () => {
        setShow(!show);
    }

    const postDetails = (pics) => {
        setLoading(true);
        if(pics===undefined){
            toast({
                title: 'Please select an Image.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom',
              })
            return
        }

        if(pics.type==='image/jpeg' || pics.type==='image/png'){
            const data = new FormData()
            data.append('file',pics);
            data.append('upload_preset','chat-app');
            data.append('cloud_name','ddevil');
            fetch('https://api.cloudinary.com/v1_1/ddevil/image/upload',{
                method:'post',
                body:data,
            }).then((res)=> res.json())
              .then((data)=>{
                setPic(data.url.toString());
                console.log(data.url.toString());
                setLoading(false);
              })
              .catch((err)=>{
                console.log(err);
                setLoading(false)
              })
        }
        else{
            toast({
                title: 'Please select an Image.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position:'bottom',
              })
            setLoading(false)
            return
        }
    }

    const submitHandler = async () => {
        setLoading(true);
        if (!name || !email || !password || !confirmPassword) {
            toast({
                title: 'Please fill all the required (*) field.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            setLoading(false)
            return
        }

        if (password !== confirmPassword) {
            toast({
                title: 'Please fill all the required (*) field.',
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            return
        }

        try {
            const config = {
                headers: {
                    "Content-type": "application/json",
                }
            }
            const { data } = await axios.post('/api/user', { name, email, password, pic }, config)
            toast({
                title: 'Registration Successful.',
                status: 'success',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })

              localStorage.setItem("userInfo",JSON.stringify(data));
              setLoading(false);
              history.push('/chats')

        } catch (error) {
            toast({
                title: 'Error Occured.',
                description: error.reponse.data.message,
                status: 'warning',
                duration: 5000,
                isClosable: true,
                position: 'bottom',
            })
            setLoading(false);
        }
    }
    return (
        <VStack spacing='5px'>
            <FormControl id='first-name' isRequired>
                <FormLabel>Name</FormLabel>
                <Input placeholder='Enter Your Name' onChange={(e) => setName(e.target.value)} />
            </FormControl>
            <FormControl id='email' isRequired>
                <FormLabel>Email</FormLabel>
                <Input placeholder='Enter Your Email' onChange={(e) => setEmail(e.target.value)} type='email' />
            </FormControl>

            <FormControl id='password' isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                    <Input placeholder='Enter Your Password' onChange={(e) => setPassword(e.target.value)} type={show ? 'text' : 'password'} />
                    <InputRightElement width={'4.5rem'}>
                        <Button fontSize={25} backgroundColor={'inherit'} onClick={handleClick} >
                            {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='confirm-password' isRequired>
                <FormLabel>Confirm Password</FormLabel>
                <InputGroup>
                    <Input placeholder='Enter Your Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} type={show ? 'text' : 'password'} />
                    <InputRightElement width={'4.5rem'}>
                        <Button fontSize={25} backgroundColor={'inherit'} onClick={handleClick} >
                            {show ? <AiOutlineEyeInvisible /> : <AiOutlineEye />}
                        </Button>
                    </InputRightElement>
                </InputGroup>
            </FormControl>

            <FormControl id='phone-number' >
                <FormLabel>Phone Number</FormLabel>
                <Input placeholder='Enter Your Phone Number' onChange={(e) => setPhoneNumber(e.target.value)} maxLength={10} />
            </FormControl>

            <FormControl id='pic'>
                <FormLabel>Upload Your Image Here</FormLabel>
                <Input type='file' p={1.5} accept='image/*' onChange={(e) => postDetails(e.target.files[0])} />
            </FormControl>

            <Button colorScheme='cyan' width={'100%'} style={{ marginTop: 15 }} onClick={submitHandler} isLoading={loading} textColor={'aliceblue'}>
                Sign Up
            </Button>
            <GoogleOAuthProvider clientId="184165315910-c71gf2m9hr99og2o5bjriblt1tq490op.apps.googleusercontent.com">
                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />;

                </GoogleOAuthProvider>
        </VStack>
    )
}

export default Signup
