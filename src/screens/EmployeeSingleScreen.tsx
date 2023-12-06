import * as React from 'react';
import { Dimensions, StatusBar, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, Center, useColorModeValue, Fab, HStack, VStack, Text, Spacer } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Employee from '../types/employee.type';
import { useSelector } from 'react-redux';

const FirstRoute = () => {
    const employee = useSelector((state: { employee: Employee }) => state.employee)

    return <Box pl={5} pr={5} mt={5}>
        <HStack space={[2, 3]} justifyContent="space-between">
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
    </Box>
};

const SecondRoute = () => <Center flex={1} my="4">
    This is Tab 2
</Center>;

const ThirdRoute = () => {
    const employee = useSelector((state: { employee: Employee }) => state.employee)

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


const initialLayout = {
    width: Dimensions.get('window').width
};
const renderScene = SceneMap({
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
});

function EmployeeSingleScreen({ route, navigation }: any) {
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([{
        key: 'first',
        title: 'Basic'
    }, {
        key: 'second',
        title: 'Skill'
    }, {
        key: 'third',
        title: 'Preview'
    }]);
    const renderTabBar = (props) => {
        const inputRange = props.navigationState.routes.map((x, i) => i);
        return <Box flexDirection="row">
            {props.navigationState.routes.map((route, i) => {
                const opacity = props.position.interpolate({
                    inputRange,
                    outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
                });
                const color = index === i ? useColorModeValue('#000', '#e5e5e5') : useColorModeValue('#1f2937', '#a1a1aa');
                const borderColor = index === i ? 'cyan.500' : useColorModeValue('coolGray.200', 'gray.400');
                return <Box key={i}
                    borderBottomWidth="3"
                    borderColor={borderColor}
                    flex={1} alignItems="center"
                    p="3" cursor="pointer">
                    <Pressable onPress={() => {
                        console.log(i);
                        setIndex(i);
                    }}>
                        <Animated.Text style={{
                            color
                        }}>{route.title}</Animated.Text>
                    </Pressable>
                </Box>;
            })}
        </Box>;
    };

    return <>
        <TabView navigationState={{
            index,
            routes
        }}
            renderScene={renderScene}
            renderTabBar={renderTabBar}
            onIndexChange={setIndex}
            initialLayout={initialLayout} style={{
                marginTop: StatusBar.currentHeight
            }} />

        <Fab renderInPortal={false} shadow={2} onPress={() => navigation.navigate("EmployeeCreate")} colorScheme="indigo" icon={<FontAwesomeIcon color='white' icon={faEdit} />} />
    </>;
}

export default EmployeeSingleScreen;