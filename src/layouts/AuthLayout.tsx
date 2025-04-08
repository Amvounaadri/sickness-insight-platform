
import { Outlet } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <Card className="w-full max-w-md shadow-lg">
        <CardContent className="pt-6">
          <Outlet />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthLayout;
