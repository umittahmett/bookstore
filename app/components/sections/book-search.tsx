import { Filter, Search } from "lucide-react";
import { Button } from "@components/ui/button";
import { Input } from "@components/ui/input";
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
import { useState } from "react";

const BookSearch: React.FC<BookSearchProps> = ({ onFilterClick, hideFilter }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [keyword, setKeyword] = useState<string>(searchParams.get("keyword") || "");

  const handleSearch = () => {
    setSearchParams({ keyword });
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setKeyword(event.target.value);
  };

  return (
    <div className="pb-5 border-b border-zinc-200">

      {/* Search by keyword */}
      <div className="w-full mb-5">
        <div className="relative">
          <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
            <Search aria-hidden="true" className="h-5 w-5 text-zinc-400" />
          </div>
          <Input
            id="search"
            name="search"
            type="search"
            placeholder="Search"
            className="pl-12 pr-14"
            value={keyword}
            onChange={handleInputChange}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch();
              }
            }}
          />
          <div className="absolute inset-y-0 right-[7px] flex items-center pl-3">
            <Button className="!h-9" size="sm" onClick={handleSearch}>
              Search
            </Button>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); handleSearch(); }} className="hidden">
            <input type="submit" />
          </form>
        </div>
      </div>

      {/* Sort */}
      {!hideFilter &&
        <div className="w-full space-y-5">
          <div className="flex w-full items-center gap-2 justify-end">
            <Button
              onClick={onFilterClick}
              className="lg:hidden"
              variant="outline"
            >
              Filter <Filter className="size-4 max-[400px]:size-3" />
            </Button>

            <Select>
              <SelectTrigger className="w-fit gap-2.5">
                <SelectValue placeholder="Sort projects by stock, relevance..." />
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
      }
    </div >
  );
};

export default BookSearch;
