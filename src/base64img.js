export function toDataURL(url, callback) {
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // Permite o carregamento de imagens de diferentes origens
    img.onload = function () {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.height = img.naturalHeight;
        canvas.width = img.naturalWidth;
        ctx.drawImage(img, 0, 0);
        const dataURL = canvas.toDataURL('image/png');
        callback(dataURL);
    };
    img.src = url;
}