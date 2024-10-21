/* eslint-disable react/prop-types */
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import { Avatar, Badge } from '@mui/material';
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import { BOUGHT_TICKET_MANEMENT_PAGE, MAIN_COLOR, MY_SHOP_PAGE, PROFILE_PAGE, SidebarOption ,MANAGE_BUYER_PAGE, CHANGE_PASSWORD_PAGE, CHAT_PAGE,NOTIFICATION_PAGE} from '../config/Constant';
import LocalActivityIcon from '@mui/icons-material/LocalActivity';
import Divider from '@mui/material/Divider';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import QuestionAnswerOutlinedIcon from '@mui/icons-material/QuestionAnswerOutlined';
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
import ManageAccountsIcon from '@mui/icons-material/ManageAccounts';
import { useNavigate } from 'react-router-dom';
import KeyIcon from '@mui/icons-material/Key';
import PropTypes from 'prop-types';
import { formatToVND } from '../service/StringService';

/*
    Author: Nguyen Tien Thuan
*/
// eslint-disable-next-line react/prop-types
export default function SideBar({sideBarOption, user}) {

    SideBar.propTypes = {
        sideBarOption: PropTypes.oneOf(['BOUGHT_TICKET', 'PROFILE', 'MY_SHOP', 'BALANCE','CHAT', 'INFORM', 'CHANGE_PASS']).isRequired, 
    };

    const navigator = useNavigate();

    return (
        <List
            sx={{ width: '100%', maxWidth: 360 }}
            component="nav"
            aria-labelledby="nested-list-subheader"
        >
            <div className='d-flex justify-content-center mb-3'>
                <Avatar src={ !user || !user.avatar ? "/broken-image.jpg" : "data:image/png;base64, "+ user.avatar } sx={{ width: 72, height: 72 }} /> 
                {/*  src="/broken-image.jpg" */}
            </div>
            {
                // eslint-disable-next-line react/prop-types
                user ? <h5 className='text-center mb-3'>{user.firstname} {user.lastname}</h5> : ''
            }
            <p className='text-center small'>Số dư: <span className='text-danger small'>{formatToVND(user.balance)}</span></p>
            <div className='mb-3'><Divider /></div>
            <div className='mb-3'>
                <ListItemButton
                    sx={sideBarOption === SidebarOption.PROFILE ? { backgroundColor: MAIN_COLOR } : {}}
                    onClick={() => { navigator(PROFILE_PAGE) }}
                >
                    <ListItemIcon>
                        <ManageAccountsIcon />
                    </ListItemIcon>
                    <div> Quản lý tài khoản</div>
                </ListItemButton>

                <ListItemButton 
                    sx={sideBarOption === SidebarOption.BOUGHT_TICKET ? { backgroundColor: MAIN_COLOR } : {}}
                    onClick={() => { navigator(BOUGHT_TICKET_MANEMENT_PAGE) }}
                >
                    <ListItemIcon>
                        <LocalActivityIcon />
                    </ListItemIcon>
                    <div>Vé đã mua</div>
                </ListItemButton>

                <ListItemButton
                    sx={sideBarOption === SidebarOption.MY_SHOP ? { backgroundColor: MAIN_COLOR } : {}}
                    onClick={() => { navigator(MY_SHOP_PAGE) }}
                >
                    <ListItemIcon>
                        <AddBusinessIcon />
                    </ListItemIcon>
                    <div>Shop của tôi</div>
                </ListItemButton>

                <ListItemButton 
                    sx={sideBarOption === SidebarOption.BALANCE ? { backgroundColor: MAIN_COLOR } : {}}
                    onClick={() => { navigator(MANAGE_BUYER_PAGE)}}
                >
                    <ListItemIcon>
                        <LocalAtmIcon />
                    </ListItemIcon>
                    <div>Quản lý số dư</div>
                </ListItemButton>
                <ListItemButton 
                    sx={sideBarOption === SidebarOption.CHAT ? { backgroundColor: MAIN_COLOR } : {}}
                    onClick={() => { navigator(CHAT_PAGE)}}
                >
                    <ListItemIcon>
                        <QuestionAnswerOutlinedIcon />
                    </ListItemIcon>
                    <div>Nhắn tin</div>
                </ListItemButton>
            </div>

            <div className='mb-3'><Divider /></div>

            <div className='mb-3'>
                <ListItemButton 
                    sx={sideBarOption === SidebarOption.NOTIFICATION ? { backgroundColor: MAIN_COLOR } : {}}
                    onClick={() => navigator(NOTIFICATION_PAGE)}
                >
                    <ListItemIcon>
                    <Badge badgeContent={"!"} color="warning">
                        <NotificationsActiveIcon />

                    </Badge>
                    </ListItemIcon>
                    <div>Thông báo</div>
                </ListItemButton>

                <ListItemButton 
                    sx={sideBarOption === SidebarOption.CHANGE_PASS ? { backgroundColor: MAIN_COLOR } : {}}
                    onClick={() => navigator(CHANGE_PASSWORD_PAGE)}
                >
                    <ListItemIcon>
                        <KeyIcon/>
                    </ListItemIcon>
                    <div>Đổi mật khẩu</div>
                </ListItemButton>
            </div>

        </List>
    );
}
