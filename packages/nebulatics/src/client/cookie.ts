interface CookieOptions {
  path?: string;
  domain?: string;
  maxAge?: number;
  expires?: Date;
  secure?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {},
) {
  const { path = "/", domain, maxAge, expires, secure, sameSite } = options;

  let cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  cookie += `; path=${path}`;

  if (domain) {
    cookie += `; domain=${domain}`;
  }

  if (maxAge !== undefined) {
    cookie += `; max-age=${maxAge}`;
  }

  if (expires) {
    cookie += `; expires=${expires.toUTCString()}`;
  }

  if (secure) {
    cookie += "; secure";
  }

  if (sameSite) {
    cookie += `; samesite=${sameSite}`;
  }

  document.cookie = cookie;
}

export function getCookie(name: string): string | null {
  const encodedName = encodeURIComponent(name);
  const cookies = document.cookie.split("; ");

  for (const cookie of cookies) {
    const [cookieName, ...valueParts] = cookie.split("=");
    if (cookieName === encodedName) {
      return decodeURIComponent(valueParts.join("="));
    }
  }

  return null;
}
