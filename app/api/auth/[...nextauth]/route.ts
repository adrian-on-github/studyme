import { handlers } from "@/app/api/auth/handler/auth";

export const { GET, POST } = handlers;
export { auth as middleware } from "@/app/api/auth/handler/auth";
