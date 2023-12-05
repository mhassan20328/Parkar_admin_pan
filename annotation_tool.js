
let canvas = document.getElementById('annotation-canvas');
let ctx = canvas.getContext('2d');
// Image array to store the images
let images = [];
// image index to iterate through the images
let currentImageIndex = 0;
// Annotations array to store the annotations
let annotations = [];
// Current annotations array to store the current annotations
let currentAnnotations = [];
// jszip object to create zip file
let zip = new JSZip();

document.getElementById('image-upload').addEventListener('change', (event) => {
  const files = event.target.files;
  images = [];
  annotations = [];
  currentAnnotations = [];
  currentImageIndex = 0;
  zip = new JSZip();

  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    const reader = new FileReader();

    reader.onload = function (e) {
      const image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        images.push(image);
        annotations.push([]);
        if (images.length === 1) {
          setCurrentImage(0);
        }
      };
    };

    reader.readAsDataURL(file);
  }
});

canvas.addEventListener('mousedown', (event) => {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  currentAnnotations.push({
    x: x / canvas.width,
    y: y / canvas.height,
    width: 0,
    height: 0
  });

  console.log(`Annotation X: ${x / canvas.width}, Y: ${y / canvas.height}`);

  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  const currentAnnotation = currentAnnotations[currentAnnotations.length - 1];
  currentAnnotation.width = (x - currentAnnotation.x * canvas.width) / canvas.width;
  currentAnnotation.height = (y - currentAnnotation.y * canvas.height) / canvas.height;

  drawAnnotations();
}

function onMouseUp() {
  canvas.removeEventListener('mousemove', onMouseMove);
  canvas.removeEventListener('mouseup', onMouseUp);
}

function setCurrentImage(index) {
  currentImageIndex = index;
  currentAnnotations = annotations[currentImageIndex] || [];
  drawAnnotations();
}

function drawAnnotations() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (images.length > 0) {
    ctx.drawImage(images[currentImageIndex], 0, 0, canvas.width, canvas.height);
  }

  for (let i = 0; i < currentAnnotations.length; i++) {
    const annotation = currentAnnotations[i];
    const x = annotation.x * canvas.width;
    const y = annotation.y * canvas.height;
    const width = annotation.width * canvas.width;
    const height = annotation.height * canvas.height;

    ctx.strokeStyle = 'red';
    ctx.lineWidth = 2;
    ctx.strokeRect(x, y, width, height);
  }
}

function downloadAnnotations() {
  for (let i = 0; i < annotations.length; i++) {
    const imageAnnotations = annotations[i];
    const image = images[i];
    const darknetFormat = [];

    for (let j = 0; j < imageAnnotations.length; j++) {
      const annotation = imageAnnotations[j];
      const x = annotation.x + annotation.width / 2;
      const y = annotation.y + annotation.height / 2;
      const width = annotation.width;
      const height = annotation.height;

      darknetFormat.push(`0 ${x} ${y} ${width} ${height}`);
    }

    const imageBlob = dataURItoBlob(image.src);
    const darknetText = darknetFormat.join('\n');

    const timestamp = new Date().toISOString().replace(/[-T:.Z]/g, ''); 
    const imageFilename = `${timestamp}.png`;
    const annotationFilename = `${timestamp}.txt`;

    zip.file(imageFilename, imageBlob);
    zip.file(annotationFilename, darknetText);
  }

  // Generate and download the ZIP file
  zip.generateAsync({ type: "blob" })
    .then(function (content) {
      saveAs(content, "annotations.zip");
    });
}

// Function to convert data URI to Blob
function dataURItoBlob(dataURI) {
  const byteString = atob(dataURI.split(',')[1]);
  const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  const ab = new ArrayBuffer(byteString.length);
  const ia = new Uint8Array(ab);
  for (let i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }
  return new Blob([ab], { type: mimeString });
}

// Next and previous image buttons
document.getElementById('next-image').addEventListener('click', () => {
  if (currentImageIndex < images.length - 1) {
    setCurrentImage(currentImageIndex + 1);
  }
});

document.getElementById('prev-image').addEventListener('click', () => {
  if (currentImageIndex > 0) {
    setCurrentImage(currentImageIndex - 1);
  }
});
