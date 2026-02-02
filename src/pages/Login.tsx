import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/context/AuthContext';
import { HardHat, ArrowRight } from 'lucide-react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const user = login(email, password);
    if (user) {
      // Route based on user role
      navigate(user.role === 'admin' ? '/admin' : '/dashboard');
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Decorative */}
      <div className="hidden lg:flex lg:w-1/2 bg-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary to-black/90" />
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-accent/20 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 flex flex-col justify-center px-12 lg:px-20">
          <div className="mb-8">
            <div className="w-16 h-16 rounded-2xl bg-accent flex items-center justify-center mb-6">
              <HardHat className="w-8 h-8 text-accent-foreground" />
            </div>
            <h1 className="font-display text-4xl lg:text-5xl font-bold text-white mb-4">
              BuildCraft
            </h1>
            <p className="text-xl text-white/70">
              Client Portal
            </p>
          </div>
          <div className="space-y-6 text-white/80">
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-accent font-semibold text-sm">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Submit Your Vision</h3>
                <p className="text-sm">Upload reference images and describe your dream project</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-accent font-semibold text-sm">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Track Progress</h3>
                <p className="text-sm">Follow every step from planning to completion</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-accent font-semibold text-sm">3</span>
              </div>
              <div>
                <h3 className="font-semibold text-white">Stay Connected</h3>
                <p className="text-sm">Communicate directly with your project team</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="flex-1 flex items-center justify-center p-8">
        <div className="w-full max-w-md">
          <div className="lg:hidden text-center mb-8">
            <div className="w-14 h-14 rounded-xl bg-accent flex items-center justify-center mx-auto mb-4">
              <HardHat className="w-7 h-7 text-accent-foreground" />
            </div>
            <h1 className="font-display text-2xl font-bold">BuildCraft</h1>
            <p className="text-muted-foreground">Client Portal</p>
          </div>

          <div className="text-center mb-8">
            <h2 className="font-display text-2xl font-semibold mb-2">Welcome back</h2>
            <p className="text-muted-foreground">
              Sign in to access your projects
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="h-12"
              />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  to="/forgot-password"
                  className="text-sm text-accent hover:text-accent/80 transition-colors"
                >
                  Forgot password?
                </Link>
              </div>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="h-12"
              />
            </div>

            <Button type="submit" variant="gold" size="lg" className="w-full">
              Access My Portal
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          </form>

          <p className="text-center text-sm text-muted-foreground mt-8">
            Don't have an account?{' '}
            <Link to="/register" className="text-accent hover:text-accent/80 font-medium transition-colors">
              Create one
            </Link>
          </p>

          <div className="mt-8 pt-8 border-t text-center">
            <p className="text-xs text-muted-foreground mb-2">
              Demo Accounts:
            </p>
            <div className="text-xs text-muted-foreground space-y-1">
              <p><span className="font-medium text-foreground">Admin:</span> james@buildcraft.com</p>
              <p><span className="font-medium text-foreground">Client:</span> sarah@example.com</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
