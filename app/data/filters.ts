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
    name: "Price Range",
    subCategories: [
      { name: "$0 - $10" },
      { name: "$10 - $20" },
      { name: "$20 - $30" },
      { name: "$30 - $50" },
      { name: "Above $50" },
    ],
  },
  {
    name: "Publication Year",
    subCategories: [
      { name: "2023" },
      { name: "2022" },
      { name: "2021" },
      { name: "2020" },
      { name: "2010-2019" },
      { name: "2000-2009" },
      { name: "1990-1999" },
      { name: "1980-1989" },
      { name: "Before 1980" },
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
  {
    name: "Format",
    subCategories: [
      { name: "Hardcover" },
      { name: "Paperback" },
      { name: "E-book" },
      { name: "Audiobook" },
    ],
  },
];
