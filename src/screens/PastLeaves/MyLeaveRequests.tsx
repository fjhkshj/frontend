import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, ScrollView } from "react-native";
import { Card } from "@rneui/themed";
import { rollno } from "../../backend_requests/UserDetails";
import { past_leave_status } from "../../constants/APIHandler";
import { getAccessToken } from "../../backend_requests/AccessToken";

interface LeaveRequest {
  LeaveID: string;
  LeaveStatus: string;
  ReasonForLeave: string;
  SubmitDate: string;
  TotalDays: number;
  application_with: string;
  fromdate: string;
  todate: string;
}

function MyLeaveRequests(): React.JSX.Element {
  const [leaveRequests, setLeaveRequests] = useState<LeaveRequest[]>([]);
  const [error, setError] = useState<string | null>(null);

  const checkLeaveRequest = async () => {
    try {
      const accessToken = await getAccessToken();
      const response = await fetch(past_leave_status,
        {
            method: "GET",
            headers: { 'Cookie': `access_token_ims_app=${accessToken}` }
        }
    );
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error("Failed to fetch data");
      }
      if (responseData && responseData.Applications) {
        const applications: LeaveRequest[] = Object.values(
          responseData.Applications
        );
        setLeaveRequests(applications);
      }
    } catch (e) {
      setError("Error while fetching the data, please try again later.");
    }
  };

  useEffect(() => {
    checkLeaveRequest();
  }, []);

  return (
    <SafeAreaView>
      <ScrollView>
        {error ? (
          <Text
            style={{
              marginVertical: 10,
              fontSize: 20,
              color: "red",
              marginLeft: 50
            }}
          >
            {error}
          </Text>
        ) : (
          <>
            <Text
              style={{
                marginVertical: 10,
                fontSize: 20,
                color: "black",
                marginLeft: 50
              }}
            >
              Total Number of Applications: {leaveRequests.length}
            </Text>
            {leaveRequests.map((request, index) => (
              <Card key={index} containerStyle={{ marginTop: 15 }}>
                <Card.Title>Status: {request.LeaveStatus}</Card.Title>
                <Card.Divider />
                <Text>Total Days: {request.TotalDays}</Text>
                <Text>Submit Date: {request.SubmitDate}</Text>
                <Text>Application With: {request.application_with}</Text>
                <Text>From Date: {request.fromdate}</Text>
                <Text>To Date: {request.todate}</Text>
                <Text>Reason for Leave: {request.ReasonForLeave}</Text>
              </Card>
            ))}
          </>
        )}
        <View style={{ margin: 20 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default MyLeaveRequests;
