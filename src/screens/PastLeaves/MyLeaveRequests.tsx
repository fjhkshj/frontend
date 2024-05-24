import React, { useState, useEffect } from "react";
import { View, SafeAreaView, Text, ScrollView } from "react-native";
import { Card } from "@rneui/themed";
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

  const getLeaveRequest = async () => {
    try {
      const accessToken = await getAccessToken();
      console.log("ACCESS TOKEN RECIEVED: ", accessToken);
      if (!accessToken) {
        console.log("Error In recieving Access Token");
        setError("Error in Recieving Access Token of the user. Please try again after sometime.");
      }
      else {
        const response = await fetch(past_leave_status,
          {
            method: "GET",
            headers: { 'Cookie': `access_token_ims_app=${accessToken}`}
          }
        );
        const responseData = await response.json();
        if (!response.ok) {
          console.log("Cookie recieved success, Error in Fetching Past Leave Requests.");
          setError("Cookie recieved success, Error in Fetching Past Leave Requests.");
          throw new Error("Failed to fetch data");
        }
        if (responseData && responseData.Applications) {
          const applications: LeaveRequest[] = Object.values(
            responseData.Applications
          );
          setLeaveRequests(applications);
        }
      }
    } catch (e) {
      setError("Error in recieving cookies, please try again later.");
      console.log("Error in recieving Cookies");
    }
  };

  useEffect(() => {
    getLeaveRequest();
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
