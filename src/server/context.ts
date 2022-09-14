import { NextApiRequest, NextApiResponse } from 'next';
import { verifyJwt } from '../utils/jwt';
import { prisma } from "./db/client";

interface CtxUser {
  id: number
  email: string
  password: string
  username: string
}

function getUserFromRequest(req: NextApiRequest) {
  const token = req.cookies.token

  if (token) {
    try {
      const verified = verifyJwt<CtxUser>(token)
      return verified
    } catch (e) {
      return null
    }
  }

  return null
}

export function createContext({
  req,
  res,
}: {
  req: NextApiRequest
  res: NextApiResponse
}) {
  const user = getUserFromRequest(req)

  return { req, res, prisma, user }
}

export type Context = ReturnType<typeof createContext>
