import { Box, Button, Center, CheckIcon, FormControl, HStack, Input, ScrollView, Select, VStack, useToast } from 'native-base';
import React, { useState } from 'react';
import DatePicker from 'react-native-date-picker';
import Employee from '../types/employee.type';

const EmployeeCreateScreen = ({ navigation }: any) => {
    const [employee, setEmployee] = useState({} as Employee)
    const [datePickerVisible, setDatePickerVisible] = useState(false)

    const toast = useToast();
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
    function isValid() {
        if (!employee.f_name) {
            showError("First name is required")
            return false
        }
        if (!employee.l_name) {
            showError("Last name is required")
            return false
        }
        if (!employee.phone) {
            showError("Phone is required")
            return false
        }
        if (!employee.gender) {
            showError("Gender is required")
            return false
        }
        if (!employee.experience_in_years) {
            showError("Experience is required")
            return false
        }
        if (!employee.skill_name) {
            showError("Skill is required")
            return false
        }
        if (!employee.skill_level) {
            showError("Skill Level is required")
            return false
        }
        if (!employee.dob) {
            showError("Date of Birth is required")
            return false
        }
        if ((Date.parse(employee.dob) + (18 * 365 * 24 * 3600 * 1000)) > new Date().getTime()) {
            showError("Employee Must be at least 18 years old")
        }
        return true
    }
    function onCreate() {
        if (!isValid()) {
            return null
        }
        console.log('Creating employee', JSON.stringify(employee,null,2));
    }

    return (
        <ScrollView>

            <VStack justifyContent='center' height='100%'>
                <Center w="100%">
                    <Box safeArea p="2" py="8" w="90%" maxW="290">
                        <VStack space={3} mt="5">
                            <FormControl>
                                <FormControl.Label>First Name</FormControl.Label>
                                <Input value={employee.f_name} onChangeText={(f_name) => {
                                    setEmployee({ ...employee, f_name })
                                }} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Last Name</FormControl.Label>
                                <Input value={employee.l_name} onChangeText={(l_name) => {
                                    setEmployee({ ...employee, l_name })
                                }} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Date Of Birth</FormControl.Label>
                                <Input value={employee.dob} onFocus={() => {
                                    setDatePickerVisible(true)
                                }} />
                                {/* <Button onPress={() => {
                                    console.log("Opening")
                                    setDatePickerVisible(true)
                                }} >{employee.dob} </Button> */}
                                <DatePicker
                                    modal
                                    date={employee.dob ? new Date(Date.parse(employee.dob)) : new Date()}
                                    open={datePickerVisible}
                                    mode='date'
                                    onConfirm={(date) => {
                                        const dob = date.toISOString().split("T")[0]
                                        setEmployee({ ...employee, dob })
                                        setDatePickerVisible(false)
                                    }}
                                    onCancel={() => {
                                        setDatePickerVisible(false)
                                    }} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Phone</FormControl.Label>
                                <Input keyboardType='number-pad' value={employee.phone} onChangeText={(phone) => {
                                    setEmployee({ ...employee, phone })
                                }} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Gender</FormControl.Label>
                                <Select selectedValue={employee.gender} minWidth="200" accessibilityLabel="Choose Gender"
                                    placeholder="Choose Gender" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={gender => setEmployee({ ...employee, gender })}>
                                    <Select.Item label="Male" value="Male" />
                                    <Select.Item label="Female" value="Female" />
                                    <Select.Item label="Other" value="Other" />
                                </Select>
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Skill Name</FormControl.Label>
                                <Input value={employee.skill_name} onChangeText={(skill_name) => {
                                    setEmployee({ ...employee, skill_name })
                                }} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Experience in Years</FormControl.Label>
                                <Input
                                    keyboardType='number-pad'
                                    value={employee.experience_in_years ? employee.experience_in_years.toString() : ""}
                                    onChangeText={(experience_in_years) => {
                                        setEmployee({ ...employee, experience_in_years: parseInt(experience_in_years) })
                                    }} />
                            </FormControl>
                            <FormControl>
                                <FormControl.Label>Skill Level</FormControl.Label>
                                <Select selectedValue={employee.skill_level} minWidth="200" accessibilityLabel="Choose Gender"
                                    placeholder="Choose Gender" _selectedItem={{
                                        bg: "teal.600",
                                        endIcon: <CheckIcon size="5" />
                                    }} mt={1} onValueChange={(skill_level) => {
                                        setEmployee({ ...employee, skill_level: skill_level as ("Beginner" | "Intermediate" | "Advanced") })
                                    }}>
                                    <Select.Item label="Beginner" value="Beginner" />
                                    <Select.Item label="Intermediate" value="Intermediate" />
                                    <Select.Item label="Advanced" value="Advanced" />
                                </Select>
                            </FormControl>
                            <Button mt="2" colorScheme="indigo" onPress={onCreate}>
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