"use client";
import React from "react";

import { useAppSelector, useAppDispatch } from "@/redux/hooks";

import { increment, decrement } from "@/redux/features/counter/counterSlice";

const Counter = () => {
  const count = useAppSelector((state) => state.count.value);
  const dispatch = useAppDispatch();
  console.log(count);
  return (
    <div>
      <button onClick={() => dispatch(increment())}>{count}</button>
    </div>
  );
};

export default Counter;
