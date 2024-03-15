"use client";
import { CongoBomb } from "@/components/custom/CongoBomb";
import { Illustration } from "@/components/pageSpecific/blog";
import { useState } from "react";

function Test() {
  const [fire, setFire] = useState(false);
  return (
    <div className="w-full h-screen border ">
      {/* page, just for testing new components */}
      <div className="grid-container gap-2">
        <span className="grid-item short">01</span>
        <span className="grid-item short">02</span>
        <span className="grid-item tall">03</span>
        <span className="grid-item tall">04</span>
        <span className="grid-item short">05</span>
        <span className="grid-item taller">06</span>
        <span className="grid-item short">07</span>
        <span className="grid-item tallest">08</span>
        <span className="grid-item tall">09</span>
        <span className="grid-item short">10</span>
        <span className="grid-item tallest">etc.</span>
        <span className="grid-item tall"></span>
        <span className="grid-item taller"></span>
        <span className="grid-item short"></span>
        <span className="grid-item short"></span>
        <span className="grid-item short"></span>
        <span className="grid-item short"></span>
        <span className="grid-item tall"></span>
        <span className="grid-item short"></span>
        <span className="grid-item taller"></span>
        <span className="grid-item short"></span>
        <span className="grid-item tall"></span>
        <span className="grid-item short"></span>
        <span className="grid-item tall"></span>
        <span className="grid-item short"></span>
        <span className="grid-item short"></span>
        <span className="grid-item tallest"></span>
        <span className="grid-item taller"></span>
        <span className="grid-item short"></span>
        <span className="grid-item tallest"></span>
        <span className="grid-item tall"></span>
        <span className="grid-item short"></span>
      </div>
    </div>
  );
}

export default Test;
