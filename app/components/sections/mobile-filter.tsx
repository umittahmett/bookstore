// Components
import { Button } from "@components/ui/button";
import { ChevronDown, LayoutGrid, X } from "lucide-react";
import { Label } from "@components/ui/label";
import { Accordion, AccordionContent } from "@components/ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Checkbox } from "@components/ui/checkbox";
// Types
import { MobileFilterProps } from "~/types";
// Data
import { bookFilters } from "@data/filters";

const MobileFilter: React.FC<MobileFilterProps> = ({ onCloseClick }) => {
  return (
    <div className="fixed bg-white top-0 left-0 z-50 lg:hidden h-dvh overflow-y-auto w-full p-5">
      <div className="w-full justify-between flex">
        <h2 className="font-semibold text-sm mb-2 uppercase text-black flex items-center gap-2">
          Filters
        </h2>
        <Button
          variant="close"
          size="closeIcon"
          onClick={onCloseClick}
          className="flex-shrink-0 "
        >
          <X strokeWidth={1} className="size-5" />
        </Button>
      </div>

      <h2 className="font-semibold text-sm mt-5 mb-5 uppercase flex items-center gap-2 max-lg:text-base">
        <LayoutGrid className="size-4" />
        Customize Your Result
      </h2>

      <Accordion type="multiple" className="w-full space-y-2">
        {bookFilters.map((item, index) => (
          <AccordionItem
            className="w-full border border-slate-200 rounded-lg px-4 py-2 max-h-96 overflow-y-auto"
            key={index}
            value={item.name}
          >
            <div className="[&[data-state=open]>svg]:h-96 overflow-y-auto">
              <AccordionTrigger className="flex max-lg:text-xl text-start w-full items-center justify-between py-2 text-xl gap-2">
                {item.name}
                <ChevronDown className="[&[data-state=open]>svg]:rotate-180 flex-shrink-0 size-4" />
              </AccordionTrigger>
              <AccordionContent className="text-start">
                {item.subCategories?.map((subItem, subIndex) => (
                  <div
                    key={subIndex}
                    className="flex !cursor-pointer items-center py-2 space-x-2"
                  >
                    <Checkbox
                      className="max-lg:size-6"
                      id={`characteristic_${subIndex}`}
                    />
                    <Label
                      className="!font-normal max-lg:!text-lg"
                      htmlFor={`characteristic_${subIndex}`}
                    >
                      {subItem.name}
                    </Label>
                  </div>
                ))}
              </AccordionContent>
            </div>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
};

export default MobileFilter;
