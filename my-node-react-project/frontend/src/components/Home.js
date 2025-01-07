import React from "react";

function Home({ user }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <h1>Benvenuto, {user.firstName}</h1>
    </div>
  );
}

export default Home;
