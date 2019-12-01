
  //post example
function sendPost(){
  $.post("writedata",
  {
    name: "Donald Duck",
    city: "Duckburg"
  },
  function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
}

//get example
function sendGet(){
  $.get("readData", function(data, status){
    alert("Data: " + data + "\nStatus: " + status);
  });
}