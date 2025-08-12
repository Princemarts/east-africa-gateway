import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Lock, User } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";

const AdminLogin = () => {
  const [credentials, setCredentials] = useState({
    username: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Use the secure RPC function to verify admin credentials
      const { data: isValidAdmin, error } = await supabase.rpc('verify_admin_login', {
        username_input: credentials.username,
        password_input: credentials.password
      });

      if (error) {
        console.error('Login error:', error);
        throw new Error('Authentication failed');
      }

      if (isValidAdmin) {
        localStorage.setItem("admin_authenticated", "true");
        localStorage.setItem("admin_username", credentials.username);
        toast({
          title: "Login Successful",
          description: "Welcome to the admin dashboard",
        });
        navigate("/dashboard");
      } else {
        toast({
          title: "Login Failed",
          description: "Invalid username or password",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Authentication error:', error);
      toast({
        title: "Login Failed",
        description: "Authentication service unavailable",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-navy-deep via-navy-primary to-navy-light flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-gradient-gold rounded-2xl flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl font-bold text-navy-deep">Q</span>
          </div>
          <h1 className="text-3xl font-bold text-white mb-2">
            Qalbi<span className="text-gold-medium">.</span> Admin
          </h1>
          <p className="text-gold-light">Investment Management Portal</p>
        </div>

        {/* Login Form */}
        <Card className="bg-white/10 backdrop-blur-lg border-gold-medium/20 shadow-2xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl text-white">Admin Login</CardTitle>
            <p className="text-gold-light">Access the investment dashboard</p>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="username" className="text-white">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gold-medium" />
                  <Input
                    id="username"
                    required
                    placeholder="Enter username"
                    value={credentials.username}
                    onChange={(e) => setCredentials(prev => ({ ...prev, username: e.target.value }))}
                    className="pl-10 bg-white/10 border-gold-medium/30 text-white placeholder:text-gold-light/70"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-white">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gold-medium" />
                  <Input
                    id="password"
                    type="password"
                    required
                    placeholder="Enter password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 bg-white/10 border-gold-medium/30 text-white placeholder:text-gold-light/70"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                size="lg" 
                className="w-full bg-gradient-gold text-navy-deep font-semibold hover:bg-gold-medium"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-navy-deep mr-2"></div>
                    Logging in...
                  </>
                ) : (
                  "Login to Dashboard"
                )}
              </Button>
            </form>

            {/* Demo Credentials */}
            <div className="mt-6 p-4 bg-white/5 rounded-lg border border-gold-medium/20">
              <p className="text-sm text-gold-light mb-2">Demo Credentials:</p>
              <p className="text-xs text-white/70">Username: admin</p>
              <p className="text-xs text-white/70">Password: 123456</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminLogin;