import { faAdd } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { Box, Fab, HStack, Pressable, Spacer, Text, VStack, useToast } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { FlatList, SafeAreaView } from 'react-native';
import { useSelector } from 'react-redux';
import User from '../types/user.type';
import Employee from '../types/employee.type';
import * as ES from '../services/employee.service';


const EmployeesScreen = ({ navigation }: any) => {
    const user = useSelector((state: { user: User }) => state.user)
    const [items, setItems] = useState<Employee[]>([])
    const currentPage = useRef(1)
    const lastPage = useRef(2)
    const [loading, setLoading] = useState(false)
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
    function loadData(page = 1) {
        if (!user || !user.token) {
            return null
        }
        if (loading) {
            return null
        }
        if (page >= lastPage.current) {
            console.log("End Of list")
            return null
        }
        console.log("Loading Employee List")
        const token = user.token

        setLoading(true)
        ES.list(token, page).then((response) => {
            if (currentPage.current === 1) {
                setItems(response.data)
            } else {
                setItems([...items, ...response.data])
            }
            setItems([...items, ...response.data])
            currentPage.current = response.current_page
            lastPage.current = response.last_page
            // console.log(JSON.stringify(response, null, 2))
        }).catch((error) => {
            showError(error.message)
        }).finally(() => setLoading(false))
    }
    useEffect(() => {
        loadData(1)
    }, [])
    return (
        <SafeAreaView style={{ height: "100%" }}>
            <FlatList
                onEndReached={() => console.log("End Reached")}
                data={items}
                renderItem={({ item }) => <Pressable onPress={() => navigation.navigate("EmployeeSingle")} _pressed={{
                    bg: "muted.100"
                }} bg='white' borderBottomWidth="1" _dark={{
                    borderColor: "muted.50"
                }} borderColor="muted.200" pl={["0", "4"]} pr={["0", "5"]} py="2">
                    <Box pl={5} pr={5}>
                        <HStack space={[2, 3]} justifyContent="space-between">
                            <VStack>
                                <Text _dark={{
                                    color: "warmGray.50"
                                }} color="coolGray.800" bold>
                                    {item.f_name} {item.l_name}
                                </Text>
                                <Text color="coolGray.600" _dark={{
                                    color: "warmGray.200"
                                }}>
                                    {item.skill_name}
                                </Text>
                            </VStack>
                            <Spacer />
                            <Text fontSize="xs" _dark={{
                                color: "warmGray.50"
                            }} color="coolGray.800" alignSelf="flex-start">
                                {item.experience_in_years} Yrs
                            </Text>
                        </HStack>
                    </Box>
                </Pressable>}
                keyExtractor={(item, index) => index.toString()}
            />
            <Fab renderInPortal={false} shadow={2} onPress={() => navigation.navigate("EmployeeCreate")} colorScheme="indigo" icon={<FontAwesomeIcon color='white' icon={faAdd} />} />
        </SafeAreaView>
    );
};

export default EmployeesScreen;