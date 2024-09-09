const vision = require('@google-cloud/vision');
const admin = require('firebase-admin');

// Initialize Firebase Admin SDK if not already initialized
if (!admin.apps.length) {
    admin.initializeApp({
        credential: admin.credential.applicationDefault(),
        // For Firebase Realtime Database or Firestore, uncomment and set your database URL
        // databaseURL: "https://<your-database-name>.firebaseio.com"
    });
}

// Creates a client
const client = new vision.ImageAnnotatorClient();

async function analyzeImage(imagePath) {
    // Perform text detection on the image file
    const [result] = await client.textDetection(imagePath);
    const detections = result.textAnnotations;
    console.log('Text:');
    detections.forEach(text => console.log(text.description));

    return detections;
}

// Example usage
const imagePath = 'path/to/your/image.png'; // Local path to your image
analyzeImage(imagePath)
    .then(detections => {
        // Handle the detection results
        detections.forEach(text => {
            console.log(`Detected text: ${text.description}`);
        });
    })
    .catch(err => {
        console.error('ERROR:', err);
    });
