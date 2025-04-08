import { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
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
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  AlertTriangle, 
  Cpu, 
  DatabaseBackup, 
  LockKeyhole, 
  Mail, 
  MessageSquare, 
  RefreshCw, 
  RefreshCcw, 
  Save, 
  Server, 
  Settings as SettingsIcon,
  Shield, 
  UserCog, 
  Zap 
} from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useToast } from "@/hooks/use-toast";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const systemSettingsSchema = z.object({
  siteName: z.string().min(2, "Site name must be at least 2 characters"),
  adminEmail: z.string().email("Please enter a valid email address"),
  dataRetentionDays: z.number().min(30, "Data retention must be at least 30 days").max(3650, "Data retention cannot exceed 10 years"),
  userRegistration: z.boolean().default(true),
  requireApproval: z.boolean().default(false),
  publicDataSharing: z.boolean().default(true),
  maintenanceMode: z.boolean().default(false),
  loggingLevel: z.string().default("info"),
});

const notificationSettingsSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  criticalAlertThreshold: z.number().min(1, "Threshold must be at least 1").max(100, "Threshold cannot exceed 100"),
  notifyNewRegistrations: z.boolean().default(true),
  notifySystemIssues: z.boolean().default(true),
  dailyReportSummary: z.boolean().default(true),
  emailFrom: z.string().email("Please enter a valid email address"),
  emailServer: z.string().min(1, "SMTP server is required"),
});

const securitySettingsSchema = z.object({
  twoFactorAuth: z.boolean().default(false),
  passwordMinLength: z.number().min(8, "Password must be at least 8 characters").max(32, "Password cannot exceed 32 characters"),
  passwordExpireDays: z.number().min(0, "Password expiry must be a positive number").max(365, "Password expiry cannot exceed 365 days"),
  sessionTimeout: z.number().min(5, "Session timeout must be at least 5 minutes").max(1440, "Session timeout cannot exceed 1440 minutes (24 hours)"),
  loginAttempts: z.number().min(1, "Login attempts must be at least 1").max(10, "Login attempts cannot exceed 10"),
  ipBlocking: z.boolean().default(true),
});

type SystemSettingsValues = z.infer<typeof systemSettingsSchema>;
type NotificationSettingsValues = z.infer<typeof notificationSettingsSchema>;
type SecuritySettingsValues = z.infer<typeof securitySettingsSchema>;

const AdminSettings = () => {
  const { toast } = useToast();
  const [isBackupInProgress, setIsBackupInProgress] = useState(false);
  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);
  const [isMaintenanceModeDialogOpen, setIsMaintenanceModeDialogOpen] = useState(false);
  
  const systemForm = useForm<SystemSettingsValues>({
    resolver: zodResolver(systemSettingsSchema),
    defaultValues: {
      siteName: "Sickness Recording and Reporting System",
      adminEmail: "admin@srrs.example.com",
      dataRetentionDays: 365,
      userRegistration: true,
      requireApproval: false,
      publicDataSharing: true,
      maintenanceMode: false,
      loggingLevel: "info",
    },
  });

  const notificationForm = useForm<NotificationSettingsValues>({
    resolver: zodResolver(notificationSettingsSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      criticalAlertThreshold: 10,
      notifyNewRegistrations: true,
      notifySystemIssues: true,
      dailyReportSummary: true,
      emailFrom: "notifications@srrs.example.com",
      emailServer: "smtp.example.com",
    },
  });

  const securityForm = useForm<SecuritySettingsValues>({
    resolver: zodResolver(securitySettingsSchema),
    defaultValues: {
      twoFactorAuth: false,
      passwordMinLength: 10,
      passwordExpireDays: 90,
      sessionTimeout: 60,
      loginAttempts: 5,
      ipBlocking: true,
    },
  });

  function onSystemSubmit(data: SystemSettingsValues) {
    console.log("System settings:", data);
    toast({
      title: "System settings saved",
      description: "Your system settings have been updated successfully.",
    });
  }

  function onNotificationSubmit(data: NotificationSettingsValues) {
    console.log("Notification settings:", data);
    toast({
      title: "Notification settings saved",
      description: "Your notification settings have been updated successfully.",
    });
  }

  function onSecuritySubmit(data: SecuritySettingsValues) {
    console.log("Security settings:", data);
    toast({
      title: "Security settings saved",
      description: "Your security settings have been updated successfully.",
    });
  }

  const handleBackupSystem = () => {
    setIsBackupInProgress(true);
    
    // Simulate backup process
    setTimeout(() => {
      setIsBackupInProgress(false);
      
      toast({
        title: "Backup completed",
        description: "System data has been successfully backed up.",
      });
    }, 3000);
  };

  const handleRestoreSystem = () => {
    setIsRestoreDialogOpen(false);
    
    toast({
      title: "Restore initiated",
      description: "System restore has been started. This may take several minutes.",
    });
    
    // In a real application, this would trigger a system restore process
  };

  const handleToggleMaintenanceMode = () => {
    const newValue = !systemForm.getValues().maintenanceMode;
    
    systemForm.setValue("maintenanceMode", newValue);
    setIsMaintenanceModeDialogOpen(false);
    
    toast({
      title: newValue ? "Maintenance mode activated" : "Maintenance mode deactivated",
      description: newValue 
        ? "The system is now in maintenance mode. Only administrators can access it."
        : "The system is now accessible to all users.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Admin Settings</h2>
        <p className="text-muted-foreground">
          Configure system-wide settings, notifications, and security preferences.
        </p>
      </div>

      <Tabs defaultValue="system" className="space-y-6">
        <TabsList>
          <TabsTrigger value="system">System</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
        </TabsList>
        
        {/* System Settings */}
        <TabsContent value="system" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <SettingsIcon className="h-5 w-5" />
                <CardTitle>System Settings</CardTitle>
              </div>
              <CardDescription>
                Configure general system settings and behavior
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...systemForm}>
                <form onSubmit={systemForm.handleSubmit(onSystemSubmit)} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={systemForm.control}
                      name="siteName"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Site Name</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            The name displayed in the header and emails
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={systemForm.control}
                      name="adminEmail"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Administrator Email</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormDescription>
                            Primary contact for system notifications
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <FormField
                    control={systemForm.control}
                    name="dataRetentionDays"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Data Retention Period (days)</FormLabel>
                        <FormControl>
                          <Input 
                            type="number" 
                            {...field} 
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormDescription>
                          How long to keep inactive data in the system (minimum 30 days)
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">User Registration and Access</h3>
                    
                    <FormField
                      control={systemForm.control}
                      name="userRegistration"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Allow User Registration</FormLabel>
                            <FormDescription>
                              Enable new users to create accounts
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={systemForm.control}
                      name="requireApproval"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Require Admin Approval</FormLabel>
                            <FormDescription>
                              New accounts must be approved by an administrator
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={systemForm.control}
                      name="publicDataSharing"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Enable Public Data Sharing</FormLabel>
                            <FormDescription>
                              Allow anonymous access to aggregated health data
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="grid gap-6 md:grid-cols-2">
                    <FormField
                      control={systemForm.control}
                      name="loggingLevel"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Logging Level</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select logging level" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="error">Error Only</SelectItem>
                              <SelectItem value="warn">Warning</SelectItem>
                              <SelectItem value="info">Information</SelectItem>
                              <SelectItem value="debug">Debug</SelectItem>
                              <SelectItem value="trace">Trace (Verbose)</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormDescription>
                            How detailed system logs should be
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={systemForm.control}
                      name="maintenanceMode"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Maintenance Mode</FormLabel>
                            <FormDescription>
                              Temporarily restrict access to administrators only
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Dialog open={isMaintenanceModeDialogOpen} onOpenChange={setIsMaintenanceModeDialogOpen}>
                              <DialogTrigger asChild>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={() => setIsMaintenanceModeDialogOpen(true)}
                                />
                              </DialogTrigger>
                              <DialogContent>
                                <DialogHeader>
                                  <DialogTitle>
                                    {field.value ? "Disable Maintenance Mode?" : "Enable Maintenance Mode?"}
                                  </DialogTitle>
                                  <DialogDescription>
                                    {field.value 
                                      ? "This will make the system accessible to all users again."
                                      : "This will restrict access to administrators only. All other users will see a maintenance page."}
                                  </DialogDescription>
                                </DialogHeader>
                                <div className="py-4">
                                  <Alert>
                                    <AlertTriangle className="h-4 w-4" />
                                    <AlertTitle>Warning</AlertTitle>
                                    <AlertDescription>
                                      {field.value 
                                        ? "Any ongoing maintenance tasks should be completed first."
                                        : "All active user sessions will be terminated."}
                                    </AlertDescription>
                                  </Alert>
                                </div>
                                <DialogFooter>
                                  <Button variant="outline" onClick={() => setIsMaintenanceModeDialogOpen(false)}>
                                    Cancel
                                  </Button>
                                  <Button 
                                    variant={field.value ? "default" : "destructive"} 
                                    onClick={handleToggleMaintenanceMode}
                                  >
                                    {field.value ? "Disable Maintenance Mode" : "Enable Maintenance Mode"}
                                  </Button>
                                </DialogFooter>
                              </DialogContent>
                            </Dialog>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save System Settings
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Notification Settings */}
        <TabsContent value="notifications" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Mail className="h-5 w-5" />
                <CardTitle>Notification Settings</CardTitle>
              </div>
              <CardDescription>
                Configure system notifications and alerts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...notificationForm}>
                <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Channels</h3>
                    
                    <FormField
                      control={notificationForm.control}
                      name="emailNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Email Notifications</FormLabel>
                            <FormDescription>
                              Send notifications via email
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="smsNotifications"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>SMS Notifications</FormLabel>
                            <FormDescription>
                              Send critical alerts via SMS
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Notification Triggers</h3>
                    
                    <FormField
                      control={notificationForm.control}
                      name="criticalAlertThreshold"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Critical Alert Threshold</FormLabel>
                          <FormControl>
                            <Input 
                              type="number" 
                              {...field} 
                              onChange={(e) => field.onChange(parseInt(e.target.value))}
                            />
                          </FormControl>
                          <FormDescription>
                            Number of similar reports required to trigger a critical alert
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="notifyNewRegistrations"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>New User Registrations</FormLabel>
                            <FormDescription>
                              Notify admins when new users register
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="notifySystemIssues"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>System Issues</FormLabel>
                            <FormDescription>
                              Notify admins about system errors and warnings
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={notificationForm.control}
                      name="dailyReportSummary"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Daily Report Summary</FormLabel>
                            <FormDescription>
                              Send a daily summary of new reports
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Email Configuration</h3>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={notificationForm.control}
                        name="emailFrom"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>From Email Address</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              The email address notifications will be sent from
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={notificationForm.control}
                        name="emailServer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>SMTP Server</FormLabel>
                            <FormControl>
                              <Input {...field} />
                            </FormControl>
                            <FormDescription>
                              Your outgoing mail server address
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <div className="flex justify-end">
                      <Button variant="outline" className="mr-2">
                        Test Email
                      </Button>
                    </div>
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      <Save className="mr-2 h-4 w-4" />
                      Save Notification Settings
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5" />
                <CardTitle>Security Settings</CardTitle>
              </div>
              <CardDescription>
                Configure system security and access controls
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...securityForm}>
                <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Authentication Settings</h3>
                    
                    <FormField
                      control={securityForm.control}
                      name="twoFactorAuth"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Require Two-Factor Authentication</FormLabel>
                            <FormDescription>
                              Require all users to set up 2FA for their accounts
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={securityForm.control}
                        name="passwordMinLength"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Minimum Password Length</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Minimum characters required for passwords
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="passwordExpireDays"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Password Expiry (days)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Days before users must change passwords (0 for never)
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                  </div>
                  
                  <Separator />
                  
                  <div className="space-y-4">
                    <h3 className="text-lg font-medium">Session and Access Controls</h3>
                    
                    <div className="grid gap-6 md:grid-cols-2">
                      <FormField
                        control={securityForm.control}
                        name="sessionTimeout"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Session Timeout (minutes)</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              How long before inactive users are logged out
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      
                      <FormField
                        control={securityForm.control}
                        name="loginAttempts"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Failed Login Attempts</FormLabel>
                            <FormControl>
                              <Input 
                                type="number" 
                                {...field} 
                                onChange={(e) => field.onChange(parseInt(e.target.value))}
                              />
                            </FormControl>
                            <FormDescription>
                              Number of attempts before account is locked
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    
                    <FormField
                      control={securityForm.control}
                      name="ipBlocking"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Enable IP Blocking</FormLabel>
                            <FormDescription>
                              Automatically block suspicious IP addresses
                            </FormDescription>
                          </div>
                          <FormControl>
                            <Switch
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  </div>
                  
                  <div className="flex justify-end">
                    <Button type="submit">
                      <LockKeyhole className="mr-2 h-4 w-4" />
                      Save Security Settings
                    </Button>
                  </div>
                </form>
              </Form>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <UserCog className="h-5 w-5" />
                <CardTitle>Administrative Access</CardTitle>
              </div>
              <CardDescription>
                Manage administrative access and permissions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Role</TableHead>
                      <TableHead>Last Login</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>SR</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">Sofia Rodriguez</div>
                            <div className="text-xs text-muted-foreground">sofia.rodriguez@example.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-destructive/10 text-destructive border-destructive/20">
                          Super Admin
                        </Badge>
                      </TableCell>
                      <TableCell>Just now</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Avatar className="h-8 w-8">
                            <AvatarFallback>WC</AvatarFallback>
                          </Avatar>
                          <div>
                            <div className="font-medium">William Chen</div>
                            <div className="text-xs text-muted-foreground">william.chen@example.com</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-blue-500/10 text-blue-500 border-blue-500/20">
                          Admin
                        </Badge>
                      </TableCell>
                      <TableCell>2 days ago</TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
              
              <div className="mt-4">
                <Button variant="outline" size="sm">
                  Manage Administrators
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        {/* Maintenance */}
        <TabsContent value="maintenance" className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <DatabaseBackup className="h-5 w-5" />
                <CardTitle>Backup and Restore</CardTitle>
              </div>
              <CardDescription>
                Manage system data backups and restoration
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-2">Create Backup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Create a complete backup of all system data
                  </p>
                  <Button 
                    onClick={handleBackupSystem} 
                    disabled={isBackupInProgress}
                  >
                    {isBackupInProgress ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Backing up...
                      </>
                    ) : (
                      <>
                        <DatabaseBackup className="mr-2 h-4 w-4" />
                        Backup System
                      </>
                    )}
                  </Button>
                </div>
                
                <div className="rounded-md border p-4">
                  <h3 className="text-lg font-medium mb-2">Restore from Backup</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Restore the system from a previous backup
                  </p>
                  <Dialog open={isRestoreDialogOpen} onOpenChange={setIsRestoreDialogOpen}>
                    <DialogTrigger asChild>
                      <Button variant="outline">
                        <RefreshCcw className="mr-2 h-4 w-4" />
                        Restore System
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Restore System from Backup</DialogTitle>
                        <DialogDescription>
                          This will replace all current data with data from the selected backup.
                          This action cannot be undone.
                        </DialogDescription>
                      </DialogHeader>
                      <div className="py-4">
                        <Select>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a backup" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="backup1">July 6, 2025 (Auto Backup)</SelectItem>
                            <SelectItem value="backup2">July 5, 2025 (Manual Backup)</SelectItem>
                            <SelectItem value="backup3">July 4, 2025 (Auto Backup)</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        <Alert className="mt-4">
                          <AlertTriangle className="h-4 w-4" />
                          <AlertTitle>Warning</AlertTitle>
                          <AlertDescription>
                            The system will be unavailable during the restore process. All users will be logged out.
                          </AlertDescription>
                        </Alert>
                      </div>
                      <DialogFooter>
                        <Button variant="outline" onClick={() => setIsRestoreDialogOpen(false)}>
                          Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleRestoreSystem}>
                          Proceed with Restore
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
              
              <div className="rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Backup Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell>July 6, 2025 08:00</TableCell>
                      <TableCell>Automatic</TableCell>
                      <TableCell>2.4 GB</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Complete
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="mr-2">
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>July 5, 2025 14:32</TableCell>
                      <TableCell>Manual</TableCell>
                      <TableCell>2.3 GB</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Complete
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="mr-2">
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell>July 4, 2025 08:00</TableCell>
                      <TableCell>Automatic</TableCell>
                      <TableCell>2.3 GB</TableCell>
                      <TableCell>
                        <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                          Complete
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button variant="ghost" size="sm" className="mr-2">
                          Download
                        </Button>
                        <Button variant="ghost" size="sm">
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Cpu className="h-5 w-5" />
                <CardTitle>System Status</CardTitle>
              </div>
              <CardDescription>
                Current system performance and resource usage
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">CPU Usage</span>
                      <span className="text-sm text-muted-foreground">24%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[24%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Memory Usage</span>
                      <span className="text-sm text-muted-foreground">42%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[42%]"></div>
                    </div>
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Disk Space</span>
                      <span className="text-sm text-muted-foreground">61%</span>
                    </div>
                    <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
                      <div className="h-full bg-primary rounded-full w-[61%]"></div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <Server className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Database Status</p>
                        <p className="text-xs text-muted-foreground">Connected, Healthy</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <MessageSquare className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Notification Service</p>
                        <p className="text-xs text-muted-foreground">Active, Processing</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Online
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between border rounded-md p-3">
                    <div className="flex items-center gap-2">
                      <Zap className="h-5 w-5 text-muted-foreground" />
                      <div>
                        <p className="text-sm font-medium">Processing Queue</p>
                        <p className="text-xs text-muted-foreground">12 items pending</p>
                      </div>
                    </div>
                    <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/20">
                      Active
                    </Badge>
                  </div>
                </div>
              </div>
              
              <div className="mt-6">
                <Button variant="outline">
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Refresh Status
                </Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminSettings;
