import React, { useEffect } from "react";

export default function Redirect404(){
  useEffect(() => {
    location.href = '/error/access/404';
  });

  return (<p></p>)
}