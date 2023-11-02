import axios from "axios";
import { config } from "../../config/thirdParty";
import toast from "react-hot-toast";

const instance = axios.create(config)

export const fetchNutrition = async (name) => {
    try {
    const url = `/parser?ingr=${name}`

    const response = await instance.get(url)
        return response.data.hints.at(0).food.nutrients
    } catch (error) {
        toast.error('Could not connect to server')
    }
    

}