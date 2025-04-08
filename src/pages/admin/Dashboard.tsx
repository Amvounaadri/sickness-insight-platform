import { useState } from "react";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Activity, AlertCircle, FileCheck, Users, BarChart3, Calendar, ExternalLink, RefreshCw } from "lucide-react";
import { 
  AreaChart, 
  Area, 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell
} from "recharts";

// Mock data for charts
const weeklyReportsData = [
  { name: 'Mon', reports: 120 },
  { name: 'Tue', reports: 160 },
  { name: 'Wed', reports: 180 },
  { name: 'Thu', reports: 210 },
  { name: 'Fri', reports: 280 },
  { name: 'Sat', reports: 150 },
  { name: 'Sun', reports: 130 },
];

const monthlyTrendsData = [
  { month: 'Jan', respiratory: 400, gastrointestinal: 240, viral: 320 },
  { month: 'Feb', respiratory: 300, gastrointestinal: 220, viral: 280 },
  { month: 'Mar', respiratory: 520, gastrointestinal: 340, viral: 220 },
  { month: 'Apr', respiratory: 450, gastrointestinal: 260, viral: 290 },
  { month: 'May', respiratory: 380, gastrointestinal: 280, viral: 230 },
  { month: 'Jun', respiratory: 410, gastrointestinal: 320, viral: 270 },
  { month: 'Jul', respiratory: 580, gastrointestinal: 350, viral: 310 },
];

const regionData = [
  { name: 'North Region', value: 35 },
  { name: 'South Region', value: 25 },
  { name: 'East Region', value: 20 },
  { name: 'West Region', value: 15 },
  { name: 'Central Area', value: 5 },
];

const COLORS = ['#4361ee', '#3f8efc', '#6e59d9', '#f72585', '#7209b7'];

const AdminDashboard = () => {
  const [timeRange, setTimeRange] = useState("week");
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Dashboard</h2>
        <p className="text-muted-foreground">
          Overview of system activity, user reports, and health data analytics.
        </p>
      </div>
      
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <Tabs defaultValue="overview" className="w-full sm:w-auto">
          <TabsList>
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>
        </Tabs>
        
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Select defaultValue={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="year">This Year</SelectItem>
            </SelectContent>
          </Select>
          
          <Button variant="outline" size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Stats overview */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
            <FileCheck className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">16,532</div>
            <p className="text-xs text-muted-foreground">+18% from last month</p>
            <div className="mt-4">
              <Progress value={75} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,841</div>
            <p className="text-xs text-muted-foreground">+7% from last month</p>
            <div className="mt-4">
              <Progress value={65} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Critical Alerts</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">7</div>
            <p className="text-xs text-muted-foreground">Requiring immediate attention</p>
            <div className="mt-4">
              <Progress value={35} className="h-2" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">System Health</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">98.6%</div>
            <p className="text-xs text-muted-foreground">Uptime in last 30 days</p>
            <div className="mt-4">
              <Progress value={98} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Main dashboard content */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        {/* Weekly report trends */}
        <Card className="md:col-span-2 lg:col-span-4">
          <CardHeader>
            <CardTitle>Report Submission Trends</CardTitle>
            <CardDescription>
              Daily report submissions over the past week
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart
                data={weeklyReportsData}
                margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#4361ee" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#4361ee" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" />
                <YAxis />
                <CartesianGrid strokeDasharray="3 3" />
                <Tooltip />
                <Area 
                  type="monotone" 
                  dataKey="reports" 
                  stroke="#4361ee" 
                  fillOpacity={1} 
                  fill="url(#colorReports)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Distribution by region */}
        <Card className="md:col-span-2 lg:col-span-3">
          <CardHeader>
            <CardTitle>Distribution by Region</CardTitle>
            <CardDescription>
              Geographic distribution of reported cases
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={regionData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {regionData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Illness trends */}
        <Card className="md:col-span-2 lg:col-span-7">
          <CardHeader>
            <CardTitle>Illness Trends by Month</CardTitle>
            <CardDescription>
              Comparative view of different types of illnesses
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={monthlyTrendsData}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="respiratory" name="Respiratory" fill="#4361ee" />
                <Bar dataKey="gastrointestinal" name="Gastrointestinal" fill="#f72585" />
                <Bar dataKey="viral" name="Viral" fill="#3f8efc" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Health alerts section */}
      <Card>
        <CardHeader>
          <CardTitle>Active Health Alerts</CardTitle>
          <CardDescription>
            Current alerts requiring attention or monitoring
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { 
                id: 1, 
                level: "critical", 
                title: "Respiratory Outbreak - North Region", 
                description: "Significant increase in respiratory infection cases requiring immediate attention",
                time: "2 hours ago"
              },
              { 
                id: 2, 
                level: "warning", 
                title: "Gastrointestinal Illness Cluster - Downtown District", 
                description: "Multiple related cases reported in central business area",
                time: "6 hours ago"
              },
              { 
                id: 3, 
                level: "info", 
                title: "Seasonal Allergies Trending Higher", 
                description: "Higher than usual reports of allergy symptoms across all regions",
                time: "1 day ago"
              }
            ].map((alert) => (
              <div 
                key={alert.id} 
                className={`rounded-lg border p-4 ${
                  alert.level === "critical" 
                    ? "border-destructive/50 bg-destructive/10" 
                    : alert.level === "warning"
                    ? "border-orange-500/50 bg-orange-500/10"
                    : "border-blue-500/50 bg-blue-500/10"
                }`}
              >
                <div className="flex flex-col sm:flex-row gap-4">
                  <div className="flex-grow">
                    <div className="flex items-center gap-2">
                      <span 
                        className={`inline-block h-2 w-2 rounded-full ${
                          alert.level === "critical" 
                            ? "bg-destructive animate-pulse" 
                            : alert.level === "warning"
                            ? "bg-orange-500"
                            : "bg-blue-500"
                        }`}
                      ></span>
                      <h3 className={`font-semibold ${
                        alert.level === "critical" 
                          ? "text-destructive" 
                          : alert.level === "warning"
                          ? "text-orange-500"
                          : "text-blue-500"
                      }`}>
                        {alert.title}
                      </h3>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center mt-2 text-xs text-muted-foreground">
                      <Calendar className="h-3 w-3 mr-1" />
                      <span>{alert.time}</span>
                    </div>
                  </div>
                  <div className="flex flex-shrink-0 gap-2 items-start sm:items-center">
                    <Button 
                      variant={alert.level === "critical" ? "destructive" : "outline"} 
                      size="sm"
                    >
                      View Details
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="sm"
                    >
                      Dismiss
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button variant="outline" size="sm">View All Alerts</Button>
          <Button variant="outline" size="sm">
            <ExternalLink className="h-4 w-4 mr-2" />
            Generate Report
          </Button>
        </CardFooter>
      </Card>

      {/* Quick stats */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Top Reporting Regions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { region: "North Region", percentage: 34 },
                { region: "South Region", percentage: 26 },
                { region: "East Region", percentage: 22 },
                { region: "West Region", percentage: 18 },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.region}</span>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Most Common Symptoms</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { symptom: "Fever", percentage: 64 },
                { symptom: "Cough", percentage: 52 },
                { symptom: "Fatigue", percentage: 38 },
                { symptom: "Headache", percentage: 27 },
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <div className="w-full">
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">{item.symptom}</span>
                      <span className="text-sm text-muted-foreground">{item.percentage}%</span>
                    </div>
                    <Progress value={item.percentage} className="h-2" />
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-base">Active Health Campaigns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { title: "Respiratory Awareness", progress: 75 },
                { title: "Handwashing Initiative", progress: 90 },
                { title: "Vaccination Outreach", progress: 60 },
                { title: "Health Screenings", progress: 40 },
              ].map((item, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">{item.title}</span>
                    <span className="text-sm text-muted-foreground">{item.progress}%</span>
                  </div>
                  <Progress value={item.progress} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AdminDashboard;
