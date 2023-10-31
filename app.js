// Storage Controller 

// Item Controller
const itemCtrl = (function(){
    // Item Constructor
    const item = function(id, name, calories){
        this.id = id;
        this.name = name;
        this.calories = calories;
    }

    // Data structure / State
    const data = {
        items: [
            {id: 0, name: 'Steak Dinner', calories: 1200},
            {id: 1, name: 'Cookies', calories: 400},
            {id: 2, name: 'Eggs', calories: 300}
        ],
        currItem: null,
        totalCalories: 0,
    }

    //public methods
    return {
        getItems: function(){
            return data.items;
        },
        logData: function (){
            return data;
        }
    }
})();



// UI Controller
const uiCtrl = (function(){
    const UISelectors = {
        itemList : '#item-list'
    }


    // public methods
    return {
        populateItemList: function(items){
            let html = '';

            items.forEach(function(item){
                html += `
                <li class="collection-item" id="item-${item.id}">
                <strong>${item.name}: </strong><em>${item.calories}</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            </li>
                `
            });

            // Insert list items
            document.querySelector('UiSelectors.itemList').innerHTML = html
        }
    }
})();



// App Controller
const app = (function(itemCtrl, uiCtrl){

    // public methods
    return {
        init: function(){
            console.log('Starting App...');

            // Fetch items from data structure
            const items = itemCtrl.getItems();
            console.log(items);

            // Populate list with item
            uiCtrl.populateItemList(items);
        }
    }
})(itemCtrl, uiCtrl);


app.init();