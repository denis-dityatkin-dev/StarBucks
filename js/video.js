document.addEventListener('DOMContentLoaded', function() {
    const mediaBlock = document.querySelector('.content-make__media');
    
    if (!mediaBlock) return;

    // ID вашего видео
    const videoId = 'cKl9rqjBAQ4'; 

    mediaBlock.addEventListener('click', function(e) {
        e.preventDefault();

        // Если видео уже загружено — не дублируем
        if (mediaBlock.querySelector('iframe')) return;

        // Создаем iframe
        const iframe = document.createElement('iframe');
        iframe.setAttribute('src', `https://www.youtube.com/embed/${videoId}?autoplay=1`);
        iframe.setAttribute('title', 'YouTube video player');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allow', 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share');
        iframe.setAttribute('allowfullscreen', '');
        iframe.classList.add('content-make__video');

        // Очищаем блок (удаляем картинку и кнопку) и вставляем видео
        mediaBlock.innerHTML = '';
        mediaBlock.appendChild(iframe);
    });
});