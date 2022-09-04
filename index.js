         //init


         console.log("Version 20210506.18.22")
         console.log(localStorage.tasks);

  
         

         if (localStorage.length == 0){
            word = "";
             var tasks = [];

             updateList();
         }

         var retrievedData = JSON.parse(localStorage.tasks);

         if (retrievedData["tasks"] !== "undefined" && retrievedData["tasks"] !== "[]") {

             word = "";
             var tasks = [];
             /*for (i in retrievedData) {
                 if (retrievedData[i]["task"] != "," || retrievedData[i - 1]["task"] == "⁂") {
                     word = word + retrievedData[i]["task"];
                     checked = retrievedData[i]["checked"];
                     console.log(i, retrievedData[i]);
                     console.log(tasks);
                 } else {
                   addedWord   = {"task": word, "checked": checked};
                     tasks.push(addedWord);
                     word = ""
                 }
       
             }*/
             i = 0;
             while (i < retrievedData.length) {
                 tasks.push({
                     "task": retrievedData[i]["task"],
                     "checked": retrievedData[i]["checked"]
                 });
                 console.log("retr", retrievedData[i]["task"]);
                 i += 1
             }

         } else {
             var tasks = [{
                 "task": "First Entry",
                 "checked": false
             }];
         }
         console.log("before update", tasks);
         updateList();

         function updateList() {
             if (tasks.length === 0) {
                 document.getElementById("yourdone").innerHTML = "You're done.<br>Time to chill.";

             } else {

                 document.getElementById("yourdone").innerHTML = "";

             }
             document.getElementById("list").innerHTML = "";

             localStorage.setItem("tasks", JSON.stringify(tasks));
             console.log("tasks", JSON.parse(localStorage["tasks"]));
             i = 0;


             while (tasks.length > i) {

                 if (tasks[i]["checked"] === true) {
                    checkedstring = "style='background-image: url(assets/checkmark.svg) !important'";

                 }else{

                                     checkedstring = "style='background-image: none !important'";

                 }

                 if (tasks[i]["task"].length < 25) {
                     document.getElementById("list").innerHTML = document.getElementById("list").innerHTML +
                         "<li><div ><button class='Check'" + checkedstring + " id=" + i + " onclick='toggleCheck(" + i +
                         "); return false;'></button>" + tasks[i]["task"] +
                         "</div><button class='delete' onclick='deleteElement(" + i + ");'>🗑️</button></li>";
                 } else {
                     document.getElementById("list").innerHTML = document.getElementById("list").innerHTML +
                         "<li><div ><button class='Check'" + checkedstring + " id=" + i + " onclick='toggleCheck(" + i +
                         "); return false;'></button><marquee scrollamount='3' truespeed scrolldelay='20'>" + tasks[i]["task"] +
                         "</marquee></div><button class='delete' onclick='deleteElement(" + i + ");'>🗑️</button></li>";

                 }

                 console.log(i + ": " + tasks[i]);
                 i += 1
             }

         }

         function arrayRemove(arr, value) {

             return arr.filter(function (ele) {
                 return ele != value;
             });
         }

         function deleteElement(element) {
             tasks.splice(element, 1);
             updateList();
         }


         function Submit() {
             InputForm = document.getElementById("TodoInput")
             var inputVal = InputForm.value;
             inputValSpace = inputVal;
             for (var i in inputVal) {
                 inputValSpace = inputValSpace.replace(' ', '');
             }
             if (inputValSpace != "") {
                 testtasks = {};
                 addedVal = {
                     "task": inputVal,
                     "checked": false
                 };
                 console.log(addedVal);
                 tasks.push(addedVal);
                 updateList();

                 console.log(tasks);
                 window.scrollTo(0, document.getElementById("list").scrollHeight);
             }
             InputForm.value = "";
             InputForm.focus;


         }

         function toggleCheck(element) {
             console.log("ran", element)
             if (tasks[element]["checked"] === false) {
                 //document.getElementById(element).style.background = "url(assets/checkmark.svg)";
                 tasks[element]["checked"]= true;
             } else {
                 //document.getElementById(element).style.background = "none";
                 tasks[element]["checked"]= false;
             }
             updateList();
         }

         function getTimeAndDate() {
             var today = new Date();

             var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate() + ".hndlr";
             return date;
         }


         function download(text, name, type) {
             var a = document.getElementById("exportbutton");
             var file = new Blob([text], {
                 type: type
             });
             a.href = URL.createObjectURL(file);
             a.download = name;
         }

         function deleteData(element) {
             tasks = [];
             updateList();
             if (element !== undefined) {
                 get = element.innerHTML;
                 element.innerHTML = "Done"
                 setTimeout('', 2000);
                 element.innerHTML = get;
             }
         }