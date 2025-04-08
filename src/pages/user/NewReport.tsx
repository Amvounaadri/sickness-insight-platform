import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { CalendarIcon, Info } from "lucide-react";
import { 
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
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
import { cn } from "@/lib/utils";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Progress } from "@/components/ui/progress";

const formSchema = z.object({
  illnessType: z.string({
    required_error: "Please select a type of illness",
  }),
  symptoms: z.array(z.string()).nonempty({
    message: "Please select at least one symptom",
  }),
  otherSymptoms: z.string().optional(),
  severity: z.string({
    required_error: "Please select severity level",
  }),
  startDate: z.date({
    required_error: "Please select when symptoms started",
  }),
  location: z.string().min(3, {
    message: "Please enter a valid location",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters",
  }).max(500, {
    message: "Description must not exceed 500 characters",
  }),
  contactWithInfected: z.boolean().default(false),
  travelHistory: z.boolean().default(false),
  travelDetails: z.string().optional(),
  medicalAttention: z.boolean().default(false),
  publicReport: z.boolean().default(true),
});

type FormValues = z.infer<typeof formSchema>;

const commonSymptoms = [
  "Fever",
  "Cough",
  "Fatigue",
  "Headache",
  "Sore Throat",
  "Shortness of Breath",
  "Body Aches",
  "Nausea",
  "Diarrhea",
  "Loss of Taste/Smell",
  "Rash"
];

const illnessTypes = [
  "Respiratory Infection",
  "Gastrointestinal Illness",
  "Viral Infection",
  "Bacterial Infection",
  "Fungal Infection",
  "Parasitic Infection",
  "Allergic Reaction",
  "Chronic Condition",
  "Other",
];

const NewReport = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showTravelDetails, setShowTravelDetails] = useState(false);
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      symptoms: [],
      otherSymptoms: "",
      contactWithInfected: false,
      travelHistory: false,
      travelDetails: "",
      medicalAttention: false,
      publicReport: true,
    },
  });

  const onSubmit = (data: FormValues) => {
    console.log("Form data:", data);
    
    toast({
      title: "Report submitted",
      description: "Your sickness report has been recorded successfully.",
    });
    
    // Navigate back to dashboard
    navigate("/app/dashboard");
  };

  // Watch travel history to conditionally show travel details
  const watchTravelHistory = form.watch("travelHistory");
  if (watchTravelHistory !== showTravelDetails) {
    setShowTravelDetails(watchTravelHistory);
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h2 className="text-3xl font-bold tracking-tight">New Sickness Report</h2>
        <p className="text-muted-foreground">
          Submit a new report to record sickness information and help track regional health data.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-5">
        <div className="md:col-span-3">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Basic Information</CardTitle>
                  <CardDescription>
                    Provide information about the type of illness and symptoms
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="illnessType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Type of Illness</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select type of illness" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {illnessTypes.map((type) => (
                              <SelectItem key={type} value={type}>
                                {type}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="symptoms"
                    render={() => (
                      <FormItem>
                        <div className="mb-4">
                          <FormLabel>Symptoms</FormLabel>
                          <FormDescription>
                            Select all symptoms that apply
                          </FormDescription>
                        </div>
                        <div className="grid grid-cols-2 gap-2 md:grid-cols-3">
                          {commonSymptoms.map((symptom) => (
                            <FormField
                              key={symptom}
                              control={form.control}
                              name="symptoms"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={symptom}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(symptom)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, symptom])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== symptom
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="font-normal">
                                      {symptom}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="otherSymptoms"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Other Symptoms</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter any other symptoms" {...field} />
                        </FormControl>
                        <FormDescription>
                          If you have any symptoms not listed above
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="severity"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Severity Level</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select severity level" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="mild">Mild</SelectItem>
                            <SelectItem value="moderate">Moderate</SelectItem>
                            <SelectItem value="severe">Severe</SelectItem>
                            <SelectItem value="critical">Critical</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="startDate"
                    render={({ field }) => (
                      <FormItem className="flex flex-col">
                        <FormLabel>When did symptoms start?</FormLabel>
                        <Popover>
                          <PopoverTrigger asChild>
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full pl-3 text-left font-normal",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  format(field.value, "PPP")
                                ) : (
                                  <span>Pick a date</span>
                                )}
                                <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={(date) =>
                                date > new Date() || date < new Date("2023-01-01")
                              }
                              initialFocus
                              className={cn("p-3 pointer-events-auto")}
                            />
                          </PopoverContent>
                        </Popover>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Location & Additional Details</CardTitle>
                  <CardDescription>
                    Provide information about where the illness occurred and other relevant details
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="location"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Location</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter city, region or area" {...field} />
                        </FormControl>
                        <FormDescription>
                          Where the illness was likely contracted or where you are currently located
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Provide additional details about your illness" 
                            className="min-h-[120px]"
                            {...field} 
                          />
                        </FormControl>
                        <FormDescription>
                          Any additional information that might be relevant
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="space-y-3">
                    <FormField
                      control={form.control}
                      name="contactWithInfected"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Contact with infected person</FormLabel>
                            <FormDescription>
                              Have you been in contact with someone known to have similar symptoms?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="travelHistory"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Recent travel history</FormLabel>
                            <FormDescription>
                              Have you traveled outside your region in the last 14 days?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />

                    {showTravelDetails && (
                      <FormField
                        control={form.control}
                        name="travelDetails"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Travel Details</FormLabel>
                            <FormControl>
                              <Textarea 
                                placeholder="Provide details about your recent travel" 
                                className="min-h-[80px]"
                                {...field} 
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    )}

                    <FormField
                      control={form.control}
                      name="medicalAttention"
                      render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                          <FormControl>
                            <Checkbox
                              checked={field.value}
                              onCheckedChange={field.onChange}
                            />
                          </FormControl>
                          <div className="space-y-1 leading-none">
                            <FormLabel>Sought medical attention</FormLabel>
                            <FormDescription>
                              Have you consulted a healthcare provider regarding this illness?
                            </FormDescription>
                          </div>
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Privacy Settings</CardTitle>
                </CardHeader>
                <CardContent>
                  <FormField
                    control={form.control}
                    name="publicReport"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Public Report</FormLabel>
                          <FormDescription>
                            Make this report available for public health analysis (anonymized)
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>

              <div className="flex justify-end space-x-4">
                <Button type="button" variant="outline" onClick={() => navigate("/app/dashboard")}>
                  Cancel
                </Button>
                <Button type="submit">Submit Report</Button>
              </div>
            </form>
          </Form>
        </div>

        <div className="md:col-span-2">
          <div className="sticky top-6 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Info className="h-5 w-5" /> Reporting Guidelines
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4 text-sm">
                  <div>
                    <h4 className="font-semibold">Why Report?</h4>
                    <p className="text-muted-foreground mt-1">
                      Your reports help track disease patterns and inform public health responses in your community.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Accurate Information</h4>
                    <p className="text-muted-foreground mt-1">
                      Please provide as accurate information as possible, including symptom onset date and location.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Privacy</h4>
                    <p className="text-muted-foreground mt-1">
                      Your personal information is protected. Public reports are anonymized before being included in analyses.
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold">Medical Attention</h4>
                    <p className="text-muted-foreground mt-1">
                      This report is not a substitute for medical care. Please seek appropriate healthcare if needed.
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Common Illnesses in Your Area</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Respiratory Infections</span>
                      <span className="text-sm text-muted-foreground">65%</span>
                    </div>
                    <Progress value={65} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Gastrointestinal</span>
                      <span className="text-sm text-muted-foreground">42%</span>
                    </div>
                    <Progress value={42} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Viral Infections</span>
                      <span className="text-sm text-muted-foreground">28%</span>
                    </div>
                    <Progress value={28} className="h-2" />
                  </div>
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <span className="text-sm font-medium">Allergic Reactions</span>
                      <span className="text-sm text-muted-foreground">15%</span>
                    </div>
                    <Progress value={15} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewReport;
