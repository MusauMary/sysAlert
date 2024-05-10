"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    async function fetchNotifications() {
      try {
        const response = await axios.get("/api/alerts");
        setNotifications(response.data.data);
      } catch (error) {
        console.error(error);
      }
    }

    fetchNotifications();
  }, []);

  const name = localStorage.getItem("name");

  return (
    <div className="h-full w-full">
      <header className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back, {name}
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Kindly attend to the alerts below!
              </p>
            </div>
          </div>
        </div>
      </header>
      {notifications.map((notification) => (
        <article
          key={notification._id}
          className="hover:animate-background rounded-xl bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-xl transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] m-5 mx-20"
        >
          <div className="rounded-[10px] bg-white p-4 !pt-5 sm:p-6">
            <div className="block text-xl text-gray-500">
              {notification.title}
            </div>

            <h3 className="mt-0.5 text-lg font-medium text-gray-900">
              {notification.message}
            </h3>

            <h3 class="mt-0.5 text-lg font-medium text-gray-900">
              {notification.solution}
            </h3>

            <div className="mt-4 flex flex-wrap gap-1">
              <span className="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                {notification.createdAt}
              </span>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default page;
