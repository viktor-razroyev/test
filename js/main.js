jQuery(document).ready(function() {

    (function(){
        var canvas = document.getElementById("container_center_content_arc"),
            context = canvas.getContext("2d"),
            width = canvas.width,
            height = canvas.height;
        context.beginPath();
        context.moveTo(0, height);
        context.bezierCurveTo(width/8, height/3.8,width/3, 0, width/2, 0);
        context.bezierCurveTo(2*width/3, 0, 7*width/8, height/3.8, width, height);
        context.closePath();
        context.fillStyle = '#c0d7e7';
        context.fill();
    })();
    /*
    var data = {
        "sport1":{
            "name": "Биатлон",
            "amount": 169072
        },
        "sport2":{
            "name": "Бобслей",
            "amount": 50692
        },
        "sport3":{
            "name": "Горнолыжный спорт",
            "amount": 41152
        },
        "sport4":{
            "name": "Керлинг",
            "amount": 60574
        },
        "sport5":{
            "name": "Конькобежный спорт",
            "amount": 92700
        },
        "sport6":{
            "name": "Лыжное двоеборье",
            "amount": 12698
        },
        "sport7":{
            "name": "Лыжные гонки",
            "amount": 34720
        },
        "sport8":{
            "name": "Прыжки с трамплина",
            "amount": 19310
        },
        "sport9":{
            "name": "Санный спорт",
            "amount": 12738
        },
        "sport10":{
            "name": "Скелетон",
            "amount": 27284
        },
        "sport11":{
            "name": "Сноуборд",
            "amount": 92610
        },
        "sport12":{
            "name": "Фигурное катание",
            "amount": 234064
        },
        "sport13":{
            "name": "Фристайл",
            "amount": 84814
        },
        "sport14":{
            "name": "Хоккей",
            "amount": 368048
        },
        "sport15":{
            "name": "Шорт-трек",
            "amount": 37772
        }
    };
    var arOfWeights=[];
    for (var i in data) {
        if (data.hasOwnProperty(i)) { // фильтрация
            arOfWeights.push(data[i].amount);
        }
    }
    function sDecrease(i, ii) { // По убыванию
        if (i > ii)
            return -1;
        else if (i < ii)
            return 1;
        else
            return 0;
    }
    arOfWeights.sort(sDecrease);
    var arOfRadiuses=[];
    for (var i= 0; i < arOfWeights.length; i++){
        arOfRadiuses[i] = parseInt(35+(arOfWeights[i]-arOfWeights[arOfWeights.length-1])/(arOfWeights[0]-arOfWeights[arOfWeights.length-1])*65);
    }
    console.log(arOfRadiuses);
    */
    var $item_images = jQuery('.container_center_content_item');
    var hoverPosition = function(obj, eventObj,radius) {
        var offset = jQuery(obj).offset();
        var X = eventObj.pageX - offset.left;
        var Y = eventObj.pageY - offset.top;
        X = 2*X - radius;
        Y = 2*Y - radius;
        return [X,Y];
    }
    $item_images.hover(
        function (e) {
            var radius = jQuery(this).width()/2;
            var a = hoverPosition(this,e,radius);
            var $item_image_wrap = jQuery(this).children('.container_center_content_item_inner');
            if (jQuery(this).children('.container_center_content_item_inner:animated').length === 0)
            {
                $item_image_wrap.css({top: a[1], left: a[0]});
            }
            $item_image_wrap.animate({
                top: '50%',
                left: '50%'
            }, {queue: false, duration: 500});
        },
        function (e) {
            var radius = jQuery(this).width()/2;
            var a = hoverPosition(this,e,radius);
            var $item_image_wrap=jQuery(this).children('.container_center_content_item_inner');
            $item_image_wrap.animate({
                top: a[1]+'px',
                left: a[0]+'px'
            }, {queue: false, duration: 500});
        }
    );
});