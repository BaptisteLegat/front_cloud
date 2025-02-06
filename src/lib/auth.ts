import NextAuth from "next-auth"
import CognitoProvider from "next-auth/providers/cognito"

export const {handlers, signIn, signOut, auth} = NextAuth({
    // Configure one or more authentication providers
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
            }
            return token;
        },
        async session({session, token}) {
            // @ts-expect-error phpstorm
            session.accessToken = token.accessToken;
            // @ts-expect-error phpstorm
            session.idToken = token.idToken;
            return session;
        },
    },
})