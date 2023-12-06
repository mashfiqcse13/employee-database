import * as React from 'react';
import { Dimensions, StatusBar, Animated, Pressable } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, Center, useColorModeValue, Fab, HStack, VStack, Text, Spacer, FormControl, Input, Button, useToast, Spinner } from 'native-base';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import Employee from '../types/employee.type';
import { useDispatch, useSelector } from 'react-redux';
import EmployeeTabBasic from '../components/EmployeeTabBasic';
import EmployeeTabSkill from '../components/EmployeeTabSkill';
import EmployeeTabPreview from '../components/EmployeeTabPreview';
import { setEmployee, setLoading } from '../reducers/employeeReducer';
import * as ES from '../services/employee.service';

const initialLayout = {
    width: Dimensions.get('window').width
};
const renderScene = SceneMap({
    basic: EmployeeTabBasic,
    skill: EmployeeTabSkill,
    preview: EmployeeTabPreview
});

function EmployeeSingleScreen({ route, navigation }: any) {
    const [index, setIndex] = React.useState(0);
    const employee = useSelector((state: any) => state.employee.data as Employee)
    const loading = useSelector((state: any) => state.employee.loading as boolean)
    const token = useSelector((state: any) => state.user.token as string)
    const dispatch = useDispatch()
    const toast = useToast();
    function dispatcherEmployee(data: Employee) {
        dispatch(setEmployee({ ...employee, ...data }))
    }
    function dispatcherLoading(data: boolean) {
        dispatch(setLoading(data))
    }

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
    const [routes] = React.useState([{
        key: 'basic',
        title: 'Basic'
    }, {
        key: 'skill',
        title: 'Skill'
    }, {
        key: 'preview',
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
    function onSubmit() {
        if (!isValid()) {
            return null
        }
        if (!token) {
            console.log("Token Missing In onCreate")
            return null
        }
        dispatcherLoading(true)
        const apiFunction = employee.id ? ES.update : ES.create
        apiFunction(employee, token).then((response) => {
            console.log(JSON.stringify(response,null,2))
            if (response.id){
                if (employee.id) {
                    showSuccess("Employee Updated. Swipe Down To Refresh This Page.")
                }else{
                    showSuccess("New Employee Created. Swipe Down To Refresh This Page.")
                }
            }
            navigation.goBack()
        }).catch((error) => {
            showError(error.message)
        }).finally(() => dispatcherLoading(false))
    }

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
        <VStack pr={3} pl={3} pb={3}>
            <Button disabled={loading} mt="2" colorScheme="indigo" onPress={onSubmit}>
                {loading ? <Spinner color="white" accessibilityLabel="Creating Employee" /> : (employee.id ? "Update Employee" : "Create Employee")}
            </Button>
            {!employee.id && <HStack justifyContent='center'>
                <Button w="50%" disabled={loading} mt="2" colorScheme="info" onPress={() => dispatcherEmployee({
                    f_name: "Mashfiqur",
                    l_name: "Rahman",
                    dob: "2004-12-06",
                    phone: "01648758754",
                    gender: "Male",
                    skill_name: "Sales Executive",
                    experience_in_years: 10,
                    skill_level: "Beginner"
                } as Employee)}>
                    Load Data
                </Button>
                <Button w="50%" disabled={loading} mt="2" colorScheme="warning" onPress={() => dispatcherEmployee({} as Employee)}>
                    Reset
                </Button>
            </HStack>}
        </VStack>
    </>;
}

export default EmployeeSingleScreen;