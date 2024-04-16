import AsyncStorage from "@react-native-async-storage/async-storage"

export const storageData = async (key, value) =>{
    try {
        await AsyncStorage.setItem(key,value)
    } catch (error) {
        console.log("storage Data Error: ", error)
    }
}

export const getData = async (key)=>{
    try {
        const value = await AsyncStorage.getItem(key)
        return value
    } catch (error) {
        console.log("storage get Data Error: ", error)
    }
}