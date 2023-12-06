import { Box, Button, Center, FormControl, HStack, Input, ScrollView, VStack } from 'native-base';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';

const EmployeeCreateScreen = ({ navigation }: any) => {
    const [date, setDate] = useState(new Date())

    return (
        <ScrollView>

            <VStack justifyContent='center' height='100%'>
                <Center w="100%">
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label>First Name</FormControl.Label>
                                <Input />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Last Name</FormControl.Label>
                                <Input />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Date Of Birth</FormControl.Label>
                                <DatePicker date={date} onDateChange={setDate} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Phone</FormControl.Label>
                                <Input />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Gender</FormControl.Label>
                                <Input />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Skill Name</FormControl.Label>
                                <Input />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Experience in Years</FormControl.Label>
                                <Input />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Skill Level</FormControl.Label>
                                <Input />
                            </FormControl>
                            <Button mt="2" colorScheme="indigo" onPress={() => navigation.back()}>
                                Create
                            </Button>
                            <HStack mt="6" justifyContent="center">
                            </HStack>
                        </VStack>
                    </Box>
                </Center>
            </VStack>
        </ScrollView>
    );
};

export default EmployeeCreateScreen;