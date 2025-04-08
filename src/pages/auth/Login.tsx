
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Virus } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";

const formSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address" }),
  password: z.string().min(6, { message: "Password must be at least 6 characters" }),
  rememberMe: z.boolean().default(false),
});

type FormValues = z.infer<typeof formSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [role, setRole] = useState<"user" | "admin">("user");
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
      rememberMe: false,
    },
  });

  const onSubmit = (data: FormValues) => {
    // In a real app, this would be an API call to authenticate the user
    console.log("Login data:", data, "Role:", role);
    
    toast({
      title: "Login successful",
      description: "Welcome back to the system.",
    });
    
    // Redirect based on role
    if (role === "admin") {
      navigate("/admin/dashboard");
    } else {
      navigate("/app/dashboard");
    }
  };

  return (
    <div className="space-y-6 py-4">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="flex items-center space-x-2">
          <Virus className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">SRRS</h1>
        </div>
        <h2 className="text-xl font-semibold">Welcome back</h2>
        <p className="text-sm text-muted-foreground">
          Enter your credentials to sign in to your account
        </p>
      </div>
      
      <Tabs defaultValue="user" className="w-full" onValueChange={(value) => setRole(value as "user" | "admin")}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="user">User</TabsTrigger>
          <TabsTrigger value="admin">Admin</TabsTrigger>
        </TabsList>
      </Tabs>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="name@example.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="rememberMe"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-2">
                  <FormControl>
                    <Checkbox 
                      checked={field.value} 
                      onCheckedChange={field.onChange} 
                    />
                  </FormControl>
                  <Label htmlFor="remember" className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                    Remember me
                  </Label>
                </FormItem>
              )}
            />
            <Link to="#" className="text-sm text-primary hover:underline">
              Forgot password?
            </Link>
          </div>

          <Button type="submit" className="w-full">
            Sign in
          </Button>
        </form>
      </Form>

      <div className="text-center text-sm">
        Don't have an account?{" "}
        <Link to="/register" className="text-primary hover:underline">
          Sign up
        </Link>
      </div>
    </div>
  );
};

export default Login;
