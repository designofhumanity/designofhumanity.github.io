$('input[type=radio][name=methodofthinking]').change(function() {
    if (this.value == 'induction') {
        alert("Allot Thai Gayo Bhai");
    } else if (this.value == 'deduction') {
        alert("Transfer Thai Gayo");
    }
});

function toggle_show(id) {
    console.log("TCL: functiontoggle_show -> toggle_show", toggle_show)
    document.getElementById(id).style.display = document.getElementById(id).style.display == 'none' ? 'flex' : 'none';
}

function openTab(evt, tabName, contentClassName = "tabcontent", tablinkClass = "tablinks") {
    console.log("TCL: openTab -> openTab", openTab)
    var i, tabcontent, tablinks;
    tabcontent = document.getElementsByClassName(contentClassName);
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }
    tablinks = document.getElementsByClassName(tablinkClass);
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    document.getElementById(tabName).style.display = "flex";
    $.ajax({
        type: "GET",
        url: "parts/" + tabName + ".html",
        success: function(result) {
            $('#' + tabName).html(result);
            $.redrawLanguage("rus");
        }
    });
    evt.currentTarget.className += " active";
}

function firstAjax() {
    $.ajax({
        type: "GET",
        url: "parts/" + "short" + ".html",
        success: function(result) {
            $('#' + "short").html(result);
            $.redrawLanguage(event, "rus");
        }
    });
};
firstAjax();
//pseudo SPA
var LANGUAGE;

$.redrawLanguage = function(evt, lang) {
    lngtablinkClass = "lngtablinks";
    lngtablinks = document.getElementsByClassName(lngtablinkClass);
    for (i = 0; i < lngtablinks.length; i++) {
        lngtablinks[i].className = lngtablinks[i].className.replace(" active", "");
    }
    if (typeof(evt) !== 'undefined') {
        evt.currentTarget.className += " active";
    }
    $.ajax({
        url: 'lang/' + lang + '.json', //тянем файл с языком
        dataType: 'json',
        success: function(response) {
            LANGUAGE = response; //записываем в глобальную переменную, а вдруг пригодиться
            $('body').find("[lng]").each(function() //ищем все элементы с атрибутом
                {
                    var lng = LANGUAGE[$(this).attr('lng')]; //берем нужное значение по атрибуту lng
                    var tag = $(this)[0].tagName.toLowerCase();
                    switch (tag) //узнаем название тега
                    {
                        case "input":
                            $(this).val(lng);
                            break;
                        case "img":
                            // $(this).val(lng);
                            $(this).attr("src", lng);
                            break;
                        default:
                            $(this).html(lng);
                            break;
                    }
                });
        }
    });
}

$.getLanguage = function(key) {
    if (typeof(LANGUAGE[key]) != 'undefined') //если есть переменная
    {
        return LANGUAGE[key]; //возвращаем значение
    }
    return key; //если нет, тогда ключ
}