
const txttask = document.getElementById("txttask");
const sub = document.getElementById("sub");
const results = document.getElementById("results");

sub.addEventListener("click",function(e){
    if(txttask.value.length>0){
        e.preventDefault()
        const listItem = document.createElement("li");
        const additem = document.createElement("span");
        const deleteButton = document.createElement("button");
        const doneButton = document.createElement("button");

        additem.classList.add("item");
        additem.innerText = txttask.value;
        deleteButton.classList.add("del");
        deleteButton.innerText = "Del";
        doneButton.classList.add("done");
        doneButton.innerText = "Done";

        listItem.appendChild(additem);
        listItem.appendChild(doneButton);
        listItem.appendChild(deleteButton);    
        results.appendChild(listItem)

        deleteButton.addEventListener("click",function(){
            results.removeChild(listItem);
        })

        doneButton.addEventListener("click",function(){
            const span = listItem.querySelector(".item")
            span.style.color="#ADFF2F";
            span.style.textDecoration = "line-through";  
        })

        txttask.value = "";
        txttask.focus();
    }
    else{
        e.preventDefault();
    }
})