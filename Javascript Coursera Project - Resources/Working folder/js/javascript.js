function dark() {
    var element = document.body;
    element.classList.toggle("dark-theme");
    var image = document.getElementById("logo");
    if (image.src.match("img/logo.png")) {
        image.src = "img/logo2.png";
    }
    else {
        image.src = "img/logo.png";
    }
}

function highlightWine(related_wine) {
    var all_drinks = document.querySelectorAll('[id^="drink-"]');
    for (var element of all_drinks) {
        if (element.id === "drink-" + related_wine) {
            element.classList.toggle("highlighted-drink")
        }
        else {
            element.classList.remove("highlighted-drink")
        }
    }
}

var item1 = { name: "Ravioli", type: "Pasta", course: "Main", description: "Delicious filled pasta", price: "$12" };
var item2 = {
    name: "Grilled Chicken",
    type: "Meat",
    course: "Main",
    description: "Healthy Charcoal Grilled Chicken",
    price: "$21"
};

var item3 = new Object(); // this is an empty object created using the "new" keyword. And, below we added our relevant properties
item3.name = "Rigatoni All Amatriciana";
item3.type = "Pasta";
item3.course = "Main";
item3.description = "Delicious tomato rigatoni";
item3.price = "$10";

const pastaItem = { // as an object template -- all of the pasta items will be the main course all prices as $10
    type: "Pasta",
    course: "Main",
    price: "$10"
};

var item4 = Object.create(pastaItem); // a prototype for a new menu item -- below are simple object items specific to this prototype
item4.name = "Spaghetti Alla Carbonara";
item4.description = "Delicious pasta alla carabonara";

//run each of the 4 items created:

/* console.log(item1);
console.log(item2);
console.log(item3);
console.log(item4); */

const MENU_SECTIONS_PROTOTYPES = {
    food: {
        id: undefined,
        name: undefined,
        type: "Food",
        sub_type: undefined,
        course: undefined,
        description: undefined,
        price: undefined,
        related_wine: undefined,
        getRelatedWineId: function () {
            if (typeof this.related_wine !== 'undefined') {
                return this.related_wine;
            }
        }
    },
    drink: {
        id: undefined,
        name: undefined,
        type: "Drink",
        sub_type: undefined,
        course: undefined,
        description: undefined,
        price: undefined,
    }
}

const menu_proto = {
    food: {},
    drink: {},
    getRelatedDrink(food_id) {
        var food = this.food[food.id];
        var related_drink_id = food.getRelatedWineId();
        if (typeof this.related_drink_id !== 'undefined') {
            return this.related_drink_id;
        }
    }
}

var menu = Object.create(menu_proto);

fetch("data/menu.json")
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        appendData(data);
    })
    .catch(function (err) {
        console.log('error: ' + err);
    });

function appendData(data) {
    var menudata = data.menu;

    for (var i = 0; i < menudata.length; i++) {
        var menuitem = menudata[i];
        var properties = {};
        var item_type = menuitem["type"];
        var item_id = menuitem["id"];

        for (var key in menuitem) {
            if (menuitem.hasOwnProperty(key)) {
                properties[key] = {
                    value: menuitem[key],
                    writable: false
                }
            }
        }
        menu[item_type][item_id] = Object.create(
            MENU_SECTIONS_PROTOTYPES[item_type],
            properties
        );
    }
    for (let key in menu["Food"]) {
        var div = document.getElementById("food-menu-table-body");
        var name = menu["Food"][key].price
        var related_wine = menu["food"][key].related_wine
        var wine_button = ""
        if (typeof related_wine !== 'undefined') {
            wine_button = `<button class='small-button' onClick='highlightWine("${related_wine}");'> Recommended Wine</button>`
        }
        div.innerHTML += `<tr><td>${name}<br/>${wine_button}</td><td>${description}</td><td>${price}</td></tr>`
    }

    for (Let key in menu["drink"]) {
        var div = document.getElementById("drinks-menu-table-body");
        var name = menu["drink"][key].name
        var description = menu["drink"][key].description
        var price = menu["drink"][key].price
        var wine_div_id = "drink-" + menu["drink"][key].id
        div.innerHTML += `<tr class="" id=${wine_div_id}><td>${name}</td><td>${description}</td><td>${price}</td></tr>`
    }
}

console.log(menu);