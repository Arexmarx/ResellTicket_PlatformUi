import { Avatar, Box } from "@mui/material";

const titleCss = {
    fontSize: "70%",
    marginBottom: "5px",
  };

export default function OrderTicketInfo({ user }) {



    return (
        <Box>
            <div className="row mt-3 shadow-sm p-3 mb-5 bg-body rounded">
                <div className="row d-flex align-content-center ">
                    <div className="col-md-1 d-flex justify-content-center align-items-center">
                        <Avatar  />
                        {/* src={item.genericTicket.seller.avatar ? "data:image/png;base64, " + item.genericTicket.seller.avatar : "broken-image.jpg"} */}
                    </div>
                    <div className="col-md-2">
                        <div style={titleCss} className="row">
                            Người bán
                        </div>
                        <div className="row">Name</div>
                    </div>
                </div>
            </div>
        </Box>
    )
}
