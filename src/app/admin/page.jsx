"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const page = () => {
  const [notifications, setNotifications] = useState([]);

  const [formState, setFormState] = useState({
    title: "",
    message: "",
    solution: "",
  });

  const handleChange = (evt) => {
    const value = evt.target.value;
    setFormState({
      ...formState,
      [evt.target.name]: value,
    });
  };

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

  const postMessage = async () => {
    if (formState.title === "") {
      alert("Please enter a title");
      return;
    }

    if (formState.message === "") {
      alert("Please enter your message");
      return;
    }

    if (formState.solution === "") {
      alert("Please enter your solution");
      return;
    }

    const { title, message, solution } = formState;

    const response = await fetch("/api/alerts", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        message,
        solution,
      }),
    });

    if (response.status === 200) {
      setFormState({
        title: "",
        message: "",
        solution: "",
      });
    }
  };

  const clearField = () => {
    setFormState({
      title: "",
      message: "",
      solution: "",
    });
  };

  return (
    <div className="h-full w-full">
      <header className="bg-gray-50">
        <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <div className="text-center sm:text-left">
              <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                Welcome Back,
              </h1>

              <p className="mt-1.5 text-sm text-gray-500">
                Post and view system alerts here!
              </p>
            </div>
          </div>
        </div>
      </header>
      <div className="grid grid-cols-2 gap-4 m-6">
        <div>
          <div className="mb-5">
            <input
              type="text"
              name="title"
              value={formState.title}
              onChange={handleChange}
              placeholder="Enter title here"
              class="mt-1 w-full rounded-md border-gray-200 shadow-sm sm:text-sm"
            />
          </div>

          <div class="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600 mb-5">
            <textarea
              id="message"
              type="text"
              name="message"
              value={formState.message}
              onChange={handleChange}
              class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm"
              rows="4"
              placeholder="Enter notification content..."
            ></textarea>
          </div>

          <div>
            <div class="overflow-hidden rounded-lg border border-gray-200 shadow-sm focus-within:border-blue-600 focus-within:ring-1 focus-within:ring-blue-600">
              <textarea
                id="solution"
                type="text"
                name="solution"
                value={formState.solution}
                onChange={handleChange}
                class="w-full resize-none border-none align-top focus:ring-0 sm:text-sm"
                rows="4"
                placeholder="Enter notification solution..."
              ></textarea>

              <div class="flex items-center justify-end gap-2 bg-white p-3">
                <button
                  type="button"
                  onClick={clearField}
                  class="rounded bg-gray-200 px-3 py-1.5 text-sm font-medium text-gray-700 hover:text-gray-600"
                >
                  Clear
                </button>

                <button
                  type="button"
                  onClick={postMessage}
                  class="rounded bg-indigo-600 px-3 py-1.5 text-sm font-medium text-white hover:bg-indigo-700"
                >
                  Post Message
                </button>
              </div>
            </div>
          </div>
        </div>

        <div>
          {notifications.map((notification) => (
            <article class=" rounded-lg bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 p-0.5 shadow-lg transition hover:bg-[length:400%_400%] hover:shadow-sm hover:[animation-duration:_4s] mb-5">
              <div class="rounded-[10px] bg-white p-4 !pt-5 sm:p-6">
                <time datetime="2022-10-10" class="block text-xl text-gray-500">
                  {notification.title}
                </time>

                <h3 class="mt-0.5 text-lg font-medium text-gray-900">
                  {notification.message}
                </h3>

                <h3 class="mt-0.5 text-lg font-medium text-gray-900">
                  {notification.solution}
                </h3>

                <div class="mt-4 flex flex-wrap gap-1">
                  <span class="whitespace-nowrap rounded-full bg-purple-100 px-2.5 py-0.5 text-xs text-purple-600">
                    {notification.createdAt}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default page;
