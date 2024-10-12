import { Box } from "@mui/material";
import LoadEffect from "./LoadEffect";


// eslint-disable-next-line react/prop-types
export default function BoughtTicketBox({ user }) {

    

    if (!user) {
        return (
            <LoadEffect />
        )
    }

    return (
        <Box>

        </Box>
    )
}
