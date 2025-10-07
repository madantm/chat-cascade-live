import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { MessageSquare, Zap, Users, Lock } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate("/chat");
      }
    });
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-16">
        <div className="text-center mb-16">
          <div className="flex items-center justify-center mb-6">
            <MessageSquare className="h-16 w-16 text-primary" />
          </div>
          <h1 className="text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            ChatFlow
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Real-time messaging platform built for seamless communication. Connect with teams, share ideas, and collaborate instantly.
          </p>
          <Button
            size="lg"
            onClick={() => navigate("/auth")}
            className="gap-2 shadow-glow"
          >
            Get Started
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="text-center p-6 rounded-xl bg-card border border-border shadow-subtle">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Lightning Fast</h3>
            <p className="text-muted-foreground text-sm">
              Messages delivered in under 3 seconds with real-time WebSocket connections
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border border-border shadow-subtle">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Scalable</h3>
            <p className="text-muted-foreground text-sm">
              Built to handle 1,000+ concurrent users without breaking a sweat
            </p>
          </div>

          <div className="text-center p-6 rounded-xl bg-card border border-border shadow-subtle">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-lg bg-primary/10 mb-4">
              <Lock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Secure</h3>
            <p className="text-muted-foreground text-sm">
              End-to-end encrypted messages with enterprise-grade security
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
