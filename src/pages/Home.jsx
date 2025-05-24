import { useNavigate } from 'react-router';
import { Button } from 'flowbite-react';

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6">
        <h1 className="text-4xl font-bold text-violet-800">Welcome to School Arc</h1>
        <p className="text-gray-600 text-lg">Manage your educational institution efficiently</p>
        <Button
          color="purple"
          size="lg"
          onClick={() => navigate('/auth/dashboard')}
          className="hover:bg-violet-700 transition-colors duration-200"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Home;