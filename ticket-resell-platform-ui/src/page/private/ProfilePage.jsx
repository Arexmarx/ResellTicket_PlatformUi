
import { Avatar, Box, Button, TextField } from '@mui/material'
import Footer from '../../components/Footer'
import Header from '../../components/Header'
import SideBar from '../../components/SideBar'
import { SidebarOption } from '../../config/Constant'
import CameraAltIcon from '@mui/icons-material/CameraAlt';

/*
    Author: Nguyen Tien Thuan
*/
export default function ProfilePage() {

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        console.log(file);  
    };

    return (
        <div>
            <div className="row">
                <Header />
            </div>

            <div className='container-fluid mb-5'>
                <div className='row' style={{ marginTop: '7%' }}>

                    <div className='col-md-2' >
                        <SideBar sideBarOption={SidebarOption.PROFILE} />
                    </div>

                    <div className='col-md-10'>
                        <div className='row'>
                            <div className='d-flex justify-content-center mb-3'>
                                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                    <Avatar
                                        src="/broken-image.jpg"
                                        sx={{
                                            width: { xs: 100, sm: 120, md: 140, lg: 160, xl: 180 },
                                            height: { xs: 100, sm: 120, md: 140, lg: 160, xl: 180 },
                                        }}
                                    />
                                    <form encType="multipart/form-data">
                                        <input
                                            type="file"
                                            id="file-input"
                                            style={{ display: 'none' }}
                                            onChange={handleFileChange}
                                            accept="image/*" 
                                        />
                                    </form>

                                    <label htmlFor="file-input">
                                        <CameraAltIcon
                                            sx={{
                                                position: 'absolute',
                                                bottom: 20,
                                                right: 10,
                                                backgroundColor: 'white',
                                                borderRadius: '50%',
                                                padding: '2px',
                                                fontSize: { xs: 20, sm: 24, md: 28, lg: 32, xl: 36 },
                                                cursor: 'pointer' 
                                            }}
                                        />
                                    </label>
                                </Box>
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-3 mb-3'>
                            <div style={{ width: '40%' }}>
                                <TextField fullWidth={true} id="standard-basic" label="Họ" variant="standard" />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-3 mb-3'>
                            <div style={{ width: '40%' }}>
                                <TextField fullWidth={true} id="standard-basic" label="Tên" variant="standard" />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-3 mb-3'>
                            <div style={{ width: '40%' }}>
                                <TextField fullWidth={true} id="standard-basic" label="Email" variant="standard" />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-3 mb-3'>
                            <div style={{ width: '40%' }}>
                                <TextField fullWidth={true} id="standard-basic" label="Phone" variant="standard" />
                            </div>
                        </div>
                        <div className='row d-flex justify-content-center mt-5 mb-3'>
                            <div className='d-flex justify-content-center' style={{ width: '40%' }}>
                                <Button variant="contained" color='success'>Lưu</Button>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div className="row">
                <Footer />
            </div>
        </div>
    )
}
