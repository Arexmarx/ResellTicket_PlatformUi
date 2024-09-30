import PropTypes from 'prop-types';
import { Avatar, Box, Rating } from "@mui/material";
import { stringAvatar } from "../service/StringService";

const titleCss = {
  fontSize: "70%",
  marginBottom: "5px",
};
/**
 * Author: Phan Nguyễn Mạnh Cường
 */
export default function RatingInfoRowBox({ user, ticket }) {
  return (
    <Box>
      <div className="row mt-3 shadow-sm p-3 mb-5 bg-body rounded">
        <div className="row d-flex align-content-center ">
          <div className="col-md-1 d-flex justify-content-center align-items-center">
            <Avatar {...stringAvatar(ticket.seller.name)} />
          </div>
          <div className="col-md-2">
            <div style={titleCss} className="row">
              Người bán
            </div>
            <div className="row">{ticket.seller.name}</div>
          </div>
          <div className="col-md-2">
            <div style={titleCss} className="row">
              Tên vé
            </div>
            <div className="row">{ticket.ticketName}</div>
          </div>
          {/* <div className="col-md-1 d-flex justify-content-center align-items-center">
            <Avatar {...stringAvatar(user.firstname+" "+user.lastname)} />
          </div> */}
          {/* <div className="col-md-2">
            <div style={titleCss} className="row">
              Người mua
            </div>
            <div className="row">{user.name}</div>
          </div> */}
          <div className="col-md-2">
            <div style={titleCss} className="row">
              Đánh giá
            </div>
            <div className="row">
              <Rating name="read-only" value={Number(user.rating)} readOnly />
            </div>
          </div>
          <div className="col-md-2">
            <div style={titleCss} className="row">
              Đánh giá chi tiết
            </div>
            <div className="row">
              {user.detailRating}
            </div>
          </div>
        </div>
      </div>
    </Box>
  );
}

RatingInfoRowBox.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string.isRequired,
    rating: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    detailRating: PropTypes.string.isRequired,
  }).isRequired,
  ticket: PropTypes.shape({
    seller: PropTypes.shape({
      name: PropTypes.string.isRequired,
    }).isRequired,
    ticketName: PropTypes.string.isRequired,
  }).isRequired,
};
