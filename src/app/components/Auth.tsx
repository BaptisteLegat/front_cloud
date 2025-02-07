"use client";
import {useSession, signIn, signOut} from "next-auth/react";

export default function Auth() {
  const session = useSession();
  return (
    <div className="p-4 border-t border-gray-700">
        {session && session?.data?.user ? (
            <div className="flex flex-col items-center">
                <p className="text-sm">Connecté en tant que <strong>{session.data.user.email}</strong></p>
                <button onClick={()=>signOut()} className="mt-2 px-4 py-2 bg-red-600 hover:bg-red-700 rounded">
                    Déconnexion
                </button>
            </div>
        ) : (
            <button onClick={()=>signIn()} className="w-full px-4 py-2 bg-green-600 hover:bg-green-700 rounded">
                Connexion
            </button>
        )}
    </div>
  );
}
