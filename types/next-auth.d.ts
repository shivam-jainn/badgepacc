import "next-auth";
import "next-auth/jwt";

declare module "next-auth" {
    interface User {
        isOrg: boolean
        email: string
    }
    interface Session {
        user: User
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string
        isOrg : boolean
        email : string
    }
}