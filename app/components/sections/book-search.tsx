import { Filter, Search } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import { BookSearchProps } from "~/types";
import { sortBy } from "@data/filters";
import { useSearchParams } from "@remix-run/react";

const BookSearch: React.FC<BookSearchProps> = ({ onFilterClick, productsCount }) => {
  const [searchParams] = useSearchParams();
  const keyword = searchParams.get("keyword")

  return (
    <div className="pb-5 border-b border-zinc-200">
      {/* Sort */}
      {productsCount !== 0 &&
        <div className="w-full space-y-5">
          <div className="flex w-full items-center gap-2 justify-end max-md:flex-col">
            {/* Products count */}
            <div className="text-sm text-zinc-700 mr-auto flex-shrink-0">
              <span className="font-bold">{productsCount}</span> <span className="font-normal"> {productsCount === 1 ? 'result' : 'results'} found for</span> <span className="font-bold">"{keyword}"</span>
            </div>

            <div className="flex items-center gap-2 justify-end w-full">
              <Button
                onClick={onFilterClick}
                className="lg:hidden"
                variant="outline"
              >
                Filter <Filter className="size-4 max-[400px]:size-3" />
              </Button>

              <Select defaultValue="0">
                <SelectTrigger className="w-fit max-sm:max-w-[50dvw] gap-2.5">
                  <SelectValue />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    {sortBy.map((item, index) => (
                      <SelectItem key={index} value={item.id}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default BookSearch;
