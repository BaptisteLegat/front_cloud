import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"
import { jwtDecode } from "jwt-decode"

export const {handlers, signIn, signOut, auth} = NextAuth({
    providers: [
        CognitoProvider({
            clientId: process.env.COGNITO_CLIENT_ID || "",
            clientSecret: process.env.COGNITO_SECRET,
            issuer: process.env.COGNITO_ISSUER,
            authorization: {
                params: {
                    scope: "openid profile email phone",
                    response_type: "code",
                }
            }
        })
    ],
    session:{
        strategy:'jwt'
    },
    secret: process.env.NEXTAUTH_SECRET,
    callbacks: {
        async jwt({token, account}) {
            if (account) {
                token.accessToken = account.access_token;
                token.idToken = account.id_token;

                if (account?.id_token) {
                    const decoded = jwtDecode<{ sub: string }>(account.id_token);
                    token.userId = decoded.sub;
                }
            }

            return token;
        },
        async session({session, token}) {
            // @ts-expect-error phpstorm
            session.accessToken = token.accessToken;
            // @ts-expect-error phpstorm
            session.idToken = token.idToken;
            session.user = {
                ...session.user,
                id: token.userId as string,
            };

            return session;
        },
    },
})
