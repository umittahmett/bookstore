import { AddressProps, BookProps, StoreLocationProps } from "~/types";

export const locations: StoreLocationProps[] = [
  {
    name: 'Book Store 1',
    address: '123 Main St, New York, NY 10001',
    phone: '123-456-7890',
    google_maps_link: 'https://www.google.com/maps/place/123+Main+St,+New+York,+NY+10001'
  },
  {
    name: 'Book Store 2',
    address: '456 Broadway, New York, NY 10012',
    phone: '123-456-7890',
    google_maps_link: 'https://www.google.com/maps/place/456+Broadway,+New+York,+NY+10012'
  },
  {
    name: 'Book Store 3',
    address: '789 5th Ave, New York, NY 10022',
    phone: '123-456-7890',
    google_maps_link: 'https://www.google.com/maps/place/789+5th+Ave,+New+York,+NY+10022'
  },
  {
    name: 'Book Store 4',
    address: '1600 Pennsylvania Ave NW, Washington, DC 20500',
    phone: '202-456-1111',
    google_maps_link: 'https://www.google.com/maps/place/1600+Pennsylvania+Ave+NW,+Washington,+DC+20500'
  },
  {
    name: 'Book Store 5',
    address: '1 Infinite Loop, Cupertino, CA 95014',
    phone: '408-996-1010',
    google_maps_link: 'https://www.google.com/maps/place/1+Infinite+Loop,+Cupertino,+CA+95014'
  },
  {
    name: 'Book Store 6',
    address: '350 5th Ave, New York, NY 10118',
    phone: '212-736-3100',
    google_maps_link: 'https://www.google.com/maps/place/350+5th+Ave,+New+York,+NY+10118'
  },
  {
    name: 'Book Store 7',
    address: '221B Baker St, Marylebone, London NW1 6XE, UK',
    phone: '+44 20 7224 3688',
    google_maps_link: 'https://www.google.com/maps/place/221B+Baker+St,+Marylebone,+London+NW1+6XE,+UK'
  },
  {
    name: 'Book Store 8',
    address: '1600 Amphitheatre Pkwy, Mountain View, CA 94043',
    phone: '650-253-0000',
    google_maps_link: 'https://www.google.com/maps/place/1600+Amphitheatre+Pkwy,+Mountain+View,+CA+94043'
  },
  {
    name: 'Book Store 9',
    address: '350 5th Ave, New York, NY 10118',
    phone: '212-736-3100',
    google_maps_link: 'https://www.google.com/maps/place/350+5th+Ave,+New+York,+NY+10118'
  },
  {
    name: 'Book Store 10',
    address: '500 S Buena Vista St, Burbank, CA 91521',
    phone: '818-560-1000',
    google_maps_link: 'https://www.google.com/maps/place/500+S+Buena+Vista+St,+Burbank,+CA+91521'
  }
]

export const cities: string[] = [
  'Los Angeles',
  'Chicago',
  'Houston',
  'Phoenix',
  'Philadelphia',
  'San Antonio',
  'San Diego',
  'Dallas',
  'San Jose',
  'Austin',
  'Jacksonville',
  'Fort Worth',
  'Columbus',
  'Charlotte',
  'San Francisco',
  'Indianapolis',
  'Seattle',
  'Denver',
  'Washington',
  'Boston',
  'El Paso',
  'Nashville',
  'Detroit',
  'Oklahoma City',
  'Portland',
  'Las Vegas',
  'Memphis',
  'Louisville',
  'Baltimore',
  'Milwaukee',
  'Albuquerque',
  'Tucson',
  'Fresno',
  'Sacramento',
  'Kansas City',
  'Long Beach',
  'Mesa',
  'Atlanta',
  'Colorado Springs',
  'Virginia Beach',
  'Raleigh',
  'Omaha',
  'Miami',
  'Oakland',
  'Minneapolis',
  'Tulsa',
  'Wichita',
  'New Orleans',
  'Arlington'
];

export const books: BookProps[] = [
  {
    id: 1,
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    publication_date: "1949-06-08",
    isbn: "9780451524935",
    page_count: 328,
    language: "English",
    price: 12.99,
    discount_percentage: 10,
    stock_quantity: 100,
    cover_image_url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRPB_n-Tm1DARvOv7YSQDBgfCnDIRpuGeHwAekIw8J3Gu162UPb8UarDHLX1TcoVSC3ntqkzO1zBDINfyqXa0PUOuNpOB2tL60SY34ZxTgxhqenIpCCYxci&usqp=CAE",
    description: "A novel about government surveillance and mind control under a totalitarian regime.",
    quantity: 1
  },
  {
    id: 2,
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Classic",
    publication_date: "1960-07-11",
    isbn: "9780061120084",
    page_count: 336,
    language: "English",
    price: 15.99,
    stock_quantity: 50,
    cover_image_url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSMhM81p3_9dhlRmzs5yLu-lNbMerDswAgqUnUbXwwxSRf7Vj8XYYn1JgO_bNBd-T2Nf_gbTt1pwuGWzmeYkWKe95z6H_CDLoa8HayMQ77I4DfDrbOj7G3nmA&usqp=CAE",
    description: "A gripping story about racial injustice in the Deep South.",
    quantity: 1
  },
  {
    id: 3,
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    publication_date: "1925-04-10",
    isbn: "9780743273565",
    page_count: 180,
    language: "English",
    price: 10.99,
    stock_quantity: 200,
    cover_image_url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRvKR46d8q7JL0bF3aGFCR-KtkTKCjo_Op9kRnEaXHHEy2RtQ9_rukfuNgOgqDgT_7jOnVry4da1sHGq_-8Axo-nb3E_lEyz0CMcULkmFL1&usqp=CAE",
    description: "A novel depicting the extravagant lives of the 1920s American elite.",
    quantity: 1
  },
  {
    id: 4,
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    publication_date: "1813-01-28",
    isbn: "9781503290563",
    page_count: 279,
    language: "English",
    price: 9.99,
    stock_quantity: 150,
    cover_image_url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSOGUj_ypQj54mF9VD0TMNaBNYhQoJgGm_XoYlJOyD9zVhz6botKjAhXhNa5UtCEytP24vr0rMor6S8F7ykjqzrmU3TPv5QRSJ5Y_XPMZG9bWJuJz1XINvckg&usqp=CAE",
    description: "A romantic novel that charts the emotional development of the protagonist Elizabeth Bennet.",
    quantity: 1
  },
  {
    id: 5,
    title: "Moby Dick",
    author: "Herman Melville",
    genre: "Adventure",
    publication_date: "1851-10-18",
    isbn: "9781503280786",
    page_count: 635,
    language: "English",
    price: 14.99,
    stock_quantity: 80,
    cover_image_url: "https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcSvaKFSFatj0uLtyk4KnVKavG0Og83xCpu7p2_n9bYcpSv1JmltHJDQocNV12UM9YLKo8un2Zbzv9Fc0Au8YXM9JdlcsBzNeQz0fNvu6Om9&usqp=CAE",
    description: "The narrative of Captain Ahab's obsessive quest to kill the white whale, Moby Dick.",
    quantity: 1
  },
  {
    id: 6,
    title: "War and Peace",
    author: "Leo Tolstoy",
    genre: "Historical",
    publication_date: "1869-01-01",
    isbn: "9780199232765",
    page_count: 1225,
    language: "Russian",
    price: 19.99,
    stock_quantity: 60,
    cover_image_url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcSDlakVpg13fMM5LdIt8XFVd1zEyGJEq9Bt8vijaG0A48FYpvulVlu6m_6BMSGfQ5g3S0UKC1Ou8FhQ0q_68sUg4mnX-LE57I1wjunmQ6N0&usqp=CAE",
    description: "A historical novel that intertwines the lives of private and public individuals during the time of the Napoleonic wars.",
    quantity: 1
  },
  {
    id: 7,
    title: "The Brothers Karamazov",
    author: "Fyodor Dostoevsky",
    genre: "Philosophical",
    publication_date: "1880-11-01",
    isbn: "9780140449242",
    page_count: 824,
    language: "Russian",
    price: 18.99,
    stock_quantity: 70,
    cover_image_url: "https://encrypted-tbn3.gstatic.com/shopping?q=tbn:ANd9GcT6RrqrCc_hRUV-NfefIBpok7Xm1NmlMkgHtHtqYOSmnah7klOoZhhqrTDg6nH2JUTpDMxQHS2EZCpj9yF8T_PR15FiLyhIYwyULy0mmbTMLQrmjasqmm4g&usqp=CAE",
    description: "A passionate philosophical novel that enters deeply into the ethical debates of God, free will, and morality.",
    quantity: 1
  },
  {
    id: 8,
    title: "Jane Eyre",
    author: "Charlotte Brontë",
    genre: "Gothic",
    publication_date: "1847-10-16",
    isbn: "9780141441146",
    page_count: 500,
    language: "English",
    price: 11.99,
    stock_quantity: 90,
    cover_image_url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcR2hsF9tLI2Zt97lzhV1RFth6N9jf9fLj4k2hN0qgH3QLCiYUUPiMCNFOeq2Rae7YM44NbTReDkSqlCPRElCm7ds_m3yu58k-iwuSqh9cpYYyscnXQWR9ouMg&usqp=CAE",
    description: "A novel that follows the experiences of its eponymous heroine, including her growth to adulthood and love for Mr. Rochester.",
    quantity: 1
  },
  {
    id: 9,
    title: "Crime and Punishment",
    author: "Fyodor Dostoevsky",
    genre: "Psychological",
    publication_date: "1866-01-01",
    isbn: "9780140449136",
    page_count: 671,
    language: "Russian",
    price: 16.99,
    stock_quantity: 85,
    cover_image_url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcQNN8VatZgw1uIYz0arONjyd8LeMff0d5YRP91XiSpUIZy5YKeTzXDq4dvXKYszN_C4sbU1xE2aUvVf-e0KviKLIOjdJ1awqAI_BeT_f84XqRTr-9AQk6aPFA&usqp=CAE",
    description: "A novel focusing on the mental anguish and moral dilemmas of an impoverished ex-student who kills a pawnbroker.",
    quantity: 1
  },
  {
    id: 10,
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Fiction",
    publication_date: "1951-07-16",
    isbn: "9780316769488",
    page_count: 277,
    language: "English",
    price: 13.99,
    stock_quantity: 120,
    cover_image_url: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcTVkqtfhOrrU0BgsiXbJ2NV6a11S6NN_0nVNZAVosS9yucm58rjkTUvgoC0iu7ShbrWamEK3dhQkEvfNSNaqC5zggwbhbxQgWhX9d69BTCRkgaQd0ioE_G36A&usqp=CAE",
    description: "A story about adolescent Holden Caulfield's disillusionment with the adult world.",
    quantity: 1
  },
  {
    id: 11,
    title: "The Lord of the Rings",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    publication_date: "1954-07-29",
    isbn: "9780544003415",
    page_count: 1216,
    language: "English",
    price: 22.99,
    stock_quantity: 150,
    cover_image_url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSXQLITvo-7SLOg7-sPzhYohpaVkpWM5zKZj-HoZ_RgVJHFqT9HJKC7dD-YASusJayy_9H8LYM6gjWVmLuLu25WQsGbJF81QDfan3f46m7bE7VO07pOflFr&usqp=CAE",
    description: "An epic high-fantasy novel that follows the quest to destroy the One Ring.",
    quantity: 1
  },
  {
    id: 12,
    title: "Brave New World",
    author: "Aldous Huxley",
    genre: "Dystopian",
    publication_date: "1932-08-31",
    isbn: "9780060850524",
    page_count: 288,
    language: "English",
    price: 14.99,
    stock_quantity: 95,
    cover_image_url: "https://encrypted-tbn1.gstatic.com/shopping?q=tbn:ANd9GcSZSJ6r0IFcUKg9ALRoMDxwk_Ng3mMoXCDBlqu-S5roE5Pi1MqR30e1LPv6pEP7xRtLAmPAT0Iinf0OO0Ll5VUHtpO1sTwKz-9x1n1x5og&usqp=CAE",
    description: "A dystopian novel that explores the dangers of state control and technological advancements.",
    quantity: 1
  }
];


export const addresses:AddressProps[] = [
  {
    name: 'Home 1',
    firstName: 'Home',
    lastName: 'John Doe',
    address: '123 Main St',
    addressLine2: 'Apt 2B',
    country: 'United States',
    city: 'Los Angeles',
    zip: '90001',
    phone: '123-456-7890',
    additionalInfo: 'Ring the bell for Apt 2B'
  },
  {
    name: 'Home 2',
    firstName: 'Work',
    lastName: 'John Doe',
    address: '456 Broadway',
    addressLine2: 'Floor 3',
    country: 'United States',
    city: 'New York',
    zip: '10012',
    phone: '123-456-7890',
    additionalInfo: 'Ring the bell for Apt 2B'
  },


  {
    name: 'Home 2',
    firstName: 'Work',
    lastName: 'John Doe',
    address: '456 Broadway',
    addressLine2: 'Floor 3',
    country: 'United States',
    city: 'New York',
    zip: '10012',
    phone: '123-456-7890',
    additionalInfo: 'Ring the bell for Apt 2B'
  },  {
    name: 'Home 2',
    firstName: 'Work',
    lastName: 'John Doe',
    address: '456 Broadway',
    addressLine2: 'Floor 3',
    country: 'United States',
    city: 'New York',
    zip: '10012',
    phone: '123-456-7890',
    additionalInfo: 'Ring the bell for Apt 2B'
  },  {
    name: 'Home 2',
    firstName: 'Work',
    lastName: 'John Doe',
    address: '456 Broadway',
    addressLine2: 'Floor 3',
    country: 'United States',
    city: 'New York',
    zip: '10012',
    phone: '123-456-7890',
    additionalInfo: 'Ring the bell for Apt 2B'
  },  {
    name: 'Home 2',
    firstName: 'Work',
    lastName: 'John Doe',
    address: '456 Broadway',
    addressLine2: 'Floor 3',
    country: 'United States',
    city: 'New York',
    zip: '10012',
    phone: '123-456-7890',
    additionalInfo: 'Ring the bell for Apt 2B'
  },
  {
    name: 'Home 3',
    firstName: 'Grandma',
    lastName: 'Jane Doe',
    address: '789 5th Ave',
    addressLine2: 'Apt 1C',
    country: 'United States',
    city: 'New York',
    zip: '10022',
    phone: '123-456-7890',
    additionalInfo: 'Ring the bell for Apt 2B'
  }
]