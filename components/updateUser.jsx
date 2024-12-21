"use client";
import { useSession } from "next-auth/react";
import React, { useState } from "react";

export default function UpdateUser() {
  const { data: session, status, update } = useSession();
  const [newName, setNewName] = useState("");
  return (
    <div>
      <input
        type="text"
        name="username"
        id=""
        onChange={(e) => setNewName(e.target.value)}
      />
      <button onClick={() => update({ username: newName })}>Update</button>
    </div>
  );
}
