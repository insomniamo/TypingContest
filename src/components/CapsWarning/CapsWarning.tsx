import React, { useState, useEffect } from "react";
import LockIcon from "@icons/LockIcon";
import "./capswarning.scss";

const CapsWarning: React.FC = () => {
  const [isCapsLockOn, setIsCapsLockOn] = useState(false);

  useEffect(() => {
    const handleKeyEvent = (event: KeyboardEvent) => {
      setIsCapsLockOn(event.getModifierState("CapsLock"));
    };

    window.addEventListener("keydown", handleKeyEvent);
    window.addEventListener("keyup", handleKeyEvent);

    return () => {
      window.removeEventListener("keydown", handleKeyEvent);
      window.removeEventListener("keyup", handleKeyEvent);
    };
  }, []);

  return (
    <div className="caps-warning">
      <div className={`caps-warning__wrapper ${isCapsLockOn ? "" : "caps-warning__wrapper--hidden"}`}>
        <div className="caps-warning__icon">
          <LockIcon />
        </div>
        <span>Caps Lock</span>
      </div>
    </div>
  );
};

export default CapsWarning;
