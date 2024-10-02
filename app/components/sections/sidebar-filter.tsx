// Components
import { ChevronDown, Filter, LayoutGrid, Wrench } from "lucide-react";
import { Accordion, AccordionContent } from "@components/ui/accordion";
import { AccordionItem, AccordionTrigger } from "@radix-ui/react-accordion";
import { Checkbox } from "@components/ui/checkbox";
import { Label } from "@components/ui/label";
// Types
import { FilterCategory, SidebarFilterProps } from "~/types";
// Data
import { bookFilters } from "@data/filters";
import { useSearchParams } from "@remix-run/react";
import React, { useState } from "react";
import { DualRangeSlider } from "../ui/dual-range-slider";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const SidebarFilter: React.FC<SidebarFilterProps> = ({ maxPriceRange, minPriceRange }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [priceRange, setPriceRange] = useState([maxPriceRange, minPriceRange]);

  // Set price range params
  const setPriceParams = () => {
    const params = new URLSearchParams(searchParams);
    params.set('minPrice', priceRange[0].toString());
    params.set('maxPrice', priceRange[1].toString());
    setSearchParams(params);
  };

  // Set search params
  const handleSearch = (filterName: string, value: string) => {
    const params = new URLSearchParams(searchParams);
    const existingValues = params.get(filterName)?.split(',') || [];

    if (existingValues.includes(value)) {
      const newValues = existingValues.filter((v) => v !== value);
      if (newValues.length > 0) {
        params.set(filterName, newValues.join(','));
      } else {
        params.delete(filterName);
      }
    } else {
      const newValues = [...existingValues, value];
      params.set(filterName, newValues.join(','));
    }

    setSearchParams(params);
  };


  // Handle price range change
  const handlePriceRangeChange = (range: any) => {
    setPriceRange(range);
  };

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
                      <Checkbox
                        defaultChecked={searchParams.get(item.name.toLowerCase())?.split(',').includes(subItem.name) || false}
                        onCheckedChange={() => handleSearch(item.name.toLocaleLowerCase(), subItem.name)}
                        id={`${subItem.name}_${subItem.id}`} />
                      <Label
                        className="!text-light"
                        htmlFor={`${subItem.name}_${subItem.id}`}
                      >
                        {subItem.name}
                      </Label>
                    </div>
                  )
                )}
              </AccordionContent>
            </AccordionItem>
          ))}
          {/* Price Range Section */}
          <AccordionItem className="w-full py-4" key="price" value="price">
            <AccordionTrigger className="flex text-base text-start w-full items-center justify-between gap-2">
              Price Range
              <ChevronDown className="[&[data-state=open]>svg]:rotate-180 flex-shrink-0 size-4" />
            </AccordionTrigger>
            <AccordionContent className="text-start my-2.5">
              <div className="px-2">
                <DualRangeSlider
                  className="mt-10 px-3"
                  label={(value) => value}
                  value={priceRange}
                  onValueChange={handlePriceRangeChange}
                  defaultValue={[2000, 3000]}
                  max={maxPriceRange}
                  min={0}
                  step={1}
                />
              </div>
              <div className="flex items-center gap-2.5 mt-4">
                <Input type="number" max={maxPriceRange} value={priceRange[0]} onChange={(e) => setPriceRange([parseInt(e.target.value), priceRange[1]])} />
                <Input type="number" min={0} value={priceRange[1]} onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])} />
              </div>
              <Button onClick={setPriceParams} className="mt-4 w-full">
                Apply
              </Button>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
}


export default SidebarFilter