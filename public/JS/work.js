$(document).ready(function(){
  $(window).on('beforeunload', function(){
        $(window).scrollTop(0);
  });
  $('#scroll').click(function(){
        $('body, html').animate({ scrollTop: 720 }, 'slow');
  });

  //slideshow image append
  var img_number = 15;
  for(var x=0;x<img_number;x++){
    $('.project_img').append(
      '<img id="project_small_' + x + '" src="../img/project/work/' + x +'_small.jpg"/>'
    );

    $('.project_slide_img').append(
      '<img id="project_big_' + x + '" src="../img/project/work/' + x +'_big.jpg"/>'
    );
  };

  //project slideshow (automatic on page top-right)
  $(".project_img > img:gt(0)").hide();

  function slideSwitch(){
    $('.project_img > img:first')
      .fadeOut(1000)
      .next()
      .fadeIn(1000)
      .end()
      .appendTo('.project_img');
  }

  //slideshow pause when hover
  var theInterval;
  function startSlide() {
    theInterval = setInterval(slideSwitch, 2500);
  }

  function stopSlide() {
    clearInterval(theInterval);
  }

  $(function(){
    startSlide();
    $('.project_img').hover(function(){
      stopSlide();
    }, function(){
      startSlide();
    })
  });


  //project slideshow new window & slide resize
  function slide_resize(){
    /* slide responsive to window, initial and resize*/
    var windowHeight = $(window).height();
    var windowWidth = $(window).width();
    var slideHeight = $('.project_slide').height();
    if(windowHeight-slideHeight>0){
      $('.project_slide').css('margin-top', (windowHeight-slideHeight)*0.5+'px');
    }else{
      $('.project_slide').css('margin-top', '48px');
    }
    $('#project_arrow_left, #project_arrow_right').css('margin-top', (slideHeight-72)*0.5+'px');
  };


  $(window).resize(function(){
    slide_resize();
  });

  var slideshowIndex =0;
  function project_slideshow(id){
    return function(){
      slideshowIndex = id;
      $('body, html').css('overflow', 'hidden');
      $('.project_slide_container').show();
      $('.project_slide_img img').hide();
      $('#project_big_'+id).fadeIn('slow');
      slide_resize();
    }
  }


  function project_slide_prev(){
    if (slideshowIndex === 0) {
      slideshowIndex = img_number-1;
      $('.project_slide_img img').hide();
      $('#project_big_'  + slideshowIndex).fadeIn('slow');
    } else {
      slideshowIndex--;
      $('.project_slide_img img').hide();
      $('#project_big_'  + slideshowIndex).fadeIn('slow');
    }
  }

  function project_slide_next(){
    if (slideshowIndex === img_number-1) {
      slideshowIndex = 0;
      $('.project_slide_img img').hide();
      $('#project_big_'  + slideshowIndex).fadeIn('slow');
    } else {
      slideshowIndex++;
      $('.project_slide_img img').hide();
      $('#project_big_'  + slideshowIndex).fadeIn('slow');
    }
  }

  for(var y=0;y<img_number;y++){
    $('#project_small_'+y).click(project_slideshow(y));
  };

  $('#project_arrow_left').click(project_slide_prev);
  $('#project_arrow_right').click(project_slide_next);
  $('.project_slide_img img').click(project_slide_next);


  $(document).keyup(function(e) {
    if (e.keyCode == 27) {
      $('body, html').css('overflow', 'auto');
      $('.project_slide_container').hide();
    };
  }); // escape key maps to keycode '27'

  $('.project_close').click(function(){
      $('body, html').css('overflow', 'auto');
      $('.project_slide_container').hide();
  });

  // control the proportion of video
  function playItemControl(){
    var video_width_1 = $('#work_video_1').width();
    $('#work_video_1').css('height', video_width_1*0.5617+'px');

    var video_width_2 = $('#work_video_2').width();
    $('#work_video_2').css('height', video_width_2*0.75+'px');
  }
  playItemControl();
  $(window).resize(function(){
    playItemControl();
  });

  /* left-bar appear and fixed after certain scroll */
  $(window).scroll(function(){
    var scrollHeight = $(window).scrollTop();
    var work_video_height = $('.work_video').height();
    console.log(work_video_height);
    if(scrollHeight>640+work_video_height){
      $('.work_trigger').fadeIn('slow');
    }else{
      $('.work_trigger').fadeOut('slow');
    }
  });

  /* layer click and show */
  $('#02, #03, #04, #05').hide();
  $('#work_space').addClass('work_clicked_shadow');

  function click_layer(selector, layer){
        $(selector).click(function(){
              $(layer).fadeToggle('slow');
              $(this).toggleClass('work_clicked_shadow');
        });
  };

  click_layer('#work_space', '#01');
  click_layer('#work_furniture', '#02');
  click_layer('#work_social', '#03');
  click_layer('#work_price', '#04');
  click_layer('#work_protocol', '#05');

});


