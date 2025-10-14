import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/contexts/AuthContext';
import { ChefHat } from 'lucide-react';
import { toast } from 'sonner';
import Lottie from 'lottie-react';
import confettiAnimation from '../../USA confetti.json';
import inventoryAnimation from '../../Inventory.json';

export const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (showConfetti) {
      // Play confetti twice without gap
      const timer = setTimeout(() => {
        setShowConfetti(false);
        setTimeout(() => {
          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 2000);
        }, 0);
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [showConfetti]);
  const navigate = useNavigate();
  const { login, register, continueAsGuest } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      if (isLogin) {
        await login({ email, password });
        toast.success('Welcome back!');
        setShowConfetti(true);
        setTimeout(() => {
          navigate('/home');
        }, 4000);
      } else {
        await register({ email, password, name });
        toast.success('Account created successfully! Please sign in.');
        setShowConfetti(true);
        setTimeout(() => {
          setIsLogin(true);
          setEmail('');
          setPassword('');
          setName('');
        }, 4000);
      }
    } catch (error) {
      toast.error(error instanceof Error ? error.message : 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGuestMode = () => {
    continueAsGuest();
    navigate('/home');
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none z-50">
          <Lottie animationData={confettiAnimation} loop={false} />
        </div>
      )}

      <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-8">
            <div className="bg-primary/10 rounded-full p-6">
              <ChefHat className="w-12 h-12 text-primary" />
            </div>
          </div>
          
          <h1 className="text-3xl font-heading font-bold text-center mb-2">
            {isLogin ? 'Welcome Back' : 'Create Account'}
          </h1>
          <p className="text-center text-muted-foreground mb-8">
            {isLogin ? 'Sign in to continue' : 'Join FreshPlate today'}
          </p>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <div>
                <Label htmlFor="name">Name</Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1.5"
                />
              </div>
            )}
            
            <div>
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5"
              />
            </div>
            
            <div>
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5"
              />
            </div>
            
            <Button type="submit" disabled={loading} className="w-full h-12 text-base font-semibold mt-6">
              {loading ? 'Loading...' : (isLogin ? 'Sign In' : 'Create Account')}
            </Button>
          </form>
          
          <div className="mt-4 text-center">
            <button
              onClick={() => setIsLogin(!isLogin)}
              className="text-primary hover:underline text-sm"
            >
              {isLogin ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
            </button>
          </div>
          
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-border" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-background text-muted-foreground">or</span>
            </div>
          </div>
          
          <Button
            onClick={handleGuestMode}
            variant="outline"
            className="w-full h-12 text-base"
          >
            Continue as Guest
          </Button>
        </div>
      </div>
    </div>
  );
};
