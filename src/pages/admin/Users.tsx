
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
import { Archive, Check, ChevronDown, Download, FileText, Filter, MoreHorizontal, Plus, Search, Shield, Star, Trash2, User, UserPlus, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

// Sample user data
const users = [
  {
    id: "u1",
    name: "Olivia Martin",
    email: "olivia.martin@example.com",
    role: "user",
    status: "active",
    reportsCount: 24,
    lastActive: "2 hours ago",
    location: "North Region",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "u2",
    name: "Jackson Lee",
    email: "jackson.lee@example.com",
    role: "user",
    status: "active",
    reportsCount: 13,
    lastActive: "4 hours ago",
    location: "East Region",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "u3",
    name: "Isabella Nguyen",
    email: "isabella.nguyen@example.com",
    role: "researcher",
    status: "active",
    reportsCount: 42,
    lastActive: "1 day ago",
    location: "South Region",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "u4",
    name: "William Chen",
    email: "william.chen@example.com",
    role: "healthcare",
    status: "active",
    reportsCount: 31,
    lastActive: "2 days ago",
    location: "West Region",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "u5",
    name: "Sofia Rodriguez",
    email: "sofia.rodriguez@example.com",
    role: "admin",
    status: "active",
    reportsCount: 56,
    lastActive: "Just now",
    location: "Central Area",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "u6",
    name: "Ethan Johnson",
    email: "ethan.johnson@example.com",
    role: "user",
    status: "inactive",
    reportsCount: 7,
    lastActive: "2 weeks ago",
    location: "North Region",
    imageUrl: "/placeholder.svg",
  },
  {
    id: "u7",
    name: "Mia Williams",
    email: "mia.williams@example.com",
    role: "researcher",
    status: "pending",
    reportsCount: 0,
    lastActive: "Never",
    location: "East Region",
    imageUrl: "/placeholder.svg",
  },
];

// Get color based on role
const getRoleColor = (role: string) => {
  switch (role) {
    case "admin":
      return "bg-destructive/10 text-destructive border-destructive/20";
    case "healthcare":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "researcher":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

// Get color based on status
const getStatusColor = (status: string) => {
  switch (status) {
    case "active":
      return "bg-green-500/10 text-green-500 border-green-500/20";
    case "inactive":
      return "bg-orange-500/10 text-orange-500 border-orange-500/20";
    case "pending":
      return "bg-blue-500/10 text-blue-500 border-blue-500/20";
    case "suspended":
      return "bg-destructive/10 text-destructive border-destructive/20";
    default:
      return "bg-secondary text-secondary-foreground";
  }
};

const AdminUsers = () => {
  const { toast } = useToast();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRole, setSelectedRole] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [isAddUserDialogOpen, setIsAddUserDialogOpen] = useState(false);
  
  // Filter users based on search query, role, and status
  const filteredUsers = users.filter(user => {
    // Search filter
    const matchesSearch = 
      searchQuery === "" || 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.location.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Role filter
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    
    // Status filter
    const matchesStatus = selectedStatus === "all" || user.status === selectedStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const handleAddUser = () => {
    toast({
      title: "User added",
      description: "New user has been created successfully.",
    });
    setIsAddUserDialogOpen(false);
  };

  const handleStatusChange = (userId: string, newStatus: string) => {
    toast({
      title: "Status updated",
      description: `User status has been changed to ${newStatus}.`,
    });
  };

  const handleRoleChange = (userId: string, newRole: string) => {
    toast({
      title: "Role updated",
      description: `User role has been changed to ${newRole}.`,
    });
  };

  const handleDeleteUser = (userId: string) => {
    toast({
      title: "User deleted",
      description: "User has been removed from the system.",
      variant: "destructive",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">User Management</h2>
        <p className="text-muted-foreground">
          View and manage user accounts, roles, and permissions.
        </p>
      </div>

      {/* User stats cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,841</div>
            <p className="text-xs text-muted-foreground">+7% from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,584</div>
            <p className="text-xs text-muted-foreground">91% of total users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">New Registrations</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">147</div>
            <p className="text-xs text-muted-foreground">In the last 30 days</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium">Healthcare Professionals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">432</div>
            <p className="text-xs text-muted-foreground">15% of total users</p>
          </CardContent>
        </Card>
      </div>

      {/* Users table with search and filters */}
      <Card>
        <CardHeader>
          <CardTitle>System Users</CardTitle>
          <CardDescription>
            Manage registered users and their access permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="flex items-center gap-1">
                    <Filter className="h-4 w-4" />
                    Role
                    <ChevronDown className="h-4 w-4 ml-1" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem onClick={() => setSelectedRole("all")}>
                    All Roles
                    {selectedRole === "all" && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedRole("user")}>
                    User
                    {selectedRole === "user" && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedRole("healthcare")}>
                    Healthcare
                    {selectedRole === "healthcare" && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedRole("researcher")}>
                    Researcher
                    {selectedRole === "researcher" && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedRole("admin")}>
                    Admin
                    {selectedRole === "admin" && <Check className="h-4 w-4 ml-2" />}
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
                  <DropdownMenuItem onClick={() => setSelectedStatus("inactive")}>
                    Inactive
                    {selectedStatus === "inactive" && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("pending")}>
                    Pending
                    {selectedStatus === "pending" && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setSelectedStatus("suspended")}>
                    Suspended
                    {selectedStatus === "suspended" && <Check className="h-4 w-4 ml-2" />}
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              
              <Dialog open={isAddUserDialogOpen} onOpenChange={setIsAddUserDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="flex items-center gap-1">
                    <UserPlus className="h-4 w-4" />
                    <span className="hidden sm:inline">Add User</span>
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Add New User</DialogTitle>
                    <DialogDescription>
                      Create a new user account in the system
                    </DialogDescription>
                  </DialogHeader>
                  
                  <div className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <label htmlFor="name" className="text-sm font-medium">
                        Full Name
                      </label>
                      <Input id="name" placeholder="Enter user's full name" />
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="email" className="text-sm font-medium">
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="user@example.com" />
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="grid gap-2">
                        <label htmlFor="role" className="text-sm font-medium">
                          Role
                        </label>
                        <Select defaultValue="user">
                          <SelectTrigger id="role">
                            <SelectValue placeholder="Select role" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="user">User</SelectItem>
                            <SelectItem value="healthcare">Healthcare Professional</SelectItem>
                            <SelectItem value="researcher">Researcher</SelectItem>
                            <SelectItem value="admin">Administrator</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      
                      <div className="grid gap-2">
                        <label htmlFor="location" className="text-sm font-medium">
                          Location
                        </label>
                        <Select defaultValue="north">
                          <SelectTrigger id="location">
                            <SelectValue placeholder="Select location" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="north">North Region</SelectItem>
                            <SelectItem value="south">South Region</SelectItem>
                            <SelectItem value="east">East Region</SelectItem>
                            <SelectItem value="west">West Region</SelectItem>
                            <SelectItem value="central">Central Area</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    
                    <div className="grid gap-2">
                      <label htmlFor="password" className="text-sm font-medium">
                        Initial Password
                      </label>
                      <Input id="password" type="password" placeholder="Set a temporary password" />
                      <p className="text-xs text-muted-foreground">
                        User will be prompted to change on first login
                      </p>
                    </div>
                  </div>
                  
                  <DialogFooter>
                    <Button variant="outline" onClick={() => setIsAddUserDialogOpen(false)}>
                      Cancel
                    </Button>
                    <Button onClick={handleAddUser}>
                      Add User
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>
            </div>
          </div>
          
          {/* Users table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>User</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Reports</TableHead>
                  <TableHead>Last Active</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredUsers.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="text-center py-6 text-muted-foreground">
                      No users match your search criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredUsers.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarImage src={user.imageUrl} alt={user.name} />
                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">{user.name}</div>
                            <div className="text-xs text-muted-foreground">{user.email}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getRoleColor(user.role)}`}>
                          {user.role.charAt(0).toUpperCase() + user.role.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={`${getStatusColor(user.status)}`}>
                          {user.status.charAt(0).toUpperCase() + user.status.slice(1)}
                        </Badge>
                      </TableCell>
                      <TableCell>{user.reportsCount}</TableCell>
                      <TableCell>{user.lastActive}</TableCell>
                      <TableCell>{user.location}</TableCell>
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
                            <DropdownMenuItem>
                              <User className="mr-2 h-4 w-4" />
                              View Profile
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                              <FileText className="mr-2 h-4 w-4" />
                              View Reports
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Change Role</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, "user")}>
                              <span>User</span>
                              {user.role === "user" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, "healthcare")}>
                              <span>Healthcare</span>
                              {user.role === "healthcare" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, "researcher")}>
                              <span>Researcher</span>
                              {user.role === "researcher" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleRoleChange(user.id, "admin")}>
                              <Shield className="mr-2 h-4 w-4" />
                              <span>Administrator</span>
                              {user.role === "admin" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuLabel>Change Status</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "active")}>
                              <span className="text-green-500">Set Active</span>
                              {user.status === "active" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "inactive")}>
                              <span className="text-orange-500">Set Inactive</span>
                              {user.status === "inactive" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleStatusChange(user.id, "suspended")}>
                              <span className="text-destructive">Suspend</span>
                              {user.status === "suspended" && <Check className="ml-auto h-4 w-4" />}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => handleDeleteUser(user.id)} className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete User
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
            Showing <strong>{filteredUsers.length}</strong> of <strong>{users.length}</strong> users
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Archive className="h-4 w-4 mr-2" />
              Archive
            </Button>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AdminUsers;
