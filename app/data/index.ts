import { Dribbble, Facebook, Github, HelpCircle, Instagram, MapPin, Package, RefreshCcw, RotateCcw, Twitter, User } from "lucide-react";
import { JobOpeningProps, NavigationLinkProps, SocialLinkProps, TimelineProps } from "~/types";
import ExampleBannerImage from "@assets/images/examples/example-banner-image.webp";
import { InfoCircledIcon } from "@radix-ui/react-icons";

export const footerNavigation: NavigationLinkProps[] = [
  {
    title: "Shop",
    links: [
      { href: "/search?keyword=fantasy", title: "Fantasy" },
      { href: "/search?keyword=mystery", title: "Mystery" },
      { href: "/search?keyword=thriller", title: "Thriller" },
      { href: "/search?keyword=romance", title: "Romance" },
      { href: "/search?keyword=historical-fiction", title: "Historical Fiction" },
      { href: "/search?keyword=science-fiction", title: "Science Fiction" },
      { href: "/search?keyword=literary-fiction", title: "Literary Fiction" },
    ],
  },
  {
    title: "About Us",
    links: [
      { href: "/about", title: "Our Story" },
      { href: "/about", title: "Meet the Team" },
      { href: "/about", title: "Careers" },
    ],
  },
  {
    title: "Customer Service",
    links: [
      { href: "/contact", title: "Contact" },
      { href: "/contact", title: "FAQs" },
      { href: "/contact", title: "Shipping Information" },
    ],
  },
  {
    title: "Legal",
    links: [
      { href: "/", title: "Privacy Policy" },
      { href: "/", title: "Terms of Service" },
      { href: "/", title: "Returns & Refunds" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/", title: "Book Club" },
      { href: "/", title: "Reading Guides" },
      { href: "/", title: "Author Events" },
    ],
  },
];

export const socialLinks:SocialLinkProps[] = [
  {icon: Facebook, href: '/'},
  {icon: Instagram , href: '/'},
  {icon: Twitter , href: '/'},
  {icon: Github , href: '/'},
  {icon: Dribbble , href: '/'},
]

export const navigation = {
  categories: [
    {
      id: 'fiction',
      name: 'Fiction',
      featured: [
        {
          name: 'New Releases',
          href: '/search?Category=fiction&Type=new-releases',
          imageSrc: ExampleBannerImage,
          imageAlt: 'A stack of newly released fiction books.',
        },
        {
          name: 'Bestsellers',
          href: '/search?Category=fiction&Type=bestsellers',
          imageSrc: ExampleBannerImage,
          imageAlt: 'Bestselling fiction books displayed on a shelf.',
        },
      ],
      sections: [
        {
          id: 'genres',
          name: 'Genres',
          items: [
            { name: 'Fantasy', href: '/search?keyword=fantasy' },
            { name: 'Mystery', href: '/search?keyword=mystery' },
            { name: 'Thriller', href: '/search?keyword=thriller' },
            { name: 'Romance', href: '/search?keyword=romance' },
            { name: 'Historical Fiction', href: '/search?keyword=historical-fiction' },
            { name: 'Science Fiction', href: '/search?keyword=science-fiction' },
            { name: 'Literary Fiction', href: '/search?keyword=literary-fiction' },
          ],
        },
        {
          id: 'formats',
          name: 'Formats',
          items: [
            { name: 'Hardcover', href: '/search?Format=hardcover' },
            { name: 'Paperback', href: '/search?Format=paperback' },
            { name: 'Audiobooks', href: '/search?Format=audiobooks' },
            { name: 'E-books', href: '/search?Format=e-books' },
          ],
        },
        {
          id: 'authors',
          name: 'Authors',
          items: [
            { name: 'J.K. Rowling', href: '/search?keyword=J.K. Rowling' },
            { name: 'Stephen King', href: '/search?keyword=Stephen King' },
            { name: 'George R.R. Martin', href: '/search?keyword=George R.R. Martin' },
            { name: 'Agatha Christie', href: '/search?keyword=Agatha Christie' },
            { name: 'Margaret Atwood', href: '/search?keyword=Margaret Atwood' },
          ],
        },
      ],
    },
    {
      id: 'non-fiction',
      name: 'Non-Fiction',
      featured: [
        {
          name: 'New Releases',
          href: '/search?Category=non-fiction&Type=new-releases',
          imageSrc: ExampleBannerImage,
          imageAlt: 'A stack of newly released non-fiction books.',
        },
        {
          name: 'Bestsellers',
          href: '/search?Category=non-fiction&Type=bestsellers',
          imageSrc: ExampleBannerImage,
          imageAlt: 'Bestselling non-fiction books displayed on a table.',
        },
      ],
      sections: [
        {
          id: 'genres',
          name: 'Genres',
          items: [
            { name: 'Biography', href: '/search?keyword=biography' },
            { name: 'Self-Help', href: '/search?keyword=self-help' },
            { name: 'Cookbooks', href: '/search?keyword=cookbooks' },
            { name: 'History', href: '/search?keyword=history' },
            { name: 'Science', href: '/search?keyword=science' },
            { name: 'Business', href: '/search?keyword=business' },
            { name: 'Travel', href: '/search?keyword=travel' },
          ],
        },
        {
          id: 'formats',
          name: 'Formats',
          items: [
            { name: 'Hardcover', href: '/search?Format=hardcover' },
            { name: 'Paperback', href: '/search?Format=paperback' },
            { name: 'Audiobooks', href: '/search?Format=audiobooks' },
            { name: 'E-books', href: '/search?Format=e-books' },
          ],
        },
        {
          id: 'authors',
          name: 'Authors',
          items: [
            { name: 'Malcolm Gladwell', href: '/search?keyword=Malcolm Gladwell' },
            { name: 'Michelle Obama', href: '/search?keyword=Michelle Obama' },
            { name: 'Yuval Noah Harari', href: '/search?keyword=Yuval Noah Harari' },
            { name: 'Brene Brown', href: '/search?keyword=Brene Brown' },
          ],
        },
      ],
    },
  ],
  pages: [
    { name: 'Orders', href: '/profile/orders' },
    { name: 'About Us', href: '/about-us' },
    { name: 'Store Locations', href: '/store-locations' },
  ],
  profileNavigation: [
    { name: 'Orders', href: '/profile/orders', icon: Package },
    { name: 'User Information', href: '/profile/user-info', icon: User },
    { name: 'Repurchase', href: '/profile/repurchase', icon: RefreshCcw },
    { name: 'Help', href: '/profile/help', icon: InfoCircledIcon },
  ],
};

export const timeline:TimelineProps[] = [
  {
    name: 'Founded company',
    description:
      'Nihil aut nam. Dignissimos a pariatur et quos omnis. Aspernatur asperiores et dolorem dolorem optio voluptate repudiandae.',
    date: 'Aug 2021',
    dateTime: '2021-08',
  },
  {
    name: 'Secured $65m in funding',
    description:
      'Provident quia ut esse. Vero vel eos repudiandae aspernatur. Cumque minima impedit sapiente a architecto nihil.',
    date: 'Dec 2021',
    dateTime: '2021-12',
  },
  {
    name: 'Released beta',
    description:
      'Sunt perspiciatis incidunt. Non necessitatibus aliquid. Consequatur ut officiis earum eum quia facilis. Hic deleniti dolorem quia et.',
    date: 'Feb 2022',
    dateTime: '2022-02',
  },
  {
    name: 'Global launch of product',
    description:
      'Ut ipsa sint distinctio quod itaque nam qui. Possimus aut unde id architecto voluptatem hic aut pariatur velit.',
    date: 'Dec 2022',
    dateTime: '2022-12',
  },
]

export const jobOpenings:JobOpeningProps[] = [
  {
    role: 'Full-time designer',
    href: '#',
    description:
      'Quos sunt ad dolore ullam qui. Enim et quisquam dicta molestias. Corrupti quo voluptatum eligendi autem labore.',
    salary: '$75,000 USD',
    location: 'San Francisco, CA',
  },
  {
    role: 'Laravel developer',
    href: '#',
    description:
      'Et veniam et officia dolorum rerum. Et voluptas consequatur magni sapiente amet voluptates dolorum. Ut porro aut eveniet.',
    salary: '$125,000 USD',
    location: 'San Francisco, CA',
  },
  {
    role: 'React Native developer',
    href: '#',
    description:
      'Veniam ipsam nisi quas architecto eos non voluptatem in nemo. Est occaecati nihil omnis delectus illum est.',
    salary: '$105,000 USD',
    location: 'San Francisco, CA',
  },
]

export const profileNavigation: NavigationLinkProps[] = [
  { href: "/profile/orders", title: "Orders",icon: Package },
  { href: "/profile/addresses", title: "Addresses",icon: MapPin },
  { href: "/profile/help", title: "Help",icon: HelpCircle },
  { href: "/profile/user-info", title: "User Info",icon: User },
  { href: "/profile/repurchase", title: "Repurchase",icon: RotateCcw },
];

export const months:string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
]