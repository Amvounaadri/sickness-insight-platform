import { useEffect, useState } from "react";
import { BarChart3, FilePlus, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
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
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";

const Dashboard = () => {
  const { toast } = useToast();
  const [reports, setReports] = useState([
    { id: 1, title: "Flu Outbreak", status: "Critical", date: "2024-07-08" },
    { id: 2, title: "Food Poisoning", status: "Warning", date: "2024-07-07" },
    { id: 3, title: "COVID-19 Cases", status: "Normal", date: "2024-07-06" },
  ]);

  useEffect(() => {
    // Simulate fetching data from an API
    setTimeout(() => {
      setReports([
        { id: 1, title: "Flu Outbreak", status: "Critical", date: "2024-07-08" },
        { id: 2, title: "Food Poisoning", status: "Warning", date: "2024-07-07" },
        { id: 3, title: "COVID-19 Cases", status: "Normal", date: "2024-07-06" },
        { id: 4, title: "New Virus Strain", status: "Critical", date: "2024-07-05" },
      ]);
      toast({
        title: "Reports updated",
        description: "New reports have been added to the dashboard.",
      });
    }, 2000);
  }, []);

  return (
    <div className="space-y-6">
      <div>
        <div className="flex flex-col gap-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-2">
              <Activity className="h-6 w-6 text-primary" />
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            </div>
            <Button>
              <FilePlus className="mr-2 h-4 w-4" />
              New Report
            </Button>
          </div>
          <p className="text-muted-foreground">
            Track and manage health-related reports in your area.
          </p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader>
            <CardTitle>Total Reports</CardTitle>
            <CardDescription>All submitted reports</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">124</div>
            <Progress value={70} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Critical Reports</CardTitle>
            <CardDescription>Reports requiring immediate attention</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-500">12</div>
            <Progress value={30} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>New Reports Today</CardTitle>
            <CardDescription>Reports submitted in the last 24 hours</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-500">5</div>
            <Progress value={10} className="mt-4" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Resolved Reports</CardTitle>
            <CardDescription>Reports marked as resolved</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">95</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="col-span-2">
          <CardHeader>
            <CardTitle>Recent Reports</CardTitle>
            <CardDescription>List of recently submitted reports</CardDescription>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[300px] w-full overflow-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[50px]">ID</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Date</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {reports.map((report) => (
                    <TableRow key={report.id}>
                      <TableCell className="font-medium">{report.id}</TableCell>
                      <TableCell>{report.title}</TableCell>
                      <TableCell>
                        <Badge
                          variant="outline"
                          className={
                            report.status === "Critical"
                              ? "bg-red-500/10 text-red-500 border-red-500/20"
                              : report.status === "Warning"
                              ? "bg-yellow-500/10 text-yellow-500 border-yellow-500/20"
                              : "bg-green-500/10 text-green-500 border-green-500/20"
                          }
                        >
                          {report.status}
                        </Badge>
                      </TableCell>
                      <TableCell>{report.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;
