import { StackActions } from '@react-navigation/native';
import { Box, Button, Center, FormControl, HStack, Heading, Input, Spinner, VStack, useToast } from 'native-base';
import React, { useState } from 'react';
import AS from '../services/auth.service';
import { useDispatch } from 'react-redux';
import { setName, setToken } from '../reducers/userReducer';
import { adminAccess } from '../config';

const LoginScreen = ({ navigation }: any) => {
    const [email, setEmail] = useState(adminAccess.email)
    const [password, setPassword] = useState(adminAccess.password)
    const [loading, setLoading] = useState(false)
    const toast = useToast();
    const dispatch = useDispatch()
    function showError(errMsg: string) {
        toast.show({
            render: () => {
                return <Box bg="danger.300" px="2" py="1" rounded="sm" mb={5}>{errMsg}</Box>;
            }
        });
        return null
    }
    function showSuccess(msg: string) {
        toast.show({
            render: () => {
                return <Box bg="success.300" px="2" py="1" rounded="sm" mb={5}>{msg}</Box>;
            }
        });
        return null
    }
    function login() {
        if (!email) {
            return showError("Email Required")
        }
        if (!password) {
            return showError("Password Required")
        }
        setLoading(true)
        AS.login(email, password).then((response) => {
            showSuccess(response.message)
            // console.log(JSON.stringify(response,null,2))
            dispatch(setName(response.currentUser.name))
            dispatch(setToken(response.currentUser.token))
            navigation.dispatch(
                StackActions.replace('Employees')
            )
        }).catch((error) => {
            showError(error.message)
        }).finally(() => setLoading(false))
    }
    return (
        <VStack justifyContent='center' height='100%'>
            <Center w="100%">
                <Box safeArea p="2" py="8" w="90%" maxW="290">
                    <Heading size="lg" fontWeight="600" color="coolGray.800" _dark={{
                        color: "warmGray.50"
                    }}>
                        Welcome
                    </Heading>
                    <Heading mt="1" _dark={{
                        color: "warmGray.200"
                    }} color="coolGray.600" fontWeight="medium" size="xs">
                        Sign in to see Employee Database!
                    </Heading>

                    <VStack space={3} mt="5">
                        <FormControl>
                            <FormControl.Label>Email ID</FormControl.Label>
                            <Input value={email} onChangeText={(value: string) => setEmail(value)} />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password" value={password} onChangeText={(value: string) => setPassword(value)} />
                        </FormControl>
                        <Button disabled={loading} mt="2" colorScheme="indigo" onPress={login}>
                            {loading ? <Spinner color="white" accessibilityLabel="Verifing Credntials" /> : "Sign in"}
                        </Button>
                        <HStack mt="6" justifyContent="center">
                        </HStack>
                    </VStack>
                </Box>
            </Center>
        </VStack>
    );
};

export default LoginScreen;