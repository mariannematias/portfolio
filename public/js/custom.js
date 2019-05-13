$(document).ready(function(){
    $("#lightgallery").lightGallery({
        download: false
    }); 
    var pageURL = $(location).attr("href");
    var section = pageURL.split('/');
    if (section[section.length-1] == '' || section[section.length-1] == '#') {
        $("#section1").show();  
        $("#section2, #section3, #section4, #section5").hide();
    } else {
        $(".targetDiv").hide();
        $('.show').removeClass('show');
        $(section[section.length-1]).show().addClass('show');
        if (section[section.length-1] == 'blog') {
            $(".nav li a").removeClass("active");
            $(".nav li a#4").addClass("active");
        } else {
            var navID = parseInt($('.show').attr('id').replace('section',''));
            $(".nav li a").removeClass("active");
            $(".nav li a#"+navID).addClass("active");
        }
    }
    
    /* show/hide sections when navigation is clicked */
    $(".showSection").click(function(){
        $(".targetDiv").hide();
        $(".targetDiv").removeClass("show");
        $('#section'+$(this).attr("id")).show().addClass("show");
    });
    
    /* add active class on selected navigation */
    $(".nav li a").click(function(){
        $(".nav li a").removeClass("active");
        $(this).addClass("active");
    });

    /* show/hide thumbnail pictures depending on portfolio category */
    $(".work-nav").click(function(){
        if ($(this).attr("id") == "all") {
            $(".thumb").show();
        } else {
            $(".thumb").hide();
            $('.cat'+$(this).attr("id")).show();
        }
    });
});