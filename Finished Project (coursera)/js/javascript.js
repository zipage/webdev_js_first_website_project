function myFunction() {
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

var item1 = { name: "Ravioli", type: "pasta", course: "main", description: "Delicious filled pasta", price: "12$" };
var item2 = { name: "Steak", type: "meat", course: "main", description: "Delicious charcoal grilled beef steak", price: "21$" };
var item3 = new Object();
item3.name = "Rigatoni allÂamatriciana";
item3.type = "Pasta";
item3.course = "Main";
item3.description = "Delicious tomato rigatoni";
item3.price = "15$";
const pastaitem = {
    name: "",
    type: "pasta",
    course: "main",
    price: "10$"
};
var item4 = Object.create(pastaitem);
item4.name = "Spaghetti alla carbonara";
item4.description = "Delicious pasta alla carbonara";

const MENU_TYPES = {
    Food: {
        id: 'Food',
        proto: {
            related_wine: undefined,
            getRelatedWineId: function () {
                if (typeof this.related_wine !== 'undefined') {
                    return this.related_wine;
                }
            }
        }
    },
    Drink: {
        id: 'Drink',
        proto: {
            name: undefined
        }
    }
};
const menu_proto = {
    Food: {},
    Drink: {},
    getRelatedDrink(food_id) {
        console.log(this.Food[3]);
        var food = this.Food[food_id];
        var related_drink_id = food.getRelatedWineId();
        if (typeof related_drink_id !== 'undefined') {
            return this.Drink[related_drink_id];
        }
    }
}

var menu = Object.create(menu_proto);

//var menu_objects = {};
fetch("menu.json")
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

        menu[item_type][item_id] = Object.create(MENU_TYPES[item_type].proto, properties);
    }
}
console.log(menu);
console.log(menu.getRelatedDrink("3"));

/*var menudata = data.menu;
for (var i = 0; i < menudata.length; i++) {
  var menu = menudata[i];
  var properties = {};
  for (var key in menu) {
    if (menu.hasOwnProperty(key)) {
      properties[key] = {
        value: menu[key],
        writable: false
      }
    }
  }
  menu_objects[menudata[i].id] = Object.create(menuitem, properties);
  food_objects[fooddata[i].id] = new Object(fooddata[i]);  
}
console.log(food_objects);
console.log(food_objects["R1"].type);
 
for (var i = 0; i < drinksdata.length; i++) {
  drinks_objects[drinksdata[i].id] = new Object(drinksdata[i]);*/




