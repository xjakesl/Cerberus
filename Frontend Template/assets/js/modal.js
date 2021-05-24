$('#vid_details').on('hidden.bs.modal', function () {
    var t = $('.yt-vid')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    $(this).find(".yt-vid")[0].src = ""
    });

$('#vid_details').on('show.bs.modal', function (event) {
    var btn = $(event.relatedTarget);
    var title = btn.data('bs-title');
    var url = 'https://www.youtube.com/embed/' + btn.data('bs-vidid') + '?enablejsapi=1&version=3&playerapiid=ytplayer'
    
    var modal = $(this)
    //var title = modal.find(".modal-title")[0].innerHTML = title;
    var iframe = modal.find(".yt-vid")[0].src = url;
})

    