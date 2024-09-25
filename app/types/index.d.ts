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
}


export interface ProductSliderProps {
  title: string;
  browseAllLink: string;
  browseAllText: string;
  books: BookProps[];
  className?: string;
}