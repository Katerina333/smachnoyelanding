/* Hide a clip's play badge once its video actually plays, so the badge only ever
   sits over a poster. A slot with no <source> never fires `playing`, so it keeps it. */
document.querySelectorAll('.clip').forEach(function (clip) {
  var video = clip.querySelector('video');
  if (!video) return;
  video.addEventListener('playing', function () { clip.classList.add('is-playing'); });
});
