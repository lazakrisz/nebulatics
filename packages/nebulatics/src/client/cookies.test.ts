import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { getCookie, setCookie } from "./cookie";

describe("setCookie", () => {
  let cookieSetter: (v: string) => void;

  beforeEach(() => {
    cookieSetter = vi.fn();
    Object.defineProperty(document, "cookie", {
      set: cookieSetter,
      configurable: true,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("sets a basic cookie with name and value", () => {
    setCookie("session", "abc123");

    expect(cookieSetter).toHaveBeenCalledWith("session=abc123; path=/");
  });

  it("encodes special characters in name and value", () => {
    setCookie("user name", "hello=world;test");

    expect(cookieSetter).toHaveBeenCalledWith(
      "user%20name=hello%3Dworld%3Btest; path=/",
    );
  });

  it("uses custom path when provided", () => {
    setCookie("token", "xyz", { path: "/admin" });

    expect(cookieSetter).toHaveBeenCalledWith("token=xyz; path=/admin");
  });

  it("includes domain when provided", () => {
    setCookie("tracking", "id123", { domain: ".example.com" });

    expect(cookieSetter).toHaveBeenCalledWith(
      "tracking=id123; path=/; domain=.example.com",
    );
  });

  it("includes max-age when provided", () => {
    setCookie("remember", "yes", { maxAge: 31536000 });

    expect(cookieSetter).toHaveBeenCalledWith(
      "remember=yes; path=/; max-age=31536000",
    );
  });

  it("includes max-age when set to 0", () => {
    setCookie("delete-me", "value", { maxAge: 0 });

    expect(cookieSetter).toHaveBeenCalledWith(
      "delete-me=value; path=/; max-age=0",
    );
  });

  it("includes expires when provided", () => {
    const expires = new Date("2025-12-31T00:00:00.000Z");
    setCookie("promo", "holiday", { expires });

    expect(cookieSetter).toHaveBeenCalledWith(
      "promo=holiday; path=/; expires=Wed, 31 Dec 2025 00:00:00 GMT",
    );
  });

  it("includes secure flag when true", () => {
    setCookie("auth", "token", { secure: true });

    expect(cookieSetter).toHaveBeenCalledWith("auth=token; path=/; secure");
  });

  it("does not include secure flag when false", () => {
    setCookie("auth", "token", { secure: false });

    expect(cookieSetter).toHaveBeenCalledWith("auth=token; path=/");
  });

  it("includes sameSite strict", () => {
    setCookie("csrf", "token", { sameSite: "strict" });

    expect(cookieSetter).toHaveBeenCalledWith(
      "csrf=token; path=/; samesite=strict",
    );
  });

  it("includes sameSite lax", () => {
    setCookie("session", "id", { sameSite: "lax" });

    expect(cookieSetter).toHaveBeenCalledWith(
      "session=id; path=/; samesite=lax",
    );
  });

  it("includes sameSite none", () => {
    setCookie("cross-site", "data", { sameSite: "none", secure: true });

    expect(cookieSetter).toHaveBeenCalledWith(
      "cross-site=data; path=/; secure; samesite=none",
    );
  });

  it("combines multiple options", () => {
    const expires = new Date("2026-01-01T00:00:00.000Z");
    setCookie("full", "cookie", {
      path: "/app",
      domain: ".mysite.com",
      maxAge: 86400,
      expires,
      secure: true,
      sameSite: "strict",
    });

    expect(cookieSetter).toHaveBeenCalledWith(
      "full=cookie; path=/app; domain=.mysite.com; max-age=86400; expires=Thu, 01 Jan 2026 00:00:00 GMT; secure; samesite=strict",
    );
  });
});

describe("getCookie", () => {
  function mockCookies(cookieString: string) {
    Object.defineProperty(document, "cookie", {
      get: () => cookieString,
      configurable: true,
    });
  }

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("returns the value of an existing cookie", () => {
    mockCookies("session=abc123");

    expect(getCookie("session")).toBe("abc123");
  });

  it("returns null for a non-existent cookie", () => {
    mockCookies("session=abc123");

    expect(getCookie("other")).toBeNull();
  });

  it("returns null when no cookies exist", () => {
    mockCookies("");

    expect(getCookie("session")).toBeNull();
  });

  it("finds cookie among multiple cookies", () => {
    mockCookies("first=one; session=abc123; last=three");

    expect(getCookie("session")).toBe("abc123");
  });

  it("returns the first cookie when it matches", () => {
    mockCookies("target=value; other=stuff");

    expect(getCookie("target")).toBe("value");
  });

  it("returns the last cookie when it matches", () => {
    mockCookies("other=stuff; target=value");

    expect(getCookie("target")).toBe("value");
  });

  it("decodes URL-encoded values", () => {
    mockCookies("data=hello%20world%3Dtest");

    expect(getCookie("data")).toBe("hello world=test");
  });

  it("handles URL-encoded cookie names", () => {
    mockCookies("user%20name=john");

    expect(getCookie("user name")).toBe("john");
  });

  it("handles values containing equals signs", () => {
    mockCookies("token=abc=def=ghi");

    expect(getCookie("token")).toBe("abc=def=ghi");
  });

  it("handles empty cookie value", () => {
    mockCookies("empty=");

    expect(getCookie("empty")).toBe("");
  });

  it("does not match partial cookie names", () => {
    mockCookies("session_id=123; mysession=456");

    expect(getCookie("session")).toBeNull();
  });
});
