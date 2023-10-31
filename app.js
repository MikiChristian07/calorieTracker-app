// Storage Controller 

// Item Controller
const itemCtrl = (function(){
    // Item Constructor
    const item = function(id, name, calories){
        // this.id = id;
        // this.name = name;
        // this.calories = calories;
    }

    // Data structure / State
    const data = {
        items: [
            // {id: 0, name: 'Steak Dinner', calories: 1200},
            // {id: 1, name: 'Cookies', calories: 400},
            // {id: 2, name: 'Eggs', calories: 300}
        ],
        currItem: null,
        totalCalories: 0,
    }

    //public methods
    return {
        getItems: function(){
            return data.items;
        },
        addListItem: function(name, calories){
            // Create item ID
            let ID = 0

            if (data.items.length > 0){
                ID = data.items[data.items.length - 1].id + 1;
            } else {
                ID = 0;
            }

            // Calories to number
           calories  = parseInt(calories);

           // Create new item
           newItem = new item(ID, name, calories);

           // Add to items array
           data.items.push(newItem);

           return newItem;
        },
        logData: function (){
            return data;
        }
    }
})();



// UI Controller
const uiCtrl = (function(){
    const UISelectors = {
        itemList: '#item-list',
        addBtn: '.add-btn',
        itemName: '#item-name',
        itemCalories: '#item-calories'
    };


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
                `;
            });

            // Insert list items
            document.querySelector(UISelectors.itemList).innerHTML = html;
        },
        getItemInput: function(){
            return {
                name: document.querySelector(UISelectors.itemName).value,
                calories: document.querySelector(UISelectors.itemCalories).value
            }
        },
        addListItem: function(item){
            // show the list
            document.querySelector(UISelectors.itemList).style.display = 'block';
            // Create li element
            const li = document.createElement('li');
            // Add Class
            li.className = 'collection-item';
            // Add ID
            li.id = `${item.id}`;
            // Add HTML
            li.innerHTML = `
                <strong>${item.name}: </strong><em>${item.calories}</em>
                <a href="#" class="secondary-content">
                    <i class="edit-item fa fa-pencil"></i>
                </a>
            `;
            // Insert item
            document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
        },
        clearInput: function(){
            document.querySelector(UISelectors.itemName).value = '';
            document.querySelector(UISelectors.itemCalories).value = '';
        },
        hideList: function(){
            document.querySelector(UISelectors.itemList).style.display='none';
        },
        getSelectors: function(){
            return UISelectors;
        }
    }
})();



// App Controller
const app = (function(itemCtrl, uiCtrl){
    // Load event listeners
    const loadEventListners = function(event){
        // Get UI Selectors
        const UISelectors = uiCtrl.getSelectors();

        //Add Item event
        document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);


    }

    // Add Item event
    const itemAddSubmit = function(e){
        // Get form input from ui controller

        const input = uiCtrl.getItemInput();

        // Validate name and value input
        if (input.name !== '' && input.calories !== ''){
            // Add item 
            const newItem = itemCtrl.addListItem(input.name, input.calories);

            // Add item to UI list
            uiCtrl.addListItem(newItem);

            // Clear Input Field
            uiCtrl.clearInput();
        }

        e.preventDefault();
    }

    // public methods
    return {
        init: function(){
            // Fetch items from data structure
            const items = itemCtrl.getItems();

            // Check if any items
            if(items.length == 0){
                uiCtrl.hideList();
            } else {

            }

              // Populate list with item
              uiCtrl.populateItemList(items);

           // Load event listeners
           loadEventListners( );
        }
    }
})(itemCtrl, uiCtrl);

// Initialize App
app.init();