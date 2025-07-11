"use client";

import React, { useState } from "react";
import { Particles } from "@/components/magicui/particles";
import Image from "next/image"; // Import Image from next/image

export default function EditProfile() {
  const [profilePic, setProfilePic] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [message, setMessage] = useState<string | null>(null);

  const handleProfilePicChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setProfilePic(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const token = localStorage.getItem("token"); // Assuming JWT is stored in localStorage
    if (!token) {
      setMessage("You are not logged in.");
      return;
    }

    const response = await fetch("/api/users/update-profile", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
        phoneNumber,
        profilePicture: profilePic,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      setMessage("Profile updated successfully!");
    } else {
      setMessage(data.error || "Failed to update profile.");
    }
  };

  return (
    <div className="relative h-full bg-transparent p-4">
      {/* Particle Effect */}
      <div className="absolute inset-0 z-0">
        <Particles
          quantity={80}
          staticity={40}
          ease={40}
          size={0.5}
          color="#ffffff"
        />
      </div>

      {/* Page Content */}
      <div className="relative z-10 max-w-3xl mx-auto p-4 bg-transparent rounded-lg shadow-md">
        <h2 className="text-2xl font-bold mb-6 text-neutral-800 dark:text-neutral-200">
          Edit Profile
        </h2>
        <p className="mt-2 text-neutral-600 dark:text-neutral-400">
          Update your personal details and manage your account settings here.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Profile Picture */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Profile Picture
            </label>
            <div className="mt-2 flex items-center space-x-4">
              {profilePic ? (
                <Image
                  src={profilePic}
                  alt="Profile"
                  className="h-16 w-16 rounded-full object-cover"
                  width={64} // Specify width
                  height={64} // Specify height
                />
              ) : (
                <div className="h-16 w-16 rounded-full bg-gray-200 dark:bg-neutral-700 flex items-center justify-center text-neutral-500">
                  No Image
                </div>
              )}
              <input
                type="file"
                accept="image/*"
                onChange={handleProfilePicChange}
                className="text-sm text-neutral-600 dark:text-neutral-300"
              />
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="mt-2 w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="mt-2 w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter a new password"
              className="mt-2 w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
            />
          </div>

          {/* Phone Number */}
          <div>
            <label className="block text-sm font-medium text-neutral-700 dark:text-neutral-300">
              Phone Number
            </label>
            <input
              type="tel"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Enter your phone number"
              className="mt-2 w-full rounded-md border border-neutral-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-900 dark:text-neutral-200"
            />
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full rounded-md bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:ring-offset-neutral-800"
            >
              Save Changes
            </button>
          </div>
        </form>
        {message && (
          <p className="mt-4 text-sm text-green-500 dark:text-green-400">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}