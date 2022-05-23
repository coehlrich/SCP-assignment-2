function getItems(setter) {
    var data = null;

    var xhr = new XMLHttpRequest();
    xhr.withCredentials = false;

    xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
            setter(JSON.parse(this.responseText));
        }
    });

    xhr.open("GET", "https://scpfoundations-24c7.restdb.io/rest/scpunits");
    xhr.setRequestHeader("content-type", "application/json");
    xhr.setRequestHeader("x-apikey", "62843f87e8128861fcf3d3de");
    xhr.setRequestHeader("cache-control", "no-cache");

    xhr.send(data);
}

export default getItems;