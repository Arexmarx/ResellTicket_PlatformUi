import { Avatar, Box, Button, TextField } from '@mui/material'
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import { useState, useEffect } from 'react';
import useAxios from '../utils/useAxios';
import API from '../config/API';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// eslint-disable-next-line react/prop-types
export default function ProfileInfoBox({ user }) {

    const api = useAxios()
    const successNotification = (str) => toast.success(str)

    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [avatar, setAvatar] = useState(null);
    const [preview, setPreview] = useState(null);

    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [phoneError, setPhoneError] = useState('');

    const [showFirstnameError, setShowFirstnameError] = useState(false);
    const [showLastnameError, setShowLastnameError] = useState(false);
    const [showEmailError, setShowEmailError] = useState(false);
    const [showPhoneError, setShowPhoneError] = useState(false);

    const regexPhoneNumber = /(84|0[3|5|7|8|9])+([0-9]{8})\b/g;
    const regexEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const defaultTimeOut = 5000;

    useEffect(() => {
        if (user) {
            // eslint-disable-next-line react/prop-types
            setFirstname(user.firstname);
            // eslint-disable-next-line react/prop-types
            setLastname(user.lastname);
            // eslint-disable-next-line react/prop-types
            setEmail(user.email);
            // eslint-disable-next-line react/prop-types
            setPhone(user.phone);
            // eslint-disable-next-line react/prop-types
            setAvatar(user.avatar);
        }
    }, [user]);

    useEffect(() => {
        if (firstnameError) {
            setShowFirstnameError(true);
            const timer = setTimeout(() => {
                setShowFirstnameError(false);
                setFirstnameError('');
            }, defaultTimeOut);
            return () => clearTimeout(timer);
        }
    }, [firstnameError]);

    useEffect(() => {
        if (lastnameError) {
            setShowLastnameError(true);
            const timer = setTimeout(() => {
                setShowLastnameError(false);
                setLastnameError('');
            }, defaultTimeOut);
            return () => clearTimeout(timer);
        }
    }, [lastnameError]);

    useEffect(() => {
        if (emailError) {
            setShowEmailError(true);
            const timer = setTimeout(() => {
                setShowEmailError(false);
                setEmailError('');
            }, defaultTimeOut);
            return () => clearTimeout(timer);
        }
    }, [emailError]);

    useEffect(() => {
        if (phoneError) {
            setShowPhoneError(true);
            const timer = setTimeout(() => {
                setShowPhoneError(false);
                setPhoneError('');
            }, defaultTimeOut);
            return () => clearTimeout(timer);
        }
    }, [phoneError]);

    const handleFirstnameChange = (e) => setFirstname(e.target.value);
    const handleLastnameChange = (e) => setLastname(e.target.value);
    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePhoneChange = (e) => setPhone(e.target.value);

    const validateForm = () => {
        let flag = true;
        if (!firstname.trim()) {
            setFirstnameError('Họ tên không được để trống');
            flag = false;
        }

        if (!lastname.trim()) {
            setLastnameError('Họ tên không được để trống');
            flag = false;
        }

        if (!email.trim()) {
            setEmailError('Email không được để trống');
            flag = false;
        } 
        else if (!regexEmail.test(email)) {
            setEmailError('Email không hợp lệ');
            flag = false;
        }

        if (phone && !regexPhoneNumber.test(phone)) {
            setPhoneError('Số điện thoại không đúng định dạng');
            setPhone('');
            flag = false;
        }
        return flag;
    };

    const [updateSuccessMessage, setUpdateSuccessMessage] = useState('');


    const handleSubmit = async () => {
        if (validateForm()) {
            let updateInfoRequest = {
                firstname: firstname,
                lastname: lastname,
                email: email,
                phone: phone? phone : ''
            };
            //console.log(updateInfoRequest);

            const response = await api.put(API.User.UPDATE_USER_INFO + user.id, updateInfoRequest);
            
            if (response.status === 200) {
                setUpdateSuccessMessage(response.data.message);
                successNotification(response.data.message)
            } 
        }
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        if (preview) {
            const file = await fetch(preview).then(res => res.blob()); 
            const formData = new FormData();
            formData.append('image', file); 
            
            const response = await api.post(API.User.UPDATE_USER_AVATAR + user.id , formData)
            if (response.status === 200) {
                setUpdateSuccessMessage(response.data.message);
                successNotification(response.data.message)
            }
        }
    };

    return (
        <div className='col-md-10'>
            <ToastContainer/>
            <div className='row'>
                <div className='d-flex justify-content-center mb-3'>
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                        <Avatar
                            //  src={ !avatar ? "/broken-image.jpg" : "data:image/png;base64, "+ avatar }
                            // src={ !preview ? "/broken-image.jpg" : preview } // Use preview for immediate update
                            src = { !preview ? (!avatar ? "/broken-image.jpg" : "data:image/png;base64, "+ avatar) : preview }
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
            {preview && (
                <div
                    style={{ cursor: 'pointer', textAlign: 'center' }}
                    className='text-center text-success'
                    onClick={handleSave}
                >
                    Lưu ảnh
                </div>
            )}
            {/* {
                updateSuccessMessage && <div className='text-succes mt-2 mb-2'>{updateSuccessMessage}</div>
            } */}
            <div className='row d-flex justify-content-center mt-3 mb-3'>
                <div style={{ width: '40%' }}>
                    <TextField onChange={handleFirstnameChange}
                        value={firstname}
                        fullWidth={true} id="standard-basic" label="Họ" variant="standard"
                    />
                    {
                        showFirstnameError && <div className='mt-1 mb-1 text-danger'>{firstnameError}</div>
                    }
                </div>
            </div>
            <div className='row d-flex justify-content-center mt-3 mb-3'>
                <div style={{ width: '40%' }}>
                    <TextField onChange={handleLastnameChange}
                        value={lastname}
                        fullWidth={true} id="standard-basic" label="Tên" variant="standard"
                    />
                    {
                        showLastnameError && <div className='mt-1 mb-1 text-danger'>{lastnameError}</div>
                    }
                </div>
            </div>
            <div className='row d-flex justify-content-center mt-3 mb-3'>
                <div style={{ width: '40%' }}>
                    <TextField onChange={handleEmailChange}
                        value={email} fullWidth={true} id="standard-basic" label="Email" variant="standard"
                    />
                    {
                        showEmailError && <div className='mt-1 mb-1 text-danger'>{emailError}</div>
                    }
                </div>
            </div>
            <div className='row d-flex justify-content-center mt-3 mb-3'>
                <div style={{ width: '40%' }}>
                    <TextField onChange={handlePhoneChange}
                        value={phone}
                        fullWidth={true} id="standard-basic" label="Phone" variant="standard"
                    />
                    {
                        showPhoneError && <div className='mt-1 mb-1 text-danger'>{phoneError}</div>
                    }
                </div>
            </div>
            <div className='row d-flex justify-content-center mt-3 mb-3'>
                {/* {
                    updateSuccessMessage && <div className='mt-1 mb-1 text-success'>{updateSuccessMessage}</div>
                } */}
            </div>
            <div className='row d-flex justify-content-center mt-5 mb-3'>
                <div className='d-flex justify-content-center' style={{ width: '40%' }}>
                    <Button onClick={handleSubmit} variant="contained" color='success'>Lưu</Button>
                </div>
            </div>
        </div>
    );
}
