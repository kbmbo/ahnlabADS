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
    $(document).on("click",".depth li,.logoArea", function() {
        var URL=$(this).attr('data-url');
        $(location).attr('href',URL);
    });
    // 2depth 메뉴 클릭 이벤트
	$(document).on("click",".depth > li", function() {
        $(this).addClass('on').siblings().removeClass('on');
        $(this).find('ul').slideDown(200);
        $(this).siblings().find('ul').slideUp(200);
    });
    $(document).on("click",".depth .subMenu li", function() {
        var URL=$(this).attr('data-url');
        $(".depth .subMenu li").removeClass('active');
        $(".depth > li:first-child").removeClass('HomeOn');
        $(this).addClass('active')
        $(location).attr('href',URL);
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
	// 폴딩 테이블에 사용되는 스크립트
	$(document).on("click",".folding_table .tableSection tbody > tr > .folding",function() {
			$(this).toggleClass("on");
		}
	);
	// 폴딩 테이블에 사용되는 스크립트 End
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
