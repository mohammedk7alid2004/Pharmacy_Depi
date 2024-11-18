import { useState } from "react";
import LoginInput from "../design/LoginInput";
import Hint from "../design/Hint";
import LoginTitle from "../design/LoginTitle";
import LoginP from "../design/LoginP";
import Button from "../design/Button";
import { useNavigate } from "react-router-dom";
import Footer from './Footer';
import NavBar from './NavBar';
import logo from "../assets/dalida.jpg";
import Loader from "./Loader";
function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password == confirmPassword) {
      try {
        setLoading(true);
        setTimeout(() => {
          setLoading(false);
        }, 100);
        const response = await fetch("http://pharmacy1.runasp.net/api/Account/Register", {
          method: "post",
          headers: {
            'Content-Type': 'application/json'
          },
          'body': JSON.stringify({ firstName,lastName,phone,address, email, password }),
        });
        if (!response.ok) {
          throw new Error('Login failed');
        } else {
          
          const data = await response.json();
          console.log('Login successful:', data);
          localStorage.setItem('token', data.token);
          navigate('/');
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    } else {
      setError("the password not matched")
    }
  }
  return (
    <>
      {loading ? <Loader visible={loading} /> : <>
        <NavBar logo={logo} />
        <div className="flex flex-col items-center justify-center shadow-lg w-1/3 mx-auto my-28 p-20 h-[70vh]">
          <LoginTitle text="Create an account" />
          <LoginP text="Enter your details to register:" />
          <div>
            {error && <p className="text-red-400 p-3 font-semibold">{error}</p>}
          </div>
          <form className="flex flex-col items-center justify-center w-full" onSubmit={handleSubmit}>
            <LoginInput name="firstName" type="text" value={firstName} setValue={setFirstName} />
            <LoginInput name="lastName" type="text" value={lastName} setValue={setLastName} />
            <LoginInput name="phone" type="text" value={phone} setValue={setPhone} />
            <LoginInput name="address" type="text" value={address} setValue={setAddress} />
            <LoginInput name="Email" type="email" value={email} setValue={setEmail} />
            <LoginInput name="Password" type="password" value={password} setValue={setPassword} />
            <LoginInput name="Confirm Password" type="password" value={confirmPassword} setValue={setConfirmPassword} />
            <Button text="Register" type="submit" className="mt-3 px-10 py-2 w-full bg-blue-600 hover:bg-blue-200" />
          </form>
          <Hint text="Already have an account?" link="/login" className="mt-1" name="Login" />
        </div>
        <Footer />
      </>}
    </>
  );
}
export default Register;
