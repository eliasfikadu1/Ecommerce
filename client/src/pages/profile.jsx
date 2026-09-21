import React from "react";

function Profile({ user }) {
  return (
    <div className="min-h-screen bg-gray-100 py-10 px-4">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-lg p-8">
        
        <h1 className="text-3xl font-bold text-center mb-8">
          My Profile 👤
        </h1>

        {user ? (
          <div className="space-y-5">
            
            <div>
              <p className="text-gray-500 text-sm">Name</p>
              <p className="text-lg font-semibold">
                {user.name}
              </p>
            </div>

            <div>
              <p className="text-gray-500 text-sm">Email</p>
              <p className="text-lg font-semibold">
                {user.email}
              </p>
            </div>

          </div>
        ) : (
          <p className="text-center text-gray-600">
            Please login first.
          </p>
        )}

      </div>
    </div>
  );
}

export default Profile;