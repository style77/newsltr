import { useToast } from "@/components/ui/use-toast";

export default async function continueWithSocialAuth(
  provider: string,
  redirect: string,
) {
  // const { toast } = useToast();
  try {
    const url = `${
      process.env.NEXT_PUBLIC_HOST
    }/api/v1/auth/o/${provider}/?redirect_uri=${
      process.env.NODE_ENV === "production"
        ? process.env.NEXT_PUBLIC_REDIRECT_URL
        : `http%3A%2F%2F127.0.0.1%3A3000%2F${redirect}`
    }`;

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
