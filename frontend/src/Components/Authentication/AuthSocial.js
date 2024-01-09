import { AbsoluteCenter, Flex, Heading, Divider, IconButton } from '@chakra-ui/react'
import React from 'react'
import { AiFillGoogleCircle } from "react-icons/ai";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import { Stack } from '@chakra-ui/react';

const handleGoogleLogin = async () => {

};


function AuthSocial() {
    return (
        <div>
            <GoogleOAuthProvider clientId="179719252305-q4tsn72uol8eooqo6eucvkdqgq8lsjq0.apps.googleusercontent.com">
                <Flex alignItems="center" gap={2}>
                    <Divider border="4px" borderRadius="2xl" />
                    <Heading as="h6" size="xs" sx={{ whiteSpace: "nowrap", backgroundColor: "inherit" }}>
                        OR
                    </Heading>
                    <Divider border="4px" borderRadius="2xl" />
                </Flex>
                <Stack direction="row" justifyContent="center" spacing={2}>

                    <GoogleLogin
                        onSuccess={credentialResponse => {
                            console.log(credentialResponse);
                        }}
                        onError={() => {
                            console.log('Login Failed');
                        }}
                    />;

                </Stack>
            </GoogleOAuthProvider>
        </div>
    )
}

export default AuthSocial
