var cartArray=[];
var subscribtion=[];
var idNumber = 0;
var authentification=[
    {
        username: 'Amir',
        email: "amir.seeer@gmail.com",
        password: "amirby"
    }
];

function login(){
    var emailuser =$('#email').val();
    var passuser = $('#pwd').val();
    for (var i = 0 ; i< authentification.length; i++){
        if ((authentification[i].email === emailuser) && (authentification[i].password=== passuser)){
            userName = authentification[i].username ;
            $('.loginPage').hide();
            $('.lbody').append('<h1 id = "welcomelog"> Welcome <span id ="usertag">'+ userName +'</span> ,</h1>' )
            $('.lbody').append('<h3 id = "welcomelog1"> You have sucessfully logged in. </h3>')
            $('.modlog').append('<div class="modal-footer"><button type="button" class="btn btn-warning" >Logout</button></div>')
            $('#hi').html("Hi, <b>" + userName + "</b>")
            return false
        } else alert('Sorry, \nWrong Username or password');
    }
}

// reload the table in the cart section, delete row and updating the total 
var reloadTable = function() {
    var  subtotal = 0;
    var vat = 0;
    var table = $('#cartTable');
    table.find("tr").remove();
    for (var i = 0 ; i<cartArray.length ; i++){
        var id = cartArray[i].idnbr;
        table.append("<tr id =' " + id + "'><td><b>" + cartArray[i].name + "</b></td><td>" + cartArray[i].price + "</td><td>" + cartArray[i].quantity + "</td><td><b>" + (cartArray[i].priceNbr * cartArray[i].quantity) + "</b></td><td><a href='#'><span class='glyphicon glyphicon-trash'></span></a></tr>");
        subtotal +=  (cartArray[i].priceNbr * cartArray[i].quantity) ;
        vat +=   Math.floor(((((cartArray[i].priceNbr * cartArray[i].quantity) * 19) / 100) * 100) / 100 )
    }
    var total = subtotal + vat;
    $('#subtotal').html(subtotal+ ' TND');
    $('#vat').html(vat + ' TND');
    $('#total').html(total+ ' TND')

    $('.glyphicon-trash').click(function(){
        var amountD = $(this).closest('td').prev().text();
        var id = Number( $(this).closest("tr").attr('id'))
  
        //delete the row and the object from cartArray
        var identifier = 0;
        for (var i = 0 ; i<cartArray.length ; i++){
            if (cartArray[i].idnbr === id){
                identifier= i 
            }
        }
        cartArray.splice(identifier, 1)
        $(this).closest("tr").remove();
        //decrease the number in the cart badge
        var badge = Number($('.badge').text()) - 1;
        $('.badge').text(badge);
        //re-calculate the totals
         subtotal = subtotal - amountD;
         vat = vat -  Math.floor(((((amountD) * 19) / 100) * 100) / 100 );
         total = subtotal + vat
        $('#subtotal').html(subtotal+ ' TND');
        $('#vat').html(vat + ' TND');
        $('#total').html(total+ ' TND')
        return false;
    })
};

function confirm(){
    var table = $('#cartTable');
    table.find("tr").remove();
    $('#subtotal').html(0+ ' TND');
    $('#vat').html(0+ ' TND');
    $('#total').html(0+ ' TND')
    $('.badge').text(0);

}


// add items into the cart
var additems = function(){
    var row = $(this).closest("tr");
    var name= row.find('td:eq(0)').text() + "( Diameter/Capacity : " + row.find('td:eq(1)').find('input').val() + " )";
    var price = row.find('td:eq(2)').text()
    var priceNbr = parseInt(price);
    var quantity = row.find('td:eq(3)').find('input').val()
    var diameter = row.find('td:eq(1)').find('input').val()
    if ((diameter === '') || (quantity === '')){
        return alert("Please fill the Diameter and the quantity box to proceed!")
    } else 
    idNumber += 1
     cartArray.push({
        "idnbr": idNumber,
        "name": name,
        "price": price,
        "priceNbr": priceNbr,
        "quantity": quantity
    });
    var badge = Number($('.badge').text()) + 1;
    $('.badge').text(badge);
    row.find('td:eq(3)').find('input').val('')
    row.find('td:eq(1)').find('input').val('')
    return false;
}

// function ad subscription
function subscribe(){
    subscribtion.push($('#footersub').val());
    $('#footersub').val('')
}


$(document).ready(function(){
    $('.badge').text(0)
    $('.homePage').show();
    $('.productPage').hide()
    $('.storesPage').hide();
    $('.contactPage').hide();
// nav button active
    $('.navbtn').click(function(){
        $(this).addClass("active");
        $(this).siblings().removeClass("active")
    })

    $('#products').click(function(){
        $('.homePage').hide();
        $('.productPage').show()
        $('.storesPage').hide();
        $('.contactPage').hide();
    })

    $('#home').click(function(){
        $('.homePage').show();
        $('.productPage').hide()
        $('.storesPage').hide();
        $('.contactPage').hide();
    })


    $('#stores').click(function(){
        $('.homePage').hide();
        $('.productPage').hide()
        $('.storesPage').show();
        $('.contactPage').hide();
    })

    $('#contact').click(function(){
        $('.homePage').hide();
        $('.productPage').hide()
        $('.storesPage').hide();
        $('.contactPage').show();
    })

})


//search in the table

$("#myInput").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $("#myInput1").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable1 tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  $("#myInput2").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $("#myTable2 tr").filter(function() {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1)
    });
  });

  //add item in cart

  $('.Add').click(additems);
  $('#cartbtn').click(reloadTable)
  $('#logbtn').click(login)
  $('[data-toggle="tooltip"]').tooltip();
  $('.conf').click(confirm)
  $('.subtn').click(subscribe)