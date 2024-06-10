const userLocation = document.getElementById("usergeo");
let erroruser=document.getElementById('error0');
let erroraddress=document.getElementById('error');
erroruser.innerHTML="";
erroraddress.innerHTML="";
let submit=document.getElementById('submit');
let addressdiv=document.getElementById('addresslocation');
let search=document.getElementById('searchInput');
search.value="";
addressdiv.innerHTML="";
document.addEventListener('DOMContentLoaded',getLocation);

function getLocation() {
  if(navigator.geolocation){
 navigator.geolocation.getCurrentPosition((position)=>{
        console.log("Your location",position);
        // userLocation.innerHTML = "Latitude: " + position.coords.latitude +
        // "<br>Longitude: " + position.coords.longitude; 
       
        var requestOptions = {
            method: 'GET',
          };
          
          fetch(`https://api.geoapify.com/v1/geocode/reverse?lat=${position.coords.latitude}&lon=${position.coords.longitude}&apiKey=cef55508b90a42999f5da847a2eeaa8f`, requestOptions)
            .then(response => response.json())
            .then(result => {console.log(result);
              userLocation.innerHTML=`
               <p>Name Of Time Zone: ${result.features[0].properties.timezone.name}</p>
    <p><span style="display: inline-block; width: 40vw;">
    Lat: ${result.features[0].properties.lat}</span>Long: ${result.features[0].properties.lon}</p>
    <p>Offset STD: ${result.features[0].properties.timezone.offset_STD}</p>
    <p>Offset STD Seconds: ${result.features[0].properties.timezone.offset_STD_seconds}</p>
    <p>Offset DST: ${result.features[0].properties.timezone.offset_DST}</p>
    <p>Offset DST Seconds: ${result.features[0].properties.timezone.offset_DST_seconds} </p>
    <p>Country: ${result.features[0].properties.country}</p>
    <p>Postcode: ${result.features[0].properties.postcode}</p>
    <p>City: ${result.features[0].properties.city}</p>
    <p id="error0"></p>`;
}).catch(error =>{ console.log('error', error);
                erroruser.textContent=`An error occured:${error}`;
                erroraddress.innerHTML="";
            });
},
(error)=>{
console.log("An error occured!!",error);
erroraddress.innerHTML="";
erroruser.innerHTML=`
Code:<b>${error.code}</b><br>
Error Message:<b>${error.message}</b>`;},
{
  timeout: 7000, // 7 seconds timeout
  maximumAge: 100000, // accept only position, that are not older than 100 seconds
  enableHighAccuracy: false // high accuracy
});
}else{
    userLocation.innerHTML= "Geolocation is not supported by this browser.";
}
}
//////////////////////////////////////////////////////////
submit.addEventListener('click',()=>{
if (search.value!="") {
    var requestOptions = {
        method: 'GET',
      };
      erroraddress.textContent="";
   // const address = 'Carrer del Pintor Navarro Llorens, 7, 46008 València, Valencia, Spain';
fetch(`https://api.geoapify.com/v1/geocode/search?text=${encodeURIComponent(search.value)}&apiKey=cef55508b90a42999f5da847a2eeaa8f`, requestOptions)
.then(response => response.json())
  .then(result =>{ console.log(`Result for search=${search.value}:`,result);
  addressdiv.style.cssText='display:block;';
  document.getElementById('heading3').style.display="block";
  addressdiv.innerHTML=`
               <p>Name Of Time Zone: ${result.features[0].properties.timezone.name}</p>
    <p><span style="display: inline-block; width: 40vw;">
    Lat: ${result.features[0].properties.lat}</span>Long: ${result.features[0].properties.lon}</p>
    <p>Offset STD: ${result.features[0].properties.timezone.offset_STD}</p>
    <p>Offset STD Seconds: ${result.features[0].properties.timezone.offset_STD_seconds}</p>
    <p>Offset DST: ${result.features[0].properties.timezone.offset_DST}</p>
    <p>Offset DST Seconds: ${result.features[0].properties.timezone.offset_DST_seconds} </p>
    <p>Country: ${result.features[0].properties.country}</p>
    <p>Postcode: ${result.features[0].properties.postcode}</p>
    <p>City: ${result.features[0].properties.city}</p>
    <p id="error0"></p>`;
  })
  .catch(error => {console.log('error', error);
    erroraddress.innerHTML=`An error occured: ${error}`;
    erroruser.innerHTML="";
    addressdiv.style.display="none";
    document.getElementById('heading3').style.display="none";
  });
}else{
    erroruser.innerHTML="";
    erroraddress.textContent="Please enter an address!";
    addressdiv.style.display="none";
    document.getElementById('heading3').style.display="none";
}
});