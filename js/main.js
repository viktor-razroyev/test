jQuery(document).ready(function() {
    // ======================= imagesLoaded Plugin ===============================
    // https://github.com/desandro/imagesloaded

    // $('#my-container').imagesLoaded(myFunction)
    // execute a callback when all images have loaded.
    // needed because .load() doesn't work on cached images

    // callback function gets image collection as argument
    //  this is the container

    // original: MIT license. Paul Irish. 2010.
    // contributors: Oren Solomianik, David DeSandro, Yiannis Chatzikonstantinou

    // blank image data-uri bypasses webkit log warning (thx doug jones)
    var BLANK = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///ywAAAAAAQABAAACAUwAOw==';

    jQuery.fn.imagesLoaded = function( callback ) {
        var $this = this,
            deferred = jQuery.isFunction(jQuery.Deferred) ? jQuery.Deferred() : 0,
            hasNotify = jQuery.isFunction(deferred.notify),
            $images = $this.find('img').add( $this.filter('img') ),
            loaded = [],
            proper = [],
            broken = [];

        // Register deferred callbacks
        if (jQuery.isPlainObject(callback)) {
            jQuery.each(callback, function (key, value) {
                if (key === 'callback') {
                    callback = value;
                } else if (deferred) {
                    deferred[key](value);
                }
            });
        }

        function doneLoading() {
            var $proper = jQuery(proper),
                $broken = jQuery(broken);

            if ( deferred ) {
                if ( broken.length ) {
                    deferred.reject( $images, $proper, $broken );
                } else {
                    deferred.resolve( $images );
                }
            }

            if ( jQuery.isFunction( callback ) ) {
                callback.call( $this, $images, $proper, $broken );
            }
        }

        function imgLoaded( img, isBroken ) {
            // don't proceed if BLANK image, or image is already loaded
            if ( img.src === BLANK || jQuery.inArray( img, loaded ) !== -1 ) {
                return;
            }

            // store element in loaded images array
            loaded.push( img );

            // keep track of broken and properly loaded images
            if ( isBroken ) {
                broken.push( img );
            } else {
                proper.push( img );
            }

            // cache image and its state for future calls
            jQuery.data( img, 'imagesLoaded', { isBroken: isBroken, src: img.src } );

            // trigger deferred progress method if present
            if ( hasNotify ) {
                deferred.notifyWith( jQuery(img), [ isBroken, $images, jQuery(proper), jQuery(broken) ] );
            }

            // call doneLoading and clean listeners if all images are loaded
            if ( $images.length === loaded.length ){
                setTimeout( doneLoading );
                $images.unbind( '.imagesLoaded' );
            }
        }

        // if no images, trigger immediately
        if ( !$images.length ) {
            doneLoading();
        } else {
            $images.bind( 'load.imagesLoaded error.imagesLoaded', function( event ){
                // trigger imgLoaded
                imgLoaded( event.target, event.type === 'error' );
            }).each( function( i, el ) {
                    var src = el.src;

                    // find out if this image has been already checked for status
                    // if it was, and src has not changed, call imgLoaded on it
                    var cached = jQuery.data( el, 'imagesLoaded' );
                    if ( cached && cached.src === src ) {
                        imgLoaded( el, cached.isBroken );
                        return;
                    }

                    // if complete is true and browser supports natural sizes, try
                    // to check for image status manually
                    if ( el.complete && el.naturalWidth !== undefined ) {
                        imgLoaded( el, el.naturalWidth === 0 || el.naturalHeight === 0 );
                        return;
                    }

                    // cached images don't fire load sometimes, so we reset src, but only when
                    // dealing with IE, or image is complete (loaded) and failed manual check
                    // webkit hack from http://groups.google.com/group/jquery-dev/browse_thread/thread/eee6ab7b2da50e1f
                    if ( el.readyState || el.complete ) {
                        el.src = BLANK;
                        el.src = src;
                    }
                });
        }

        return deferred ? deferred.promise( $this ) : $this;
    };

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
    jQuery('.container_center_content').imagesLoaded(function(){
        var i=0;
        jQuery('.container_center_content_item').each(function(){
            var $this = jQuery(this);
            setTimeout(function(){
                $this.animate({
                    opacity: 1
                }, {duration: 600});
            },i*60);
            i++;
        });
    });
});