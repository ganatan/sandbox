import { Request, Response, NextFunction } from 'express';

interface User {
  id: number;
  username: string;
  role: string;
}

declare module 'express' {
  interface Request {
    user?: User;
  }
}

const fakeAuth = (user: User = { id: 2, username: 'editor_user', role: 'editor' }) => {
  return (req: Request, res: Response, next: NextFunction): void => {
    req.user = user;
    next();
  };
};

export default fakeAuth;
