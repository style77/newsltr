"use client";
import { useRegisterMutation } from "@/redux/features/authApiSlice";
import { useState, ChangeEvent, FormEvent } from "react";

import { useToast } from "@/components/ui/toast/use-toast";
import Spinner from "@/components/ui/spinner";

const Page = () => {
  const { toast } = useToast();
  const [register, { isLoading }] = useRegisterMutation();

  const [registerFormData, setRegisterFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    re_password: "",
  });

  console.log(registerFormData);

  const { first_name, last_name, email, password, re_password } =
    registerFormData;

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterFormData({ ...registerFormData, [name]: value });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      await register({
        first_name,
        last_name,
        email,
        password,
        re_password,
      }).unwrap();

      toast({
        title: "Your account was succesfully created!",
      });
    } catch {
      toast({
        title: "Failed to sign up!",
      });
    }
  };

  return (
    <div>
      <form action="">
        <div>
          <label htmlFor="first_name">First Name</label>
          <div>
            <input
              id="first_name"
              className="text-black"
              onChange={handleChange}
              value={first_name}
              type="text"
              name="first_name"
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Last Name</label>
          <div>
            <input
              onChange={handleChange}
              value={last_name}
              type="text"
              name="last_name"
              id=""
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Email</label>
          <div>
            <input
              onChange={handleChange}
              value={email}
              type="email"
              name="email"
              id=""
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Password</label>
          <div>
            <input
              onChange={handleChange}
              value={password}
              type="password"
              name="password"
              id=""
              required
            />
          </div>
        </div>
        <div>
          <label htmlFor="">Confirm Password</label>
          <div>
            <input
              onChange={handleChange}
              value={re_password}
              type="password"
              name="re_password"
              id=""
              required
            />
          </div>
        </div>
        <button>{isLoading ? <Spinner /> : "Sign up"}</button>
      </form>
    </div>
  );
};

export default Page;
