var i = 0;

// 크롬 외 브라우저 접속 시 안내 모달 스크립트
var ua = window.navigator.userAgent;
function browserVerification() {
    alert("it's not chrome")
    console.log('현재 접속한 환경: ' + ua)
}
// 모달 오픈 후 닫기 버튼 클릭시 작동하는 스크립트
$(".modalCloseBtn").click(function(){
    $(".modalPopup").removeClass("on");
    $(".modalPopup > div").removeClass("on");
    $('.modalBg').removeClass("on");
    $('body').css('overflow','auto');
    $('body').attr('scroll','yes');
});
if (ua.indexOf("MSIE") > 0 || ua.indexOf("Trident") > 0) {
    // IE
	browserVerification();
} else if (navigator.userAgent.toLowerCase().indexOf("edge") > -1) {
    // IE Edge
	browserVerification();
} else if (ua.indexOf("Opera") > 0 || ua.indexOf("OPR") > 0) {
    // Opera
	browserVerification();
} else if (ua.indexOf("Firefox") > 0) {
    // Firefox
	browserVerification();
} else if (ua.indexOf("Safari") > 0) {
	if (ua.indexOf("Chrome") > 0) {
        // Chrome
	} else if (ua.indexOf("Safari") > 0) {
        // Safari
		browserVerification();
    }
}
// 크롬 외 브라우저 접속 시 안내 모달 스크립트 End
window.addEventListener('load', function(){
    $("#loadingBg").addClass("complete");
    let priceDate= new Date();
    let month = priceDate.getMonth()+1;
    let year = priceDate.getFullYear();
    $(".priceCondition .month").text(month);
    $(".priceCondition .yymm").text(year+'년'+month+'월');
});
//html 로드:s
document.addEventListener("DOMContentLoaded", function() {
    var allElements = document.getElementsByTagName('*');
    Array.prototype.forEach.call(allElements, function(el) {
        var includePath = el.dataset.includePath;
        if (includePath) {
            var xhttp = new XMLHttpRequest();
            xhttp.onreadystatechange = function () {
                if (this.readyState == 4 && this.status == 200) {
                    el.outerHTML = this.responseText;
                }
            };
            xhttp.open('GET', includePath, true);
            xhttp.send();
        }
    });
    //footer 내용
    document.getElementById("footer").innerHTML="<p>Copyright(c) 2021 모비온 All rights reserved.</p>"
});
//html 로드:e
//시간설정 :s
var timeRtbSetting = function() {

    var minCost = 10;

    function timeChecked(){
        var usemoney = 0;
        if( $(".bdgtUlmtYn:checked").val() == 'N' ){

            var timeCount = $(".hhNo:checked").length;

            if( $("#usemoney").val() < (minCost*timeCount)){
                //alert('설정하신 일일허용예산이 균등배분하기엔 금액이 부족합니다.');
                $("#usemoney").val(minCost * timeCount);
            }
            usemoney = $("#usemoney").val().replace(/[0-9]$/,0);
            $("#usemoney").val(usemoney);
            $("#timeUsemoney").val((Math.floor((usemoney / timeCount) / minCost) * minCost));
        }
    }

    function timeRtbChecked(){
        var usemoney = 0;
        if( $(".rtbBdgtUlmtYn:checked").val() == 'N' && $("#rtbUsemoneyYn").prop("checked") ){

            timeCount = $(".hhNo:checked").length;
            if( $("#rtbUsemoneyWeb").val() < (minCost * timeCount)){
                //alert('설정하신 RTB 온라인 일일허용예산이 균등배분하기엔 금액이 부족합니다.');
                $("#rtbUsemoneyWeb").val(minCost * timeCount);
            }

            usemoney = $("#rtbUsemoneyWeb").val().replace(/[0-9]$/,0);
            $("#rtbUsemoneyWeb").val(usemoney);
            $("#timeRtbUsemoneyWeb").val((Math.floor((usemoney / timeCount) / minCost) * minCost));

            if( $("#rtbUsemoneyMobile").val() < (minCost * timeCount)){
                //alert('설정하신 RTB 모바일 일일허용예산이 균등배분하기엔 금액이 부족합니다.');
                $("#rtbUsemoneyMobile").val(minCost * timeCount);

            }

            usemoney = $("#rtbUsemoneyMobile").val().replace(/[0-9]$/,0);
            $("#rtbUsemoneyMobile").val(usemoney);
            $("#timeRtbUsemoneyMobile").val((Math.floor((usemoney / timeCount) / minCost) * minCost));
        }
    }

    return {
        load : function(){
            timeChecked();
            timeRtbChecked();
        },
        events : function (){

            $(".hhNo").on("click", function(){
                //$("#rtbHhNo"+$(this).val()).prop("checked", $(this).prop("checked"));
                //timeChecked();
                //timeRtbChecked();
            });


            $(".bdgtUlmtYn").on("click", function(){
                if($(this).val() == 'Y'){
                    $("#usemoney").val(0).attr("readonly", true);
                    $("#timeUsemoney").val('');
                } else {
                    $("#usemoney").attr("readonly", false);
                    timeChecked();
                }
            });

            $("#hourAll").on("click", function(){
                $(".hhNo").prop("checked", $(this).prop("checked"));
                $(".rtbHhNo").prop("checked", $(this).prop("checked"));
                timeChecked();
                timeRtbChecked();
            });

			$("#timeAll").on("click", function(){
				$(".hhNo").prop("checked", $(this).prop("checked"));
				$(".rtbHhNo").prop("checked", $(this).prop("checked"));
				if ($(this).prop("checked") == true) {
					// addClass ui-selected
					$(".timeSetting").find("li").addClass("ui-selected");
				} else {
					// removeClass ui-selected
					$(".timeSetting").find("li").removeClass("ui-selected");
				}
				timeChecked();
				timeRtbChecked();
			});

            $(".rtbHhNo").on("click", function(){
                timeRtbChecked();
            });

            $(".rtbBdgtUlmtYn").on("click", function(){
                if($(this).val() == 'Y'){
                    $("#rtbUsemoneyWeb").val(0).attr("readonly", true);
                    $("#timeRtbUsemoneyWeb").val('');
                } else {
                    $("#rtbUsemoneyWeb").attr("readonly", false);
                    timeRtbChecked();
                }
            });

            $(".rtbBdgtUlmtMobileYn").on("click", function(){
                if($(this).val() == 'Y'){
                    $("#rtbUsemoneyMobile").val(0).attr("readonly", true);
                    $("#timeRtbUsemoneyMobile").val('');
                } else {
                    $("#rtbUsemoneyMobile").attr("readonly", false);
                    timeRtbChecked();
                }
            });

            $("#usemoney").on("blur", function(){
                timeChecked();
            });

            $("#rtbUsemoneyWeb,#rtbUsemoneyMobile").on("blur", function(){
                timeRtbChecked();
            });


            // 광고 스케줄 s
            function numberPad(n, width) {
                n = n + '';
                return n.length >= width ? n : new Array(width - n.length + 1).join('0') + n;
            }

            $( ".timeSetting" ).selectable({
                stop: function() {
                	var total_length = $(".timeSetting").find("li").length;
                	var checked_length = 0;
                	$("#timeAll").prop("checked", false);

                    $(".ui-widget-content", this).each(function () {
                        var index = $( ".timeSetting li" ).index( this );
                        var tmp_id = numberPad(index, 2);

                        var _checked = false;
                        if ($(this).hasClass("ui-selected") == true) {
                            _checked = true;
							checked_length++;
                        }

                        $("#hhNo" + tmp_id).prop('checked', _checked);
                        timeChecked();
                        timeRtbChecked();
                    });

                    if (total_length == checked_length) {
						$("#timeAll").prop("checked", true);
					}
                }
            });
        }
    }
};
//시간설정 :e
var magnificPopup;
var common = {};
// 메뉴
common.menu = function (){
    // 유저 메뉴 작동
	$(document).on("click",".userMenu > button",function(){
		$(".userMenu ul").stop().slideToggle(300);
    });
    // 유저 메뉴 작동 End
    // 햄버거 메뉴 작동
	$(document).on("click","#hamburger",function() {
        $("#headerTop").toggleClass("minimization");
        $("#nav").toggleClass("minimization");
		$("#wrap").toggleClass("Maximize");
        $("footer").toggleClass("Maximize");
		$(".depth > li > ul").slideUp(100);
		$(".depth li").removeClass("on");
    });
    // 햄버거 메뉴 작동 End

    //url 변경
    $(document).on("click",".urlBtn,.logoArea", function() {
        var URL=$(this).attr('data-url');
        $(location).attr('href','/ahnlabADS'+URL);
    });
    // 2depth 메뉴 클릭 이벤트
	$(document).on("click",".depth > li", function() {
        $(this).addClass('on').siblings().removeClass('on');
        $(this).find('ul').slideDown(200);
        $(this).siblings().find('ul').slideUp(200);
    });
    $(document).on("click",".depth .subMenu li", function() {
        $(".depth .subMenu li").removeClass('active');
        $(".depth > li:first-child").removeClass('HomeOn');
        $(this).addClass('active')
    });
    // 2depth 메뉴 클릭 이벤트 End

    $(document).on("click",".chartTap li,.page-nav-box li,.tapList li,.subMenu-list li", function() {//addClass active 이벤트
      $(this).addClass('active').siblings().removeClass('active');
    });
    $(document).on("click",".pay-tab li", function() {//tap menu 이벤트
        $(this).addClass('active').siblings().removeClass('active');
        if($(this).index()===0){
            $('div.payCard').fadeIn();
            $('div.account').fadeOut();
        } else{
            $('div.payCard').fadeOut();
            $('div.account').fadeIn();
        }
    });
    
};
// 메뉴
common.daterangepicker = function (){
  // 날짜 선택 script
	$(".dateInput").daterangepicker(
		{
            autoApply: true,
            locale: {
                    format: "YYYY-MM-DD",
                    daysOfWeek: ["일", "월", "화", "수", "목", "금", "토"],
                    monthNames: ["01","02","03","04","05","06","07","08","09","10","11","12"]
            },
            ranges: {
                '오늘': [moment(), moment()],
                '어제': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
                '이번달': [moment().startOf('month'), moment().endOf('month')],
                '전월': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
                '전전월': [moment().subtract(2, 'month').startOf('month'), moment().subtract(2, 'month').endOf('month')],
                '최근 7일': [moment().subtract(7, 'days'), moment().subtract(1, 'days')],
                '최근 30일': [moment().subtract(30, 'days'), moment().subtract(1, 'days')],
            }
		}
	);
};
// common.tableResize = function (){
//   // 테이블 크기 산출 script
//   var tableWidth = 0;
// 	$(".tableSection").each(function() {
//     var $tableSection = $(this);
//     $(this).find("th").each(function() {
//       var e = $(this).outerWidth();
//       var index = $(this).index();
//       $tableSection.find("tbody tr").each(function() {$(this).find("td").eq(index).css("width", e + "px");});
//       $tableSection.find("tfoot tr").each(function() {
//       $(this).find("td").eq(index).css("width", e + "px");});
//       tableWidth += e;
//     });
// 		$(this).find("table").width(tableWidth);
//     tableWidth = 0;
//   });
//     // 테이블 크기 산출 script End
// };

// 모달 오픈 script
// common.modal = function(){
//     // 모달 사용법
//     // 1. 클릭 대상에 클래스(modalOpen), modal속성(오픈할려고 하는 모달 id)를 추가
//     // 2. modalOpen 클래스를 가진 타겟을 클릭하면 해당 타겟의 modal 속성값을 저장
//     // 3. 변수로 modal 속성값을 id로 변환
//     // 4. 해당 id 값을 가진 모달에 display block으로 모달 오픈
//     // Close
//     // 1. 윈도우 화면을 클릭하면 오픈되어 있는 모달 객체를 저장.
//     // 2. 해당 id 값을 가진 객체가 모달 오픈시 저장해놨던 id 값을 가진 객체의 값이 같으면 display none으로 모달 종료
//     saveModalName = null;
//     $(document).on('click','.modalOpen', function(){
//         saveModalName = $(this).data('modal');
//         openTarget = $('#' + saveModalName);
//         openTarget.css('display','block');
//         $('body').css('overflow','hidden');
//         $('body').attr('scroll','no');
//     });
//     $(document).on('click','.modalContent .cancel', function(){
//         openTarget.css('display','none');
//         $('body').css('overflow','auto');
//         $('body').attr('scroll','yes');
//     });   
// 	function modalClose(event) {
//         var a = event.target;
//         var b = a.id;
//         if(b == saveModalName) {
//             a.style.display = 'none';
//             $('body').css('overflow','auto');
//             $('body').attr('scroll','yes');
//         }
//     }
//     window.onclick = function(event) {
//         modalClose(event);
//     }
// };

// 모달 오픈 script End
// 전체 페이지 공통 script
$(function() {
	common.menu();
    common.daterangepicker();
    //common.tableResize();
    //common.modal();
	//지정일 선택
	$(document).on("click",".datepickSelect .inputBox span",function() {
		$(".dateLayer").fadeIn(200);
	});
	$(document).on("click",".dateLayer .btnBox .btn_cancel").click(function() {
		$(".dateLayer").fadeOut(300);
	});

	var fixedDate = $(".datepickSelect"),
		dateNum = fixedDate.find(".dateLayer strong em"),
		dateListNum = fixedDate.find(".dateLayer ul li a");

	dateListNum.click(function() {
		$(".dateLayer ul li a").removeClass("on");
		$(this).addClass("on");
		var numtxt = $(this).text();
		dateNum.text(numtxt);
		$(document).on("click",".dateLayer .btnBox .btn_confirm",function() {
			$(".dateLayer").fadeOut(300);
			$(".inputBox input[id='selectDay']").val(numtxt + "일");
			$(".inputBox input[name='standDttm']").val(numtxt);
		});
	});
});

// 개별 페이지 script
$(function(){
	// Toggle 메뉴
	$(document).on("click",".comboBox", function() {
		$(this).children('ul').stop().slideToggle(200);
	});
    $('body').on('click',function(e){
        if(e.target.className ==".comboBox"){return false}
        $('.comboBox').children('ul').stop().slideUp();
    });
	//테이블내 값 수정 - JB
	$(".edit-input").each(function() {
		var $this = $(this);
		$(this)
			.find(".edit")
			.click(function() {
			$this.hide();
				$this.next(".edit-input-save").show();
		});
	});
	$(".edit-input-save").each(function() {
		var $this = $(this);
		$this.find("button").click(function() {
			$this.hide();
			$this.prev(".edit-input").show();
		});
		});
});
//Ad_write 체크 옵션 :s
$(document).on("click",".week",function () {
    if ($(".week:checked").length == $(".week").length) {
        $("#allWeek,#weekdayAll,#weekendAll").prop("checked", true);
    } else{
        $("#allWeek,#weekdayAll,#weekendAll").prop("checked", false);
    }
});
$(document).on("click",".weekendAll,.weekdayAll,.week",function () {
    if ($(".weekendAll:checked").length == $(".weekendAll").length) {
        $("#weekendAll").prop("checked", true);
    } else{
        $("#weekendAll").prop("checked", false);
    }
    if ($(".weekdayAll:checked").length == $(".weekdayAll").length) {
        $("#weekdayAll").prop("checked", true);
    } else{
        $("#weekdayAll").prop("checked", false);
    }
});
$(document).on("click","#allWeek",function () {
    var _checked = $(this).is(":checked");
    $("#weekdayAll,#weekendAll,.week").prop("checked", _checked);
});

$(document).on("click","#weekdayAll,#weekendAll", function(){
    var week =$(this).attr('id');
    var _checked = $(this).is(":checked");
    $("."+week).prop("checked", _checked);
    if(($("#weekdayAll").is(":checked") && $("#weekendAll").is(":checked")) === true){
        $("#allWeek").prop("checked", true);
    } else{
        $("#allWeek").prop("checked", false);
    }
});
$(document).on("click",".gender",function () {
    if ($(".gender:checked").length == $(".gender").length) {
        $("#gender").prop("checked", true);
    } else{
        $("#gender").prop("checked", false);
    }
});
$(document).on("click","#gender",function () {
    var _checked = $(this).is(":checked");
    $(".gender").prop("checked", _checked);
});
$(document).on("click",".age",function () {
    if ($(".age:checked").length == $(".age").length) {
        $("#age").prop("checked", true);
    } else{
        $("#age").prop("checked", false);
    }
});
$(document).on("click","#age",function () {
    var _checked = $(this).is(":checked");
    $(".age").prop("checked", _checked);
});
$(document).on("change",".citySelect",function () {
    var cityList=$(this).find("option:selected").text();
    var cityIndex=$(this).find("option:selected").index();
    if(cityIndex===0){
        return false;
    } else{
        if($(this).find("option:selected").hasClass('check')){
            alert('선택된 지역입니다.');
        } else{
            $(".cityList").append("<span data-index='"+cityIndex+"'>"+cityList+"<i>x</i></span>");
            if(cityIndex === 1){
                $(this).find("option:not(:eq(1))").removeClass('check');
                $(".cityList span:not([data-index=1])").remove();
            } else {
                $(this).find("option:selected").addClass('check');
                $(".cityList span[data-index=1]").remove();
            }
        }
    }
});
$(document).on("click",".cityList > span > i",function () {
    var num = $(this).parent('span').attr('data-index')
    $(this).parent('span').remove();
    $('.citySelect > option').eq(num).removeClass('check');
    $('.citySelect > option').eq(0).prop('selected', true);
});
$(document).on("click",".cityListDel",function () {
    $('.cityList').children('span').remove();
    $('.citySelect > option').removeClass('check');
    $('.citySelect > option').eq(0).prop('selected', true);
});
//Ad_write 체크 옵션 :e

// 전체 선택 스크립트
$(document).on("click", '.allCheckItems input[name="allCheckbox"]', function() {
	var valueCheck = $(this).prop("checked");
    if(valueCheck === true){
		$(this).closest(".checkboxArea").find("input[type=checkbox]").prop("checked", true);
    } else if(valueCheck === false) {
		$(this).closest(".checkboxArea").find("input[type=checkbox]").prop("checked", false);
    }
});
$(document).on("click", ".allCheckItems input[type=checkbox]", function() {
	var selectName = $(this).attr("name");
	var deselectAll = $(this).closest(".checkboxArea").find('input[name="' + selectName + '"]').length;
    var selectCount = 0;
	$(this).closest(".checkboxArea").find('input[name="' + selectName + '"]').each(function() {
			var deselectCount = $(this).prop("checked");
			if(deselectCount === true){
				selectCount += 1;
			}
    });
    if(selectCount === 0){
		$(this).closest(".checkboxArea").find("input[name=allCheckbox]").prop("checked", false);
    } else if(selectCount === deselectAll){
		$(this).closest(".checkboxArea").find("input[name=allCheckbox]").prop("checked", true);
    } else if(selectCount !== deselectAll){
		$(this).closest(".checkboxArea").find("input[name=allCheckbox]").prop("checked", false);
    }
});
// 전체 선택 스크립트 End


function uncomma(str) {
    str = String(str);
	return str.replace(/[^\d]+/g, "");
}

function comma(str) {
	str = String(str).replace(/(\d)(?=(?:\d{3})+(?!\d))/g, "$1,");
    return str;
}

//3자리 단위마다 콤마 생성
function addCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

//모든 콤마 제거
function removeCommas(x) {
    if(!x || x.length === 0) return "";
    else return x.split(",").join("");
}

// 숫자만 입력받는 함수
// // 사용방법 클래스 .numberInput 추가
// $(".numberInput").on("focus", function() {
//     var x = $(this).val();
//     x = removeCommas(x);
//     $(this).val(x);
// }).on("focusout", function() {
//     var x = $(this).val();
//     if(x && x.length > 0) {
//         if(!$.isNumeric(x)) {
//             x = x.replace(/[^0-9]/g,"");
//         }
//         x = addCommas(x);
//         $(this).val(x);
//     }
// }).on("keyup", function() {
//     $(this).val($(this).val().replace(/[^0-9]/g,""));
// });
// // 숫자만 입력받는 함수 End
