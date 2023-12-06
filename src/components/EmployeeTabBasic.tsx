import * as React from 'react';
import { Box, HStack, VStack, FormControl, Input, Select, CheckIcon } from 'native-base';
import Employee from '../types/employee.type';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployee } from '../reducers/employeeReducer';
import { useState } from 'react';
import DatePicker from 'react-native-date-picker';

export default () => {
    const [datePickerVisible, setDatePickerVisible] = useState(false)
    const employee = useSelector((state: any) => state.employee.data as Employee)
    const loading = useSelector((state: any) => state.employee.loading as boolean)
    const dispatch = useDispatch()
    function dispatcherEmployee(data:Employee){
        dispatch(setEmployee({...employee, ...data}))
    }

    return <Box pl={5} pr={5} mt={5}>

        <VStack space={3} mt="5">
            <HStack width="50%">
                <FormControl>
                    <FormControl.Label>First Name</FormControl.Label>
                    <Input
                        isDisabled={loading}
                        value={employee.f_name} onChangeText={(f_name) => {
                            dispatcherEmployee({ ...employee, f_name })
                        }} />
                </FormControl>
                <FormControl>
                    <FormControl.Label>Last Name</FormControl.Label>
                    <Input
                        isDisabled={loading}
                        value={employee.l_name} onChangeText={(l_name) => {
                            dispatcherEmployee({ ...employee, l_name })
                        }} />
                </FormControl>
            </HStack>
            <FormControl>
                <FormControl.Label>Date Of Birth</FormControl.Label>
                <Input value={employee.dob} onFocus={() => {
                    if (!loading) {
                        setDatePickerVisible(true)
                    }
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
                        dispatcherEmployee({ ...employee, dob })
                        setDatePickerVisible(false)
                    }}
                    onCancel={() => {
                        setDatePickerVisible(false)
                    }} />
            </FormControl>
            <FormControl>
                <FormControl.Label>Phone</FormControl.Label>
                <Input
                    isDisabled={loading}
                    keyboardType='number-pad' value={employee.phone} onChangeText={(phone) => {
                        dispatcherEmployee({ ...employee, phone })
                    }} />
            </FormControl>
            <FormControl>
                <FormControl.Label>Gender</FormControl.Label>
                <Select selectedValue={employee.gender} minWidth="200" accessibilityLabel="Choose Gender"
                    placeholder="Choose Gender" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={gender => dispatcherEmployee({ ...employee, gender })}>
                    <Select.Item label="Male" value="Male" />
                    <Select.Item label="Female" value="Female" />
                    <Select.Item label="Other" value="Other" />
                </Select>
            </FormControl>
        </VStack>
    </Box>
};