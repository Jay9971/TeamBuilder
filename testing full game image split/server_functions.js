function post(path, params, method='post') {
    /*
    const form = document.createElement('form');
    form.method = method;
    form.action = path;
    
    const hiddenField = document.createElement('input');
    hiddenField.type = 'hidden';
    
    hiddenField.value = params.data;
    hiddenField.name = params.name;
    form.appendChild(hiddenField);
    
    document.body.appendChild(form);
    //console.log(form);
    form.submit();
    */
}

function request(path) {
    /*
    fetch(path)
	.then(response => response.text())
	.then(text => text);
    */
}

post("/send-square-locations-data, /get-square-location-data", {name: "data", data: data});