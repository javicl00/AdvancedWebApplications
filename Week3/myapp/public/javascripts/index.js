


document.getElementById("search").addEventListener("click", function (event) {
    event.preventDefault();
    var name = document.getElementById("search-name").value;
    var data = { name: name };
    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/user/" + name, true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send();
    // hanlder for the response
    xhr.onloadend = function () {
        if (xhr.readyState == XMLHttpRequest.DONE) {
            console.log("XHR:" + xhr.responseText);
            document.open();
            document.write(xhr.responseText);
            document.close();
        } else {
            console.log("Error");
        }
    };
});


if (document.getElementById("delete-user")) {
    document.getElementById("delete-user").addEventListener("click", function (event) {
        event.preventDefault();
        let name = document.getElementById("nameUser").innerHTML;
        console.log(name);
        var xhr = new XMLHttpRequest();
        xhr.open("DELETE", "/user/" + name, true);
        xhr.send();
        // hanlder for the response
        xhr.onloadend = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log("XHR:" + xhr.responseText);
                document.open();
                document.write(xhr.responseText);
                document.close();
            } else {
                console.log("Error");
            }
        };
    });
}

var btn = document.getElementsByClassName("delete-task");
for (var i = 0; i < btn.length; i++) {
    btn[i].addEventListener("click", function (event) {
        event.preventDefault();
        let name = document.getElementById("nameUser").innerHTML; // Inspired by my friend, I used the id of the element to get the name of the user
        // use typeof to check the type of the variable
        console.log(typeof name);
        var xhr = new XMLHttpRequest();
        xhr.open("PUT", "/user", true);
        xhr.setRequestHeader('Content-Type', 'application/json');
        xhr.send(JSON.stringify({ name: name, index: i}));
        // hanlder for the response
        xhr.onloadend = function () {
            if (xhr.readyState == XMLHttpRequest.DONE) {
                console.log("XHR:" + xhr.responseText);
                document.open();
                document.write(xhr.responseText);
                document.close();
            } else {
                console.log("Error");
            }
        };
    });
}
