// Bootstrap Modal controls.

$('#vid_details').on('hidden.bs.modal', function () {
    let t = $('.yt-vid')[0].contentWindow.postMessage('{"event":"command","func":"' + 'stopVideo' + '","args":""}', '*');
    $(this).find(".yt-vid")[0].src = ""
    });

$('#vid_details').on('show.bs.modal', function (event) {
    let btn = $(event.relatedTarget);
    let title = btn.data('bs-title');
    let url = 'https://www.youtube.com/embed/' + btn.data('bs-vidid') + '?enablejsapi=1&version=3&playerapiid=ytplayer'
    
    let modal = $(this)
    //let title = modal.find(".modal-title")[0].innerHTML = title;
    let iframe = modal.find(".yt-vid")[0].src = url;
})