import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

function Dashboard() {
  return (
    <div className="container mx-auto p-4 space-y-8">
      <h1 className="text-3xl font-bold">Welcome, Dispatcher</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <CardHeader>
            <CardTitle>Simulation Module</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Practice emergency dispatch scenarios.</p>
            <Button asChild className="mt-4">
              <Link to="/simulation">Start Simulation</Link>
            </Button>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Feedback Module</CardTitle>
          </CardHeader>
          <CardContent>
            <p>Review and analyze your performance.</p>
            <Button asChild className="mt-4">
              <Link to="/feedback">View Feedback</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle>Progress Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <p>Completed Simulations: 10</p>
          <p>Average Adherence: 85%</p>
          <p>Areas for Improvement: Response Time, Protocol Adherence</p>
        </CardContent>
      </Card>
    </div>
  );
}

export default Dashboard;
