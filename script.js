const URL = "https://teachablemachine.withgoogle.com/models/93Z-tMUr3/";

let model, webcam, labelContainer, maxPredictions;

async function init() {

    const modelURL = URL + "model.json";
    const metadataURL = URL + "metadata.json";

    model = await tmImage.load(modelURL, metadataURL);

    maxPredictions = model.getTotalClasses();

    webcam = new tmImage.Webcam(350, 350, true);

    await webcam.setup();

    await webcam.play();

    window.requestAnimationFrame(loop);

    document.getElementById("webcam-container").appendChild(webcam.canvas);

    labelContainer = document.getElementById("label-container");
}

async function loop() {

    webcam.update();

    await predict();

    window.requestAnimationFrame(loop);

}

async function predict() {

    const prediction = await model.predict(webcam.canvas);

    let hasil = "";

    prediction.forEach((p) => {

        if (p.probability > 0.50) {

            switch (p.className) {

                case "pohon mangga":

                    hasil = `
                    <h2>🥭 Pohon Mangga</h2>

                    <p><b>Akurasi :</b> ${(p.probability * 100).toFixed(2)}%</p>

                    <p><b>Manfaat :</b> Menghasilkan buah yang kaya vitamin, menyerap karbon dioksida, menghasilkan oksigen, dan membantu penghijauan.</p>

                    <p><b>Perawatan :</b> Siram 1–2 kali sehari, beri pupuk organik, dan letakkan di tempat yang terkena sinar matahari.</p>
                    `;
                    break;

                case "pohon apel":

                    hasil = `
                    <h2>🍎 Pohon Apel</h2>

                    <p><b>Akurasi :</b> ${(p.probability * 100).toFixed(2)}%</p>

                    <p><b>Manfaat :</b> Menghasilkan buah bergizi, membantu penghijauan, menyerap karbon dioksida, dan menghasilkan oksigen.</p>

                    <p><b>Perawatan :</b> Cocok di daerah sejuk, siram secukupnya, dan beri pupuk organik.</p>
                    `;
                    break;

                case "pohon kelapa":

                    hasil = `
                    <h2>🥥 Pohon Kelapa</h2>

                    <p><b>Akurasi :</b> ${(p.probability * 100).toFixed(2)}%</p>

                    <p><b>Manfaat :</b> Mencegah abrasi, menghasilkan oksigen, dan hampir seluruh bagian pohon dapat dimanfaatkan.</p>

                    <p><b>Perawatan :</b> Sinar matahari penuh, siram rutin saat masih muda, dan beri pupuk.</p>
                    `;
                    break;

                case "pohon pisang":

                    hasil = `
                    <h2>🍌 Pohon Pisang</h2>

                    <p><b>Akurasi :</b> ${(p.probability * 100).toFixed(2)}%</p>

                    <p><b>Manfaat :</b> Menghasilkan buah bergizi, menjaga kelembapan tanah, dan mendukung penghijauan.</p>

                    <p><b>Perawatan :</b> Tanah lembap, beri pupuk organik, dan bersihkan daun kering.</p>
                    `;
                    break;

                case "pohon jambu":

                    hasil = `
                    <h2>🍈 Pohon Jambu</h2>

                    <p><b>Akurasi :</b> ${(p.probability * 100).toFixed(2)}%</p>

                    <p><b>Manfaat :</b> Menghasilkan buah kaya vitamin C, menyerap karbon dioksida, dan menambah ruang hijau.</p>

                    <p><b>Perawatan :</b> Siram rutin, pangkas ranting tua, dan beri pupuk organik.</p>
                    `;
                    break;
            }

        }

    });

    labelContainer.innerHTML = hasil;

}
