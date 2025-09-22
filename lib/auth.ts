import type { DefaultSession } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

// Define the User type with custom fields
interface User {
  id: string;
  email: string;
  name: string | null;
  role: string;
}

// Define the JWT type
interface JWT {
  id: string;
  role: string;
  [key: string]: any;
}

// Define the Credentials type
type Credentials = {
  email: string;
  password: string;
};

// Extend the Session type
declare module 'next-auth' {
  interface Session extends DefaultSession {
    user: {
      id: string;
      role: string;
    } & DefaultSession['user']
  }

  interface User {
    role: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: string;
  }
}

// Create the auth configuration
const authConfig = {
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials: Record<string, unknown> | undefined): Promise<User | null> {
        // Type guard to check if credentials exist and have the required properties
        if (!credentials || !credentials.email || !credentials.password || 
            typeof credentials.email !== 'string' || typeof credentials.password !== 'string') {
          throw new Error('Please provide valid email and password');
        }
        
        const { email, password } = credentials;

        try {
          // Use internal API URL for server-side requests, public URL for client-side
          const apiUrl = process.env.NODE_ENV === 'production' 
          ? (process.env.API_URL_INTERNAL || 'http://backend:8000/api')
          : 'http://localhost:8000/api';
          
          // Call Django backend API for authentication
          const response = await fetch(`${apiUrl}/auth/token/`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
          });

          if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.detail || errorData.message || 'Authentication failed');
          }

          const data = await response.json();
          
          if (data.user) {
            return {
              id: data.user.id.toString(),
              email: data.user.email,
              name: data.user.first_name && data.user.last_name 
                ? `${data.user.first_name} ${data.user.last_name}` 
                : data.user.email,
              role: data.user.user_type || 'STUDENT',
            };
          }

          throw new Error('Invalid response from server');
        } catch (error) {
          if (error instanceof TypeError && error.message.includes('fetch')) {
            throw new Error('Cannot connect to authentication server. Please try again later.');
          }
          throw new Error(error instanceof Error ? error.message : 'Authentication failed');
        }
      }
    })
  ],
  session: {
    strategy: 'jwt' as const,
  },
  secret: process.env.NEXTAUTH_SECRET!,
  debug: true,
  pages: {
    signIn: '/login',
    error: '/auth/error',
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.id = user.id;
        token.role = user.user_type || user.role || 'STUDENT';
        token.user_type = user.user_type || 'STUDENT';
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
        session.user.user_type = token.user_type as string;
      }
      return session;
    },
  },
};

// Create the auth handler
const handler = NextAuth(authConfig);

// Export the auth function
export const auth = handler.auth;

// Export the handlers for the route
export const { GET, POST } = handler as any;

// Export a session helper
export async function getAuthSession() {
  return await auth();
}

// Export the auth config
export default authConfig;
