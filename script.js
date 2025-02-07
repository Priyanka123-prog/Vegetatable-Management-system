// ---------------------------- Search Functionality ----------------------------
let items = [
    { name: "Apple", category: "fruit", type: "sweet", price: 120, availability: "available", rating: 5, popularity: 100 },
    { name: "Amla", category: "fruit", type: "tangy", price: 40, availability: "available", rating: 3, popularity: 70 },
    { name: "Banana", category: "fruit", type: "tropical", price: 50, availability: "available", rating: 4, popularity: 90 },
    { name: "Ber Fruit", category: "fruit", type: "berry", price: 50, availability: "out_of_stock", rating: 3, popularity: 60 },
    { name: "BlackBerry", category: "fruit", type: "berry", price: 50, availability: "out_of_stock", rating: 4, popularity: 80 },
    { name: "Cherry", category: "fruit", type: "stone", price: 50, availability: "out_of_stock", rating: 4, popularity: 75 },
    { name: "Coconut", category: "fruit", type: "tropical", price: 50, availability: "available", rating: 4, popularity: 85 },
    { name: "Custard Apple", category: "fruit", type: "tropical", price: 50, availability: "available", rating: 4, popularity: 75 },
    { name: "Dragon Fruit", category: "fruit", type: "tropical", price: 50, availability: "available", rating: 4, popularity: 90 },
    { name: "Grapes", category: "fruit", type: "berry", price: 80, availability: "available", rating: 5, popularity: 95 },
    { name: "Guava", category: "fruit", type: "tropical", price: 50, availability: "available", rating: 4, popularity: 80 },
    { name: "Ice Apple", category: "fruit", type: "tropical", price: 50, availability: "out_of_stock", rating: 4, popularity: 65 },
    { name: "Jackfruit", category: "fruit", type: "tropical", price: 50, availability: "out_of_stock", rating: 4, popularity: 70 },
    { name: "Jamun", category: "fruit", type: "berry", price: 50, availability: "out_of_stock", rating: 4, popularity: 55 },
    { name: "Kiwi", category: "fruit", type: "tropical", price: 50, availability: "available", rating: 4, popularity: 85 },
    { name: "Litchi", category: "fruit", type: "tropical", price: 50, availability: "out_of_stock", rating: 4, popularity: 90 },
    { name: "Mango", category: "fruit", type: "tropical", price: 50, availability: "out_of_stock", rating: 5, popularity: 100 },
    { name: "Musk Melon", category: "fruit", type: "melon", price: 80, availability: "available", rating: 4, popularity: 80 },
    { name: "Orange", category: "fruit", type: "citrus", price: 60, availability: "available", rating: 5, popularity: 95 },
    { name: "Papaya", category: "fruit", type: "tropical", price: 60, availability: "available", rating: 4, popularity: 75 },
    { name: "Pears", category: "fruit", type: "sweet", price: 50, availability: "available", rating: 4, popularity: 70 },
    { name: "Pomegranate", category: "fruit", type: "berry", price: 50, availability: "available", rating: 5, popularity: 80 },
    { name: "Pineapple", category: "fruit", type: "tropical", price: 50, availability: "available", rating: 4, popularity: 85 },
    { name: "Sapota", category: "fruit", type: "tropical", price: 50, availability: "available", rating: 3, popularity: 65 },
    { name: "Sweet Lime", category: "fruit", type: "citrus", price: 50, availability: "available", rating: 3, popularity: 60 },
    { name: "Star Fruit", category: "fruit", type: "tropical", price: 50, availability: "out_of_stock", rating: 3, popularity: 50 },
    { name: "Strawberry", category: "fruit", type: "berry", price: 100, availability: "available", rating: 5, popularity: 90 },
    { name: "Red Grapes", category: "fruit", type: "berry", price: 80, availability: "out_of_stock", rating: 3, popularity: 55 },
    { name: "Watermelon", category: "fruit", type: "melon", price: 30, availability: "available", rating: 5, popularity: 100 },
    { name: "Carrot", category: "vegetable", type: "root", price: 40, availability: "out_of_stock", rating: 3, popularity: 60 },
    { name: "Broccoli", category: "vegetable", type: "leafy", price: 50, availability: "available", rating: 4, popularity: 75 },
    { name: "Spinach", category: "vegetable", type: "leafy", price: 30, availability: "available", rating: 5, popularity: 80 },
    { name: "Cauliflower", category: "vegetable", type: "flower", price: 40, availability: "available", rating: 4, popularity: 70 },
    { name: "Potato", category: "vegetable", type: "root", price: 20, availability: "available", rating: 4, popularity: 85 },
    { name: "Tomato", category: "vegetable", type: "fruit", price: 30, availability: "available", rating: 5, popularity: 90 },
    // Add more items as needed...
];

// Filter items based on the selected criteria
function filterItems() {
    let query = document.getElementById("searchBar").value.toLowerCase();
    let minPrice = document.getElementById("minPrice").value;
    let maxPrice = document.getElementById("maxPrice").value;
    let category = document.getElementById("category").value;
    let availability = document.getElementById("availability").value;
    let minRating = document.getElementById("minRating").value;
    let sortBy = document.getElementById("sortBy").value;

    let filteredItems = items.filter(item => {
        let matchQuery = item.name.toLowerCase().includes(query);
        let matchPrice = (!minPrice || item.price >= minPrice) && (!maxPrice || item.price <= maxPrice);
        let matchCategory = category === "all" || item.category === category;
        let matchAvailability = availability === "all" || item.availability === availability;
        let matchRating = !minRating || item.rating >= minRating;

        return matchQuery && matchPrice && matchCategory && matchAvailability && matchRating;
    });

    // Sort the filtered items
    if (sortBy === "priceAsc") {
        filteredItems.sort((a, b) => a.price - b.price);
    } else if (sortBy === "priceDesc") {
        filteredItems.sort((a, b) => b.price - a.price);
    } else if (sortBy === "ratingDesc") {
        filteredItems.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === "popularity") {
        filteredItems.sort((a, b) => b.popularity - a.popularity);
    }

    displayItems(filteredItems);
}

// Show suggestions for autocomplete
function showSuggestions(query) {
    let suggestionsBox = document.getElementById("suggestions");
    if (query.length === 0) {
        suggestionsBox.style.display = "none";
        return;
    }

    let matches = items.filter(item => item.name.toLowerCase().startsWith(query.toLowerCase()));

    if (matches.length > 0) {
        suggestionsBox.innerHTML = matches
            .map(item => `<div onclick="selectSuggestion('${item.name}')">${item.name}</div>`)
            .join('');
        suggestionsBox.style.display = "block";
    } else {
        suggestionsBox.style.display = "none";
    }
}

// Select a suggestion from autocomplete
function selectSuggestion(name) {
    document.getElementById("searchBar").value = name;
    document.getElementById("suggestions").style.display = "none";
}

// Display filtered and sorted items (add your rendering logic here)
function displayItems(filteredItems) {
    const container = document.getElementById("item-container");
    container.innerHTML = ""; // Clear previous items
    filteredItems.forEach(item => {
        container.innerHTML += `
            <div class="item-container">
                <div class="item-image"></div>
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Rating: ${item.rating} stars</p>
            </div>
        `;
    });
}

// Function to set the selected suggestion in the search bar
function selectSuggestion(name) {
    document.getElementById("searchBar").value = name;
    document.getElementById("suggestions").style.display = "none";
}

// Search through vegetables and fruits
document.getElementById('searchBar').addEventListener('input', function() {
    const query = this.value.toLowerCase();
    const filteredVegetables = vegetables.filter(item => item.name.toLowerCase().includes(query));
    const filteredFruits = fruits.filter(item => item.name.toLowerCase().includes(query));

    displayItems('vegetables', filteredVegetables);
    displayItems('fruits', filteredFruits);
});
const vegetables = [
    {
        name: "Onion",
        indianName: "प्याज़",
        type: "Allium",
        nutrition: "Rich in vitamin C, B6, folate, & antioxidants.",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Onion.jpg",
        rating: 4.5
    },
    {
        name: "Potato",
        indianName: "आलू",
        type: "Root",
        nutrition: "High in carbohydrates, vitamin C, potassium, & fibe.",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Potato.jpg",
        rating: 4.5
    },
    {
        name: "Tomato",
        indianName: "टमाटर",
        type: "Normal",
        nutrition: "Good source of vitamin C, K, potassium, folate, & lycopene",
        price: "60",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Tomato.jpg",
        rating: 4.5
    },
    {
        name: "Sweet Potato",
        indianName: "शकरकंद",
        type: "Root",
        nutrition: "High in fiber, vitamin A, C, manganese, & potassium.",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Sweetpotato.jpg",
        rating: 4.5
    },
    {
        name: "Bell Pepper",
        indianName: "शिमला मिर्च",
        type: "Normal",
        nutrition: "Rich in vitamin C, A, B6, & antioxidants",
        price: "60",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/BellPeppers.jpg",
        rating: 4.5
    },
    {
        name: "Cauliflower",
        indianName: "फूलगोभी",
        type: "Cruciferous",
        nutrition: "Rich in vitamin C, K, folate, fiber, & antioxidants",
        price: "60",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Cauliflower.jpg",
        rating: 4.5
    },
    {
        name: "Broccoli",
        indianName: "ब्रोकोली",
        type: "Cruciferous",
        nutrition: "Excellent source of vitamins C, K, fiber, potassium, & antioxidants",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Broccolie.jpg",
        rating: 4.5
    },
    {
        name: "Cabbage",
        indianName: "पत्ता गोभी",
        type: "Leafy",
        nutrition: "High in vitamin C, K, fiber, folate & antioxidants",
        price: "60",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Cabbage.jpg",
        rating: 4.5
    },
    {
        name: "Carrot",
        indianName: "गाजर",
        type: "Root",
        nutrition: "Excellent source of vitamin A ,K1 , potassium & fiber.",
        price: "60",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Carrot.jpg",
        rating: 4.5
    },

    {
        name: "Lady-Finger",
        indianName: "भिंडी",
        type: "Fruit-Vegetable",
        nutrition: "Rich in vitamins C, K, & fiber, with good amounts of magnesium.",
        price: "60",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Lady-finger.jpg",
        rating: 4.5
    },
    {
        name: "Brinjal",
        indianName: "बैगन",
        type: "Fruit-Vegetable",
        nutrition: "Contains fiber, vitamin B6, K, folate, & antioxidants",
        price: "60",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Brinjal.jpg",
        rating: 4.5
    },
    {
        name: "Bottle Gourd",
        indianName: "लौकी",
        type: "Marrow",
        nutrition: "Low in calories, high in water content, fiber & vitamin C.",
        price: "40",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Bottle-gourd.jpg",
        rating: 4.5
    },
    {
        name: "BitterGourd",
        indianName: "करेला",
        type: "Fruit-Vegetable",
        nutrition: "High in vitamin C, fiber, folate, & antioxidants.",
        price: "40",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/BitterGourd.jpg",
        rating: 4.5
    },
    {
        name: "Ridge Gourd",
        indianName: "तुरई",
        type: "Gourd",
        nutrition: "Contains fiber, vitamin C, and potassium.",
        price: "40",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Ridge Gourd.jpg",
        rating: 4.5
    },
    {
        name: "Beetroot",
        indianName: "चुकंदर",
        type: "Root",
        nutrition: "High in folate, manganese, iron, and nitrates.",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Beetroot.jpg",
        rating: 4.5
    },
    {
        name: "Cucumber",
        indianName: "खीरा",
        type: "Marrow",
        nutrition: "High water content, good source of vitamin K & fiber.",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Cucumber.jpg",
        rating: 4.5
    },
    {
        name: "Radish",
        indianName: "मूली",
        type: "Root",
        nutrition: "Rich in vitamin C, potassium, & antioxidants.",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Radish.jpg",
        rating: 4.5
    },
    {
        name: "Drumstick",
        indianName: "शेवग्याच्या शेंगा",
        type: "Podded Vegetable",
        nutrition: "High in vitamin C, potassium, & essential amino acids.",
        price: "60",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Drumstick.jpg",
        rating: 4.5
    },
    {
        name: "Green Beans",
        indianName: "हरी फली",
        type: "Legumes",
        nutrition: "Good source of vitamins A, C, K, folate & fiber.",
        price: "60",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Green Beans.jpg",
        rating: 4.5
    },
    {
        name: "Chavli",
        indianName: "चावली",
        type: "Legumes",
        nutrition: "High in protein, fiber, iron & folate",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Chavali.png",
        rating: 4.5
    },
    {
        name: "Peas",
        indianName: "मटर",
        type: "Legumes",
        nutrition: "High in protein, vitamins A, C, K & fiber.",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Peas.jpg",
        rating: 4.5
    },
    {
        name: "Parval",
        indianName: "परवल",
        type: "Legumes",
        nutrition: "Good source of vitamins A, C & fiber.",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Parval.jpg",
        rating: 4.5
    },
    {
        name: "Pavta",
        indianName: "पावटा",
        type: "Legumes",
        nutrition: "High in protein, vitamins A, C & fiber.",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Pavta.jpg",
        rating: 4.5
    },
    {
        name: "Gavar",
        indianName: "गवार",
        type: "Legumes",
        nutrition: "Rich in fiber, folate, calcium & iron.",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Gavar.jpg",
        rating: 4.5
    },
    {
        name: "Spinach",
        indianName: "पालक",
        type: "Leafy",
        nutrition: "Good source of vitamin A, C, K, iron, calcium & folate.",
        price: "30",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Spinach.jpg",
        rating: 4.5
    },
    {
        name: "Methi",
        indianName: "मेथी",
        type: "Leafy",
        nutrition: "Rich in iron, vitamin C, potassium & fiber.",
        price: "30",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Methi.jpg",
        rating: 4.5
    },
    {
        name: "Dill Leaves",
        indianName: "शेपू",
        type: "Leafy",
        nutrition: "Good source of vitamins A, C & calcium.",
        price: "30",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Shepu.png",
        rating: 4.5
    },
    {
        name: "Mint",
        indianName: "पुदीना",
        type: "Leafy",
        nutrition: "Contains vitamin A, antioxidants with iron & calcium.",
        price: "30",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Mint.jpg",
        rating: 4.5
    },
    {
        name: "Coriander",
        indianName: "धनिया ",
        type: "Leafy",
        nutrition: "Rich in vitamin C, A, K, and antioxidants.",
        price: "30",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Coriander.jpg",
        rating: 4.5
    },
    {
        name: "SpringOnion",
        indianName: "कांद्याची पात",
        type: "Leafy",
        nutrition: "Good source of vitamins A, C, and K.",
        price: "30",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/SpringOnion.jpg",
        rating: 4.5
    },
    {
        name: "Curry Leaves",
        indianName: "कढ़ी पत्ता",
        type: "Leafy",
        nutrition: "High in iron, fiber, and vitamin C.",
        price: "20",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/CurryLeaves.jpg",
        rating: 4.5
    },
    {
        name: "Lemon",
        indianName: "नींबू",
        type: "Citrus",
        nutrition: "High in vitamin C, citric acid & flavonoids.",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Lemon.jpg",
        rating: 4.5
    },
    {
        name: "Garlic",
        indianName: "लहशुन",
        type: "Allium",
        nutrition: "Rich in vitamin B6, C & manganese.",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Garlic.jpg",
        rating: 4.5
    },
    {
        name: "Ginger",
        indianName: "अदरक",
        type: "Rhizome",
        nutrition: "Contains gingerol, which has anti-inflammatory & antioxidant",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Ginger.jpg",
        rating: 4.5
    },
    {
        name: "Chilli",
        indianName: "मिर्च",
        type: "Fruit-Vegetable",
        nutrition: "High in vitamin C, A & capsaicin.",
        price: "40",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Chilli.jpg",
        rating: 4.5
    },
    {
        name: "Green Chille",
        indianName: "हरी मिर्च",
        type: "Fruit-Vegetable",
        nutrition: "Rich in vitamin C, A & antioxidants.",
        price: "40",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Green Chille.jpg",
        rating: 4.5
    },
    {
        name: "Avocado",
        indianName: "एवोकाडो",
        type: "Berry",
        nutrition: "High in healthy fats, fiber, vitamins E, K, C & potassium.",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Avocado.jpg",
        rating: 4.5
    },
    {
        name: "Corn",
        indianName: "मक्का",
        type: "Cereal grain",
        nutrition: "High in carbohydrates, fiber, vitamins B, C & magnesium.",
        price: "20",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Corn.jpg",
        rating: 4.5
    },
    {
        name: "Pumpkin",
        indianName: "कद्दू",
        type: "Marrow",
        nutrition: "Rich in vitamin A, C, potassium & fiber.",
        price: " ",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Pumpkin.jpg",
        rating: 4.5
    },
    {
        name: "Suran",
        indianName: "सुरन",
        type: "Tuber",
        nutrition: "Good source of fiber, potassium & antioxidants.",
        price: " ",
        image: "C:/ABHAY/Fruits & Vegetables Website/V-ImG/Suran.jpg",
        rating: 4.5
    },

    // add more vegetable items similarly
];

const fruits = [
    {
        name: "Mango",
        indianName: "आम",
        type: "Juicy",
        nutrition: "Rich in vitamins A, C, and fiber",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/mango.jpg",
        rating: 4.5
    },
    {
        name: "Banana",
        indianName: "केला",
        type: "Soft",
        nutrition: "Rich in potassium, fiber, and vitamin B6",
        price: "40",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/bananas.jpg",
        rating: 4.5
    },
    {
        name: "Apple",
        indianName: "सेब",
        type: "Juicy",
        nutrition: "Rich in fiber, vitamins C, and potassium",
        price: "100",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/apple.jpg",
        rating: 4.5
    },
    {
        name: "Pears",
        indianName: "नाशपाती",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/pears.jpg",
        rating: 3.5
    },
    {
        name: "Jam Fruit",
        indianName: "N/A",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/Jam Fruit.jpg",
        rating: 3.5
    },
    {
        name: "Orange",
        indianName: "संतरा",
        type: "Citrus",
        nutrition: "Rich in vitamin C, fiber, and antioxidants",
        price: "60",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/orange.jpg",
        rating: 4.5
    },
    {
        name: "Sweet Lime",
        indianName: "मौसंबी",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/Mosambi.jpg",
        rating: 3
    },
    {
        name: "Papaya",
        indianName: "पपीता",
        type: "Soft",
        nutrition: "Rich in fiber, vitamins C, A, and folate",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/papaya.jpg",
        rating: 3.5
    },

    {
        name: "Strawberry",
        indianName: "स्ट्रॉबेरी",
        type: "Soft",
        nutrition: "Rich in vitamin C, manganese, and fiber",
        price: "100",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/strawberry.jpg",
        rating: 4.5
    },
    {
        name: "Litchi",
        indianName: "लीची",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/litchi.jpg",
        rating: 4.5
    },
    {
        name: "Grapes",
        indianName: "अंगूर",
        type: "Crawl",
        nutrition: "Rich in vitamins C, K, and antioxidants",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/grapes.jpg",
        rating: 3.5
    },
    {
        name: "Red Grapes",
        indianName: "लाल अंगूर",
        type: "Crawl",
        nutrition: "Rich in vitamins C, K, and antioxidants",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/Red Grapes.jpg",
        rating: 3
    },
    {
        name: "Jamun",
        indianName: "जामुन",
        type: "Juicy",
        nutrition: "Rich in vitamins C, K, and antioxidants",
        price: "80",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/Jamun.jpg",
        rating: 3
    },
    {
        name: "Cherry",
        indianName: "चेरी",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/Cherry.jpg",
        rating: 4.5
    },
    {
        name: "BlackBerry",
        indianName: "ब्लैकबेरी",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/BlackBerry.jpg",
        rating: 3.5
    },
    {
        name: "Pomegranate",
        indianName: "अनार",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/pomegranate.jpg",
        rating: 4.5
    },
    {
        name: "Guava",
        indianName: "अमरूद",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/guava.jpg",
        rating: 4
    },

    {
        name: "Sapota",
        indianName: "चीकू",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/chikoo.jpg",
        rating: 3.5
    },
    {
        name: "Kiwi",
        indianName: "कीवी",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/Kiwi.jpg",
        rating: 4.5
    },
    {
        name: "Dragon-Fruit",
        indianName: "ड्रैगन फ्रूट",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/dragon-fruit.jpg",
        rating: 4.5
    },
    {
        name: "Amla",
        indianName: "आंवला",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "40",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/amla.jpg",
        rating: 3.5
    },
    {
        name: "Star Fruit",
        indianName: "करम्बोला",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "40",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/Star Fruit.jpg",
        rating: 3
    },
    {
        name: "Ber-Fruit",
        indianName: "बेर",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "40",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/ber-fruit.jpg",
        rating: 3
    },
    {
        name: "Custard Apple",
        indianName: "शरीफा",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/custardapple.jpg",
        rating: 4
    },
    {
        name: "Pineapple",
        indianName: "अनानास",
        type: "Citrus",
        nutrition: "Rich in vitamin C, manganese, and antioxidants",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/pineapple.jpg",
        rating: 4
    },
    {
        name: "Jackfruit",
        indianName: "कटहल",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/jackfruit.jpg",
        rating: 3.5
    },

    {
        name: "Watermelon",
        indianName: "तरबूज",
        type: "Juicy",
        nutrition: "Rich in vitamins A, C, and antioxidants",
        price: "30",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/watermelon.jpg",
        rating: 4
    },
    {
        name: "Musk-Melon",
        indianName: "खरबूजा",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/MuskMelon.jpg",
        rating: 3.5
    },
    {
        name: "Coconut",
        indianName: "नारियल",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/coconut.jpg",
        rating: 4
    },
    {
        name: "Ice Apple",
        indianName: "ताड़गोला",
        type: "Juicy",
        nutrition: "Rich in vitamins C, A, and potassium",
        price: "50",
        image: "C:/ABHAY/Fruits & Vegetables Website/F-ImG/Tadgola.jpg",
        rating: 4
    },

    // add more fruit items similarly
];

// Sample Data
const bestSellers = [
    { name: 'Apple', price: 100 },
    { name: 'Carrot', price: 50 }
];
const featuredProducts = [
    { name: 'Banana', price: 30 },
    { name: 'Mango', price: 150 }
];

// Global Variables
let cart = [];

// ---------------------------- Initialization ----------------------------
// Load best sellers and featured products on page load
window.onload = function() {
    loadBestSellers();
    loadFeaturedProducts();
    displayItems('vegetables', vegetables);
    displayItems('fruits', fruits);
    loadReviews();
}

// ---------------------------- Product Display Functions ----------------------------
// Load Best Sellers
function loadBestSellers() {
    const container = document.getElementById('bestSellerItems');
    bestSellers.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `<h3>${item.name}</h3><p>Price: ₹${item.price}</p>`;
        container.appendChild(div);
    });
}

// Load Featured Products
function loadFeaturedProducts() {
    const container = document.getElementById('featuredItems');
    featuredProducts.forEach(item => {
        const div = document.createElement('div');
        div.classList.add('item');
        div.innerHTML = `<h3>${item.name}</h3><p>Price: ₹${item.price}</p>`;
        container.appendChild(div);
    });
}

// Display Items (Vegetables and Fruits)
function displayItems(sectionId, items) {
    const section = document.getElementById(sectionId);
    section.innerHTML = '';

    items.forEach((item, index) => {
        let itemDiv = document.createElement('div');
        let itemPrice = item.price; // Initial price per kg
        itemDiv.innerHTML = `
            <img src="${item.image}" alt="${item.name}" class="item-image">
            <h4>${item.name} (${item.indianName})</h4>
            <p>Type: ${item.type}</p>
            <p>Nutrition: ${item.nutrition}</p>
            <p>Price per kg: ₹<span id="price-${sectionId}-${index}">${item.price}</span></p>
            <p>Rating: ${item.rating}%</p>
            <label for="quantity-${sectionId}-${index}">Select Quantity:</label>
            <select id="quantity-${sectionId}-${index}">
                <option value="0.25">0.25 kg</option>
                <option value="0.5">0.5 kg</option>
                <option value="1">1 kg</option>
                <option value="1.5">1.5 kg</option>
                <option value="2">2 kg</option>
                <option value="2.5">2 kg</option>
                <option value="3">3 kg</option>
                <option value="3.5">3.5 kg</option>
                <option value="4">4 kg</option>
                <option value="4.5">4.5 kg</option>
                <option value="5">2 kg</option>
            </select>
            <button onclick="addToCart(${index}, '${sectionId}')">Add to Cart</button>
        `;
        section.appendChild(itemDiv);

        // Update price based on selected quantity
        document.getElementById(`quantity-${sectionId}-${index}`).addEventListener('change', function() {
            const selectedQuantity = parseFloat(this.value);
            const updatedPrice = itemPrice * selectedQuantity;
            document.getElementById(`price-${sectionId}-${index}`).innerText = updatedPrice.toFixed(2);
        });
    });
}

// ---------------------------- Cart Functions ----------------------------
// Add to Cart
function addToCart(itemIndex, sectionId) {
    const selectedQuantity = parseFloat(document.getElementById(`quantity-${sectionId}-${itemIndex}`).value);
    const selectedItem = sectionId === 'vegetables' ? vegetables[itemIndex] : fruits[itemIndex];
    const totalPrice = selectedItem.price * selectedQuantity;

    cart.push({
        name: selectedItem.name,
        quantity: selectedQuantity,
        price: totalPrice
    });

    updateCartDisplay();
}

// Update Cart Display
function updateCartDisplay() {
    const cartSection = document.getElementById('cart');
    cartSection.innerHTML = ''; // Clear cart content

    cart.forEach((item, index) => {
        cartSection.innerHTML += `
            <div>
                <p>${item.name} - ${item.quantity} kg - ₹${item.price.toFixed(2)}</p>
                <button onclick="removeFromCart(${index})">Remove</button>
            </div>
        `;
    });

    updateTotalPrice();
}

// Remove from Cart
function removeFromCart(itemIndex) {
    cart.splice(itemIndex, 1); // Remove item from cart
    updateCartDisplay();
}

// Update Total Price
function updateTotalPrice() {
    const total = cart.reduce((sum, item) => sum + item.price, 0);
    document.getElementById('totalPrice').innerText = total.toFixed(2);
}

// ---------------------------- Checkout and Payment ----------------------------
// Open checkout modal
document.getElementById('checkoutButton').addEventListener('click', function() {
    document.getElementById('checkout-modal').style.display = 'block';
});

// Close checkout modal
document.querySelector('.close').addEventListener('click', function() {
    document.getElementById('checkout-modal').style.display = 'none';
});

// Payment Simulation
document.getElementById('gpayButton').addEventListener('click', function() {
    document.getElementById('payment-confirmation').innerText = 'Payment successful via Google Pay!';
});
document.getElementById('paytmButton').addEventListener('click', function() {
    document.getElementById('payment-confirmation').innerText = 'Payment successful via Paytm!';
});
document.getElementById('phonepeButton').addEventListener('click', function() {
    document.getElementById('payment-confirmation').innerText = 'Payment successful via PhonePe!';
});

// ---------------------------- Reviews Section ----------------------------
// Dynamically load reviews
const reviews = [
    { name: 'Abhisekh', review: 'Great Quality!' },
    { name: 'Amulya', review: 'Quality is Outstanding!' },
    { name: 'Bhavesh', review: 'Very Fresh & Tasty!' },
    { name: 'Neha', review: 'Always Fresh!' },
    { name: 'Deepak', review: 'Vibrant fruits & vegetables with a wide selection!' },
    { name: 'Gauri', review: 'Impressed with quality and quantity!' },
    { name: 'Sanay', review: 'Great Variety!' },
    { name: 'Raj', review: 'Top quality fruit & veg!' },
    { name: 'Siddhi', review: 'Qualty is good!' },
    { name: 'Aman', review: 'Easily ordered online & delivered quickly.!' },
    { name: 'Dipali', review: 'Highly recommed this shop!' }
];

function loadReviews() {
    const container = document.getElementById('reviews-container');
    reviews.forEach(review => {
        const div = document.createElement('div');
        div.classList.add('review');
        div.innerHTML = `<p><strong>${review.name}:</strong> ${review.review}</p>`;
        container.appendChild(div);
    });
}



// ---------------------------- Modal Close When Clicked Outside ----------------------------
// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('checkout-modal');
    if (event.target === modal) {
        modal.style.display = "none";
    }
};

    function openModal(modalId) {
        document.getElementById(modalId).style.display = 'block';
    }

    function closeModal(modalId) {
        document.getElementById(modalId).style.display = 'none';
    }