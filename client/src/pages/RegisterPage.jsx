import { useEffect, useState} from 'react'
import '../styles/Register.scss';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: '',
        profileImage: null
    });

    const handleChange = (e) => {
        const { name, value, files } = e.target;
        setFormData({
            ...formData,
            [name]: value,
            [name]: name === "profileImage" ? files[0] : value,
        });
    };

    const [passwordMatch, setPasswordMatch] = useState(true)
    useEffect(() => {
        setPasswordMatch(formData.password === formData.confirmPassword || formData.confirmPassword === "")
    })

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        try{
            const register_form = new FormData()

            for (var key in formData){
                register_form.append(key, formData[key])
            }

            const response = await fetch('http://localhost:3001/auth/register', {
                method: 'POST',
                body: register_form
            })

            if(response.ok){
                navigate('/login')
            }
        } catch (error){
            console.log("Registration failed",error.message)
        }
    }

  return (
    <div className='register'>
        <div className='register_content'>
            <form className='register_content_form' onSubmit={handleSubmit}>    
                <input name='firstName' placeholder='First Name' value={formData.firstName} onChange={handleChange} required/>
                <input name='lastName' placeholder='Last Name' value={formData.lastName} onChange={handleChange} required/>
                <input type='email' name='email' placeholder='Email' value={formData.email} onChange={handleChange} required/>
                <input type='password' name='password' placeholder='Password' value={formData.password} onChange={handleChange} required/>
                <input type='password' name='confirmPassword' placeholder='Confirm password' value={formData.confirmPassword} onChange={handleChange} required/>
                
                {!passwordMatch && (
                    <p style={{ color: "red" }}>Passwords are not matched!</p>
                )}

                <input type='file' id='image' name='profileImage' accept='image/*' style={{display: "none"}} onChange={handleChange} required/>
                <label htmlFor='image'>
                    <img src="/assets/addImage.png" alt="add profile picture" />
                    Upload Profile Image
                </label>

                {formData.profileImage && (
                    <img
                        src={URL.createObjectURL(formData.profileImage)}
                        alt="profile photo"
                        style={{ maxWidth: "80px" }}
                    />
                 )}
                
                <button type='submit' disabled={!passwordMatch}>REGISTER</button>
            </form>
            <a href="/login">Already have an account? Login Here</a>
        </div>
    </div>
  )
}

export default RegisterPage