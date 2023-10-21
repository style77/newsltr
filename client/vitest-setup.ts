import "@testing-library/jest-dom/vitest";
import "./app/globals.css";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });

export const url = `${process.env.NEXT_PUBLIC_HOST}/api/v1/auth/`;
