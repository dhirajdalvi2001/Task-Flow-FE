import React, { useRef, useState } from 'react'
import { Typography, Input, Textarea } from '..';
import { Edit } from 'lucide-react';
import { cn } from '@/lib/utils';

type EditableInputProps = {
  value: string;
  onChange?: (value: string) => void;
  handleSave?: (value: string) => void;
  isTextArea?: boolean;
  className?: string;
};

export default function EditableInput({ value, handleSave, isTextArea = false, className = "" }: EditableInputProps) {
  const inputRef = useRef<HTMLInputElement | HTMLTextAreaElement>(null);
  const [inputValue, setInputValue] = useState<string>(value);
  const [isEditing, setIsEditing] = useState(false);

  function handleBlur() {
    setIsEditing(false);
    handleSave?.(inputValue);
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) {
    // For single-line inputs: press Enter to submit
    if (!isTextArea && e.key === "Enter") {
      e.preventDefault();
      setIsEditing(false);
      handleSave?.(inputValue);
    }

    // For multi-line (textarea): press Ctrl+Enter or Cmd+Enter to submit
    if (isTextArea && e.key === "Enter" && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      setIsEditing(false);
      handleSave?.(inputValue);
    }
  }

  function handleClick() {
    setIsEditing(true);
    setTimeout(() => {
      inputRef.current?.focus();
    },100);
  }

  // Filter out truncation classes when editing
  function filterTruncationClasses(classNames: string): string {
    if (!isEditing) return classNames;
    
    // Remove classes that cause truncation/ellipsis
    return classNames
      .split(' ')
      .filter(cls => 
        !cls.includes('text-ellipsis') &&
        !cls.includes('line-clamp') &&
        !cls.includes('overflow-hidden') &&
        !cls.includes('overflow-clip')
      )
      .join(' ');
  }

  const valueToShow =
    isTextArea && inputValue?.length === 0
      ? "No description provided"
      : inputValue.split('\n').map((line, index) => (
        <React.Fragment key={index}>
          {line}
          {index < inputValue.split('\n').length - 1 && <br />}
        </React.Fragment>
      ));

  if (!isEditing) {
    return (
      <Typography
        variant="h5"
        className={cn(
          "pr-5 text-tertiary/80 font-bold flex items-center gap-2 cursor-pointer relative",
          isTextArea && "!min-h-[102px]",
          className
        )}
        htmlFor="editable-input"
        onClick={handleClick}
      >
        <span className="mr-1">{valueToShow}</span>
        <Edit className="absolute top-0 right-0 min-w-4 w-4" />
      </Typography>
    );
  }
  return isTextArea ? (
    <Textarea
      ref={inputRef as React.RefObject<HTMLTextAreaElement>}
      id="editable-input"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        "p-0 !min-h-[102px] ring-0 focus-visible:ring-0 outline-none border-[1px] border-tertiary/20 focus-visible:border-tertiary/20 !text-tertiary font-medium text-xs md:text-sm whitespace-pre-wrap break-words resize-none",
        filterTruncationClasses(className)
      )}
      parentClassName="w-full min-h-[102px] max-h-[200px] overflow-y-auto"
    />
  ) : (
    <Input
      ref={inputRef as React.RefObject<HTMLInputElement>}
      id="editable-input"
      value={inputValue}
      onChange={(e) => setInputValue(e.target.value)}
      onBlur={handleBlur}
      onKeyDown={handleKeyDown}
      className={cn(
        "p-0 min-h-7 h-full ring-0 focus-visible:ring-0 outline-none border-[1px] border-tertiary/20 focus-visible:border-tertiary/20 text-tertiary font-medium text-xs md:text-sm ",
        filterTruncationClasses(className)
      )}
      parentClassName="w-full"
    />
  );
}
