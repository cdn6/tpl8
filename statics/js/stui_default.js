var stui = {
    'browser': {
        url: document.URL,
        domain: document.domain,
        title: document.title,
        language: (navigator.browserLanguage || navigator.language).toLowerCase(),
        canvas: function() {
            return !!document.createElement("canvas").getContext
        }(),
        useragent: function() {
            var a = navigator.userAgent;
            return {
                mobile: !! a.match(/AppleWebKit.*Mobile.*/),
                ios: !! a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
                android: -1 < a.indexOf("Android") || -1 < a.indexOf("Linux"),
                iPhone: -1 < a.indexOf("iPhone") || -1 < a.indexOf("Mac"),
                iPad: -1 < a.indexOf("iPad"),
                trident: -1 < a.indexOf("Trident"),
                presto: -1 < a.indexOf("Presto"),
                webKit: -1 < a.indexOf("AppleWebKit"),
                gecko: -1 < a.indexOf("Gecko") && -1 == a.indexOf("KHTML"),
                weixin: -1 < a.indexOf("MicroMessenger")
            }
        }()
    },
    'mobile': {
        'headroom': function() {
            $.getScript("https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/js/headroom.min.js", function() {
                $("#header-top", function() {
                    (new Headroom(document.querySelector("#header-top"), {
                        tolerance: 5,
                        offset: 205,
                        classes: {
                            initial: "top-fixed",
                            pinned: "top-fixed-up",
                            unpinned: "top-fixed-down"
                        }
                    })).init()
                });
            })
        },
        'slide': function() {
            $.getScript("https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/js/flickity.pkgd.min.js", function() {
                $(".type-slide").each(function(a) {
                    $index = $(this).find(".active").index()*1;
                    if($index > 3){
                        $index = $index-3;
                    }else{
                        $index = 0;
                    }
                    $(this).flickity({
                        cellAlign: "left",
                        freeScroll: true,
                        contain: true,
                        prevNextButtons: false,
                        pageDots: false,
                        initialIndex: $index
                    });
                })
            })
        },
        'mshare': function() {
            $(".open-share").click(function() {
                stui.browser.useragent.weixin ? $("body").append('<div class="mobile-share share-weixin"></div>') : $("body").append('<div class="mobile-share share-other"></div>');
                $(".mobile-share").click(function() {
                    $(".mobile-share").remove();
                    $("body").removeClass("modal-open")
                })
            })
        }
    },
    'flickity': {
        'carousel': function() {
            $.getScript("https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/js/flickity.pkgd.min.js", function() {
                $(".carousel_center").flickity({
                    cellAlign: "center",
                    contain: true,
                    wrapAround: true,
                    autoPlay: true,
                    percentPosition: true,
                    resize: true,
                    setGallerySize: true,
                    pageDots: false
                });
            })
        }
    },
    'images': {
        'lazyload': function() {
            $.getScript("https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/js/jquery.lazyload.min.js", function() {
                $(".lazyload").lazyload({
                    effect: "fadeIn",
                    threshold: 300,
                    failurelimit: 15,
                    skip_invisible: false
                })
            })
        },
    'qrcode': function() {
            //$("img.qrcode").attr("src", "//qrcode.tlyy.in/api.php?url=" + encodeURIComponent(stui.browser.url) + "")
            $('img.qrcode').attr('src', maccms.path +'/index.php/qrcode/index.html?url='+ MAC.Url);
        }
    },
    'common': {
        'stylecolor': function() {
            var favstyle = readCookie('stylecolor');
            console.log(favstyle);
            if(favstyle){
                $("link[name='skin']").attr({href:favstyle});
            }
            $(".gray-color").click(function(){
                $("link[name='skin']").attr({href:"https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/css/stui_color-gray.css"});
                createCookie('stylecolor',"https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/css/stui_color-gray.css",365);
            });
            $(".gules-color").click(function(){
                $("link[name='skin']").attr({href:"https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/css/stui_color-gules.css"});
                createCookie('stylecolor',"https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/css/stui_color-gules.css",365);
            });
            $(".blue-color").click(function(){
                $("link[name='skin']").attr({href:"https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/css/stui_color-blue.css"});
                createCookie('stylecolor',"https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/css/stui_color-blue.css",365);
            });
            $(".green-color").click(function(){
                $("link[name='skin']").attr({href:"https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/css/stui_color-green.css"});
                createCookie('stylecolor',"https://cdn.jsdelivr.net/gh/cdn6/tpl8/statics/css/stui_color-green.css",365);
            });
            function createCookie(name,value,days){
                var expires;
                if (days) {
                    expires = days;
                } else{
                    expires = "";
                }
                $.cookie(name,value,{expires:expires,path:'/'});
            }
            function readCookie(name){
                var styles = $.cookie(name);
                return styles;
            }
            function delCookie(name){
                 $.cookie(name,null)
            }
        },
        'history': function() {
            if($.cookie("recente")){
                var json=eval("("+$.cookie("recente")+")");
                var list="";
                for(i=0;i<json.length;i++){
                    list = list + "<li><a href='"+json[i].vod_url+"' title='"+json[i].vod_name+"'><span class='pull-right text-red'>"+json[i].vod_part+"</span>"+json[i].vod_name+"</a></li>";
                }
                $("#stui_history").append(list);
            }
            else
                $("#stui_history").append("<p style='padding: 80px 0; text-align: center'>您还没有看过动漫哦</p>");

            $(".historyclean").on("click",function(){
                $.cookie("recente",null,{expires:-1,path: '/'});
            })
        },
        'playlink': function() {
            var playlist=$(".playlink");
            playlist.each(function(i){
                if($(this).find("li").length>30){
                    $(this).find("li").eq(29).after("<li class='more'><a href='javascript:;'><i class='iconfont icon-add'></i> 更多</a></li>");
                    var more=$(this).find("li.more");
                    var prev=more.index();
                    more.show();
                    for(i=prev+1;i<$(this).find("li").length;++i)
                    $(this).find("li").eq(i).hide();
                }else if($(this).find("li").length<5){
                    $(this).addClass("nonum")
                }
            })
            $("li.more").on("click",function(){
                var more=$(this).parent("ul").find("li.more");
                var newlist=$(this).parent("ul").find("li");
                var prev=more.index();
                for(i=0;i<newlist.length;++i)
                    newlist.eq(i).show();
                more.hide();
           })
        },
        'bootstrap': function() {
            $('a[data-toggle="tab"]').on("shown.bs.tab", function(a) {
                var b = $(a.target).text();
                $(a.relatedTarget).text();
                $("span.active-tab").html(b)
            })
        }
    }
};
$(document).ready(function() {
    if(stui.browser.useragent.mobile){
        stui.mobile.slide();
        stui.mobile.headroom();
        stui.mobile.mshare();
    }
    stui.flickity.carousel();
    stui.images.lazyload();
    stui.images.qrcode();
    stui.common.stylecolor();
    stui.common.history();
    stui.common.playlink();
    stui.common.bootstrap();
});
