// jQuery DOM
//$("h1").css("color", "red");


// jQuery Select Item
//$("h1").css("color", "blue");
//$("h1").css("font-size", "6rem");


// jQuery Add Class
$("h1").addClass("big-title");


// jQuery Remove Class
//$("h1").removeClass("big-title");


// Has Any Class Query
$("h1").hasClass("big-title"); //true


// Manipulating Text
//$("h1").text("Hello"); // text changed to 'Bye'
$("button").text("Click Me!");


// Add HTML Item
//$("button").html("<em>Click Me!</em>")


// Manipulating Attributes
//$("img").attr("src");
$("a").attr("href", "https://www.amazon.com");

// Adding Event Listeners
$("h1").click(function() {
    $("h1").css("color", "purple");
});


// Button EventListener
// $("button").click(function(){
//     $("h1").css("color", "purple");
// });

// Input EventListener
$("input").keypress(function(event) {
    $("h1").text(event.key);
})



// Animation
$("button").click(function(){
    $("h1").slideUp().slideDown().animate({opacity: 0.5});
});