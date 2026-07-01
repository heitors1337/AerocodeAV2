/**
 * Permission helper utilities.
 * Stores a simple role string in sessionStorage.
 * Roles: "admin" (full access) or "user" (restricted).
 */

export const ROLE_KEY = "aerocode_role";

export function setRole(role: "admin" | "user") {
  sessionStorage.setItem(ROLE_KEY, role);
}

export function getRole(): "admin" | "user" {
  return (sessionStorage.getItem(ROLE_KEY) as "admin" | "user") || "user";
}

export function isAdmin(): boolean {
  return getRole() === "admin";
}
