import  { useEffect, useState } from 'react'
import useAxios from '../utils/useAxios';
import { Avatar, Box, Rating } from '@mui/material';
import API from '../config/API';
import HttpStatus from '../config/HttpStatus';

const titleCss = {
    fontSize: "70%",
    marginBottom: "5px",
};

export default function ViewRatedTicketBoxOfSeller({user}) {
    const api = useAxios();
    const [ratings, setRatings] = useState(null);

    useEffect(() => {
        //console.log(user);
        
        if (user) {
            const fetchData = async () => {
                const response = await api.get(
                    API.Rating.GET_ALL_RATING_BY_SELLER + user.id
                );
                if (response.data.httpStatus === HttpStatus.OK) {
                    //console.log(response.data.object);
                    setRatings(response.data.object);
                }
            };
            fetchData().catch(console.error);
        }
    }, [user]);

    return (
        ratings != null &&
        ratings.ratingList.map((item, index) => (
            <Box key={index}>
                <div className="row mt-3 shadow-sm p-3 mb-5 bg-body rounded">
                    <div className="row d-flex align-content-center ">
                        <div className="col-md-1 d-flex justify-content-center align-items-center">
                            <Avatar src={item.buyer.avatar ? "data:image/png;base64, " + item.buyer.avatar : "broken-image.jpg"} />
                        </div>
                        <div className="col-md-2">
                            <div style={titleCss} className="row">
                                Người mua
                            </div>
                            <div className="row">{item.buyer.firstname + " " + item.buyer.lastname}</div>
                        </div>
                        <div className="col-md-2">
                            <div style={titleCss} className="row">
                                Tên vé
                            </div>
                            <div className="row">{item.genericTicket.ticketName}</div>
                        </div>
                        {/* <div className="col-md-1">
                            <div style={titleCss} className="row">
                                Giá bán
                            </div>
                            <div className="row">{formatToVND(item.price)}</div>
                        </div> */}
                        {/* <div className="col-md-1">
                            <div style={titleCss} className="row">
                                Số lượng
                            </div>
                            <div className="row">x{item.tickets.length}</div>
                        </div> */}
                        <div className="col-md-2">
                            <div style={{ ...titleCss, marginLeft: 5 }} className="row">
                                Số sao đánh giá
                            </div>
                            <div className="row">
                                <Rating name="simple-controlled" value={item.stars} readOnly={true} />
                            </div>
                        </div>
                        <div className="col-md-5">
                            <div style={titleCss} className="row">
                                Nội dung
                            </div>
                            <div className="row" style={{ wordWrap: "break-word", whiteSpace: "normal", overflowWrap: "break-word" }}>
                                {item.comment}
                            </div>
                        </div>
                    </div>
                </div>



            </Box>
        ))

    )
}
