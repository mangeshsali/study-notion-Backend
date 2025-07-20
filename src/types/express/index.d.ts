import { User } from "@prisma/client"; // adjust import path based on your project setup

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
