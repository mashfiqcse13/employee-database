import * as React from 'react';
import { Box, HStack, Text } from 'native-base';
import Employee from '../types/employee.type';
import { useSelector } from 'react-redux';

export default () => {
    const employee = useSelector((state: any) => state.employee.data as Employee)

    return <Box pl={5} pr={5} mt={5}>
        <HStack space={[2, 3]} pt={3} pb={3} justifyContent="space-between">
            <Text _dark={{
                color: "warmGray.50"
            }} color="coolGray.800" bold>
                Full Name
            </Text>
            <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
            }}>
                {employee.f_name} {employee.l_name}
            </Text>
        </HStack>
        <HStack space={[2, 3]} pt={3} pb={3} justifyContent="space-between">
            <Text _dark={{
                color: "warmGray.50"
            }} color="coolGray.800" bold>
                Phone
            </Text>
            <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
            }}>
                {employee.phone}
            </Text>
        </HStack>
        <HStack space={[2, 3]} pt={3} pb={3} justifyContent="space-between">
            <Text _dark={{
                color: "warmGray.50"
            }} color="coolGray.800" bold>
                Date Of Birth
            </Text>
            <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
            }}>
                {employee.dob}
            </Text>
        </HStack>
        <HStack space={[2, 3]} pt={3} pb={3} justifyContent="space-between">
            <Text _dark={{
                color: "warmGray.50"
            }} color="coolGray.800" bold>
                Gender
            </Text>
            <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
            }}>
                {employee.gender}
            </Text>
        </HStack>
        <HStack space={[2, 3]} pt={3} pb={3} justifyContent="space-between">
            <Text _dark={{
                color: "warmGray.50"
            }} color="coolGray.800" bold>
                Skill Name
            </Text>
            <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
            }}>
                {employee.skill_name}
            </Text>
        </HStack>
        <HStack space={[2, 3]} pt={3} pb={3} justifyContent="space-between">
            <Text _dark={{
                color: "warmGray.50"
            }} color="coolGray.800" bold>
                Skill Level
            </Text>
            <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
            }}>
                {employee.skill_level}
            </Text>
        </HStack>
        <HStack space={[2, 3]} pt={3} pb={3} justifyContent="space-between">
            <Text _dark={{
                color: "warmGray.50"
            }} color="coolGray.800" bold>
                Experience
            </Text>
            <Text color="coolGray.600" _dark={{
                color: "warmGray.200"
            }}>
                {employee.experience_in_years} Years
            </Text>
        </HStack>
    </Box>
};