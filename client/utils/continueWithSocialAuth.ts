import { useToast } from "@/components/ui/use-toast";

export default async function continueWithSocialAuth(
  provider: string,
  redirect: string,
) {
  // const { toast } = useToast();
  try {
    const url = `${
      process.env.NEXT_PUBLIC_HOST
    }/api/v1/o/${provider}/?redirect_uri=${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_REDIRECT_URL
        : "http://localhost:3000"
    }/${redirect}`;

    const res = await fetch(url, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      credentials: "include",
    });
    const data = await res.json();

    if (res.status === 200 && typeof window !== "undefined") {
      window.location.replace(data.authorization_url);
    } else {
      // toast({ title: "Something went wrong" });
      console.log("error continuerwithsocial auth");
    }
  } catch (err) {
    console.log("error continuerwithsocial auth");
  }
}
