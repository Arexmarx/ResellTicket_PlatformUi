/* eslint-disable react/prop-types */
import { useEffect, useState } from "react"
import useAxios from "../utils/useAxios"
import HttpStatus from "../config/HttpStatus";
import API from "../config/API";
import LoadEffect from "./LoadEffect";

export default function BoughtTicketBox({ user }) {

    const api = useAxios();
    const [boughtTickets, setBoughtTickets] = useState([])
    
    useEffect(() => {
        if (user) {
            const fetchData = async () => {
                const reponse = await api.get(API.Ticket.GET_ALL_BOUGHT_TICKET_BY_BUYER + user?.id)
                if (reponse.data.httpStatus === HttpStatus.OK) {
                    console.log(reponse.data.object)
                    setBoughtTickets(reponse.data.object)
                }
            }
            fetchData().catch(console.error)
        }
    }, [])
    

    if (!user || !boughtTickets) {
        return (
            <LoadEffect />
        )
    }

    return (
        <div>

        </div>
    )
}
