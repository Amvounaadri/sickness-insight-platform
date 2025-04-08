
import { useState } from "react";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  Tabs, 
  TabsContent, 
  TabsList, 
  TabsTrigger 
} from "@/components/ui/tabs";
import { AlertCircle, Archive, BarChart3, CalendarDays, Check, ChevronDown, ClipboardList, Download, Eye, File, FileCheck, Filter, MapPin, MoreHorizontal, Search, Star, Trash2, User, Virus, X } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";

// Sample reports data
const reports = [
  {
    id: "r1",
    type: "Respiratory Infection",
    date: "July 6, 2025",
    reportedBy: {
      name: "Olivia Martin",
      email: "olivia.martin@example.com",
      imageUrl: "/placeholder.svg",
    },
    location: "North Region",
    severity: "moderate",
    status: "active",
    symptoms: ["Fever", "Cough", "Fatigue"],
  },
  {
    id: "r2",
    type: "Gastrointestinal Illness",
    date: "July 5, 2025",
    reportedBy: {
      name: "Jackson Lee",
      email: "jackson.lee@example.com",
      imageUrl: "/placeholder.svg",
    },
    location: "East Region",
    severity: "mild",
    status: "active",
    symptoms: ["Nausea", "Diarrhea", "Abdominal Pain"],
  },
  {
    id: "r3",
    type: "Viral Infection",
    date: "July 4, 2025",
    reportedBy: {
      name: "Isabella Nguyen",
      email: "isabella.nguyen@example.com",
      imageUrl: "/placeholder.svg",
    },
    location: "South Region",
    severity: "severe",
    status: "verified",
    symptoms: ["High Fever", "Body Aches", "Headache", "Chills"],
  },
  {
    id: "r4",
    type: "Allergic Reaction",
    date: "July 3, 2025",
    reportedBy: {
      name: "William Chen",
      email: "william.chen@example.com",
      imageUrl: "/placeholder.svg",
    },
    location: "West Region",
    severity: "moderate",
    status: "resolved",
    symptoms: ["Rash", "Itching", "Swelling"],
  },
  {
    id: "r5",
    type: "Bacterial Infection",
    date: "July 2, 2025",
    reportedBy: {
      name: "Sofia Rodriguez",
      email: "sofia.rodriguez@example.com",
      imageUrl: "/placeholder.svg",
    },
    location: "Central Area",
    severity: "severe",
    status: "active",
    symptoms: ["Fever", "Cough", "Chest Pain"],
  },
  {
    id: "r6",
    type: "Food Poisoning",
    date: "July 1, 2025",
    reportedBy: {
      name: "Ethan Johnson",
      email: "ethan.johnson@example.com",
      imageUrl: "/placeholder.svg",
    },
    location: "North Region",
    severity: "moderate",
    status: "resolved",
    symptoms: ["Nausea", "Vomiting", "Abdominal Cramps"],
  },
  {
    id: "r7",
    type: "Respiratory Infection",
    date: "June 30, 2025",
    reportedBy: {
      name: "Mia Williams",
      email: "mia.williams@example.com",
      imageUrl: "/placeholder.svg",
    },
    location: "East Region",
    severity: "mild",
    status: "flagged",
    symptoms: ["Cough", "Sore Throat", "Runny Nose"],
  },
];

// Get color based on severity
const getSeverityColor = (severity: string) => {
  switch (severity) {
    case "mild":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "moderate":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "severe":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "critical":
      return "bg-destructive text-destructive-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

// Get color based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "verified":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "flagged":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "resolved":
      return "bg-secondary text-secondary-foreground";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

// Chart data
const reportsByTypeData = [
  { name: "Respiratory", value: 65 },
  { name: "Gastrointestinal", value: 20 },
  { name: "Viral", value: 10 },
  { name: "Allergic", value: 5 },
  { name: "Other", value: 5 },
];

const reportsByRegionData = [
  { region: "North", active: 45, resolved: 30 },
  { region: "South", active: 30, resolved: 20 },
  { region: "East", active: 25, resolved: 15 },
  { region: "West", active: 20, resolved: 10 },
  { region: "Central", active: 15, resolved: 5 },
];

const reportTrendsData = [
  { date: "Jun 1", newReports: 23, resolved: 15 },
  { date: "Jun 8", newReports: 28, resolved: 22 },
  { date: "Jun 15", newReports: 35, resolved: 25 },
  { date: "Jun 22", newReports: 42, resolved: 30 },
  { date: "Jun 29", newReports: 38, resolved: 32 },
  { date: "Jul 6", newReports: 50, resolved: 35 },
];

const COLORS = ['#4361ee', '#3f8efc', '#6e59d9', '#f72585', '#7209b7'];

const AdminReports = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [selectedSeverity, setSelectedSeverity] = useState("all");
  const [showReportDetail, setShowReportDetail] = useState(false);
  const [selectedReport, setSelectedReport] = useState<any>(null);

  // Filter reports based on search query, type, status, and severity
  const filteredReports = reports.filter(report => {
    // Search filter
    const matchesSearch = 
      searchQuery === "" || 
      report.type.toLowerCase().includes(searchQuery.toLowerCase()) || 
      report.reportedBy.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      report.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Type filter
    const matchesType = selectedType === "all" || report.type.toLowerCase().includes(selectedType.toLowerCase());
    
    // Status filter
    const matchesStatus = selectedStatus === "all" || report.status === selectedStatus;
    
    // Severity filter
    const matchesSeverity = selectedSeverity === "all" || report.severity === selectedSeverity;
    
    return matchesSearch && matchesType && matchesStatus && matchesSeverity;
  });

  const handleViewReport = (report: any) => {
    setSelectedReport(report);
    setShowReportDetail(true);
  };

  const handleStatusChange = (reportId: string, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `Report status has been changed to ${newStatus}.`,
    });
  };

  const handleDeleteReport = (reportId: string) => {
    toast({
      title: "Report deleted",
      description: "Report has been removed from the system.",
      variant: "destructive",
    });
  };

  const handleVerifyReport = (reportId: string) => {
    toast({
      title: "Report verified",
      description: "Report has been marked as verified.",
    });
  };

  const handleFlagReport = (reportId: string) => {
    toast({
      title: "Report flagged",
      description: "Report has been flagged for review.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Reports Management</h2>
        <p className="text-muted-foreground">
          View, verify, and manage sickness reports from all users in the system.
        </p>
      </div>

      <Tabs defaultValue="list" className="space-y-6">
        <TabsList>
          <TabsTrigger value="list">Reports List</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <TabsContent value="list" className="space-y-6">
          {/* Reports stats cards */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">16,532</div>
                <p className="text-xs text-muted-foreground">All time</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Cases</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,841</div>
                <p className="text-xs text-muted-foreground">Currently being tracked</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Flagged Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">147</div>
                <p className="text-xs text-muted-foreground">Require review</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Recent Submissions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">432</div>
                <p className="text-xs text-muted-foreground">In the last 7 days</p>
              </CardContent>
            </Card>
          </div>

          {/* Reports table with search and filters */}
          <Card>
            <CardHeader>
              <CardTitle>Sickness Reports</CardTitle>
              <CardDescription>
                Review and manage all submitted reports in the system
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col sm:flex-row gap-4 mb-6">
                <div className="relative flex-1">
                  <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search reports..."
                    className="pl-8"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                </div>
                <div className="flex gap-2 flex-wrap sm:flex-nowrap">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        Type
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedType("all")}>
                        All Types
                        {selectedType === "all" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedType("respiratory")}>
                        Respiratory
                        {selectedType === "respiratory" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedType("gastrointestinal")}>
                        Gastrointestinal
                        {selectedType === "gastrointestinal" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedType("viral")}>
                        Viral
                        {selectedType === "viral" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedType("allergic")}>
                        Allergic
                        {selectedType === "allergic" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        Status
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedStatus("all")}>
                        All Statuses
                        {selectedStatus === "all" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedStatus("active")}>
                        Active
                        {selectedStatus === "active" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedStatus("verified")}>
                        Verified
                        {selectedStatus === "verified" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedStatus("flagged")}>
                        Flagged
                        {selectedStatus === "flagged" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedStatus("resolved")}>
                        Resolved
                        {selectedStatus === "resolved" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="flex items-center gap-1">
                        <Filter className="h-4 w-4" />
                        Severity
                        <ChevronDown className="h-4 w-4 ml-1" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent>
                      <DropdownMenuItem onClick={() => setSelectedSeverity("all")}>
                        All Severities
                        {selectedSeverity === "all" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSeverity("mild")}>
                        Mild
                        {selectedSeverity === "mild" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSeverity("moderate")}>
                        Moderate
                        {selectedSeverity === "moderate" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSeverity("severe")}>
                        Severe
                        {selectedSeverity === "severe" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => setSelectedSeverity("critical")}>
                        Critical
                        {selectedSeverity === "critical" && <Check className="h-4 w-4 ml-2" />}
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              
              {/* Reports table */}
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Reported By</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Date</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredReports.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                          No reports match your search criteria
                        </TableCell>
                      </TableRow>
                    ) : (
                      filteredReports.map((report) => (
                        <TableRow key={report.id}>
                          <TableCell className="font-medium">
                            <div className="flex items-center gap-2">
                              <div className="rounded-full bg-primary/10 p-2">
                                <Virus className="h-4 w-4 text-primary" />
                              </div>
                              <span>{report.type}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarImage src={report.reportedBy.imageUrl} alt={report.reportedBy.name} />
                                <AvatarFallback>{report.reportedBy.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <div className="font-medium">{report.reportedBy.name}</div>
                                <div className="text-xs text-muted-foreground">{report.reportedBy.email}</div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4 text-muted-foreground" />
                              <span>{report.location}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <CalendarDays className="h-4 w-4 text-muted-foreground" />
                              <span>{report.date}</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${getSeverityColor(report.severity)}`}>
                              {report.severity.charAt(0).toUpperCase() + report.severity.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={`${getStatusColor(report.status)}`}>
                              {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
                            </Badge>
                          </TableCell>
                          <TableCell className="text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="sm">
                                  <MoreHorizontal className="h-4 w-4" />
                                  <span className="sr-only">Open menu</span>
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem onClick={() => handleViewReport(report)}>
                                  <Eye className="mr-2 h-4 w-4" />
                                  View Details
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                  <User className="mr-2 h-4 w-4" />
                                  View Reporter
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleVerifyReport(report.id)}>
                                  <Check className="mr-2 h-4 w-4 text-green-500" />
                                  Verify Report
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleFlagReport(report.id)}>
                                  <AlertCircle className="mr-2 h-4 w-4 text-orange-500" />
                                  Flag for Review
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => handleStatusChange(report.id, "resolved")}>
                                  <FileCheck className="mr-2 h-4 w-4 text-primary" />
                                  Mark as Resolved
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => handleDeleteReport(report.id)} className="text-destructive">
                                  <Trash2 className="mr-2 h-4 w-4" />
                                  Delete Report
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Showing <strong>{filteredReports.length}</strong> of <strong>{reports.length}</strong> reports
              </div>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="sm">
                  <Download className="h-4 w-4 mr-2" />
                  Export
                </Button>
                <Button variant="outline" size="sm">
                  <BarChart3 className="h-4 w-4 mr-2" />
                  Generate Analysis
                </Button>
              </div>
            </CardFooter>
          </Card>
          
          {/* Report Detail Dialog */}
          <Dialog open={showReportDetail} onOpenChange={setShowReportDetail}>
            <DialogContent className="max-w-3xl">
              <DialogHeader>
                <DialogTitle className="flex items-center gap-2">
                  <Virus className="h-5 w-5 text-primary" />
                  Report Details
                </DialogTitle>
                <DialogDescription>
                  Detailed view of the selected sickness report
                </DialogDescription>
              </DialogHeader>
              
              {selectedReport && (
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Report ID</h3>
                        <p className="text-sm font-mono">{selectedReport.id}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Report Date</h3>
                        <p className="flex items-center gap-1">
                          <CalendarDays className="h-4 w-4 text-muted-foreground" />
                          {selectedReport.date}
                        </p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Status</h3>
                        <Badge variant="outline" className={`${getStatusColor(selectedReport.status)} mt-1`}>
                          {selectedReport.status.charAt(0).toUpperCase() + selectedReport.status.slice(1)}
                        </Badge>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Illness Type</h3>
                        <p className="font-medium">{selectedReport.type}</p>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Severity</h3>
                        <Badge variant="outline" className={`${getSeverityColor(selectedReport.severity)} mt-1`}>
                          {selectedReport.severity.charAt(0).toUpperCase() + selectedReport.severity.slice(1)}
                        </Badge>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Location</h3>
                        <p className="flex items-center gap-1">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          {selectedReport.location}
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-4">
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Reported By</h3>
                        <div className="flex items-center gap-2 mt-1">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={selectedReport.reportedBy.imageUrl} alt={selectedReport.reportedBy.name} />
                            <AvatarFallback>{selectedReport.reportedBy.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{selectedReport.reportedBy.name}</div>
                            <div className="text-xs text-muted-foreground">{selectedReport.reportedBy.email}</div>
                          </div>
                        </div>
                      </div>
                      <div>
                        <h3 className="text-sm font-medium text-muted-foreground">Symptoms</h3>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {selectedReport.symptoms.map((symptom: string, index: number) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {symptom}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-md p-4">
                    <h3 className="font-medium mb-2">Report Description</h3>
                    <p className="text-sm text-muted-foreground">
                      The patient reported experiencing {selectedReport.symptoms.join(", ")} starting approximately 
                      3 days ago. Symptoms have been {selectedReport.severity} in intensity. The patient has 
                      {selectedReport.status === "resolved" ? " recovered fully." : " been advised to seek medical attention."}
                    </p>
                  </div>
                  
                  <div className="flex justify-between">
                    <div className="flex gap-2">
                      <Button variant="destructive" size="sm" onClick={() => handleDeleteReport(selectedReport.id)}>
                        <Trash2 className="h-4 w-4 mr-2" />
                        Delete
                      </Button>
                    </div>
                    <div className="flex gap-2">
                      {selectedReport.status !== "verified" && (
                        <Button variant="outline" size="sm" onClick={() => handleVerifyReport(selectedReport.id)}>
                          <Check className="h-4 w-4 mr-2" />
                          Verify
                        </Button>
                      )}
                      {selectedReport.status !== "flagged" && (
                        <Button variant="outline" size="sm" onClick={() => handleFlagReport(selectedReport.id)}>
                          <AlertCircle className="h-4 w-4 mr-2" />
                          Flag
                        </Button>
                      )}
                      {selectedReport.status !== "resolved" && (
                        <Button variant="outline" size="sm" onClick={() => handleStatusChange(selectedReport.id, "resolved")}>
                          <FileCheck className="h-4 w-4 mr-2" />
                          Resolve
                        </Button>
                      )}
                      <Button size="sm" onClick={() => setShowReportDetail(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </div>
              )}
            </DialogContent>
          </Dialog>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-6">
          {/* Analytics overview */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Active Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">2,841</div>
                <p className="text-xs text-muted-foreground">Across all regions</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Verified Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,465</div>
                <p className="text-xs text-muted-foreground">Confirmed by healthcare professionals</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Resolution Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">78.3%</div>
                <p className="text-xs text-muted-foreground">Average time: 8.2 days</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Reporting Compliance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">92.6%</div>
                <p className="text-xs text-muted-foreground">Of users submit complete reports</p>
              </CardContent>
            </Card>
          </div>

          {/* Charts */}
          <div className="grid gap-4 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Reports by Illness Type</CardTitle>
                <CardDescription>
                  Distribution of reports by illness category
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={reportsByTypeData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {reportsByTypeData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Region Comparison</CardTitle>
                <CardDescription>
                  Active vs. resolved reports by region
                </CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={reportsByRegionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="region" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar dataKey="active" name="Active" fill="#4361ee" />
                    <Bar dataKey="resolved" name="Resolved" fill="#3f8efc" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Report Trends</CardTitle>
              <CardDescription>
                New reports vs. resolved cases over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={reportTrendsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="newReports" name="New Reports" stroke="#4361ee" strokeWidth={2} />
                  <Line type="monotone" dataKey="resolved" name="Resolved Cases" stroke="#f72585" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Severity Distribution Analysis</CardTitle>
              <CardDescription>
                Breakdown of cases by severity level and region
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Region</TableHead>
                      <TableHead>Mild</TableHead>
                      <TableHead>Moderate</TableHead>
                      <TableHead>Severe</TableHead>
                      <TableHead>Critical</TableHead>
                      <TableHead className="text-right">Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className="font-medium">North Region</TableCell>
                      <TableCell>421</TableCell>
                      <TableCell>238</TableCell>
                      <TableCell>87</TableCell>
                      <TableCell>12</TableCell>
                      <TableCell className="text-right">758</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">South Region</TableCell>
                      <TableCell>356</TableCell>
                      <TableCell>185</TableCell>
                      <TableCell>62</TableCell>
                      <TableCell>8</TableCell>
                      <TableCell className="text-right">611</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">East Region</TableCell>
                      <TableCell>312</TableCell>
                      <TableCell>165</TableCell>
                      <TableCell>54</TableCell>
                      <TableCell>5</TableCell>
                      <TableCell className="text-right">536</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">West Region</TableCell>
                      <TableCell>287</TableCell>
                      <TableCell>142</TableCell>
                      <TableCell>42</TableCell>
                      <TableCell>3</TableCell>
                      <TableCell className="text-right">474</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className="font-medium">Central Area</TableCell>
                      <TableCell>264</TableCell>
                      <TableCell>128</TableCell>
                      <TableCell>35</TableCell>
                      <TableCell>2</TableCell>
                      <TableCell className="text-right">429</TableCell>
                    </TableRow>
                    <TableRow className="bg-muted/50">
                      <TableCell className="font-medium">Total</TableCell>
                      <TableCell className="font-medium">1,640</TableCell>
                      <TableCell className="font-medium">858</TableCell>
                      <TableCell className="font-medium">280</TableCell>
                      <TableCell className="font-medium">30</TableCell>
                      <TableCell className="text-right font-bold">2,808</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <div className="text-sm text-muted-foreground">
                Data last updated: July 6, 2025
              </div>
              <Button variant="outline" size="sm">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminReports;
