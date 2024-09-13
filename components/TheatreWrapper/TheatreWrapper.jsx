"use client";
import React, { useEffect } from "react";
import studio from "@theatre/studio";
import extension from "@theatre/r3f/dist/extension";

let theatreInitialized = false;

function TheatreWrapper({ children }) {
  useEffect(() => {
    // if (typeof window !== "undefined" && !theatreInitialized) {
    //   studio.initialize();
    studio.extend(extension);
    theatreInitialized = true;
    // }
  }, []);

  return <>{children}</>;
}

export default TheatreWrapper;
