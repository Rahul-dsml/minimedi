import React, { useState,useContext,useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { loginService } from '@/api/authApi';
import { DispatchContext } from '@/Context/ContextAPI';
function Login() {
     const { input, isAuthenticated,setIsAuthenticated } = useContext(DispatchContext);
const [email, setEmail] = useState('')
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
    useEffect(() => {
      // Check localStorage for saved authentication state
      const authToken = localStorage.getItem('authToken');
      setIsAuthenticated(!!authToken);
      isAuthenticated?navigate('/'):navigate('/login')
    }, []);


   // React Query Mutation for Login
   const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await loginService({ email, password });
      console.log('Login successful:', data);
      localStorage.setItem('authToken', data.access_token); // Save token or other data in localStorage
      setIsAuthenticated(true)
      navigate('/');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };




  return (
    <>
      <header className='text-3xl absolute inset-8 text-gray-200 container mx-auto font-bold py-2'>MetaMindAI</header>
    <div className="flex items-center justify-center min-h-screen ">
     <Card className="w-full text-teal-900 lg:max-w-xl  max-w-md bg-white/60 backdrop-blur-md shadow-lg cursor-default rounded-lg border border-white/30">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
           Login
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form  className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">Email</Label>
              <Input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <Button onClick={handleLogin} type="submit" className="w-full bg-teal-900">
              Login
            </Button>
          </form>
          <p className="text-center mt-4">
            Don't have an account? {" "}
            <Button
              variant="link"
              onClick={() => navigate('/signup')}
              className="p-0  font-semibold "
            >
              Sign Up
            </Button>
          </p>
        </CardContent>
      </Card>
  
    </div>
    </>
  );
}

export default Login ;
