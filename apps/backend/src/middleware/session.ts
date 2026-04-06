import type { NextFunction, Request, Response } from "express";

import * as cookie from "cookie";
import { unseal, defaults as ironDefaults } from "iron-webcrypto";
import {
  sealedSessionSchema,
  type SessionData,
} from "sparktool-contracts/session";

declare global {
  namespace Express {
    interface Request {
      session: SessionData;
    }
  }
}

const SESSION_COOKIE_NAME =
  process.env.APP_SESSION_COOKIE_NAME ?? "app_session";
const SESSION_SECRET = process.env.APP_SESSION_SECRET ?? "";

export async function sessionMiddleware(
  request: Request,
  _response: Response,
  next: NextFunction,
): Promise<void> {
  request.session = {};

  const rawCookies = request.headers.cookie;
  if (!rawCookies) {
    next();
    return;
  }

  const cookies = cookie.parse(rawCookies);
  const sealed = cookies[SESSION_COOKIE_NAME];

  if (!sealed) {
    next();
    return;
  }

  try {
    const unsealed = await unseal(sealed, SESSION_SECRET, ironDefaults);
    const parsed = sealedSessionSchema.safeParse(unsealed);
    if (parsed.success) {
      request.session = parsed.data.data;
    }
  } catch {
    // Invalid or expired seal — treat as unauthenticated
  }

  next();
}

export function requireSession(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (!request.session.uid) {
    response.status(401).json({ error: "Unauthorized" });
    return;
  }
  next();
}

export function requireTenantSession(
  request: Request,
  response: Response,
  next: NextFunction,
): void {
  if (!request.session.uid) {
    response.status(401).json({ error: "Unauthorized" });
    return;
  }
  if (!request.session.activeTenantId) {
    response.status(403).json({ error: "No active tenant" });
    return;
  }
  next();
}
