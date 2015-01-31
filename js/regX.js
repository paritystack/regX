var regex
var lines


RegexColorizer.addStyleSheet();

$('#resetBtn').bind('click',function(){
    resetApp();
});

$("#regexInput").on("keyup", function(){
    var regex_str = $(this).val();
    $("#regex").html(RegexColorizer.colorizeText(regex_str)); 
    //This click is not working as the click in the result is working.
    // $("#regexTab").click();
    regex = new RegExp(regex_str);
    // console.log("regex: " + regex_str);
    regex_test()
});

$("#testString").on("keyup", function(){
    var str = $(this).val();
    // console.log("testString: " + str);
    lines = str.split('\n');
    lines = _.filter(lines, function(n){
        return n.length;
        });
    
    // console.log(lines.length)
    regex_test()
});

function regex_test() {
    var a = "";
    var m;
    if (regex === undefined || lines === undefined) 
    {
        return;
    }
    lines.forEach(function (i) {
        // console.log(i + "-"+ regex.test(i));
        // a = a + i + "-"+ regex.test(i) + "<br>"
        if( m = regex.exec(i)){
            var match = m[0];
            var prematch = i.substr(0, m.index);
            var postmatch = i.substr(m.index+match.length);
            // var s = i.split(regex)
            // a = a + s[0] + "<mark>" + match + "</mark>" + s[1] + "<br>";
            a = a + prematch + "<mark>" + match + "</mark>" + postmatch + "<br>";
        }
        else
        {
            a = a + i + "<br>";
        }
        
    });
   $("#result").html(a); 
   $("#resultTab").click();
}


function resetApp(){
    regex = undefined;
    lines = undefined;
    $("#result").empty();
    $("#regex").empty();
    $("#regexInput").val('');
    $("#testString").val('');
}




