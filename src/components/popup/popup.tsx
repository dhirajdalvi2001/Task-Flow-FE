import useMediaQuery from '@/hooks/use-media-query';
import { Drawer, DrawerHeader, DrawerContent, DrawerTitle, DrawerDescription } from '../ui/drawer';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';

type PopupProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title?: string;
  description?: string;
  children: React.ReactNode;
}

export default function Popup({ children, open, onOpenChange, title, description }: PopupProps) {
  const {  isTablet, isDesktop } = useMediaQuery();

  if (isTablet || isDesktop) {
    return (
      <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-linear-to-br from-tertiary/30 via-80% via-transparent to-tertiary/5 border-none rounded-lg md:rounded-2xl">
        {title && <DialogTitle className='text-tertiary'>{title}</DialogTitle>}
        {description && <DialogDescription>{description}</DialogDescription>}
        {children}
      </DialogContent>
    </Dialog>
    )
  }
  
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="bg-linear-to-br from-tertiary/30 via-80% via-transparent to-tertiary/5 border-none rounded-lg md:rounded-2xl">
        <DrawerHeader>
          {title && <DrawerTitle className='text-tertiary'>{title}</DrawerTitle>}
          {description && <DrawerDescription>{description}</DrawerDescription>}
        </DrawerHeader>
        {children}
      </DrawerContent>
    </Drawer>
  )
}
