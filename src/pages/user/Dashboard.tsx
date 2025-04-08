
import { Activity, AlertCircle, CalendarDays, FileCheck, FilePlus, MapPin, Virus } from "lucide-react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar
} from "recharts";

// Mock data for charts
const activityData = [
  { month: 'Jan', reports: 4, avg: 5 },
  { month: 'Feb', reports: 3, avg: 4 },
  { month: 'Mar', reports: 5, avg: 6 },
  { month: 'Apr', reports: 7, avg: 5 },
  { month: 'May', reports: 2, avg: 3 },
  { month: 'Jun', reports: 6, avg: 5 },
  { month: 'Jul', reports: 8, avg: 7 },
];

const symptomsData = [
  { name: 'Fever', count: 12 },
  { name: 'Cough', count: 19 },
  { name: 'Fatigue', count: 8 },
  { name: 'Headache', count: 15 },
  { name: 'Sore Throat', count: 6 },
];

const Dashboard = () => {
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <p className="text-muted-foreground">
          Welcome back! Here's an overview of your sickness reports and regional data.
        </p>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">Currently being tracked</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Region Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2</div>
            <p className="text-xs text-muted-foreground">In your local area</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Last Report</CardTitle>
            <CalendarDays className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2 days ago</div>
            <p className="text-xs text-muted-foreground">On July 5, 2025</p>
          </CardContent>
        </Card>
      </div>

      {/* Quick action */}
      <Card className="bg-primary text-primary-foreground shadow-md">
        <CardContent className="flex flex-col md:flex-row items-center justify-between p-6">
          <div className="flex items-center gap-4">
            <Virus className="h-10 w-10" />
            <div>
              <CardTitle className="text-xl">Report new sickness data</CardTitle>
              <CardDescription className="text-primary-foreground/80">
                Help improve regional health monitoring by submitting new reports
              </CardDescription>
            </div>
          </div>
          <Button size="lg" variant="secondary" asChild className="mt-4 md:mt-0">
            <Link to="/app/new-report">
              <FilePlus className="mr-2 h-5 w-5" />
              New Report
            </Link>
          </Button>
        </CardContent>
      </Card>

      {/* Charts */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Your Activity</CardTitle>
            <CardDescription>
              Number of reports submitted compared to region average
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={activityData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="reports" stroke="#4361ee" activeDot={{ r: 8 }} strokeWidth={2} name="Your Reports" />
                <Line type="monotone" dataKey="avg" stroke="#f72585" strokeWidth={2} name="Region Average" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="col-span-1">
          <CardHeader>
            <CardTitle>Common Symptoms</CardTitle>
            <CardDescription>
              Most frequent symptoms in your area
            </CardDescription>
          </CardHeader>
          <CardContent className="px-2">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={symptomsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="count" fill="#4361ee" name="Reported Count" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Recent reports */}
      <div>
        <h3 className="text-xl font-bold">Recent Reports</h3>
        <div className="mt-4 space-y-4">
          {[1, 2, 3].map((item) => (
            <Card key={item}>
              <CardContent className="flex flex-col md:flex-row items-start justify-between p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-3">
                  <div className="flex items-center space-x-4">
                    <div className="rounded-full bg-primary/10 p-3">
                      <Virus className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <p className="font-medium">Respiratory Infection</p>
                      <p className="text-sm text-muted-foreground">July {5 - item}, 2025</p>
                    </div>
                  </div>
                  <div className="flex items-center ml-0 md:ml-6 mt-2 md:mt-0">
                    <MapPin className="h-4 w-4 text-muted-foreground mr-1" />
                    <span className="text-sm text-muted-foreground">Downtown District</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-3 md:mt-0">
                  <span className="text-sm text-muted-foreground">Status:</span>
                  <span className="inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 border-transparent bg-primary text-primary-foreground shadow hover:bg-primary/80">
                    Active
                  </span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="mt-4">
          <Button variant="outline" asChild>
            <Link to="/app/reports">View all reports</Link>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
