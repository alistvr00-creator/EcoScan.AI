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

    document.getElementById("webcam-container").innerHTML = "";
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

    let hasil = `
        <div class="waiting">
            <h3>📷 AI sedang menunggu objek...</h3>
            <p>Arahkan kamera ke salah satu pohon yang tersedia.</p>
        </div>
    `;

    prediction.forEach((p) => {

        if (p.probability > 0.80) {

            switch (p.className) {

                case "pohon mangga":

                    hasil = `
                    <h2>🥭 Pohon Mangga</h2>

                    <p><b>🎯 Akurasi :</b> ${(p.probability * 100).toFixed(2)}%</p>

                    <hr>

                    <p><b>🌿 Manfaat</b></p>

                    <p>
                    Menghasilkan buah yang kaya vitamin, membantu menyerap karbon dioksida,
                    menghasilkan oksigen, serta memberikan keteduhan bagi lingkungan.
                    </p>

                    <p><b>💧 Cara Perawatan</b></p>

                    <ul>
                        <li>Siram secara rutin.</li>
                        <li>Berikan pupuk organik.</li>
                        <li>Pastikan mendapat sinar matahari.</li>
                        <li>Pangkas ranting yang kering.</li>
                    </ul>

                    <p><b>✅ Status :</b> Tanaman berhasil dikenali oleh AI.</p>
                    `;
                    break;

                case "pohon apel":

                    hasil = `
                    <h2>🍎 Pohon Apel</h2>

                    <p><b>🎯 Akurasi :</b> ${(p.probability * 100).toFixed(2)}%</p>

                    <hr>

                    <p><b>🌿 Manfaat</b></p>

                    <p>
                    Menghasilkan buah yang bergizi, membantu penghijauan,
                    menghasilkan oksigen, dan menjaga keseimbangan lingkungan.
                    </p>

                    <p><b>💧 Cara Perawatan</b></p>

                    <ul>
                        <li>Tanam di daerah yang sejuk.</li>
                        <li>Siram secukupnya.</li>
                        <li>Berikan pupuk secara berkala.</li>
                        <li>Jaga kelembapan tanah.</li>
                    </ul>

                    <p><b>✅ Status :</b> Tanaman berhasil dikenali oleh AI.</p>
                    `;
                    break;

                case "pohon kelapa":

                    hasil = `
                    <h2>🥥 Pohon Kelapa</h2>

                    <p><b>🎯 Akurasi :</b> ${(p.probability * 100).toFixed(2)}%</p>

                    <hr>

                    <p><b>🌿 Manfaat</b></p>

                    <p>
                    Membantu mencegah abrasi pantai, menghasilkan oksigen,
                    dan hampir seluruh bagian pohon dapat dimanfaatkan.
                    </p>

                    <p><b>💧 Cara Perawatan</b></p>

                    <ul>
                        <li>Tanam di tempat terbuka.</li>
                        <li>Siram saat masih muda.</li>
                        <li>Berikan pupuk secara berkala.</li>
                        <li>Pastikan mendapat sinar matahari penuh.</li>
                    </ul>

                    <p><b>✅ Status :</b> Tanaman berhasil dikenali oleh AI.</p>
                    `;
                    break;

                case "pohon pisang":

                    hasil = `
                    <h2>🍌 Pohon Pisang</h2>

                    <p><b>🎯 Akurasi :</b> ${(p.probability * 100).toFixed(2)}%</p>

                    <hr>

                    <p><b>🌿 Manfaat</b></p>

                    <p>
                    Menghasilkan buah yang kaya nutrisi, menjaga kelembapan tanah,
                    dan membantu penghijauan di lingkungan sekitar.
                    </p>

                    <p><b>💧 Cara Perawatan</b></p>

                    <ul>
                        <li>Siram secara rutin.</li>
                        <li>Gunakan pupuk organik.</li>
                        <li>Bersihkan daun yang kering.</li>
                        <li>Jaga kelembapan tanah.</li>
                    </ul>

                    <p><b>✅ Status :</b> Tanaman berhasil dikenali oleh AI.</p>
                    `;
                    break;

                case "pohon jambu":

                    hasil = `
                    <h2>🍈 Pohon Jambu</h2>

                    <p><b>🎯 Akurasi :</b> ${(p.probability * 100).toFixed(2)}%</p>

                    <hr>

                    <p><b>🌿 Manfaat</b></p>

                    <p>
                    Menghasilkan buah yang kaya vitamin C,
                    membantu menyerap karbon dioksida,
                    dan menghasilkan oksigen bagi lingkungan.
                    </p>

                    <p><b>💧 Cara Perawatan</b></p>

                    <ul>
                        <li>Siram secara teratur.</li>
                        <li>Berikan pupuk organik.</li>
                        <li>Pangkas ranting tua.</li>
                        <li>Pastikan mendapat cahaya matahari.</li>
                    </ul>

                    <p><b>✅ Status :</b> Tanaman berhasil dikenali oleh AI.</p>
                    `;
                    break;
            }

        }

    });

    labelContainer.innerHTML = hasil;

}
