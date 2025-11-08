import React, { useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { Button } from '../ui/button';
import { Typography } from '..';

type ConfirmationPopoverProps = {
  trigger: React.ReactNode;
  title: string;
  description: string;
  onConfirm: () => void;
  isLoading?: boolean;
}

export default function ConfirmationPopover({ trigger, title, description, onConfirm, isLoading }: ConfirmationPopoverProps) {
    const [isOpen, setIsOpen] = useState(false);
  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>{trigger}</PopoverTrigger>
      <PopoverContent className="bg-linear-to-br from-tertiary/30 via-80% via-transparent to-tertiary/5 border-2 border-background/50 p-4 rounded-lg md:rounded-2xl bg-blur-md backdrop-blur-sm">
        <Typography variant="h5">{title}</Typography>
        <Typography variant="p">{description}</Typography>
        <div className="flex justify-end gap-2">
          <Button variant="outline" onClick={() => {setIsOpen(false)}}>Cancel</Button>
          <Button variant="default" onClick={onConfirm} disabled={isLoading} className="bg-primary text-background hover:bg-primary/90">Confirm</Button>
        </div>
      </PopoverContent>
    </Popover>
  )
}
