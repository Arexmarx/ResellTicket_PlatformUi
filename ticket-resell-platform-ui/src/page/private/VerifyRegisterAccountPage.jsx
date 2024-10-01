import { useState } from 'react';
import Footer from '../../components/Footer';

const VerifyRegisterAccountPage = () => {
    const [otp, setOtp] = useState(new Array(6).fill(''));

    const handleChange = (element, index) => {
        // Validate only number inputs
        if (!isNaN(element.value)) {
            let newOtp = [...otp];
            newOtp[index] = element.value;
            setOtp(newOtp);

            // Move to the next input field after typing
            if (element.nextSibling && element.value !== '') {
                element.nextSibling.focus();
            }
        }

    };

    const handleKeyDown = (e, index) => {
        // Move to the previous input field if backspace is pressed and input is empty
        if (e.key === 'Backspace' && otp[index] === '') {
            if (e.target.previousSibling) {
                e.target.previousSibling.focus();
            }
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Concatenate OTP digits
        const finalOtp = otp.join('');
        console.log('Entered OTP is:', finalOtp);

        // Validate OTP (Here, add your validation logic)
        if (finalOtp.length === 6) {
            alert(`OTP submitted: ${finalOtp}`);
        } else {
            alert('Please enter all 6 digits of the OTP');
        }
    };

    return (
        <div>
            <h1 className='text-center mb-4' style={{ paddingTop: '200px' }}>Nhập mã xác thực</h1>
            <div className='d-flex justify-content-center align-items-center'>
                <form className='' onSubmit={handleSubmit}>
                    <div >
                        {
                            otp.map((_, index) => (
                                <input
                                    key={index}
                                    type="text"
                                    maxLength="1"
                                    style={styles.inputBox}
                                    value={otp[index]}
                                    onChange={(e) => handleChange(e.target, index)}
                                    onKeyDown={(e) => handleKeyDown(e, index)}
                                    onFocus={(e) => e.target.select()}
                                />
                            ))
                        }

                    </div>
                    <button style={{ marginLeft: '30%', marginBottom: '300px', marginTop: '10%' }} type="submit" className='btn btn-success'>
                        Submit OTP
                    </button>
                </form>
            </div>
            <Footer/>
        </div>
    );
};

// Simple inline styles
const styles = {
    otpContainer: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: '20px',

    },
    inputContainer: {
        display: 'flex',
        justifyContent: 'space-between',
        width: '200px',
    },
    inputBox: {
        width: '50px',
        height: '70px',
        textAlign: 'center',
        fontSize: '20px',
        margin: '5px',
        borderRadius: '5px',
        border: '1px solid #ccc',
    },
    submitButton: {
        marginTop: '20px',
        padding: '10px 20px',
        backgroundColor: '#007BFF',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
    },
};

export default VerifyRegisterAccountPage;

