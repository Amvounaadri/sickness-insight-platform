
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Separator } from "@/components/ui/separator";
import { BellRing, Shield, Smartphone } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const notificationFormSchema = z.object({
  emailNotifications: z.boolean().default(true),
  smsNotifications: z.boolean().default(false),
  notifyOnNewReports: z.boolean().default(true),
  notifyOnRegionalAlerts: z.boolean().default(true),
  notifyOnUpdates: z.boolean().default(false),
  phoneNumber: z.string().optional(),
});

const privacyFormSchema = z.object({
  dataSharing: z.string().default("anonymized"),
  locationPrecision: z.string().default("city"),
  profileVisibility: z.string().default("registered"),
});

const securityFormSchema = z.object({
  currentPassword: z.string().min(1, "Current password is required"),
  newPassword: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .optional()
    .or(z.literal("")),
  confirmPassword: z.string().optional().or(z.literal("")),
}).refine((data) => {
  if (data.newPassword && data.newPassword !== data.confirmPassword) {
    return false;
  }
  return true;
}, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type NotificationFormValues = z.infer<typeof notificationFormSchema>;
type PrivacyFormValues = z.infer<typeof privacyFormSchema>;
type SecurityFormValues = z.infer<typeof securityFormSchema>;

const Settings = () => {
  const { toast } = useToast();
  
  const notificationForm = useForm<NotificationFormValues>({
    resolver: zodResolver(notificationFormSchema),
    defaultValues: {
      emailNotifications: true,
      smsNotifications: false,
      notifyOnNewReports: true,
      notifyOnRegionalAlerts: true,
      notifyOnUpdates: false,
      phoneNumber: "",
    },
  });

  const privacyForm = useForm<PrivacyFormValues>({
    resolver: zodResolver(privacyFormSchema),
    defaultValues: {
      dataSharing: "anonymized",
      locationPrecision: "city",
      profileVisibility: "registered",
    },
  });

  const securityForm = useForm<SecurityFormValues>({
    resolver: zodResolver(securityFormSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  function onNotificationSubmit(data: NotificationFormValues) {
    console.log("Notification settings:", data);
    toast({
      title: "Notification settings saved",
      description: "Your notification preferences have been updated.",
    });
  }

  function onPrivacySubmit(data: PrivacyFormValues) {
    console.log("Privacy settings:", data);
    toast({
      title: "Privacy settings saved",
      description: "Your privacy preferences have been updated.",
    });
  }

  function onSecuritySubmit(data: SecurityFormValues) {
    console.log("Security settings:", data);
    toast({
      title: "Password updated",
      description: "Your password has been changed successfully.",
    });
    securityForm.reset({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  }

  const smsEnabled = notificationForm.watch("smsNotifications");

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">Settings</h2>
        <p className="text-muted-foreground">
          Manage your account settings and preferences.
        </p>
      </div>

      <div className="grid gap-6">
        {/* Notification Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <BellRing className="h-5 w-5" />
              <CardTitle>Notification Settings</CardTitle>
            </div>
            <CardDescription>
              Configure how and when you receive notifications
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...notificationForm}>
              <form onSubmit={notificationForm.handleSubmit(onNotificationSubmit)} className="space-y-6">
                <div className="space-y-4">
                  <FormField
                    control={notificationForm.control}
                    name="emailNotifications"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between">
                        <div className="space-y-0.5">
                          <FormLabel>Email Notifications</FormLabel>
                          <FormDescription>
                            Receive notifications via email
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
                            Receive notifications via text message
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
                  
                  {smsEnabled && (
                    <FormField
                      control={notificationForm.control}
                      name="phoneNumber"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Phone Number</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <Smartphone className="h-4 w-4 mr-2 text-muted-foreground" />
                              <Input placeholder="+1 (555) 123-4567" {...field} />
                            </div>
                          </FormControl>
                          <FormDescription>
                            Required for SMS notifications
                          </FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                </div>
                
                <Separator />
                
                <div className="space-y-2">
                  <h3 className="text-lg font-medium">Notification Types</h3>
                  <p className="text-sm text-muted-foreground">
                    Select which types of notifications you want to receive
                  </p>
                  
                  <div className="grid gap-4 py-2">
                    <FormField
                      control={notificationForm.control}
                      name="notifyOnNewReports"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>New Regional Reports</FormLabel>
                            <FormDescription>
                              When new sickness reports are submitted in your area
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
                      name="notifyOnRegionalAlerts"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>Health Alerts</FormLabel>
                            <FormDescription>
                              Emergency health alerts and warnings in your region
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
                      name="notifyOnUpdates"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-center justify-between">
                          <div className="space-y-0.5">
                            <FormLabel>System Updates</FormLabel>
                            <FormDescription>
                              New features and improvements to the platform
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
                </div>
                
                <div className="flex justify-end">
                  <Button type="submit">Save Notification Settings</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Privacy Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Privacy & Data Settings</CardTitle>
            </div>
            <CardDescription>
              Manage how your information is used and shared
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...privacyForm}>
              <form onSubmit={privacyForm.handleSubmit(onPrivacySubmit)} className="space-y-6">
                <FormField
                  control={privacyForm.control}
                  name="dataSharing"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Data Sharing</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select data sharing level" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="anonymized">Anonymized Data Only</SelectItem>
                          <SelectItem value="aggregated">Aggregated Statistics</SelectItem>
                          <SelectItem value="full">Full Research Access</SelectItem>
                          <SelectItem value="none">No Data Sharing</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Control how your sickness reports can be used for health research
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={privacyForm.control}
                  name="locationPrecision"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Location Precision</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select location precision" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="exact">Exact Location</SelectItem>
                          <SelectItem value="neighborhood">Neighborhood Level</SelectItem>
                          <SelectItem value="city">City Level</SelectItem>
                          <SelectItem value="region">Region/State Level</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Select how precisely your location is recorded in reports
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={privacyForm.control}
                  name="profileVisibility"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Profile Visibility</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select profile visibility" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="public">Public</SelectItem>
                          <SelectItem value="registered">Registered Users Only</SelectItem>
                          <SelectItem value="private">Private</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormDescription>
                        Who can see your profile information
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button type="submit">Save Privacy Settings</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Security Settings */}
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-2">
              <Shield className="h-5 w-5" />
              <CardTitle>Security Settings</CardTitle>
            </div>
            <CardDescription>
              Manage your account security and password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...securityForm}>
              <form onSubmit={securityForm.handleSubmit(onSecuritySubmit)} className="space-y-6">
                <FormField
                  control={securityForm.control}
                  name="currentPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Current Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={securityForm.control}
                  name="newPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormDescription>
                        At least 8 characters with a mix of letters, numbers, and symbols
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <FormField
                  control={securityForm.control}
                  name="confirmPassword"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Confirm New Password</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="flex justify-end">
                  <Button type="submit">Update Password</Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
        
        {/* Danger Zone */}
        <Card className="border-destructive">
          <CardHeader>
            <CardTitle className="text-destructive">Danger Zone</CardTitle>
            <CardDescription>
              Irreversible account actions
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-md border border-destructive/20 bg-destructive/5 p-4">
              <div className="flex flex-row items-start gap-4">
                <div>
                  <h4 className="text-sm font-medium text-destructive">Delete Account</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Permanently delete your account and all of your data. This action cannot be undone.
                  </p>
                </div>
                <Button variant="destructive" size="sm" className="ml-auto">
                  Delete Account
                </Button>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <div className="flex flex-row items-start gap-4">
                <div>
                  <h4 className="text-sm font-medium">Export Your Data</h4>
                  <p className="text-sm text-muted-foreground mt-1">
                    Download a copy of all your personal data and reports
                  </p>
                </div>
                <Button variant="outline" size="sm" className="ml-auto">
                  Export Data
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Settings;
