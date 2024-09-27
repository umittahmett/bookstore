// Components
import { ChevronDown, Filter, LayoutGrid, Wrench } from "lucide-react";
import { Accordion, AccordionContent } from "@components/ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
// Types
import { FilterCategory } from "~/types";
// Data
import { bookFilters } from "@data/filters";

export default function SidebarFilter() {
  return (
    <div className="sticky top-5 max-xl:col-span-4 xl:col-span-3 rounded-lg h-fit bg-white border border-slate-200 w-full pb-1 p-6 max-lg:hidden">
      <div className="relative w-full">
        <div className="border-b border-slate-300 ">
          <h2 className="font-semibold text-sm mb-2 uppercase text-black flex items-center gap-2">
            Filters
          </h2>
        </div>

        <h2 className="font-semibold text-sm mb-2 uppercase mt-6 flex items-center gap-2">
          <LayoutGrid className="size-4" />
          Customize Your Result
        </h2>
        <Accordion type="multiple" className="w-full divide-y divide-slate-200">
          {bookFilters.map((item, index) => (
            <AccordionItem
              className="w-full py-4"
              key={index}
              value={item.name}
            >
              <AccordionTrigger className="flex text-base text-start w-full items-center justify-between gap-2">
                {item.name}
                <ChevronDown className="[&[data-state=open]>svg]:rotate-180 flex-shrink-0 size-4" />
              </AccordionTrigger>
              <AccordionContent className="text-start max-h-96 overflow-y-auto my-2.5">
                {item.subCategories?.map(
                  (subItem: FilterCategory, subIndex: number) => (
                    <div
                      key={subIndex}
                      className="flex !cursor-pointer items-center py-2 space-x-2"
                    >
                      <Checkbox id={`characteristic_${subIndex}`} />
                      <Label
                        className="!text-light"
                        htmlFor={`characteristic_${subIndex}`}
                      >
                        {subItem.name}
                      </Label>
                    </div>
                  )
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
