

//---------------------------------------modelbox js start--------------------------------------------
function alignModal() {
    var modalDialog = $(this).find(".modal-dialog");

    // Applying the top margin on modal dialog to align it vertically center
    modalDialog.css("margin-top", Math.max(0, ($(window).height() - modalDialog.height()) / 2));
}
// Align modal when it is displayed
$(".modal").on("shown.bs.modal", alignModal);

// Align modal when user resize the window
$(window).on("resize", function () {
    $(".modal:visible").each(alignModal);
});
//---------------------------------------modelbox js end--------------------------------------------

// switch to dropup only if there is no space at the bottom
$(document).on("shown.bs.dropdown", ".dropdown", function () {
    // calculate the required sizes, spaces
    var $ul = $(this).children(".dropdown-menu");
    var $button = $(this).children(".dropdown-toggle");
    var ulOffset = $ul.offset();
    // how much space would be left on the top if the dropdown opened that direction
    var spaceUp = (ulOffset.top - $button.height() - $ul.height()) - $(window).scrollTop();
    // how much space is left at the bottom
    var spaceDown = $(window).scrollTop() + $(window).height() - (ulOffset.top + $ul.height());
    // switch to dropup only if there is no space at the bottom AND there is space at the top, or there isn't either but it would be still better fit
    if (spaceDown < 0 && (spaceUp >= 0 || spaceUp > spaceDown))
        $(this).addClass("dropup");
}).on("hidden.bs.dropdown", ".dropdown", function () {
    // always reset after close
    $(this).removeClass("dropup");
});
// switch to dropup only if there is no space at the bottom

//---------------------------------------Datepicker js start--------------------------------------------

$('.from').datepicker({
    autoclose: true,
    minViewMode: 1,
    format: 'M'
}).on('changeDate', function (selected) {
    startDate = new Date(selected.date.valueOf());
    startDate.setDate(startDate.getDate(new Date(selected.date.valueOf())));
});

$('.example1').datepicker({
    autoclose: true,
    format: "dd M yy"
});
//---------------------------------------Datepicker js END-------------------------------------------

//---------------------------------------check box js -------------------------------------------

$(".place").click(function () {
    $(this).toggleClass("green");
});
//---------------------------------------check box js edn-------------------------------------------

//---------------------------------------Prevent anchor default action-------------------------------------------


$('.dropdown-menuu').on('click', function (e) {
    if ($(this).hasClass('dropdown-menuu')) {
        e.stopPropagation();
    }
});

//---------------------------------------Prevent anchor default action-------------------------------------------

//---------------------------------------toggle class for table collapse-------------------------------------------
$('.equipment').click(function () {

    $('.equipment').toggleClass('flashOn flash');

});
$('.equipment2').click(function () {

    $('.equipment2').toggleClass('flashOn flash');

});
$('.equipment3').click(function () {

    $('.equipment3').toggleClass('flashOn flash');

});
$('.equipment4').click(function () {

    $('.equipment4').toggleClass('flashOn flash');

});
$('.equipment5').click(function () {

    $('.equipment5').toggleClass('flashOn flash');

});
 //---------------------------------------toggle class for table collapse-------------------------------------------
 
 //.............................line chart strt... as...........................................
 
 //-----------------line chart end As------------------------------------------------------------