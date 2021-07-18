let global_video_track = [];    // This is just for keeping track of what has been already added to HTML
function load(){
    // Makes request to song_list endpoint of flask and retrieves json list of songs
    let uid = getCookie('uid');
    let new_url = window.location.protocol + "//" + window.location.host + "/songs_list";
    jQuery.getJSON(new_url, function (data) {
        let total = data[1];
        let bar = document.getElementById('progress-bar');
        if (total === 0 || total === data[0].length){
            bar.classList.remove('visible')
            //bar.classList.remove('d-block')
            bar.classList.add('invisible')
            bar.classList.add('d-none')
        }
        else{
            bar.classList.remove('invisible');
            bar.classList.remove('d-none')
            bar.classList.add('visible')
            //bar.classList.add('d-block')
        }
        let bar_inner = document.getElementById('inner-progress-bar');
        bar_inner.style.width = `${Math.trunc(data[0].length / total * 100)}%`
        bar_inner.innerText = `${data[0].length}/${total}`

        if (data[0] !== null) {
            let local_track = [];
            for (let i = 0; i < data[0].length; i++) {
                let id = data[0][i]['id'];
                if (document.getElementById(id.toString()) === null) {
                    let author = data[0][i]['author'];
                    let download_url = data[0][i]['file_name'];
                    let yt_id = data[0][i]['yt_id'];
                    let thumbnail = data[0][i]['thumbnail_url'];
                    let title = data[0][i]['title'];
                    let length = data[0][i]['length'];
                    let size = data[0][i]['size'];

                    let new_song = document.getElementById('song_holder');
                    // For each song in the JSON add table row
                    new_song.innerHTML += `<tr>
                        <td id="${id}">
                            <div class="row justify-content-center align-items-center">
                                <div class="col-12 col-sm-5 col-md-3 col-lg-2 col-xl-2" data-toggle="modal" data-target="#vid_details" data-bs-vidid="${yt_id}">
                                    <img src="${thumbnail}" loading="eager" width="100%">
                                </div>
                                <div class="col">
                                    <div class="pt-1" style="height: 100%;">
                                        <div class="p-1">
                                            <h5>${title}<br></h5>
                                            <div>
                                                <span class="text-primary">Author:&nbsp;</span><span>${author}</span><br>
                                                <span class="text-primary">Duration:&nbsp;</span><span>${length}&nbsp;</span><br>
                                                <span class="text-primary">File size:&nbsp;</span><span>${size}&nbsp;</span>
                                                <span style="float: right;margin-top: -30px;">&nbsp;
                                                    <button disabled id="btn-${id}" class="btn btn-primary btn-danger disabled" type="button" onclick="window.location.href='download/${download_url}';">
                                                        <i class="fas fa-download"></i>
                                                    </button>
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>`
                    if (!global_video_track.includes(id)) {
                        global_video_track.push(id);
                    }
                }
                local_track.push(id)
                if (data[0][i]['downloaded'] === true){
                    let d_btn = document.getElementById("btn-" + id);
                    d_btn.disabled = false;
                    d_btn.classList.remove('disabled');
                }
            }
            let absent = global_video_track.filter(e=>!local_track.includes(e));
            absent.forEach(element => remove_absent(element));

            // Remove songs from HTML that no longer are in the songs_list endpoint.
            function remove_absent(em) {
                let obj = document.getElementById(em.toString());
                if (obj !== null){
                    obj.remove();
                }
            }
        }
    })
}
// Run load() every 2 seconds
let interval = window.setInterval(function (){
    load()
}, 2000)

document.getElementById('down_all').addEventListener('click', function (){
    window.location.href=`download/all`;
})

// Function for retrieving the UID from the uid cookie
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}