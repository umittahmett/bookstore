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