Webcam.set({
    width: 350,
    height: 300,
    img_format: 'png',
    png_quality: 90
});
camera= document.getElementById("camera");
Webcam.attach(camera);

function click_photo() {
    Webcam.snap(
        function(data_uri) {
            document.getElementById("result").innerHTML= "<img id='result_image' src='"+data_uri+"'>";
        }
    );
};

console.log('ml5 version', ml5.version);
classifier= ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/jsKNG5ggH/model.json', modelLoaded);

function modelLoaded() {
    console.log("model loaded!");
};

function identify_photo() {
    img= document.getElementById("result_image");
    classifier.classify(img, verifyResults);
};

function verifyResults(error, results) {
    if (error) {
        console.error(error);
    } else {
        console.log(results);
        document.getElementById("family_member").innerHTML= results[0].label;
        document.getElementById("accuracy").innerHTML= results[0].confidence.toFixed(4);
    };
};