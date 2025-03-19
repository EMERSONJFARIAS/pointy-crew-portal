
import React, { forwardRef, useState } from "react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/ui/input";

interface InputMaskProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string;
  maskChar?: string;
  formatChars?: Record<string, RegExp>;
  className?: string;
}

const defaultFormatChars = {
  '9': /[0-9]/,
  'a': /[a-zA-Z]/,
  '*': /[a-zA-Z0-9]/
};

export const InputMask = forwardRef<HTMLInputElement, InputMaskProps>(
  ({ mask, maskChar = "_", formatChars = defaultFormatChars, className, onChange, value, ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value || "");
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      
      if (!mask) {
        setInputValue(value);
        if (onChange) onChange(e);
        return;
      }
      
      let cursorPosition = e.target.selectionStart || 0;
      let maskedValue = "";
      let rawValue = "";
      let maskedIndex = 0;
      
      // Extract raw value from current input
      const currentValue = inputValue as string;
      for (let i = 0; i < currentValue.length; i++) {
        if (mask[i] in formatChars) {
          rawValue += currentValue[i];
        }
      }
      
      // Remove characters from position and update raw value
      rawValue = rawValue.substring(0, cursorPosition) + value.substring(cursorPosition);
      
      // Apply mask to raw value
      let rawIndex = 0;
      for (let i = 0; i < mask.length && rawIndex < rawValue.length; i++) {
        const maskChar = mask[i];
        if (maskChar in formatChars) {
          if (formatChars[maskChar].test(rawValue[rawIndex])) {
            maskedValue += rawValue[rawIndex];
            maskedIndex = i + 1;
            rawIndex++;
          } else {
            break;
          }
        } else {
          maskedValue += maskChar;
        }
      }
      
      setInputValue(maskedValue);
      
      // Update cursor position
      setTimeout(() => {
        if (e.target) {
          e.target.selectionStart = e.target.selectionEnd = maskedIndex;
        }
      }, 0);
      
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: maskedValue
          }
        };
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }
    };
    
    return (
      <Input
        ref={ref}
        className={cn("form-input-focus-ring", className)}
        value={inputValue}
        onChange={handleChange}
        {...props}
      />
    );
  }
);

InputMask.displayName = "InputMask";
