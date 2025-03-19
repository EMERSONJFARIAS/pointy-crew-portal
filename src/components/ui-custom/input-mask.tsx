
import React, { forwardRef, useState, useEffect } from "react";
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
  ({ mask, maskChar = "_", formatChars = defaultFormatChars, className, onChange, value = "", ...props }, ref) => {
    const [inputValue, setInputValue] = useState(value.toString());
    
    // Format initial value when component mounts or value prop changes
    useEffect(() => {
      if (mask && value) {
        const formattedValue = formatValueWithMask(value.toString(), mask, formatChars);
        setInputValue(formattedValue);
      } else {
        setInputValue(value.toString());
      }
    }, [value, mask]);
    
    const formatValueWithMask = (value: string, mask: string, formatChars: Record<string, RegExp>): string => {
      // Remove non-alphanumeric characters for processing
      const rawValue = value.replace(/[^\w\s]/gi, '');
      let result = '';
      let rawIndex = 0;
      
      // Apply mask
      for (let i = 0; i < mask.length && rawIndex < rawValue.length; i++) {
        const maskChar = mask[i];
        
        if (maskChar in formatChars) {
          if (rawIndex < rawValue.length && formatChars[maskChar].test(rawValue[rawIndex])) {
            result += rawValue[rawIndex];
            rawIndex++;
          } else {
            break;
          }
        } else {
          result += maskChar;
          // If the next character in rawValue matches the mask character, skip it
          if (rawIndex < rawValue.length && rawValue[rawIndex] === maskChar) {
            rawIndex++;
          }
        }
      }
      
      return result;
    };
    
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      
      if (!mask) {
        setInputValue(newValue);
        if (onChange) onChange(e);
        return;
      }
      
      // Remove mask characters to get the raw value
      let rawValue = '';
      let maskIndex = 0;
      
      for (let i = 0; i < newValue.length; i++) {
        if (maskIndex < mask.length) {
          const maskChar = mask[maskIndex];
          if (maskChar in formatChars) {
            if (formatChars[maskChar].test(newValue[i])) {
              rawValue += newValue[i];
            }
          }
          maskIndex++;
        }
      }
      
      // Format the raw value according to the mask
      let formattedValue = '';
      let rawIndex = 0;
      
      for (let i = 0; i < mask.length && rawIndex < rawValue.length; i++) {
        const maskChar = mask[i];
        
        if (maskChar in formatChars) {
          if (rawIndex < rawValue.length) {
            formattedValue += rawValue[rawIndex];
            rawIndex++;
          } else {
            break;
          }
        } else {
          formattedValue += maskChar;
        }
      }
      
      setInputValue(formattedValue);
      
      // Create a synthetic event with the formatted value
      if (onChange) {
        const syntheticEvent = {
          ...e,
          target: {
            ...e.target,
            value: formattedValue
          }
        };
        onChange(syntheticEvent as React.ChangeEvent<HTMLInputElement>);
      }
    };
    
    // Handle direct paste into the input field
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      if (!mask) return;
      
      const pasteData = e.clipboardData.getData('text');
      const rawValue = pasteData.replace(/[^\w\s]/gi, '');
      
      if (rawValue) {
        e.preventDefault();
        
        const formattedValue = formatValueWithMask(rawValue, mask, formatChars);
        setInputValue(formattedValue);
        
        if (onChange) {
          const syntheticEvent = {
            ...e,
            target: {
              ...e.currentTarget,
              value: formattedValue
            }
          } as unknown as React.ChangeEvent<HTMLInputElement>;
          onChange(syntheticEvent);
        }
      }
    };
    
    return (
      <Input
        ref={ref}
        className={cn("form-input-focus-ring", className)}
        value={inputValue}
        onChange={handleChange}
        onPaste={handlePaste}
        {...props}
      />
    );
  }
);

InputMask.displayName = "InputMask";
