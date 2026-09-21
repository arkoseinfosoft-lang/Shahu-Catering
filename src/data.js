const L = (s) => s.split(',').map((x) => x.trim())
const c = (t, b, s) => [t, b, L(s)]
export const packages = [
  { id: 'platinum', name: 'Platinum', price: 600, tag: 'The grand experience: 11 courses',
    cats: [
      c('Welcome Drink', 'Any 3', 'Cream Coconut Soup,Broccoli Soup,Tom Yum Soup,Mojito,Blackcurrant Drink,Fruit Punch,Red Guava,Green Guava,Blue Lagoon,Sunrise,Apple Walif'),
      c('Starter', 'Any 3', 'Paneer Tikka / with Vegetable,Paneer Achari Tikka,Veg Seekh Kabab,Baby Corn Stick,Cigar Roll,Chilli Paneer,Momos,Pizza Cheese Grilled,Grilled Veg Cheese Sandwich,Cheese Ball,Mini Cheese Corn Samosa'),
      c('Roti', 'Any 3', 'Phulka Roti,Rumali Roti,Paratha,Tandoori Roti,Puri (Masala / Seasonal),Missi Roti,Merad Naan'),
      c('Paneer Curry', 'Any 1', 'Paneer Butter Masala,Paneer Tikka Masala,Shahi Paneer,Kadhai Paneer,Paneer Hyderabadi,Sweet Corn Palak Paneer,Khas-Khas Paneer'),
      c('Veg Curry', 'Any 3', 'Khas-Khas,Tawa Veg,Green Garden Veg,Bhindi Masala,Pyaj Patte Ki Sabji,Mushroom Masala,Methi Matar Malai,Patwadi Rassa,Corn Palak,Veg Anda Curry,Jhunka Bhakar (Condition Apply),Baingan Bharta,Dum Aaloo,Kolhapuri Mix Veg,Malai Kofta,Rajma / Chole,Kathal Curry'),
      c('Rice', 'Any 2', 'Veg Biryani,Jeera Rice,Kathal Biryani,Tawa Pulao,Veg Pulao,Schezwan Rice,Garlic Rice,Singapore Rice'),
      c('South Indian Snack', 'Any 1', 'Dosa (Paper / Masala),Loni Dosa,Sigdi Dosa,Rawa Dosa,Uttapam,Paneer Chilla,Dhokla,Misal Pav'),
      c('Chaat', 'Any 4', 'Dahi Bhalla,Pani Puri,Shev Puri,Papdi Chaat,Dahi Puri,Bhalla Papdi Chaat,Raj Kachori,Basket Chaat,Mix Fruit Chaat,Katori Chaat,Pan Chaat / Palak Chaat,Ragda Pattie,Corn Chaat,Bhel,Masala Papad,Pav Bhaji'),
      c('Chinese', 'Any 4', 'Veg Noodles,Manchurian,Chilli Potato,Hakka Noodles,Singapore Noodles,Live Maggi,White Sauce Pasta,Red Sauce Pasta,Macaroni,American Chopsuey,Chinese Bhel,Soya Chaap,Soya Chilli,Spring Potato'),
      c('Sweet', 'Any 3', 'Rajbhog Vada,Gud Ka Rasgulla,Kesar Badam Katli,Kalakand (Hot Barfi),Seasonal Sweets (Amarkhand),Sweet Sizzler,Mango Dilbahar,Rasmalai,Kaju Katli,Hot Gulab Jamun,Kaju Roll,Badam Halwa,Anjeer Halwa,Gajar Halwa (Seasonal),Shrikhand,Cheena Tarbuj,Rabdi Jalebi,Khoa Jalebi,Basundi,Kesar Doodh,Khir Kadam,Sandesh,Bakes Rasgulla,Mishti Doi'),
      c('Dessert', 'Any 1', 'Ice-cream (Cup / Cone),Brownie,Pastry,Kulfi,Hot Coffee,Cold Coffee,Assorted Pastry,Cup Cakes'),
    ] },
  { id: 'golden', name: 'Golden', price: 350, tag: 'Balanced, generous, crowd-pleasing',
    cats: [
      c('Welcome Drink', 'Any 1', 'Hot & Sour Soup,Manchow Soup,Fruit Punch,Cold Drink,Seasonal Drink,Green Soup'),
      c('Starter', 'Any 2', 'Crispy Veg,Hara Bhara Kabab,Chilli Paneer,Cheese Ball,Spring Roll,Corn Kabab'),
      c('Main Course', 'Included', 'Phulka Roti,Masala Puri (Seasonal),Veg Biryani,Dal Tadka'),
      c('Veg Curry', 'Any 1', 'Seasonal Veg (Masala Dhemsa / Masala Bhindi),Methi Matar Malai,Veg Anda Curry,Veg Kofta Curry,Patwadi Rassa'),
      c('Paneer Curry', 'Any 1', 'Kadhai Paneer,Paneer Angara,Matar Paneer,Palak Paneer,Sweet Corn Palak Paneer'),
      c('Chaat', 'Any 2', 'Dahi Bhalla,Ragda Patti,Papdi Chaat,Pani Puri,Palak Patta Chaat,Dahi Puri'),
      c('Chinese', 'Any 2', 'Noodles,Manchurian,White Sauce Pasta,Red Sauce Pasta,American Chopsuey'),
      c('Snacks', 'Any 1', 'Mini Kachori,Sambharwadi (Seasonal),Jodhpuri Mirchi Wada,Corn Cutlet,Mutter Puff,Mini Bread Pakoda,Veg Grilled Sandwich'),
      c('Sweet', 'Any 2', 'Rasmalai,Moong Dal Halwa,Shrikhand,Shahi Tukda,Rabdi Jalebi,Hot Kalakand,Pineapple Jalebi,Seasonal Sweet (Gajar Halwa / Amarkhand),Khoa Roti / Puran Poli'),
    ] },
  { id: 'silver', name: 'Silver', price: 280, tag: 'Classic, honest, complete',
    cats: [
      c('Main Course', 'Included', 'Phulka Roti,Jeera Rice,Dal Fry,Seasonal Veg,Matar Paneer,Papad,Aachar,Water'),
      c('Chaat or Starter', 'Any 1', 'Dahi Wada,Pani Puri + Crispy Veg / Hara Bhara Kabab'),
      c('Bhaje', 'Any 1', 'Moong Pakoda,Aaloo Bonda,Aaloo Bhaje'),
      c('Sweet', 'Any 1', 'Gulab Jamun,Mawa Wati,Rasgulla,Dahi Jalebi'),
    ] },
]
