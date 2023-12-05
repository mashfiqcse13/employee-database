import { StackActions } from '@react-navigation/native';
import { Box, Button, Center, FormControl, HStack, Heading, Input, VStack } from 'native-base';
import React from 'react';

const LoginScreen = ({ navigation }: any) => {

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
                            <Input />
                        </FormControl>
                        <FormControl>
                            <FormControl.Label>Password</FormControl.Label>
                            <Input type="password" />
                        </FormControl>
                        <Button mt="2" colorScheme="indigo" onPress={() => navigation.dispatch(
                            StackActions.replace('Employees')
                        )}>
                            Sign in
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