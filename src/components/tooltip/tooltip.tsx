import {
  Tooltip as TooltipComponent,
  TooltipContent as TooltipContentComponent,
  TooltipTrigger as TooltipTriggerComponent,
} from "@/components/ui/tooltip";

export default function Tooltip({ children, content }: { children: React.ReactNode, content?: string }) {
    if (!content) {
        return children;
    }
  return (
    <TooltipComponent>
      <TooltipTriggerComponent>{children}</TooltipTriggerComponent>
      <TooltipContentComponent  sideOffset={4} className="rounded-md text-[10px] sm:text-xs">{content}</TooltipContentComponent>
    </TooltipComponent>
  );
}
