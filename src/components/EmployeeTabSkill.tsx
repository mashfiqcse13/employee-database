import * as React from 'react';
import { Box, HStack, VStack, FormControl, Input, Select, CheckIcon } from 'native-base';
import Employee from '../types/employee.type';
import { useDispatch, useSelector } from 'react-redux';
import { setEmployee } from '../reducers/employeeReducer';

export default () => {
    const employee = useSelector((state: any) => state.employee.data as Employee)
    const loading = useSelector((state: any) => state.employee.loading as boolean)
    const dispatch = useDispatch()
    function dispatcherEmployee(data: Employee) {
        dispatch(setEmployee({ ...employee, ...data }))
    }

    return <Box pl={5} pr={5} mt={5}>

        <VStack space={3} mt="5">
            <FormControl>
                <FormControl.Label>Skill Name</FormControl.Label>
                <Input
                    isDisabled={loading}
                    value={employee.skill_name} onChangeText={(skill_name) => {
                        dispatcherEmployee({ ...employee, skill_name })
                    }} />
            </FormControl>
            <FormControl>
                <FormControl.Label>Experience in Years</FormControl.Label>
                <Input
                    isDisabled={loading}
                    keyboardType='number-pad'
                    value={employee.experience_in_years ? employee.experience_in_years.toString() : ""}
                    onChangeText={(experience_in_years) => {
                        dispatcherEmployee({ ...employee, experience_in_years: parseInt(experience_in_years) })
                    }} />
            </FormControl>
            <FormControl>
                <FormControl.Label>Skill Level</FormControl.Label>
                <Select isDisabled={loading} selectedValue={employee.skill_level} minWidth="200" accessibilityLabel="Choose Gender"
                    placeholder="Choose Gender" _selectedItem={{
                        bg: "teal.600",
                        endIcon: <CheckIcon size="5" />
                    }} mt={1} onValueChange={(skill_level) => {
                        dispatcherEmployee({ ...employee, skill_level: skill_level as ("Beginner" | "Intermediate" | "Advanced") })
                    }}>
                    <Select.Item label="Beginner" value="Beginner" />
                    <Select.Item label="Intermediate" value="Intermediate" />
                    <Select.Item label="Advanced" value="Advanced" />
                </Select>
            </FormControl>
        </VStack>
    </Box>
};