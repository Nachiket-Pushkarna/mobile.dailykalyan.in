import ApiClient from "@/api/apiClient";
import { getSetData } from "@/utils";
import React, { useState, useEffect } from "react";

function Notifications() {
  const [notificationsData, setNotificationsData] = useState([]);
  const userData = getSetData("userData", false, true);

  const { user_id } = userData;

  const getNotifications = () => {
    ApiClient.notifications({ user_id })
      .then((res) => {
        setNotificationsData(res?.data?.notification);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const renderNotifications = () => {
    if (!notificationsData || !notificationsData.length) {
      return <div className="text-center text-gray-400">No Notifications Available</div>;
    }

    return notificationsData.map((notification, index) => {
      let { msg, insert_date } = notification;
      return (
        <div key={index} className="bg-gray-800 border border-gray-700 p-4 rounded-lg shadow-md mb-4">
          <div className="text-yellow-400 font-semibold">{msg}</div>
          <div className="text-gray-400 text-sm mt-2">{insert_date}</div>
        </div>
      );
    });
  };

  return (
    <div className="bg-gray-800 min-h-screen p-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-2xl font-bold text-yellow-500 mb-4 text-center">Notifications</h1>
        {renderNotifications()}
      </div>
    </div>
  );
}

export default Notifications;