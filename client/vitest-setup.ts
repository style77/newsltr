import "@testing-library/jest-dom/vitest";
import "./app/globals.css";
import * as dotenv from "dotenv";

dotenv.config({ path: "./.env.local" });
import "whatwg-fetch";
