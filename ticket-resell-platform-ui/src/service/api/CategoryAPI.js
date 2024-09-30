import axios from "axios"
import { BASE_GETWAY_API } from "../../config/Constant"

// const CATEGORY_BASE_REST_API = "http://localhost:8082/TicketResellPlatform"
// const GET_USING_CATEGORIES_API = CATEGORY_BASE_REST_API + "/api/categories/get-using-cate"

const GET_USING_CATEGORIES_API = BASE_GETWAY_API + "/api/categories/get-using-cate"


const CategoryAPI = {

    getUsingCategories() {
        return axios.get(GET_USING_CATEGORIES_API)
    }

}

export default CategoryAPI