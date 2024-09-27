export interface NavigationLinkProps {
  title: string;
  href?: string;
  links?: NavigationLinkProps[];
}
export interface SocialLinkProps{
  icon: React.ElementType;
  href: string;
}
export interface StoreLocationProps{
  name: string;
  address: string;
  phone: string;
  google_maps_link: string;
}
export interface HeadingProps{
  title: string;
  description?: string; 
  type?: 'h1' | 'h2' | 'h3';
}

export interface BookProps {
  id: number;
  title: string;
  author: string;
  genre: string;
  publication_date: string;
  isbn: string;
  page_count: number;
  language: string;
  price: number;
  discount_percentage?: number;
  stock_quantity: number;
  cover_image_url: string;
  description: string;
  quantity: number;
  selected?: boolean;
}
export interface ProductSliderProps {
  title: string;
  browseAllLink: string;
  browseAllText: string;
  books: BookProps[];
  className?: string;
}
export interface FilterCategory {
  id?: string;
  name: string;
  subCategories?: FilterCategory[];
}
export interface MobileFilterProps {
  onCloseClick: () => void;
}
export interface BookSearchProps {
  onFilterClick: () => void;
}
export interface SortByProps {
  id: string;
  name: string;
}