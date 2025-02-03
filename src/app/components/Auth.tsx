"use client";
import { useState } from "react";

export default function Auth() {
    const [user, setUser] = useState<string | null>(null);

    const handleAuth = () => {
        if (user) {
            setUser(null);
        } else {
            setUser("John Doe");
        }
    };

  return (
    <div className="p-4 border-t border-gray-700">
        {user ? (
            <div className="flex flex-col items-center">
            <p className="text-sm">Connecté en tant que <strong>{user}</strong></p>
            <button onClick={handleAuth} className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
                Déconnexion
            </button>
            </div>
        ) : (
            <button onClick={handleAuth} className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded">
                Connexion
            </button>
        )}
    </div>
  );
}
