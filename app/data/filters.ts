import { FilterCategory, SortByProps } from "~/types";

export const sortBy: SortByProps[] = [
  { id: "0", name: "Default: Relevance" },
  { id: "1", name: "Recently Added" },
  { id: "2", name: "Best Selling" },
  { id: "3", name: "Alphabetical Order" },
  { id: "4", name: "Highest Rated" },
];

export const bookFilters: FilterCategory[] = [
  {
    name: "Genre",
    subCategories: [
      { name: "Fiction" },
      { name: "Non-Fiction" },
      { name: "Mystery" },
      { name: "Fantasy" },
      { name: "Science Fiction" },
      { name: "Biography" },
      { name: "Self-Help" },
      { name: "Romance" },
      { name: "Thriller" },
      { name: "Children's" },
    ],
  },
  {
    name: "Author",
    subCategories: [
      { name: "J.K. Rowling" },
      { name: "Stephen King" },
      { name: "George R.R. Martin" },
      { name: "J.R.R. Tolkien" },
      { name: "Agatha Christie" },
    ],
  }, 
  {
    name: "Language",
    subCategories: [
      { name: "English" },
      { name: "Spanish" },
      { name: "French" },
      { name: "German" },
      { name: "Chinese" },
      { name: "Japanese" },
    ],
  },
];
